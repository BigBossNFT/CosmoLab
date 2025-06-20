
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const services = [
  {
    id: 'legal',
    name: 'Право',
    description: 'Юридический анализ, составление документов, консультации',
    icon: '⚖️',
    price: '$2,000'
  },
  {
    id: 'marketing',
    name: 'Маркетинг',
    description: 'SMM, контент-стратегии, аналитика, реклама',
    icon: '📈',
    price: '$2,000'
  },
  {
    id: 'logistics',
    name: 'Логистика',
    description: 'Оптимизация маршрутов, управление складом',
    icon: '🚚',
    price: '$2,000'
  },
  {
    id: 'education',
    name: 'Образование',
    description: 'Создание курсов, персональное обучение',
    icon: '🎓',
    price: '$2,000'
  },
  {
    id: 'medical',
    name: 'Медицина',
    description: 'Диагностика, анализ симптомов, консультации',
    icon: '🩺',
    price: '$2,000'
  },
  {
    id: 'travel',
    name: 'Путешествия',
    description: 'Планирование маршрутов, бронирование',
    icon: '✈️',
    price: '$2,000'
  },
  {
    id: 'productivity',
    name: 'Продуктивность',
    description: 'Управление задачами, планирование времени',
    icon: '⚡',
    price: '$2,000'
  },
  {
    id: 'entertainment',
    name: 'Развлечения',
    description: 'Создание контента, игры, рекомендации',
    icon: '🎮',
    price: '$2,000'
  },
  {
    id: 'finance',
    name: 'Финансы',
    description: 'Инвестиционные стратегии, учет, анализ',
    icon: '💰',
    price: '$2,000'
  },
  {
    id: 'construction',
    name: 'Строительство',
    description: 'Проектирование, планирование, контроль',
    icon: '🏗️',
    price: '$2,000'
  },
  {
    id: 'home',
    name: 'Домашняя помощь',
    description: 'Управление умным домом, планирование',
    icon: '🏠',
    price: '$2,000'
  },
  {
    id: 'coaching',
    name: 'Персональный коучинг',
    description: 'Личностное развитие, мотивация, цели',
    icon: '🎯',
    price: '$2,000'
  }
];

const Services = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    description: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service || !formData.description) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время для обсуждения деталей",
    });

    setFormData({
      name: '',
      email: '',
      service: '',
      description: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8">
            <span className="neon-text">Наши услуги</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Выбери своего идеального ИИ агента для решения любых задач. Все агенты доступны за единую цену в токенах Cosmo.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-8"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="glass-effect rounded-3xl p-6 text-center hover:scale-105 transition-all duration-300 group"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div className="text-5xl mb-4 group-hover:animate-float">
                {service.icon}
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-3 text-neon-blue">
                {service.name}
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                {service.description}
              </p>
              <div className="text-neon-green font-bold mb-4">
                {service.price} в Cosmo
              </div>
              <Button 
                onClick={() => handleInputChange('service', service.id)}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white text-sm"
              >
                Заказать за Cosmo
              </Button>
            </div>
          ))}
        </div>

        {/* Order Form */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-3xl p-8">
            <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
              <span className="neon-text">Заказать агента</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ваше имя *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-cosmos-light border-neon-blue/30 text-white placeholder-gray-400 focus:border-neon-blue"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-cosmos-light border-neon-blue/30 text-white placeholder-gray-400 focus:border-neon-blue"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Выберите услугу *
                </label>
                <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                  <SelectTrigger className="bg-cosmos-light border-neon-blue/30 text-white">
                    <SelectValue placeholder="Выберите тип агента" />
                  </SelectTrigger>
                  <SelectContent className="bg-cosmos-light border-neon-blue/30">
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id} className="text-white hover:bg-neon-blue/20">
                        {service.icon} {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Описание задачи *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-cosmos-light border-neon-blue/30 text-white placeholder-gray-400 focus:border-neon-blue min-h-[120px]"
                  placeholder="Подробно опишите, какую задачу должен решить ваш ИИ агент..."
                />
              </div>

              <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Стоимость:</span>
                  <span className="text-neon-green font-bold text-xl">$2,000 в Cosmo</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Оплата производится только в токенах Cosmo по текущему курсу
                </p>
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white font-bold py-4 text-lg rounded-full transition-all duration-300"
              >
                Отправить заявку
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
