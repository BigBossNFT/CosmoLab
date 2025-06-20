
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import WalletConnect from './WalletConnect';
import { services } from './ServicesList';

interface FormData {
  name: string;
  email: string;
  service: string;
  description: string;
}

interface ServiceOrderFormProps {
  initialService?: string;
}

const ServiceOrderForm = ({ initialService = '' }: ServiceOrderFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: initialService,
    description: ''
  });
  const [walletBalance, setWalletBalance] = useState('0');
  const [hasEnoughBalance, setHasEnoughBalance] = useState(false);
  const { toast } = useToast();

  const handleWalletBalanceChange = (balance: string, hasEnough: boolean) => {
    setWalletBalance(balance);
    setHasEnoughBalance(hasEnough);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasEnoughBalance) {
      toast({
        title: "Недостаточно Cosmo для заказа",
        description: "Купите токены Cosmo на сумму от 2000 USDT",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.service || !formData.description) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }

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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-effect rounded-3xl p-8">
        <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
          <span className="neon-text">Заказать агента</span>
        </h2>
        
        <WalletConnect onBalanceChange={handleWalletBalanceChange} />
        
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

          <div className={`border rounded-xl p-4 ${hasEnoughBalance ? 'bg-neon-green/10 border-neon-green/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Стоимость:</span>
              <span className="text-neon-green font-bold text-xl">$2,000 в Cosmo</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-300">Ваш баланс:</span>
              <span className={`font-bold ${hasEnoughBalance ? 'text-neon-green' : 'text-red-400'}`}>
                {walletBalance} Cosmo
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {hasEnoughBalance 
                ? "У вас достаточно токенов для заказа"
                : "Недостаточно токенов. Купите Cosmo на PancakeSwap"
              }
            </p>
          </div>

          <Button 
            type="submit"
            size="lg"
            disabled={!hasEnoughBalance}
            className={`w-full font-bold py-4 text-lg rounded-full transition-all duration-300 ${
              hasEnoughBalance 
                ? 'bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {hasEnoughBalance ? 'Отправить заявку' : 'Недостаточно Cosmo'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ServiceOrderForm;
