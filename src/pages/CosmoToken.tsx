
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const CosmoToken = () => {
  const [tokenData, setTokenData] = useState({
    price: 0.000789,
    change24h: 0,
    loading: true
  });

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        // Simulating API call to PancakeSwap
        // In real implementation, you would fetch from PancakeSwap API
        const mockChange = (Math.random() - 0.5) * 20; // Random change between -10% and +10%
        setTokenData({
          price: 0.000789 + (Math.random() - 0.5) * 0.0001,
          change24h: mockChange,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching token price:', error);
        setTokenData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchTokenPrice();
    const interval = setInterval(fetchTokenPrice, 600000); // Update every 10 minutes

    return () => clearInterval(interval);
  }, []);

  const isPositive = tokenData.change24h >= 0;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8">
            <span className="neon-text">Токен Cosmo</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Cosmo — главный токен CosmoLab. Это твой ключ к ИИ агентам. Купи Cosmo сейчас на PancakeSwap по минимальной цене и стань частью будущего!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Token Info */}
          <div className="space-y-8">
            {/* Price Card */}
            <Card className="glass-effect border-neon-blue/30 p-8">
              <div className="text-center">
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-neon-blue">
                  Текущая цена Cosmo
                </h2>
                
                {tokenData.loading ? (
                  <div className="animate-pulse">
                    <div className="h-16 bg-gray-700 rounded mb-4"></div>
                    <div className="h-8 bg-gray-700 rounded"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-5xl font-orbitron font-bold mb-4 neon-text animate-glow">
                      ${tokenData.price.toFixed(6)}
                    </div>
                    
                    <div className={`flex items-center justify-center space-x-2 text-xl font-bold ${
                      isPositive ? 'text-neon-green' : 'text-red-400'
                    }`}>
                      {isPositive ? <TrendingUp /> : <TrendingDown />}
                      <span>
                        {isPositive ? '+' : ''}{tokenData.change24h.toFixed(2)}% за 24ч
                      </span>
                    </div>
                  </>
                )}
                
                <div className="mt-6 p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl">
                  <p className="text-neon-green font-bold text-lg animate-pulse">
                    🔥 Цена стартовая прямо сейчас — не упусти шанс!
                  </p>
                </div>
              </div>
            </Card>

            {/* Benefits */}
            <Card className="glass-effect border-neon-purple/30 p-8">
              <h3 className="text-2xl font-orbitron font-bold mb-6 text-neon-purple">
                Что дает токен Cosmo?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <h4 className="font-bold text-neon-blue">Оплата ИИ агентов</h4>
                    <p className="text-gray-300">Используй Cosmo для заказа любых агентов</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🏠</div>
                  <div>
                    <h4 className="font-bold text-neon-blue">Доступ к RWA</h4>
                    <p className="text-gray-300">Real World Assets и эксклюзивные возможности</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🎁</div>
                  <div>
                    <h4 className="font-bold text-neon-blue">Участие в аирдропах</h4>
                    <p className="text-gray-300">Получай бонусные токены и награды</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📈</div>
                  <div>
                    <h4 className="font-bold text-neon-blue">Рост стоимости</h4>
                    <p className="text-gray-300">Чем больше людей покупает, тем выше ценность</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Purchase Section */}
          <div className="space-y-8">
            {/* Buy Button */}
            <Card className="glass-effect border-neon-green/30 p-8 text-center">
              <h3 className="text-3xl font-orbitron font-bold mb-6 text-neon-green">
                Купить прямо сейчас!
              </h3>
              
              <div className="mb-6">
                <div className="text-6xl mb-4 animate-float">🚀</div>
                <p className="text-gray-300 mb-4">
                  Покупай Cosmo на PancakeSwap по лучшей цене
                </p>
              </div>
              
              <Button 
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple hover:from-neon-purple hover:via-neon-blue hover:to-neon-green text-white font-bold py-6 text-xl rounded-full transition-all duration-500 animate-neon-pulse shadow-2xl mb-4"
              >
                <a 
                  href="https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0x60E5FfdE4230985757E5Dd486e33E85AfEfC557b&chain=bsc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Купить на PancakeSwap
                </a>
              </Button>
              
              <p className="text-sm text-gray-400">
                Откроется в новом окне • Binance Smart Chain
              </p>
            </Card>

            {/* Chart Placeholder */}
            <Card className="glass-effect border-neon-blue/30 p-8">
              <h3 className="text-2xl font-orbitron font-bold mb-6 text-neon-blue text-center">
                График цены Cosmo
              </h3>
              
              <div className="h-64 bg-cosmos-light rounded-xl flex items-center justify-center border border-neon-blue/20">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-400">График цены скоро будет доступен</p>
                  <p className="text-sm text-gray-500 mt-2">Интеграция с TradingView в разработке</p>
                </div>
              </div>
            </Card>

            {/* Motivation */}
            <Card className="glass-effect border-neon-purple/30 p-8 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-center neon-text">
                Почему именно сейчас?
              </h3>
              
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-lg">Стартовая цена — максимальный потенциал роста</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">🎯</span>
                  <span className="text-lg">Ограниченное предложение токенов</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">🚀</span>
                  <span className="text-lg">Растущий спрос на ИИ агентов</span>
                </div>
                
                <div className="mt-6 p-4 bg-neon-blue/20 border border-neon-blue/50 rounded-xl">
                  <p className="font-bold text-neon-blue">
                    Не упусти возможность стать частью революции ИИ!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmoToken;
