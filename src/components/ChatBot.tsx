
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, MessageSquare, Send } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Привет! Я CosmoAI, твой виртуальный помощник. Спроси меня о наших ИИ агентах, токене Cosmo или любых услугах CosmoLab!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickQuestions = [
    "Как купить токен Cosmo?",
    "Сколько стоит ИИ агент?",
    "Какие агенты доступны?",
    "Как работает CosmoLab?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cosmo') && lowerMessage.includes('купить')) {
      return "Купить токен Cosmo можно на PancakeSwap! Переходи на страницу 'Токен Cosmo' и используй прямую ссылку. Цена сейчас стартовая — не упусти шанс! 🚀";
    }
    
    if (lowerMessage.includes('агент') && lowerMessage.includes('стоимость')) {
      return "Все наши ИИ агенты стоят единую цену — $2,000 в токенах Cosmo по текущему курсу. Это включает работу агента до полного выполнения задачи! 💰";
    }
    
    if (lowerMessage.includes('агент') && (lowerMessage.includes('какие') || lowerMessage.includes('доступны'))) {
      return "У нас есть агенты для всех сфер: Юристы, Маркетологи, Медики, Логисты, Домашние помощники, Коучи и многие другие! Всего 12+ типов агентов. Проверь страницу 'Услуги'! 🤖";
    }
    
    if (lowerMessage.includes('cosmolab') || lowerMessage.includes('как работает')) {
      return "CosmoLab — это мастерская умных ИИ агентов, созданная главным ИИ-мастером CosmoAI. Мы создаём миллионы агентов для решения любых задач в бизнесе и жизни! 🌟";
    }
    
    if (lowerMessage.includes('цена') || lowerMessage.includes('курс')) {
      return "Текущая цена Cosmo составляет около $0.000789. Это стартовая цена с огромным потенциалом роста! Чем больше людей покупает, тем выше ценность токена. 📈";
    }
    
    return "Отличный вопрос! Я CosmoAI и готов помочь с любыми вопросами о наших ИИ агентах, токене Cosmo или услугах CosmoLab. Можешь также использовать быстрые вопросы ниже! 😊";
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white shadow-2xl transition-all duration-300 animate-neon-pulse z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageSquare className="w-8 h-8" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] glass-effect border-neon-blue/30 flex flex-col z-50 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neon-blue/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center animate-neon-pulse">
                🤖
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-neon-blue">CosmoAI</h3>
                <p className="text-xs text-gray-400">Онлайн помощник</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-neon-blue/20 text-white'
                      : 'bg-neon-purple/20 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="p-2 border-t border-neon-blue/20">
            <div className="flex flex-wrap gap-1 mb-2">
              {quickQuestions.map((question) => (
                <Button
                  key={question}
                  onClick={() => handleQuickQuestion(question)}
                  size="sm"
                  variant="outline"
                  className="text-xs border-neon-blue/30 text-neon-blue hover:bg-neon-blue/20"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-neon-blue/20">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Спроси CosmoAI..."
                className="bg-cosmos-light border-neon-blue/30 text-white placeholder-gray-400 focus:border-neon-blue"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-neon-blue hover:bg-neon-purple text-white px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
