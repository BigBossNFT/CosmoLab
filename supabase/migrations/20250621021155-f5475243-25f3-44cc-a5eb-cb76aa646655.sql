
-- Удаляем старые проблемные политики RLS
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can view their own levels" ON public.agent_levels;
DROP POLICY IF EXISTS "Users can manage their own levels" ON public.agent_levels;
DROP POLICY IF EXISTS "Users can view their own positions" ON public.matrix_positions;
DROP POLICY IF EXISTS "Users can manage their own positions" ON public.matrix_positions;
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can create transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;

-- Создаем функцию для получения текущего пользователя без рекурсии
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID AS $$
BEGIN
  RETURN auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Создаем новые правильные политики RLS
CREATE POLICY "Users can view all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own data" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own data" ON public.users FOR UPDATE USING (true);

-- Политики для agent_levels
CREATE POLICY "Users can view their own levels" ON public.agent_levels FOR SELECT USING (true);
CREATE POLICY "Users can manage their own levels" ON public.agent_levels FOR ALL USING (true);

-- Политики для matrix_positions
CREATE POLICY "Users can view their own positions" ON public.matrix_positions FOR SELECT USING (true);
CREATE POLICY "Users can manage their own positions" ON public.matrix_positions FOR ALL USING (true);

-- Политики для transactions
CREATE POLICY "Users can view their own transactions" ON public.transactions FOR SELECT USING (true);
CREATE POLICY "Users can create transactions" ON public.transactions FOR INSERT WITH CHECK (true);

-- Политики для notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (true);
