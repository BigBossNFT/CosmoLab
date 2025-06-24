
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category: string;
  read_time: number;
  published: boolean;
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  author_name: string;
  created_at: string;
  updated_at: string;
}

export const useBlogArticles = (published: boolean = true) => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, [published]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('blog_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (published) {
        query = query.eq('published', true);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setArticles(data || []);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err instanceof Error ? err.message : 'Ошибка загрузки статей');
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedArticle = () => {
    return articles.find(article => article.featured) || articles[0];
  };

  const getArticlesByCategory = (category: string) => {
    return articles.filter(article => article.category === category);
  };

  const getArticleBySlug = (slug: string) => {
    return articles.find(article => article.slug === slug);
  };

  return {
    articles,
    loading,
    error,
    getFeaturedArticle,
    getArticlesByCategory,
    getArticleBySlug,
    refetch: fetchArticles
  };
};
