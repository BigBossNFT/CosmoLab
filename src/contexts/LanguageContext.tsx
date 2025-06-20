import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru' | 'es' | 'zh' | 'hi' | 'ar' | 'pt' | 'fr' | 'de' | 'ja';

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
    'about.tech-desc': 'CosmoLab uses advanced machine learning technologies, neural networks and quantum algorithms to create the most efficient AI agents.',
    
    // Cases page
    'cases.title': 'Success Cases',
    'cases.subtitle': 'Real results of our AI agents',
    'cases.case1.title': 'Lawyer agent saved $250,000',
    'cases.case1.desc': 'Analyzed all judge and jury cases, developed strategy, case was closed for lack of crime. AI lawyer agent cost the client only $2,000.',
    'cases.case1.result': '$250,000 savings',
    'cases.case1.time': 'In 48 hours',
    'cases.case2.title': 'Marketing agent tripled sales',
    'cases.case2.desc': 'Tripled sales in a month and halved marketing budgets through automation of social media posts.',
    'cases.case2.result': '300% sales growth',
    'cases.case2.time': 'In 1 month',
    'cases.case3.title': 'Logistics agent saved a million',
    'cases.case3.desc': 'Optimized delivery routes, reduced travel time by 40% and decreased fuel costs.',
    'cases.case3.result': '$1,000,000 savings',
    'cases.case3.time': 'In 3 months',
    'cases.case4.title': 'Support agent processed 10,000 requests',
    'cases.case4.desc': 'Processed 10,000 unprocessed customer requests in a week.',
    'cases.case4.result': '10,000 requests',
    'cases.case4.time': 'In 1 week',
    'cases.case5.title': 'Medical agent helped diagnose',
    'cases.case5.desc': 'Helped diagnose a rare disease in an hour by analyzing symptoms.',
    'cases.case5.result': '98% accuracy',
    'cases.case5.time': 'In 1 hour',
    'cases.case6.title': 'Travel agent found the best route',
    'cases.case6.desc': 'Found optimal travel route through 15 cities in 1 minute.',
    'cases.case6.result': '60% budget savings',
    'cases.case6.time': 'In 1 minute',
    'cases.case7.title': 'Educational agent created a course',
    'cases.case7.desc': 'Created a personalized online course that taught 5,000 people.',
    'cases.case7.result': '5,000 students',
    'cases.case7.time': 'In 2 months',
    'cases.ready-success': 'Ready to become the next success case?',
    'cases.join-clients': 'Join thousands of satisfied clients',
    'cases.more-details': 'More Details',
    
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
    'home.join-revolution': 'Присоединяйся к революции ИИ агентов прямо сейчас.',
    
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
    'about.description1': 'CosmoLab — это революционный проект, созданный главным искусственным интеллектом-мастером CosmoAI.',
    'about.description2': 'Мы разрабатываем миллионы умных роботов-агентов, которые работают на тебя 24/7.',
    'about.ai-master': 'ИИ-Мастер CosmoAI',
    'about.ai-master.desc': 'Главный искусственный интеллект, который создает и обучает всех агентов.',
    'about.mission': 'Миссия',
    'about.mission.desc': 'Мы создаем экосистему умных агентов.',
    'about.why-cosmolab': 'Почему именно CosmoLab?',
    'about.speed': 'Скорость',
    'about.speed.desc': 'Наши агенты работают в тысячи раз быстрее человека',
    'about.accuracy': 'Точность',
    'about.accuracy.desc': 'Минимальная вероятность ошибок благодаря ИИ',
    'about.savings': 'Экономия',
    'about.savings.desc': 'Значительное сокращение затрат на персонал',
    'about.tech-future': 'Технологии будущего уже здесь',
    'about.tech-desc': 'CosmoLab использует передовые технологии машинного обучения.',
    
    // Cases page
    'cases.title': 'Кейсы успеха',
    'cases.subtitle': 'Реальные результаты наших ИИ агентов',
    'cases.case1.title': 'Адвокат-агент сэкономил $250,000',
    'cases.case1.desc': 'Проанализировал все дела судьи и присяжных, разработал стратегию.',
    'cases.case1.result': '$250,000 экономии',
    'cases.case1.time': 'За 48 часов',
    'cases.case2.title': 'Маркетинг-агент утроил продажи',
    'cases.case2.desc': 'Утроил продажи за месяц и уменьшил маркетинговые бюджеты вдвое.',
    'cases.case2.result': '300% рост продаж',
    'cases.case2.time': 'За 1 месяц',
    'cases.case3.title': 'Логистический агент сэкономил миллион',
    'cases.case3.desc': 'Оптимизировал маршруты доставки, сократил время в пути на 40%.',
    'cases.case3.result': '$1,000,000 экономии',
    'cases.case3.time': 'За 3 месяца',
    'cases.case4.title': 'Агент-Поддержки обработал 10,000 запросов',
    'cases.case4.desc': 'Обработал 10,000 необработанных запросов клиентов за неделю.',
    'cases.case4.result': '10,000 запросов',
    'cases.case4.time': 'За 1 неделю',
    'cases.case5.title': 'Медицинский агент помог диагностировать',
    'cases.case5.desc': 'Помог диагностировать редкую болезнь за час.',
    'cases.case5.result': '98% точность',
    'cases.case5.time': 'За 1 час',
    'cases.case6.title': 'Путешественник-агент нашел лучший маршрут',
    'cases.case6.desc': 'Нашел оптимальный маршрут путешествия через 15 городов за 1 минуту.',
    'cases.case6.result': '60% экономии бюджета',
    'cases.case6.time': 'За 1 минуту',
    'cases.case7.title': 'Образовательный агент создал курс',
    'cases.case7.desc': 'Создал персонализированный онлайн-курс, который обучил 5,000 человек.',
    'cases.case7.result': '5,000 студентов',
    'cases.case7.time': 'За 2 месяца',
    'cases.ready-success': 'Готов стать следующим кейсом успеха?',
    'cases.join-clients': 'Присоединяйся к тысячам довольных клиентов',
    'cases.more-details': 'Подробнее',
    
    // Footer
    'footer.copyright': '© CosmoLab 2025. Все права защищены.'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.cases': 'Casos',
    'nav.services': 'Servicios',
    'nav.cosmo-token': 'Token Cosmo',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.buy-cosmo': 'Comprar Cosmo',
    'home.title': 'CosmoLab: Taller de Agentes Inteligentes',
    'home.subtitle': 'Resuelve cualquier tarea con Cosmo y agentes',
    'footer.copyright': '© CosmoLab 2025. Todos los derechos reservados.'
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.cases': '案例',
    'nav.services': '服务',
    'nav.cosmo-token': 'Cosmo代币',
    'nav.blog': '博客',
    'nav.contact': '联系我们',
    'nav.buy-cosmo': '购买Cosmo',
    'home.title': 'CosmoLab：智能代理工作室',
    'home.subtitle': '用Cosmo和代理解决任何任务',
    'footer.copyright': '© CosmoLab 2025. 保留所有权利。'
  },
  hi: {
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.cases': 'केसेस',
    'nav.services': 'सेवाएं',
    'nav.cosmo-token': 'कॉस्मो टोकन',
    'nav.blog': 'ब्लॉग',
    'nav.contact': 'संपर्क',
    'nav.buy-cosmo': 'कॉस्मो खरीदें',
    'home.title': 'CosmoLab: स्मार्ट एजेंट्स की वर्कशॉप',
    'home.subtitle': 'कॉस्मो और एजेंट्स के साथ कोई भी काम हल करें',
    'footer.copyright': '© CosmoLab 2025. सभी अधिकार सुरक्षित।'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'حولنا',
    'nav.cases': 'الحالات',
    'nav.services': 'الخدمات',
    'nav.cosmo-token': 'رمز كوزمو',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    'nav.buy-cosmo': 'شراء كوزمو',
    'home.title': 'CosmoLab: ورشة الوكلاء الأذكياء',
    'home.subtitle': 'حل أي مهام مع كوزمو والوكلاء',
    'footer.copyright': '© CosmoLab 2025. جميع الحقوق محفوظة.'
  },
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.cases': 'Casos',
    'nav.services': 'Serviços',
    'nav.cosmo-token': 'Token Cosmo',
    'nav.blog': 'Blog',
    'nav.contact': 'Contato',
    'nav.buy-cosmo': 'Comprar Cosmo',
    'home.title': 'CosmoLab: Oficina de Agentes Inteligentes',
    'home.subtitle': 'Resolva qualquer tarefa com Cosmo e agentes',
    'footer.copyright': '© CosmoLab 2025. Todos os direitos reservados.'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.cases': 'Cas',
    'nav.services': 'Services',
    'nav.cosmo-token': 'Token Cosmo',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.buy-cosmo': 'Acheter Cosmo',
    'home.title': 'CosmoLab: Atelier d\'Agents Intelligents',
    'home.subtitle': 'Résolvez toutes les tâches avec Cosmo et les agents',
    'footer.copyright': '© CosmoLab 2025. Tous droits réservés.'
  },
  de: {
    'nav.home': 'Startseite',
    'nav.about': 'Über uns',
    'nav.cases': 'Fälle',
    'nav.services': 'Dienstleistungen',
    'nav.cosmo-token': 'Cosmo Token',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    'nav.buy-cosmo': 'Cosmo kaufen',
    'home.title': 'CosmoLab: Werkstatt für intelligente Agenten',
    'home.subtitle': 'Löse alle Aufgaben mit Cosmo und Agenten',
    'footer.copyright': '© CosmoLab 2025. Alle Rechte vorbehalten.'
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.about': '私たちについて',
    'nav.cases': 'ケース',
    'nav.services': 'サービス',
    'nav.cosmo-token': 'コスモトークン',
    'nav.blog': 'ブログ',
    'nav.contact': 'お問い合わせ',
    'nav.buy-cosmo': 'コスモを購入',
    'home.title': 'CosmoLab: スマートエージェントのワークショップ',
    'home.subtitle': 'コスモとエージェントであらゆるタスクを解決',
    'footer.copyright': '© CosmoLab 2025. 全著作権所有。'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
