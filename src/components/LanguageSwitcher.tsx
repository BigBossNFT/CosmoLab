
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-400" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
        className="text-gray-300 hover:text-neon-blue transition-colors"
      >
        {language === 'en' ? 'RU' : 'EN'}
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
