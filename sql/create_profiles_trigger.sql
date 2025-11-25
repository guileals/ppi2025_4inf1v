-- Função para inserir perfil automaticamente ao criar usuário
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

-- Remove trigger antiga se existir
drop trigger if exists on_auth_user_created on auth.users;

-- Cria trigger para rodar a função após inserir em auth.users
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user_profile();
