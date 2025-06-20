
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const agents = [
  {
    id: 1,
    name: 'Юрист',
    description: 'Анализирует дела, разрабатывает стратегии защиты',
    icon: '⚖️'
  },
  {
    id: 2,
    name: 'Домашний помощник',
    description: 'Управляет умным домом и личными задачами',
    icon: '🏠'
  },
  {
    id: 3,
    name: 'Маркетолог',
    description: 'Создает стратегии продвижения и контент',
    icon: '📈'
  },
  {
    id: 4,
    name: 'Медик',
    description: 'Помогает в диагностике и лечении',
    icon: '🩺'
  },
  {
    id: 5,
    name: 'Путешественник',
    description: 'Планирует идеальные маршруты и поездки',
    icon: '✈️'
  }
];

const Index = () => {
  const [currentAgent, setCurrentAgent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAgent((prev) => (prev + 1) % agents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextAgent = () => {
    setCurrentAgent((prev) => (prev + 1) % agents.length);
  };

  const prevAgent = () => {
    setCurrentAgent((prev) => (prev - 1 + agents.length) % agents.length);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-neon-blue/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-neon-green/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 animate-slide-in">
            <span className="neon-text">CosmoLab:</span>
            <br />
            <span className="text-white">Мастерская</span>
            <br />
            <span className="neon-text">Умных Агентов</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-slide-in" style={{animationDelay: '0.3s'}}>
            Решай любые задачи с Cosmo и агентами
          </p>

          <div className="animate-slide-in" style={{animationDelay: '0.6s'}}>
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green hover:from-neon-green hover:via-neon-blue hover:to-neon-purple text-white font-bold px-12 py-6 text-xl rounded-full transition-all duration-500 animate-neon-pulse shadow-2xl"
            >
              <Link to="/cosmo-token">Купить Cosmo</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-neon-blue rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neon-blue rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Agents Slider Section */}
      <section className="py-20 bg-cosmos-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16">
            <span className="neon-text">Наши Агенты</span>
          </h2>

          <div className="relative">
            <div className="flex items-center justify-center">
              <button 
                onClick={prevAgent}
                className="absolute left-0 z-10 p-3 rounded-full bg-neon-blue/20 hover:bg-neon-blue/40 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-neon-blue" />
              </button>

              <div className="max-w-4xl mx-auto">
                <div className="glass-effect rounded-3xl p-8 text-center transform transition-all duration-500 hover:scale-105">
                  <div className="text-8xl mb-6 animate-float">
                    {agents[currentAgent].icon}
                  </div>
                  <h3 className="text-3xl font-orbitron font-bold mb-4 text-neon-blue">
                    {agents[currentAgent].name}
                  </h3>
                  <p className="text-xl text-gray-300 mb-6">
                    {agents[currentAgent].description}
                  </p>
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-green text-white"
                  >
                    <Link to="/services">Заказать агента</Link>
                  </Button>
                </div>
              </div>

              <button 
                onClick={nextAgent}
                className="absolute right-0 z-10 p-3 rounded-full bg-neon-blue/20 hover:bg-neon-blue/40 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-neon-blue" />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {agents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAgent(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentAgent ? 'bg-neon-blue' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-8">
            <span className="neon-text">Готов к будущему?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Присоединяйся к революции ИИ агентов прямо сейчас. Купи токен Cosmo и получи доступ к миллионам умных помощников.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white font-bold px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              <Link to="/cosmo-token">Купить Cosmo</Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-cosmos-dark px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              <Link to="/services">Заказать агента</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
