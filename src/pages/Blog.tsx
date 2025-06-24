
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBlogArticles } from '@/hooks/useBlogArticles';

const Blog = () => {
  const { articles, loading, error, getFeaturedArticle } = useBlogArticles();
  const [currentSlide, setCurrentSlide] = useState(0);
  const articlesPerSlide = 3;
  
  const featuredArticle = getFeaturedArticle();
  const nonFeaturedArticles = articles.filter(article => !article.featured || article.id !== featuredArticle?.id);
  const totalSlides = Math.ceil(nonFeaturedArticles.length / articlesPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentArticles = () => {
    const start = currentSlide * articlesPerSlide;
    return nonFeaturedArticles.slice(start, start + articlesPerSlide);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Загрузка статей...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">Ошибка загрузки: {error}</p>
          <Button onClick={() => window.location.reload()}>
            Перезагрузить
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8">
            <span className="neon-text">Блог CosmoLab</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Новости, исследования и инсайты о мире искусственного интеллекта и токене Cosmo
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-8"></div>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <div className="glass-effect rounded-3xl overflow-hidden lg:flex">
              <div className="lg:w-1/2">
                <img 
                  src={featuredArticle.image_url || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"} 
                  alt={featuredArticle.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-neon-blue/20 text-neon-blue px-3 py-1 rounded-full text-sm">
                    Рекомендуемое
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(featuredArticle.created_at).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <h2 className="text-3xl font-orbitron font-bold mb-4 text-neon-blue">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{featuredArticle.category}</span>
                    <span>•</span>
                    <span>{featuredArticle.read_time} мин</span>
                  </div>
                  <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white">
                    Читать далее
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Slider */}
        {nonFeaturedArticles.length > 0 && (
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-orbitron font-bold text-neon-purple">
                Последние статьи
              </h2>
              {totalSlides > 1 && (
                <div className="flex space-x-2">
                  <button 
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-neon-blue/20 hover:bg-neon-blue/40 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-neon-blue" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-neon-blue/20 hover:bg-neon-blue/40 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-neon-blue" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {getCurrentArticles().map((article, index) => (
                <div 
                  key={article.id}
                  className="glass-effect rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 group"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=400&h=300&fit=crop`} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmos-dark/80 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-neon-purple/20 text-neon-purple px-2 py-1 rounded-full text-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                      <span>{new Date(article.created_at).toLocaleDateString('ru-RU')}</span>
                      <span>•</span>
                      <span>{article.read_time} мин</span>
                    </div>
                    <h3 className="text-xl font-orbitron font-bold mb-3 text-white line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-green text-white"
                    >
                      Читать статью
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-neon-blue' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center glass-effect rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            <span className="neon-text">Не пропускай новости!</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Подписывайся на наши соцсети, чтобы быть в курсе всех новостей о развитии ИИ агентов и токене Cosmo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-green text-white font-bold px-8 py-4 text-lg rounded-full"
            >
              <a href="#" target="_blank" rel="noopener noreferrer">Telegram канал</a>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-cosmos-dark px-8 py-4 text-lg rounded-full"
            >
              <a href="#" target="_blank" rel="noopener noreferrer">Discord сервер</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
