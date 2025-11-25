-- Exclua a tabela users se existir
drop table if exists public.users cascade;

-- Crie a tabela profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  username text,
  admin boolean default false,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Ativa RLS e cria políticas básicas
alter table public.profiles enable row level security;

create policy "authenticated_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "authenticated_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "authenticated_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Função e trigger para sincronizar auth.users -> profiles
create or replace function public.handle_new_auth_user_profile()
returns trigger
language plpgsql
as $$
begin
  insert into public.profiles (id, email, username, admin, metadata, created_at)
  values (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta->>'username', NULL),
    COALESCE((new.raw_user_meta->>'admin')::boolean, false),
    new.raw_user_meta,
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user_profile();
