
import ServiceCard from './ServiceCard';

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

interface ServicesListProps {
  onServiceSelect: (serviceId: string) => void;
}

const ServicesList = ({ onServiceSelect }: ServicesListProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={index}
          onSelect={onServiceSelect}
        />
      ))}
    </div>
  );
};

export default ServicesList;
export { services };
