
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import { supabase } from '@/integrations/supabase/client';

interface BalanceWidgetProps {
  userId: string;
}

const BalanceWidget = ({ userId }: BalanceWidgetProps) => {
  const { account } = useWeb3();
  const [bnbBalance, setBnbBalance] = useState<number>(0);
  const [cosmoBalance, setCosmoBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showBalances, setShowBalances] = useState(true);

  const loadBalances = async () => {
    if (!account || !userId) return;
    
    setIsLoading(true);
    try {
      // Получаем BNB баланс из MetaMask
      if (window.ethereum) {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [account, 'latest']
        });
        const bnbAmount = parseInt(balance, 16) / Math.pow(10, 18);
        setBnbBalance(bnbAmount);
      }

      // Получаем баланс Cosmo из базы данных
      const { data: userBalance } = await supabase
        .from('user_balances')
        .select('cosmo_balance')
        .eq('user_id', userId)
        .single();

      if (userBalance) {
        setCosmoBalance(parseFloat(userBalance.cosmo_balance?.toString() || '0'));
      }

    } catch (error) {
      console.error('Error loading balances:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBalances();
  }, [account, userId]);

  return (
    <Card className="glass-effect border-neon-green/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet className="w-5 h-5 text-neon-green" />
          <h3 className="text-lg font-orbitron font-bold text-neon-green">
            Мои балансы
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
            className="text-gray-400 hover:text-white"
          >
            {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadBalances}
            disabled={isLoading}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* BNB Balance */}
        <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                BNB
              </div>
              <span className="text-gray-400">BNB Balance</span>
            </div>
            <div className="text-right">
              <div className="text-xl font-orbitron font-bold text-neon-blue">
                {showBalances ? `${bnbBalance.toFixed(6)} BNB` : '••••••'}
              </div>
              <div className="text-sm text-gray-400">
                {showBalances ? `≈ $${(bnbBalance * 650).toFixed(2)}` : '≈ $••••'}
              </div>
            </div>
          </div>
        </div>

        {/* Cosmo Balance */}
        <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full flex items-center justify-center text-xs font-bold">
                ★
              </div>
              <span className="text-gray-400">Cosmo Balance</span>
            </div>
            <div className="text-right">
              <div className="text-xl font-orbitron font-bold text-neon-purple">
                {showBalances ? `${cosmoBalance.toLocaleString()} COSMO` : '••••••'}
              </div>
              <div className="text-sm text-gray-400">
                {showBalances ? `≈ $${(cosmoBalance * 0.000789).toFixed(2)}` : '≈ $••••'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="text-xs text-gray-500 text-center">
          Балансы обновляются автоматически при подключении кошелька
        </div>
      </div>
    </Card>
  );
};

export default BalanceWidget;
