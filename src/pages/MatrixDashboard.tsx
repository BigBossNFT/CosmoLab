import { useState, useEffect } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Lock, Unlock, Users, TrendingUp, Wallet, Copy, Settings, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LevelSlider from '@/components/LevelSlider';
import MatrixVisualization from '@/components/MatrixVisualization';
import SystemInfoSection from '@/components/SystemInfoSection';
import BalanceWidget from '@/components/BalanceWidget';
import LevelPurchaseModal from '@/components/LevelPurchaseModal';

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
  const [currentLevel, setCurrentLevel] = useState(1);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
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
      console.log('Loading dashboard data for user:', user);

      // Загружаем уровни агентов
      const { data: levels, error: levelsError } = await supabase
        .from('agent_levels')
        .select('*')
        .eq('user_id', user.id)
        .order('level_number');

      if (levelsError) {
        console.error('Error loading levels:', levelsError);
        throw levelsError;
      }

      if (levels) setAgentLevels(levels);

      // Загружаем позиции матрицы
      const { data: positions, error: positionsError } = await supabase
        .from('matrix_positions')
        .select('*')
        .eq('user_id', user.id)
        .order('level_number, position_number');

      if (positionsError) {
        console.error('Error loading positions:', positionsError);
        throw positionsError;
      }

      if (positions) setMatrixPositions(positions);

      // Загружаем транзакции
      const { data: txs, error: txsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (txsError) {
        console.error('Error loading transactions:', txsError);
        throw txsError;
      }

      if (txs) setTransactions(txs);

      // Подсчитываем баланс и рефералов
      const earnings = txs?.filter(tx => tx.transaction_type === 'earning').reduce((sum, tx) => sum + parseFloat(tx.amount.toString()), 0) || 0;
      setTotalBalance(earnings);

      const { count, error: countError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', user.id);

      if (countError) {
        console.error('Error loading referral count:', countError);
      } else {
        setReferralCount(count || 0);
      }

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

  const handleLevelPurchase = (levelNumber: number) => {
    setSelectedLevel(levelNumber);
    setPurchaseModalOpen(true);
  };

  const handlePurchaseComplete = () => {
    // Перезагружаем данные после успешной покупки
    loadDashboardData();
  };

  const unlockLevel = (levelNumber: number) => {
    handleLevelPurchase(levelNumber);
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/?ref=${user.id}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Ссылка скопирована",
      description: "Реферальная ссылка скопирована в буфер обмена"
    });
  };

  const unlockedLevels = agentLevels.filter(l => l.is_unlocked).map(l => l.level_number);

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

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-cosmos-darker border border-neon-blue/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">
              <TrendingUp className="w-4 h-4 mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="matrix" className="data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green">
              <Users className="w-4 h-4 mr-2" />
              Матрица
            </TabsTrigger>
            <TabsTrigger value="balances" className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple">
              <Wallet className="w-4 h-4 mr-2" />
              Балансы
            </TabsTrigger>
            <TabsTrigger value="info" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
              <Info className="w-4 h-4 mr-2" />
              О системе
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Dashboard */}
            <div className="grid lg:grid-cols-4 gap-6">
              <Card className="glass-effect border-neon-green/30 p-6">
                <div className="flex items-center space-x-3">
                  <Wallet className="w-8 h-8 text-neon-green" />
                  <div>
                    <p className="text-gray-400 text-sm">Заработано</p>
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
                  <div className="text-xs text-gray-500 mb-2 break-all">
                    {`${window.location.origin}/?ref=${user.id}`}
                  </div>
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
            <div>
              <h2 className="text-3xl font-orbitron font-bold mb-8 text-neon-blue">
                Уровни Агентов
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {agentLevels.map((level) => (
                  <Card key={level.id} className="glass-effect border-neon-blue/30 p-6 text-center hover:border-neon-blue/50 transition-all duration-300 transform hover:scale-105">
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
                      <Badge className="bg-neon-green/20 text-neon-green">
                        Разблокирован
                      </Badge>
                    ) : (
                      <Button 
                        onClick={() => handleLevelPurchase(level.level_number)}
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
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-cosmos-darker/50 rounded-lg hover:bg-cosmos-darker/70 transition-colors">
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
          </TabsContent>

          <TabsContent value="matrix" className="space-y-8">
            <div>
              <h2 className="text-3xl font-orbitron font-bold mb-8 text-neon-green text-center">
                Визуализация матрицы
              </h2>
              
              <LevelSlider 
                currentLevel={currentLevel}
                onLevelChange={setCurrentLevel}
                unlockedLevels={unlockedLevels}
              />
              
              <MatrixVisualization 
                level={currentLevel}
                positions={matrixPositions}
                isUnlocked={unlockedLevels.includes(currentLevel)}
              />
            </div>
          </TabsContent>

          <TabsContent value="balances" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <BalanceWidget userId={user.id} />
              
              <Card className="glass-effect border-neon-blue/30 p-6">
                <h3 className="text-xl font-orbitron font-bold mb-4 text-neon-blue">
                  Быстрые действия
                </h3>
                <div className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white">
                    Пополнить баланс
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white">
                    Вывести средства
                  </Button>
                  <Button className="w-full border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/20">
                    История операций
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-8">
            <SystemInfoSection />
          </TabsContent>
        </Tabs>

        {/* Модальное окно покупки */}
        <LevelPurchaseModal
          isOpen={purchaseModalOpen}
          onClose={() => setPurchaseModalOpen(false)}
          targetLevel={selectedLevel}
          userId={user.id}
          onPurchaseComplete={handlePurchaseComplete}
        />
      </div>
    </div>
  );
};

export default MatrixDashboard;
