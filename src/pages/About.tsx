
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8">
            <span className="neon-text">{t('about.title')}</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto"></div>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <div className="glass-effect rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-neon-blue">
              {t('about.workshop-future')}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              {t('about.description1')}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t('about.description2')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-effect rounded-3xl p-8">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-neon-green">
                {t('about.ai-master')}
              </h3>
              <p className="text-gray-300">
                {t('about.ai-master.desc')}
              </p>
            </div>

            <div className="glass-effect rounded-3xl p-8">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-neon-purple">
                {t('about.mission')}
              </h3>
              <p className="text-gray-300">
                {t('about.mission.desc')}
              </p>
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-neon-blue">
              {t('about.why-cosmolab')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2 text-neon-green">{t('about.speed')}</h3>
                <p className="text-gray-300">{t('about.speed.desc')}</p>
              </div>
              <div>
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2 text-neon-purple">{t('about.accuracy')}</h3>
                <p className="text-gray-300">{t('about.accuracy.desc')}</p>
              </div>
              <div>
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-2 text-neon-blue">{t('about.savings')}</h3>
                <p className="text-gray-300">{t('about.savings.desc')}</p>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-8 md:p-12 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-center neon-text">
              {t('about.tech-future')}
            </h2>
            <p className="text-lg text-gray-300 text-center leading-relaxed">
              {t('about.tech-desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
