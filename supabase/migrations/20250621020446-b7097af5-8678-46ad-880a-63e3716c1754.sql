
-- Создание таблицы пользователей с Web3 адресами
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  referrer_id UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Создание таблицы уровней агентов
CREATE TABLE public.agent_levels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  level_number INTEGER NOT NULL CHECK (level_number >= 1 AND level_number <= 10),
  is_unlocked BOOLEAN NOT NULL DEFAULT false,
  unlock_price DECIMAL(10,8) NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, level_number)
);

-- Создание таблицы позиций в матрице
CREATE TABLE public.matrix_positions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  level_number INTEGER NOT NULL,
  position_number INTEGER NOT NULL CHECK (position_number >= 1 AND position_number <= 7),
  occupied_by UUID REFERENCES public.users(id),
  occupied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, level_number, position_number)
);

-- Создание таблицы транзакций
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  transaction_type TEXT NOT NULL, -- 'purchase', 'earning', 'reinvest', 'reserve'
  amount DECIMAL(10,8) NOT NULL,
  level_number INTEGER NOT NULL,
  from_user_id UUID REFERENCES public.users(id),
  to_user_id UUID REFERENCES public.users(id),
  tx_hash TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Создание таблицы уведомлений
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT NOT NULL, -- 'earning', 'purchase', 'level_unlock', 'reserve'
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Включение RLS для всех таблиц
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrix_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Политики RLS для users
CREATE POLICY "Users can view their own data" ON public.users FOR SELECT USING (id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));
CREATE POLICY "Users can insert their own data" ON public.users FOR INSERT WITH CHECK (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');
CREATE POLICY "Users can update their own data" ON public.users FOR UPDATE USING (id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Политики RLS для agent_levels
CREATE POLICY "Users can view their own levels" ON public.agent_levels FOR SELECT USING (user_id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));
CREATE POLICY "Users can manage their own levels" ON public.agent_levels FOR ALL USING (user_id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Политики RLS для matrix_positions
CREATE POLICY "Users can view their own positions" ON public.matrix_positions FOR SELECT USING (user_id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));
CREATE POLICY "Users can manage their own positions" ON public.matrix_positions FOR ALL USING (user_id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Политики RLS для transactions
CREATE POLICY "Users can view their own transactions" ON public.transactions FOR SELECT USING (user_id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address') OR to_user_id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));
CREATE POLICY "Users can create transactions" ON public.transactions FOR INSERT WITH CHECK (user_id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Политики RLS для notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (user_id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (user_id = (SELECT id FROM public.users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'));

-- Функция для инициализации уровней пользователя
CREATE OR REPLACE FUNCTION public.initialize_user_levels(user_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  level_prices DECIMAL[] := ARRAY[0.01, 0.02, 0.04, 0.08, 0.16, 0.32, 0.64, 1.28, 2.56, 5.12];
  i INTEGER;
BEGIN
  FOR i IN 1..10 LOOP
    INSERT INTO public.agent_levels (user_id, level_number, unlock_price)
    VALUES (user_uuid, i, level_prices[i])
    ON CONFLICT (user_id, level_number) DO NOTHING;
    
    -- Создаем 7 позиций для каждого уровня
    FOR j IN 1..7 LOOP
      INSERT INTO public.matrix_positions (user_id, level_number, position_number)
      VALUES (user_uuid, i, j)
      ON CONFLICT (user_id, level_number, position_number) DO NOTHING;
    END LOOP;
  END LOOP;
END;
$$;

-- Триггер для автоматической инициализации уровней при создании пользователя
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM public.initialize_user_levels(NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_user_created
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
