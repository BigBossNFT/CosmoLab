
-- Создаем таблицу для хранения статей блога
CREATE TABLE public.blog_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  read_time INTEGER NOT NULL DEFAULT 5,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[],
  author_name TEXT DEFAULT 'CosmoLab Team',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Создаем таблицу для администраторов
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Включаем RLS для статей
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

-- Создаем политику для чтения опубликованных статей (доступно всем)
CREATE POLICY "Anyone can view published articles" 
  ON public.blog_articles 
  FOR SELECT 
  USING (published = true);

-- Включаем RLS для админов
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Создаем функцию для проверки прав администратора
CREATE OR REPLACE FUNCTION public.is_admin(wallet_addr TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE wallet_address = wallet_addr
  );
$$;

-- Политики для админов: только админы могут управлять статьями
CREATE POLICY "Admins can manage all articles" 
  ON public.blog_articles 
  FOR ALL 
  USING (public.is_admin(current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Политика для просмотра админов
CREATE POLICY "Admins can view admin users" 
  ON public.admin_users 
  FOR SELECT 
  USING (public.is_admin(current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Добавляем первого администратора (корневого пользователя)
INSERT INTO public.admin_users (wallet_address, role)
VALUES ('0xb2f8234571eef9b222deca1307a03c6c2e376b73', 'super_admin')
ON CONFLICT (wallet_address) DO NOTHING;

-- Создаем индексы для производительности
CREATE INDEX idx_blog_articles_published ON public.blog_articles(published);
CREATE INDEX idx_blog_articles_featured ON public.blog_articles(featured);
CREATE INDEX idx_blog_articles_category ON public.blog_articles(category);
CREATE INDEX idx_blog_articles_slug ON public.blog_articles(slug);
CREATE INDEX idx_blog_articles_created_at ON public.blog_articles(created_at DESC);

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггер для автоматического обновления updated_at
CREATE TRIGGER update_blog_articles_updated_at 
  BEFORE UPDATE ON public.blog_articles 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Создаем функцию для генерации slug из заголовка
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN lower(
    trim(
      regexp_replace(
        unaccent(title), 
        '[^a-zA-Z0-9\s-]', 
        '', 
        'g'
      )
    )
  );
END;
$$;
