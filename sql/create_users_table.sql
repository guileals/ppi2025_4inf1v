-- -- Cria tabela de perfis de usuários
-- create table if not exists public.users (
--   id uuid primary key references auth.users(id) on delete cascade,
--   email text,
--   username text,
--   admin boolean default false,
--   metadata jsonb,
--   created_at timestamptz default now()
-- );

-- -- Ativa RLS e cria políticas básicas (autenticado só vê e altera seu próprio registro)
-- alter table public.users enable row level security;

-- create policy "authenticated_select_own" on public.users
--   for select using (auth.uid() = id);

-- create policy "authenticated_insert_own" on public.users
--   for insert with check (auth.uid() = id);

-- create policy "authenticated_update_own" on public.users
--   for update using (auth.uid() = id) with check (auth.uid() = id);

-- -- Função e trigger para sincronizar autores do schema auth.users para public.users
-- -- Caso prefira controlar a criação apenas pelo frontend, o upsert do client também funciona.
-- create or replace function public.handle_new_auth_user()
-- returns trigger
-- language plpgsql
-- as $$
-- begin
--   -- tenta inserir um perfil quando um novo usuário é criado no auth.users
--   -- pega email e raw_user_meta se existir
--   insert into public.users (id, email, username, admin, metadata, created_at)
--   values (
--     new.id,
--     new.email,
--     COALESCE(new.raw_user_meta->>'username', NULL),
--     COALESCE((new.raw_user_meta->>'admin')::boolean, false),
--     new.raw_user_meta,
--     now()
--   )
--   on conflict (id) do nothing;

--   return new;
-- end;
-- $$;

-- -- Ativar trigger em auth.users
-- create trigger on_auth_user_created
-- after insert on auth.users
-- for each row execute function public.handle_new_auth_user();
