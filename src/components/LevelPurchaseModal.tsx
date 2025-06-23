
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wallet, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LevelPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetLevel: number;
  userId: string;
  onPurchaseComplete: () => void;
}

interface PurchaseData {
  levels_to_purchase: number[];
  total_cost: number;
  already_unlocked: number[];
}

const LevelPurchaseModal = ({ 
  isOpen, 
  onClose, 
  targetLevel, 
  userId, 
  onPurchaseComplete 
}: LevelPurchaseModalProps) => {
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { toast } = useToast();

  const checkLevels = async () => {
    setIsLoading(true);
    console.log('Checking levels for purchase...', { targetLevel, userId });

    try {
      const { data, error } = await supabase.functions.invoke('check-levels', {
        body: {
          target_level: targetLevel,
          user_id: userId
        }
      });

      if (error) {
        console.error('Error checking levels:', error);
        throw error;
      }

      console.log('Levels check response:', data);
      setPurchaseData(data);

      if (data.levels_to_purchase.length === 0) {
        toast({
          title: "Уровни уже разблокированы",
          description: `Уровень ${targetLevel} и все предыдущие уже активны`,
          className: "border-neon-green/30 bg-cosmos-dark/90 text-neon-green"
        });
        onClose();
        return;
      }

    } catch (error: any) {
      console.error('Error in checkLevels:', error);
      toast({
        title: "Ошибка проверки уровней",
        description: error.message || "Не удалось проверить статус уровней",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!purchaseData || !window.ethereum) {
      toast({
        title: "Ошибка",
        description: "MetaMask не найден или данные не загружены"
      });
      return;
    }

    setIsPurchasing(true);
    console.log('Starting purchase process...', purchaseData);

    try {
      // Инициируем транзакцию через MetaMask
      const priceInWei = (purchaseData.total_cost * Math.pow(10, 18)).toString(16);
      
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: window.ethereum.selectedAddress,
          to: '0x0000000000000000000000000000000000000000', // Замените на адрес вашего контракта
          value: `0x${priceInWei}`,
        }],
      });

      console.log('Transaction sent:', txHash);

      // Подтверждаем покупку на сервере
      const { data, error } = await supabase.functions.invoke('confirm-purchase', {
        body: {
          user_id: userId,
          levels: purchaseData.levels_to_purchase,
          tx_hash: txHash,
          total_amount: purchaseData.total_cost
        }
      });

      if (error) {
        console.error('Error confirming purchase:', error);
        throw error;
      }

      console.log('Purchase confirmed:', data);

      toast({
        title: "Покупка завершена!",
        description: `Успешно разблокированы уровни: ${purchaseData.levels_to_purchase.join(', ')}`,
        className: "border-neon-green/30 bg-cosmos-dark/90 text-neon-green"
      });

      onPurchaseComplete();
      onClose();

    } catch (error: any) {
      console.error('Error in purchase:', error);
      toast({
        title: "Ошибка покупки",
        description: error.message || "Не удалось выполнить покупку",
        variant: "destructive"
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  // Загружаем данные при открытии модального окна
  useState(() => {
    if (isOpen && !purchaseData && !isLoading) {
      checkLevels();
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-neon-blue/30 bg-cosmos-dark text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-orbitron text-neon-blue">
            Покупка уровня {targetLevel}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-neon-blue" />
              <span className="ml-2 text-gray-300">Проверка уровней...</span>
            </div>
          ) : purchaseData ? (
            <>
              {purchaseData.already_unlocked.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Уже разблокированы:</p>
                  <div className="flex flex-wrap gap-2">
                    {purchaseData.already_unlocked.map(level => (
                      <Badge key={level} className="bg-neon-green/20 text-neon-green">
                        Уровень {level}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-400 mb-2">Будут куплены:</p>
                <div className="flex flex-wrap gap-2">
                  {purchaseData.levels_to_purchase.map(level => (
                    <Badge key={level} className="bg-neon-blue/20 text-neon-blue">
                      Уровень {level}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-cosmos-darker/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Общая стоимость:</span>
                  <span className="text-xl font-orbitron font-bold text-neon-green">
                    {purchaseData.total_cost.toFixed(4)} BNB
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-2 text-sm text-yellow-400">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  После подтверждения будет инициирована транзакция через MetaMask.
                  Убедитесь, что у вас достаточно BNB на балансе.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  disabled={isPurchasing}
                >
                  Отмена
                </Button>
                <Button
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                  className="flex-1 bg-gradient-to-r from-neon-blue to-neon-green hover:from-neon-green hover:to-neon-purple text-white"
                >
                  {isPurchasing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Покупка...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Подтвердить и оплатить
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LevelPurchaseModal;
