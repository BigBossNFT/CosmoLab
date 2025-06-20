
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  onSelect: (serviceId: string) => void;
}

const ServiceCard = ({ service, index, onSelect }: ServiceCardProps) => {
  return (
    <div 
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
        onClick={() => onSelect(service.id)}
        className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white text-sm"
      >
        Заказать за Cosmo
      </Button>
    </div>
  );
};

export default ServiceCard;
