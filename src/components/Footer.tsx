
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-cosmos-darker border-t border-neon-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full animate-neon-pulse"></div>
              <span className="font-orbitron font-bold text-xl neon-text">CosmoLab</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Workshop of Smart Agents powered by CosmoAI. Creating millions of AI agents to solve any task in business and life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="w-6 h-6">🐦</div>
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <span className="sr-only">Telegram</span>
                <div className="w-6 h-6">📱</div>
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <span className="sr-only">Discord</span>
                <div className="w-6 h-6">💬</div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron font-bold text-neon-blue mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-neon-blue transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/cases" className="text-gray-300 hover:text-neon-blue transition-colors">{t('nav.cases')}</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-neon-blue transition-colors">{t('nav.services')}</Link></li>
              <li><Link to="/cosmo-token" className="text-gray-300 hover:text-neon-blue transition-colors">{t('nav.cosmo-token')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-orbitron font-bold text-neon-blue mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@cosmolab.space" className="text-gray-300 hover:text-neon-blue transition-colors">
                  support@cosmolab.space
                </a>
              </li>
              <li><Link to="/contact" className="text-gray-300 hover:text-neon-blue transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-neon-blue transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-blue/20 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
