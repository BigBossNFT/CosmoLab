
import { useState, useEffect } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Lock, Unlock, Users, TrendingUp, Wallet, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AgentLevel {
  id: string;
  level_number: number;
  is_unlocked: boolean;
  unlock_price: number;
  unlocked_at: string | null;
}

interface MatrixPosition {
  id: string;
  level_number: number;
  position_number: number;
  occupied_by: string | null;
  occupied_at: string | null;
}

interface Transaction {
  id: string;
  transaction_type: string;
  amount: number;
  level_number: number;
  description: string;
  status: string;
  created_at: string;
}

const MatrixDashboard = () => {
  const { isConnected, user, account } = useWeb3();
  const [agentLevels, setAgentLevels] = useState<AgentLevel[]>([]);
  const [matrixPositions, setMatrixPositions] = useState<MatrixPosition[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected || !user) {
      navigate('/');
      return;
    }
    
    loadDashboardData();
  }, [isConnected, user, navigate]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Загружаем уровни агентов
      const { data: levels } = await supabase
        .from('agent_levels')
        .select('*')
        .eq('user_id', user.id)
        .order('level_number');

      if (levels) setAgentLevels(levels);

      // Загружаем позиции матрицы
      const { data: positions } = await supabase
        .from('matrix_positions')
        .select('*')
        .eq('user_id', user.id)
        .order('level_number, position_number');

      if (positions) setMatrixPositions(positions);

      // Загружаем транзакции
      const { data: txs } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (txs) setTransactions(txs);

      // Подсчитываем баланс и рефералов
      const earnings = txs?.filter(tx => tx.transaction_type === 'earning').reduce((sum, tx) => sum + parseFloat(tx.amount.toString()), 0) || 0;
      setTotalBalance(earnings);

      const { count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', user.id);

      setReferralCount(count || 0);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные кабинета",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const unlockLevel = async (levelNumber: number, price: number) => {
    try {
      if (!window.ethereum) {
        toast({
          title: "Ошибка",
          description: "MetaMask не найден",
          variant: "destructive"
        });
        return;
      }

      // Отправляем BNB транзакцию
      const priceInWei = (price * Math.pow(10, 18)).toString(16);
      
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: account,
          to: '0x0000000000000000000000000000000000000000', // Адрес контракта
          value: `0x${priceInWei}`,
        }],
      });

      // Обновляем уровень в базе данных
      const { error } = await supabase
        .from('agent_levels')
        .update({ 
          is_unlocked: true, 
          unlocked_at: new Date().toISOString() 
        })
        .eq('user_id', user.id)
        .eq('level_number', levelNumber);

      if (error) throw error;

      // Записываем транзакцию
      await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          transaction_type: 'purchase',
          amount: price,
          level_number: levelNumber,
          tx_hash: txHash,
          description: `Разблокирован Уровень Агентов ${levelNumber}`,
          status: 'completed'
        });

      toast({
        title: "Уровень разблокирован!",
        description: `Уровень Агентов ${levelNumber} успешно разблокирован`,
      });

      loadDashboardData();

    } catch (error: any) {
      console.error('Error unlocking level:', error);
      toast({
        title: "Ошибка разблокировки",
        description: error.message || "Не удалось разблокировать уровень",
        variant: "destructive"
      });
    }
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/?ref=${user.id}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Ссылка скопирована",
      description: "Реферальная ссылка скопирована в буфер обмена",
    });
  };

  const renderMatrixLevel = (levelNumber: number) => {
    const levelPositions = matrixPositions.filter(p => p.level_number === levelNumber);
    const level = agentLevels.find(l => l.level_number === levelNumber);
    
    return (
      <div className="matrix-level">
        {/* Позиция 1 (вверху) */}
        <div className="flex justify-center mb-4">
          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs ${
            levelPositions[0]?.occupied_by ? 'bg-neon-green/20 border-neon-green' : 'bg-gray-800 border-gray-600'
          }`}>
            {levelPositions[0]?.occupied_by ? '👤' : '○'}
          </div>
        </div>
        
        {/* Позиции 2-3 (первый уровень) */}
        <div className="flex justify-center gap-8 mb-4">
          {[1, 2].map(pos => (
            <div key={pos} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs ${
              levelPositions[pos]?.occupied_by ? 'bg-neon-blue/20 border-neon-blue' : 'bg-gray-800 border-gray-600'
            }`}>
              {levelPositions[pos]?.occupied_by ? '👤' : '○'}
            </div>
          ))}
        </div>
        
        {/* Позиции 4-7 (второй уровень) */}
        <div className="flex justify-center gap-4">
          {[3, 4, 5, 6].map(pos => (
            <div key={pos} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs ${
              levelPositions[pos]?.occupied_by ? 'bg-neon-purple/20 border-neon-purple' : 'bg-gray-800 border-gray-600'
            }`}>
              {levelPositions[pos]?.occupied_by ? '👤' : '○'}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8">
            <span className="neon-text">Матричный кабинет</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <Card className="glass-effect border-neon-green/30 p-6">
            <div className="flex items-center space-x-3">
              <Wallet className="w-8 h-8 text-neon-green" />
              <div>
                <p className="text-gray-400 text-sm">Баланс</p>
                <p className="text-2xl font-orbitron font-bold text-neon-green">
                  {totalBalance.toFixed(4)} BNB
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-effect border-neon-blue/30 p-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-neon-blue" />
              <div>
                <p className="text-gray-400 text-sm">Рефералы</p>
                <p className="text-2xl font-orbitron font-bold text-neon-blue">
                  {referralCount}
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-effect border-neon-purple/30 p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-neon-purple" />
              <div>
                <p className="text-gray-400 text-sm">Активных уровней</p>
                <p className="text-2xl font-orbitron font-bold text-neon-purple">
                  {agentLevels.filter(l => l.is_unlocked).length}/10
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-effect border-neon-blue/30 p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Реферальная ссылка</p>
              <Button 
                onClick={copyReferralLink}
                size="sm"
                className="bg-neon-blue/20 hover:bg-neon-blue/40 text-neon-blue border border-neon-blue/30"
              >
                <Copy className="w-4 h-4 mr-2" />
                Копировать
              </Button>
            </div>
          </Card>
        </div>

        {/* Agent Levels Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-orbitron font-bold mb-8 text-neon-blue">
            Уровни Агентов
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {agentLevels.map((level) => (
              <Card key={level.id} className="glass-effect border-neon-blue/30 p-6 text-center">
                <div className="mb-4">
                  {level.is_unlocked ? (
                    <Unlock className="w-8 h-8 text-neon-green mx-auto animate-pulse" />
                  ) : (
                    <Lock className="w-8 h-8 text-gray-500 mx-auto" />
                  )}
                </div>
                
                <h3 className="text-xl font-orbitron font-bold mb-2 text-white">
                  Уровень {level.level_number}
                </h3>
                
                <p className="text-neon-blue font-bold mb-4">
                  {level.unlock_price} BNB
                </p>

                {level.is_unlocked ? (
                  <div className="space-y-4">
                    <Badge className="bg-neon-green/20 text-neon-green">
                      Разблокирован
                    </Badge>
                    
                    {/* Матричная схема */}
                    <div className="bg-cosmos-darker/50 rounded-lg p-4">
                      {renderMatrixLevel(level.level_number)}
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => unlockLevel(level.level_number, level.unlock_price)}
                    className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white"
                  >
                    Разблокировать
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <Card className="glass-effect border-neon-green/30 p-6">
          <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-green">
            История транзакций
          </h2>
          
          <div className="space-y-3">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-cosmos-darker/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{tx.description}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(tx.created_at).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      tx.transaction_type === 'earning' ? 'text-neon-green' : 
                      tx.transaction_type === 'purchase' ? 'text-neon-blue' : 'text-gray-400'
                    }`}>
                      {tx.transaction_type === 'earning' ? '+' : '-'}{tx.amount} BNB
                    </p>
                    <Badge className={
                      tx.status === 'completed' ? 'bg-neon-green/20 text-neon-green' :
                      tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }>
                      {tx.status === 'completed' ? 'Завершено' :
                       tx.status === 'pending' ? 'В ожидании' : 'Ошибка'}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">
                Транзакций пока нет
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MatrixDashboard;
