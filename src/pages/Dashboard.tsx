
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const [user] = useState({
    name: 'Пользователь',
    email: 'user@example.com',
    cosmoBalance: 15000,
    joinDate: '2025-01-15'
  });

  const [userAgents] = useState([
    {
      id: 1,
      name: 'Юрист-агент',
      type: 'legal',
      status: 'active',
      createdAt: '2025-01-20',
      tasksCompleted: 12,
      cost: 2000
    },
    {
      id: 2,
      name: 'Маркетинг-агент',
      type: 'marketing',
      status: 'completed',
      createdAt: '2025-01-18',
      tasksCompleted: 8,
      cost: 2000
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-neon-green/20 text-neon-green';
      case 'completed':
        return 'bg-neon-blue/20 text-neon-blue';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активен';
      case 'completed':
        return 'Завершён';
      case 'pending':
        return 'Ожидание';
      default:
        return 'Неизвестно';
    }
  };

  const getAgentIcon = (type: string) => {
    const icons: Record<string, string> = {
      legal: '⚖️',
      marketing: '📈',
      logistics: '🚚',
      education: '🎓',
      medical: '🩺',
      travel: '✈️',
      productivity: '⚡',
      entertainment: '🎮',
      finance: '💰',
      construction: '🏗️',
      home: '🏠',
      coaching: '🎯'
    };
    return icons[type] || '🤖';
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8">
            <span className="neon-text">Личный кабинет</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
        </div>

        {/* User Info & Balance */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="glass-effect border-neon-blue/30 p-6 col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-white">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-500">Член с {user.joinDate}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neon-green/10 border border-neon-green/30 rounded-xl p-4">
                <div className="text-2xl text-neon-green mb-2">✅</div>
                <h3 className="font-bold text-white">Активных агентов</h3>
                <p className="text-3xl font-orbitron font-bold text-neon-green">
                  {userAgents.filter(agent => agent.status === 'active').length}
                </p>
              </div>
              
              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-xl p-4">
                <div className="text-2xl text-neon-blue mb-2">📊</div>
                <h3 className="font-bold text-white">Всего задач</h3>
                <p className="text-3xl font-orbitron font-bold text-neon-blue">
                  {userAgents.reduce((total, agent) => total + agent.tasksCompleted, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-effect border-neon-purple/30 p-6 text-center">
            <div className="text-4xl mb-4 animate-float">💰</div>
            <h3 className="text-xl font-orbitron font-bold text-neon-purple mb-2">
              Баланс Cosmo
            </h3>
            <p className="text-4xl font-orbitron font-bold text-white mb-4">
              {user.cosmoBalance.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mb-4">
              ≈ ${(user.cosmoBalance * 0.000789).toFixed(2)} USD
            </p>
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white"
            >
              <a href="/cosmo-token">Купить еще</a>
            </Button>
          </Card>
        </div>

        {/* Agents Management */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-orbitron font-bold text-neon-blue">
              Мои ИИ агенты
            </h2>
            <Button 
              asChild
              className="bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white"
            >
              <a href="/services">Заказать нового агента</a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {userAgents.map((agent) => (
              <Card key={agent.id} className="glass-effect border-neon-blue/30 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{getAgentIcon(agent.type)}</div>
                    <div>
                      <h3 className="text-xl font-orbitron font-bold text-white">
                        {agent.name}
                      </h3>
                      <p className="text-gray-400 text-sm">Создан {agent.createdAt}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(agent.status)}>
                    {getStatusText(agent.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Выполнено задач</p>
                    <p className="text-2xl font-bold text-neon-green">{agent.tasksCompleted}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Стоимость</p>
                    <p className="text-2xl font-bold text-neon-blue">{agent.cost} Cosmo</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    className="flex-1 bg-neon-blue/20 hover:bg-neon-blue/40 text-neon-blue border border-neon-blue/30"
                  >
                    Управление
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800"
                  >
                    Статистика
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Order Section */}
        <Card className="glass-effect border-neon-green/30 p-8 text-center">
          <h2 className="text-3xl font-orbitron font-bold mb-6 text-neon-green">
            Быстрый заказ агента
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Заказать любого ИИ агента за $2,000 в токенах Cosmo по текущему курсу. 
            Все агенты работают до полного выполнения задачи.
          </p>
          
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {['⚖️ Юрист', '📈 Маркетолог', '🩺 Медик', '✈️ Путешественник'].map((agent) => (
              <Button 
                key={agent}
                className="bg-cosmos-light hover:bg-neon-green/20 text-white border border-neon-green/30 h-16"
              >
                {agent}
              </Button>
            ))}
          </div>

          <div className="bg-neon-green/10 border border-neon-green/30 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-gray-300">Стоимость любого агента:</span>
              <span className="text-neon-green font-bold text-xl">$2,000 в Cosmo</span>
              <span className="text-gray-400">
                (≈ {(2000 / 0.000789).toLocaleString()} Cosmo)
              </span>
            </div>
          </div>

          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white font-bold px-8 py-4 text-lg rounded-full"
          >
            <a href="/services">Выбрать и заказать агента</a>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
