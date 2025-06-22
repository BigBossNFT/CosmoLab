
-- Сначала создаем администратора системы
INSERT INTO public.users (id, wallet_address, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000001', '0xb2f8234571eef9b222deca1307a03c6c2e376b73', now(), now())
ON CONFLICT (wallet_address) DO NOTHING;
