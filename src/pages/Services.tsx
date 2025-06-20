
import { useState } from 'react';
import ServicesList from '@/components/ServicesList';
import ServiceOrderForm from '@/components/ServiceOrderForm';

const Services = () => {
  const [selectedService, setSelectedService] = useState('');

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
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
        <ServicesList onServiceSelect={handleServiceSelect} />

        {/* Order Form */}
        <ServiceOrderForm initialService={selectedService} />
      </div>
    </div>
  );
};

export default Services;
