
-- Удаляем все существующие политики
DROP POLICY IF EXISTS "Users can view their own agent levels" ON public.agent_levels;
DROP POLICY IF EXISTS "Users can update their own agent levels" ON public.agent_levels;
DROP POLICY IF EXISTS "Users can manage their own levels" ON public.agent_levels;
DROP POLICY IF EXISTS "Users can view their own levels" ON public.agent_levels;

DROP POLICY IF EXISTS "Users can view their own matrix positions" ON public.matrix_positions;
DROP POLICY IF EXISTS "Users can update their own matrix positions" ON public.matrix_positions;
DROP POLICY IF EXISTS "Users can manage their own positions" ON public.matrix_positions;
DROP POLICY IF EXISTS "Users can view their own positions" ON public.matrix_positions;

DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can create their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can create transactions" ON public.transactions;

DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;

DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can view all users" ON public.users;

-- Создаем простые политики для разработки
CREATE POLICY "Allow all operations on agent_levels" ON public.agent_levels FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on matrix_positions" ON public.matrix_positions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on transactions" ON public.transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on users" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on notifications" ON public.notifications FOR ALL USING (true) WITH CHECK (true);

-- Создаем таблицу для балансов пользователей
CREATE TABLE IF NOT EXISTS public.user_balances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  bnb_balance DECIMAL(18,8) DEFAULT 0,
  cosmo_balance DECIMAL(18,8) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Включаем RLS для балансов
ALTER TABLE public.user_balances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on user_balances" ON public.user_balances FOR ALL USING (true) WITH CHECK (true);
