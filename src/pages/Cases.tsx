
import { Button } from '@/components/ui/button';

const cases = [
  {
    id: 1,
    title: "Адвокат-агент сэкономил $250,000",
    description: "Проанализировал все дела судьи и присяжных, разработал стратегию, дело закрыли за отсутствием состава преступления. ИИ агент адвокат обошелся клиенту всего $2,000.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
    result: "$250,000 экономии",
    time: "За 48 часов"
  },
  {
    id: 2,
    title: "Маркетинг-агент утроил продажи",
    description: "Утроил продажи за месяц и уменьшил маркетинговые бюджеты вдвое за счет автоматизации публикаций в социальных сетях, аналитики и постоянного улучшения контента.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    result: "300% рост продаж",
    time: "За 1 месяц"
  },
  {
    id: 3,
    title: "Логистический агент сэкономил миллион",
    description: "Оптимизировал маршруты доставки, сократил время в пути на 40% и уменьшил расходы на топливо. Автоматизировал планирование и диспетчерскую службу.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
    result: "$1,000,000 экономии",
    time: "За 3 месяца"
  },
  {
    id: 4,
    title: "Агент-Поддержки обработал 10,000 запросов",
    description: "Обработал 10,000 необработанных запросов клиентов за неделю, повысил удовлетворенность клиентов на 85% и сократил время ответа до 30 секунд.",
    image: "https://images.unsplash.com/photo-1553775282-20af80779df7?w=400&h=300&fit=crop",
    result: "10,000 запросов",
    time: "За 1 неделю"
  },
  {
    id: 5,
    title: "Медицинский агент помог диагностировать",
    description: "Помог диагностировать редкое заболевание за час, проанализировав симптомы, медицинскую историю и результаты анализов. Точность диагностики составила 98%.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop",
    result: "98% точность",
    time: "За 1 час"
  },
  {
    id: 6,
    title: "Путешественник-агент нашел лучший маршрут",
    description: "Нашел оптимальный маршрут путешествия по 15 городам за 1 минуту, учитывая бюджет, предпочтения, погоду и местные мероприятия. Сэкономил 60% от изначального бюджета.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
    result: "60% экономии бюджета",
    time: "За 1 минуту"
  },
  {
    id: 7,
    title: "Образовательный агент создал курс",
    description: "Создал персонализированный онлайн-курс, который обучил 5,000 человек за 2 месяца. Адаптировал материал под каждого ученика, повысив успеваемость на 70%.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    result: "5,000 учеников",
    time: "За 2 месяца"
  }
];

const Cases = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8">
            <span className="neon-text">Кейсы успеха</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Реальные результаты наших ИИ агентов, которые уже изменили жизни и бизнесы наших клиентов
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
                  Подробнее
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center glass-effect rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            <span className="neon-text">Готов стать следующим кейсом успеха?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Присоединяйся к тысячам довольных клиентов, которые уже используют наших ИИ агентов для решения своих задач
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white font-bold px-8 py-4 text-lg rounded-full"
            >
              <a href="/services">Заказать агента</a>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-cosmos-dark px-8 py-4 text-lg rounded-full"
            >
              <a href="/cosmo-token">Купить Cosmo</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;
