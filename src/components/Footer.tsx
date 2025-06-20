
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-cosmos-darker border-t border-neon-blue/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full animate-neon-pulse"></div>
              <span className="font-orbitron font-bold text-xl neon-text">CosmoLab</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Мастерская умных ИИ агентов, созданная главным искусственным интеллектом-мастером CosmoAI для решения любых задач будущего.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <span className="sr-only">X (Twitter)</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <span className="sr-only">Telegram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-.53.33-1.49.92-.47.2-.9.3-1.3.29-.43-.01-.94-.24-1.39-.44-.55-.24-1-.37-.96-.78.02-.2.25-.41.67-.62 2.88-1.27 4.8-2.11 5.77-2.53.92-.4 1.77-.38 2.17.15.26.34.29.8.08 1.26z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <span className="sr-only">Discord</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-neon-blue transition-colors">О нас</Link></li>
              <li><Link to="/cases" className="text-gray-400 hover:text-neon-blue transition-colors">Кейсы</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-neon-blue transition-colors">Услуги</Link></li>
              <li><Link to="/cosmo-token" className="text-gray-400 hover:text-neon-blue transition-colors">Токен Cosmo</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@cosmolab.space" className="text-gray-400 hover:text-neon-blue transition-colors">
                  support@cosmolab.space
                </a>
              </li>
              <li><Link to="/contact" className="text-gray-400 hover:text-neon-blue transition-colors">Связаться с нами</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-neon-blue transition-colors">Личный кабинет</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-blue/20 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © CosmoLab 2025. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
