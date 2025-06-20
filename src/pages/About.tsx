
const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8">
            <span className="neon-text">О CosmoLab</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto"></div>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <div className="glass-effect rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-neon-blue">
              Мастерская будущего
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              CosmoLab — это революционный проект, созданный главным искусственным интеллектом-мастером <strong className="text-neon-purple">CosmoAI</strong> для автоматизации и инноваций в различных сферах человеческой деятельности.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Мы разрабатываем миллионы умных роботов-агентов, которые работают на тебя 24/7, решая сложные задачи в бизнесе, повседневной жизни, праве, маркетинге, логистике, образовании, медицине и многих других областях.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-effect rounded-3xl p-8">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-neon-green">
                ИИ-Мастер CosmoAI
              </h3>
              <p className="text-gray-300">
                Главный искусственный интеллект, который создает и обучает всех агентов. CosmoAI постоянно совершенствует алгоритмы и создает новые типы агентов для решения уникальных задач.
              </p>
            </div>

            <div className="glass-effect rounded-3xl p-8">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-neon-purple">
                Миссия
              </h3>
              <p className="text-gray-300">
                Мы создаем экосистему умных агентов, которая освобождает людей от рутинных задач и позволяет сосредоточиться на творчестве и развитии.
              </p>
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-neon-blue">
              Почему именно CosmoLab?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2 text-neon-green">Скорость</h3>
                <p className="text-gray-300">Наши агенты работают в тысячи раз быстрее человека</p>
              </div>
              <div>
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2 text-neon-purple">Точность</h3>
                <p className="text-gray-300">Минимальная вероятность ошибок благодаря ИИ</p>
              </div>
              <div>
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-2 text-neon-blue">Экономия</h3>
                <p className="text-gray-300">Значительное сокращение затрат на персонал</p>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-8 md:p-12 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-center neon-text">
              Технологии будущего уже здесь
            </h2>
            <p className="text-lg text-gray-300 text-center leading-relaxed">
              CosmoLab использует передовые технологии машинного обучения, нейронные сети и квантовые алгоритмы для создания самых эффективных ИИ агентов. Каждый агент обучается на миллионах примеров и постоянно совершенствуется.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
