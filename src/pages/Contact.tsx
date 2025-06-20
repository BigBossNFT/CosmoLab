
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Contact form submitted:', formData);
    
    toast({
      title: "Сообщение отправлено!",
      description: "Мы получили ваше сообщение и свяжемся с вами в ближайшее время",
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8">
            <span className="neon-text">Контакты</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Свяжись с нами для получения консультации по ИИ агентам или по вопросам токена Cosmo
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-effect rounded-3xl p-8">
              <h2 className="text-3xl font-orbitron font-bold mb-8 text-neon-blue">
                Как связаться с нами
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email поддержка</h3>
                    <a 
                      href="mailto:support@cosmolab.space" 
                      className="text-neon-blue hover:text-neon-purple transition-colors text-lg"
                    >
                      support@cosmolab.space
                    </a>
                    <p className="text-gray-400 mt-1">Отвечаем в течение 24 часов</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Чат-бот CosmoAI</h3>
                    <p className="text-gray-300">Используй чат-бот в правом нижнем углу для быстрых ответов</p>
                    <p className="text-gray-400 mt-1">Доступен 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-effect rounded-3xl p-8">
              <h3 className="text-2xl font-orbitron font-bold mb-6 text-neon-purple">
                Социальные сети
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <a 
                  href="#" 
                  className="glass-effect p-4 rounded-xl text-center hover:scale-105 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-2 group-hover:animate-float">🐦</div>
                  <span className="text-sm text-gray-300">X (Twitter)</span>
                </a>
                
                <a 
                  href="#" 
                  className="glass-effect p-4 rounded-xl text-center hover:scale-105 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-2 group-hover:animate-float">📱</div>
                  <span className="text-sm text-gray-300">Telegram</span>
                </a>
                
                <a 
                  href="#" 
                  className="glass-effect p-4 rounded-xl text-center hover:scale-105 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-2 group-hover:animate-float">💬</div>
                  <span className="text-sm text-gray-300">Discord</span>
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="glass-effect rounded-3xl p-8">
              <h3 className="text-2xl font-orbitron font-bold mb-6 text-neon-green">
                Частые вопросы
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white mb-2">Как купить токен Cosmo?</h4>
                  <p className="text-gray-300 text-sm">Переходи на страницу "Токен Cosmo" и используй ссылку на PancakeSwap</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-white mb-2">Сколько стоит ИИ агент?</h4>
                  <p className="text-gray-300 text-sm">Все агенты стоят $2,000 в токенах Cosmo по текущему курсу</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-white mb-2">Как долго работает агент?</h4>
                  <p className="text-gray-300 text-sm">Агенты работают до полного выполнения поставленной задачи</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect rounded-3xl p-8">
            <h2 className="text-3xl font-orbitron font-bold mb-8 text-center neon-text">
              Напиши нам
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
                  Тема сообщения *
                </label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="bg-cosmos-light border-neon-blue/30 text-white placeholder-gray-400 focus:border-neon-blue"
                  placeholder="О чём хотите поговорить?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Сообщение *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-cosmos-light border-neon-blue/30 text-white placeholder-gray-400 focus:border-neon-blue min-h-[120px]"
                  placeholder="Расскажите подробнее о вашем вопросе или предложении..."
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white font-bold py-4 text-lg rounded-full transition-all duration-300"
              >
                Отправить сообщение
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
