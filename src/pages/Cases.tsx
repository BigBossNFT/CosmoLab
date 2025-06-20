
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Cases = () => {
  const { t } = useLanguage();

  const cases = [
    {
      id: 1,
      title: t('cases.case1.title'),
      description: t('cases.case1.desc'),
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
      result: t('cases.case1.result'),
      time: t('cases.case1.time')
    },
    {
      id: 2,
      title: t('cases.case2.title'),
      description: t('cases.case2.desc'),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      result: t('cases.case2.result'),
      time: t('cases.case2.time')
    },
    {
      id: 3,
      title: t('cases.case3.title'),
      description: t('cases.case3.desc'),
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
      result: t('cases.case3.result'),
      time: t('cases.case3.time')
    },
    {
      id: 4,
      title: t('cases.case4.title'),
      description: t('cases.case4.desc'),
      image: "https://images.unsplash.com/photo-1553775282-20af80779df7?w=400&h=300&fit=crop",
      result: t('cases.case4.result'),
      time: t('cases.case4.time')
    },
    {
      id: 5,
      title: t('cases.case5.title'),
      description: t('cases.case5.desc'),
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop",
      result: t('cases.case5.result'),
      time: t('cases.case5.time')
    },
    {
      id: 6,
      title: t('cases.case6.title'),
      description: t('cases.case6.desc'),
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
      result: t('cases.case6.result'),
      time: t('cases.case6.time')
    },
    {
      id: 7,
      title: t('cases.case7.title'),
      description: t('cases.case7.desc'),
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      result: t('cases.case7.result'),
      time: t('cases.case7.time')
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8">
            <span className="neon-text">{t('cases.title')}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('cases.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-8"></div>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((case_, index) => (
            <div 
              key={case_.id}
              className="glass-effect rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 group"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={case_.image} 
                  alt={case_.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmos-dark/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between text-sm">
                    <span className="bg-neon-green/20 text-neon-green px-2 py-1 rounded-full">
                      {case_.result}
                    </span>
                    <span className="bg-neon-blue/20 text-neon-blue px-2 py-1 rounded-full">
                      {case_.time}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-3 text-neon-blue">
                  {case_.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {case_.description}
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white"
                >
                  {t('cases.more-details')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center glass-effect rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            <span className="neon-text">{t('cases.ready-success')}</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('cases.join-clients')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white font-bold px-8 py-4 text-lg rounded-full"
            >
              <a href="/services">{t('btn.order-agent')}</a>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-cosmos-dark px-8 py-4 text-lg rounded-full"
            >
              <a href="/cosmo-token">{t('btn.buy-cosmo')}</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;
