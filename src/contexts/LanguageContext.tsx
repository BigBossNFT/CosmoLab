
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.cases': 'Cases',
    'nav.services': 'Services',
    'nav.cosmo-token': 'Cosmo Token',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.buy-cosmo': 'Buy Cosmo',
    
    // Home page
    'home.title': 'CosmoLab: Workshop of Smart Agents',
    'home.subtitle': 'Solve any tasks with Cosmo and agents',
    'home.our-agents': 'Our Agents',
    'home.order-agent': 'Order Agent',
    'home.ready-future': 'Ready for the future?',
    'home.join-revolution': 'Join the AI agent revolution right now. Buy Cosmo token and get access to millions of smart assistants.',
    
    // Agents
    'agent.lawyer': 'Lawyer',
    'agent.lawyer.desc': 'Analyzes cases, develops defense strategies',
    'agent.home-assistant': 'Home Assistant',
    'agent.home-assistant.desc': 'Manages smart home and personal tasks',
    'agent.marketer': 'Marketer',
    'agent.marketer.desc': 'Creates promotion strategies and content',
    'agent.medic': 'Medic',
    'agent.medic.desc': 'Helps with diagnosis and treatment',
    'agent.traveler': 'Traveler',
    'agent.traveler.desc': 'Plans perfect routes and trips',
    
    // About page
    'about.title': 'About CosmoLab',
    'about.workshop-future': 'Workshop of the Future',
    'about.description1': 'CosmoLab is a revolutionary project created by the main artificial intelligence master CosmoAI for automation and innovation in various spheres of human activity.',
    'about.description2': 'We develop millions of smart robot agents that work for you 24/7, solving complex tasks in business, everyday life, law, marketing, logistics, education, medicine and many other areas.',
    'about.ai-master': 'AI Master CosmoAI',
    'about.ai-master.desc': 'The main artificial intelligence that creates and trains all agents. CosmoAI constantly improves algorithms and creates new types of agents to solve unique tasks.',
    'about.mission': 'Mission',
    'about.mission.desc': 'We create an ecosystem of smart agents that frees people from routine tasks and allows them to focus on creativity and development.',
    'about.why-cosmolab': 'Why CosmoLab?',
    'about.speed': 'Speed',
    'about.speed.desc': 'Our agents work thousands of times faster than humans',
    'about.accuracy': 'Accuracy',
    'about.accuracy.desc': 'Minimal error probability thanks to AI',
    'about.savings': 'Savings',
    'about.savings.desc': 'Significant reduction in personnel costs',
    'about.tech-future': 'Future technologies are already here',
    'about.tech-desc': 'CosmoLab uses advanced machine learning technologies, neural networks and quantum algorithms to create the most efficient AI agents. Each agent is trained on millions of examples and constantly improves.',
    
    // Cases page
    'cases.title': 'Success Cases',
    'cases.subtitle': 'Real results of our AI agents that have already changed the lives and businesses of our clients',
    'cases.case1.title': 'Lawyer agent saved $250,000',
    'cases.case1.desc': 'Analyzed all judge and jury cases, developed strategy, case was closed for lack of crime. AI lawyer agent cost the client only $2,000.',
    'cases.case1.result': '$250,000 savings',
    'cases.case1.time': 'In 48 hours',
    'cases.case2.title': 'Marketing agent tripled sales',
    'cases.case2.desc': 'Tripled sales in a month and halved marketing budgets through automation of social media posts, analytics and constant content improvement.',
    'cases.case2.result': '300% sales growth',
    'cases.case2.time': 'In 1 month',
    'cases.case3.title': 'Logistics agent saved a million',
    'cases.case3.desc': 'Optimized delivery routes, reduced travel time by 40% and decreased fuel costs. Automated planning and dispatch service.',
    'cases.case3.result': '$1,000,000 savings',
    'cases.case3.time': 'In 3 months',
    'cases.case4.title': 'Support agent processed 10,000 requests',
    'cases.case4.desc': 'Processed 10,000 unprocessed customer requests in a week, increased customer satisfaction by 85% and reduced response time to 30 seconds.',
    'cases.case4.result': '10,000 requests',
    'cases.case4.time': 'In 1 week',
    'cases.case5.title': 'Medical agent helped diagnose',
    'cases.case5.desc': 'Helped diagnose a rare disease in an hour by analyzing symptoms, medical history and test results. Diagnostic accuracy was 98%.',
    'cases.case5.result': '98% accuracy',
    'cases.case5.time': 'In 1 hour',
    'cases.case6.title': 'Travel agent found the best route',
    'cases.case6.desc': 'Found optimal travel route through 15 cities in 1 minute, considering budget, preferences, weather and local events. Saved 60% of original budget.',
    'cases.case6.result': '60% budget savings',
    'cases.case6.time': 'In 1 minute',
    'cases.case7.title': 'Educational agent created a course',
    'cases.case7.desc': 'Created a personalized online course that taught 5,000 people in 2 months. Adapted material for each student, increasing success rate by 70%.',
    'cases.case7.result': '5,000 students',
    'cases.case7.time': 'In 2 months',
    'cases.ready-success': 'Ready to become the next success case?',
    'cases.join-clients': 'Join thousands of satisfied clients who already use our AI agents to solve their tasks',
    'cases.more-details': 'More Details',
    
    // Common buttons
    'btn.order-agent': 'Order Agent',
    'btn.buy-cosmo': 'Buy Cosmo',
    'btn.learn-more': 'Learn More',
    'btn.send-message': 'Send Message',
    
    // Footer
    'footer.copyright': '© CosmoLab 2025. All rights reserved.'
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.cases': 'Кейсы',
    'nav.services': 'Услуги',
    'nav.cosmo-token': 'Токен Cosmo',
    'nav.blog': 'Блог',
    'nav.contact': 'Контакты',
    'nav.buy-cosmo': 'Купить Cosmo',
    
    // Home page
    'home.title': 'CosmoLab: Мастерская Умных Агентов',
    'home.subtitle': 'Решай любые задачи с Cosmo и агентами',
    'home.our-agents': 'Наши Агенты',
    'home.order-agent': 'Заказать агента',
    'home.ready-future': 'Готов к будущему?',
    'home.join-revolution': 'Присоединяйся к революции ИИ агентов прямо сейчас. Купи токен Cosmo и получи доступ к миллионам умных помощников.',
    
    // Agents
    'agent.lawyer': 'Юрист',
    'agent.lawyer.desc': 'Анализирует дела, разрабатывает стратегии защиты',
    'agent.home-assistant': 'Домашний помощник',
    'agent.home-assistant.desc': 'Управляет умным домом и личными задачами',
    'agent.marketer': 'Маркетолог',
    'agent.marketer.desc': 'Создает стратегии продвижения и контент',
    'agent.medic': 'Медик',
    'agent.medic.desc': 'Помогает в диагностике и лечении',
    'agent.traveler': 'Путешественник',
    'agent.traveler.desc': 'Планирует идеальные маршруты и поездки',
    
    // About page
    'about.title': 'О CosmoLab',
    'about.workshop-future': 'Мастерская будущего',
    'about.description1': 'CosmoLab — это революционный проект, созданный главным искусственным интеллектом-мастером CosmoAI для автоматизации и инноваций в различных сферах человеческой деятельности.',
    'about.description2': 'Мы разрабатываем миллионы умных роботов-агентов, которые работают на тебя 24/7, решая сложные задачи в бизнесе, повседневной жизни, праве, маркетинге, логистике, образовании, медицине и многих других областях.',
    'about.ai-master': 'ИИ-Мастер CosmoAI',
    'about.ai-master.desc': 'Главный искусственный интеллект, который создает и обучает всех агентов. CosmoAI постоянно совершенствует алгоритмы и создает новые типы агентов для решения уникальных задач.',
    'about.mission': 'Миссия',
    'about.mission.desc': 'Мы создаем экосистему умных агентов, которая освобождает людей от рутинных задач и позволяет сосредоточиться на творчестве и развитии.',
    'about.why-cosmolab': 'Почему именно CosmoLab?',
    'about.speed': 'Скорость',
    'about.speed.desc': 'Наши агенты работают в тысячи раз быстрее человека',
    'about.accuracy': 'Точность',
    'about.accuracy.desc': 'Минимальная вероятность ошибок благодаря ИИ',
    'about.savings': 'Экономия',
    'about.savings.desc': 'Значительное сокращение затрат на персонал',
    'about.tech-future': 'Технологии будущего уже здесь',
    'about.tech-desc': 'CosmoLab использует передовые технологии машинного обучения, нейронные сети и квантовые алгоритмы для создания самых эффективных ИИ агентов. Каждый агент обучается на миллионах примеров и постоянно совершенствуется.',
    
    // Cases page
    'cases.title': 'Кейсы успеха',
    'cases.subtitle': 'Реальные результаты наших ИИ агентов, которые уже изменили жизни и бизнесы наших клиентов',
    'cases.case1.title': 'Адвокат-агент сэкономил $250,000',
    'cases.case1.desc': 'Проанализировал все дела судьи и присяжных, разработал стратегию, дело закрыли за отсутствием состава преступления. ИИ агент адвокат обошелся клиенту всего $2,000.',
    'cases.case1.result': '$250,000 экономии',
    'cases.case1.time': 'За 48 часов',
    'cases.case2.title': 'Маркетинг-агент утроил продажи',
    'cases.case2.desc': 'Утроил продажи за месяц и уменьшил маркетинговые бюджеты вдвое за счет автоматизации публикаций в социальных сетях, аналитики и постоянного улучшения контента.',
    'cases.case2.result': '300% рост продаж',
    'cases.case2.time': 'За 1 месяц',
    'cases.case3.title': 'Логистический агент сэкономил миллион',
    'cases.case3.desc': 'Оптимизировал маршруты доставки, сократил время в пути на 40% и уменьшил расходы на топливо. Автоматизировал планирование и диспетчерскую службу.',
    'cases.case3.result': '$1,000,000 экономии',
    'cases.case3.time': 'За 3 месяца',
    'cases.case4.title': 'Агент-Поддержки обработал 10,000 запросов',
    'cases.case4.desc': 'Обработал 10,000 необработанных запросов клиентов за неделю, повысил удовлетворенность клиентов на 85% и сократил время ответа до 30 секунд.',
    'cases.case4.result': '10,000 запросов',
    'cases.case4.time': 'За 1 неделю',
    'cases.case5.title': 'Медицинский агент помог диагностировать',
    'cases.case5.desc': 'Помог диагностировать редкое заболевание за час, проанализировав симптомы, медицинскую историю и результаты анализов. Точность диагностики составила 98%.',
    'cases.case5.result': '98% точность',
    'cases.case5.time': 'За 1 час',
    'cases.case6.title': 'Путешественник-агент нашел лучший маршрут',
    'cases.case6.desc': 'Нашел оптимальный маршрут путешествия по 15 городам за 1 минуту, учитывая бюджет, предпочтения, погоду и местные мероприятия. Сэкономил 60% от изначального бюджета.',
    'cases.case6.result': '60% экономии бюджета',
    'cases.case6.time': 'За 1 минуту',
    'cases.case7.title': 'Образовательный агент создал курс',
    'cases.case7.desc': 'Создал персонализированный онлайн-курс, который обучил 5,000 человек за 2 месяца. Адаптировал материал под каждого ученика, повысив успеваемость на 70%.',
    'cases.case7.result': '5,000 учеников',
    'cases.case7.time': 'За 2 месяца',
    'cases.ready-success': 'Готов стать следующим кейсом успеха?',
    'cases.join-clients': 'Присоединяйся к тысячам довольных клиентов, которые уже используют наших ИИ агентов для решения своих задач',
    'cases.more-details': 'Подробнее',
    
    // Common buttons
    'btn.order-agent': 'Заказать агента',
    'btn.buy-cosmo': 'Купить Cosmo',
    'btn.learn-more': 'Узнать больше',
    'btn.send-message': 'Отправить сообщение',
    
    // Footer
    'footer.copyright': '© CosmoLab 2025. Все права защищены.'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'ru'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
