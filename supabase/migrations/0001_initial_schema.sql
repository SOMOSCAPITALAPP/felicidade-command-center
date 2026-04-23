create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  asin text not null unique,
  brand text not null default 'Felicidade',
  product_type text not null,
  main_stone text not null,
  secondary_stones text[] not null default '{}',
  bead_size_mm numeric(6,2),
  audience text not null,
  price numeric(10,2) not null check (price >= 0),
  margin numeric(10,2) not null default 0 check (margin >= 0),
  amazon_url text,
  stock_status text not null default 'in_stock' check (stock_status in ('in_stock', 'low_stock', 'out_of_stock')),
  bestseller_flag boolean not null default false,
  seasonality text not null default 'evergreen' check (seasonality in ('evergreen', 'gift', 'summer', 'winter', 'mothers_day', 'valentines_day', 'holiday')),
  primary_keyword text not null,
  secondary_keywords text[] not null default '{}',
  emotional_angles text[] not null default '{}',
  notes text,
  emotional_richness_score integer not null default 50 check (emotional_richness_score between 0 and 100),
  manual_priority integer not null default 50 check (manual_priority between 0 and 100),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.generated_content (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  platform text not null check (platform in ('facebook', 'instagram', 'tiktok', 'x', 'pinterest')),
  tone text not null check (tone in ('emotionnel', 'premium', 'cadeau', 'spirituel', 'luxe', 'minimaliste')),
  objective text not null check (objective in ('clic', 'achat', 'engagement')),
  length text not null check (length in ('court', 'moyen', 'long')),
  variant_label text not null default 'default',
  hook text not null,
  body text not null,
  hashtags text[] not null default '{}',
  call_to_action text not null,
  emotion_score integer not null default 0 check (emotion_score between 0 and 100),
  conversion_score integer not null default 0 check (conversion_score between 0 and 100),
  readability_score integer not null default 0 check (readability_score between 0 and 100),
  overall_score integer generated always as (
    round(((emotion_score + conversion_score + readability_score)::numeric) / 3)
  ) stored,
  model text,
  prompt_version text not null default 'content_v1',
  compliance_notes text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.listing_versions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  source_listing text,
  marketing_angle text not null,
  keyword_set text[] not null default '{}',
  title text not null,
  bullet_points jsonb not null default '[]'::jsonb,
  description text not null,
  backend_keywords text[] not null default '{}',
  seo_score integer not null default 0 check (seo_score between 0 and 100),
  conversion_score integer not null default 0 check (conversion_score between 0 and 100),
  compliance_score integer not null default 0 check (compliance_score between 0 and 100),
  overall_score integer generated always as (
    round(((seo_score + conversion_score + compliance_score)::numeric) / 3)
  ) stored,
  is_current boolean not null default false,
  prompt_version text not null default 'listing_v1',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.visual_briefs (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  platform text not null check (platform in ('facebook', 'instagram', 'tiktok', 'x', 'pinterest')),
  marketing_angle text not null,
  visual_type text not null check (visual_type in ('premium', 'emotion', 'gift', 'minimalist')),
  primary_text text not null,
  secondary_text text,
  mood text not null,
  composition text not null,
  design_instructions text not null,
  prompt_version text not null default 'visual_brief_v1',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.publishing_queue (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  generated_content_id uuid references public.generated_content(id) on delete set null,
  visual_brief_id uuid references public.visual_briefs(id) on delete set null,
  platform text not null check (platform in ('facebook', 'instagram', 'tiktok', 'x', 'pinterest')),
  status text not null default 'draft' check (status in ('draft', 'ready', 'sent')),
  scheduled_at timestamptz,
  make_payload jsonb not null default '{}'::jsonb,
  sent_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.daily_priorities (
  id uuid primary key default gen_random_uuid(),
  priority_date date not null default current_date,
  product_id uuid not null references public.products(id) on delete cascade,
  priority_score integer not null check (priority_score between 0 and 100),
  recommended_angle text not null,
  recommended_platform text not null check (recommended_platform in ('facebook', 'instagram', 'tiktok', 'x', 'pinterest')),
  justification text not null,
  rank_position integer not null check (rank_position between 1 and 3),
  created_at timestamptz not null default timezone('utc', now()),
  unique (priority_date, rank_position),
  unique (priority_date, product_id)
);

create table if not exists public.marketing_angles (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  angle_name text not null,
  dominant_emotion text not null,
  symbolic_promise text not null,
  target_customer text not null,
  short_hook text not null,
  recommended_usage text not null check (recommended_usage in ('post', 'ad', 'amazon')),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_products_brand on public.products(brand);
create index if not exists idx_products_product_type on public.products(product_type);
create index if not exists idx_products_stock_status on public.products(stock_status);
create index if not exists idx_products_bestseller_flag on public.products(bestseller_flag);
create index if not exists idx_products_primary_keyword on public.products(primary_keyword);

create index if not exists idx_generated_content_product_id on public.generated_content(product_id);
create index if not exists idx_generated_content_platform on public.generated_content(platform);
create index if not exists idx_generated_content_created_at on public.generated_content(created_at desc);

create index if not exists idx_listing_versions_product_id on public.listing_versions(product_id);
create index if not exists idx_listing_versions_is_current on public.listing_versions(is_current);
create index if not exists idx_listing_versions_created_at on public.listing_versions(created_at desc);

create index if not exists idx_visual_briefs_product_id on public.visual_briefs(product_id);
create index if not exists idx_visual_briefs_platform on public.visual_briefs(platform);

create index if not exists idx_publishing_queue_status on public.publishing_queue(status);
create index if not exists idx_publishing_queue_scheduled_at on public.publishing_queue(scheduled_at);
create index if not exists idx_publishing_queue_product_id on public.publishing_queue(product_id);

create index if not exists idx_daily_priorities_priority_date on public.daily_priorities(priority_date desc);
create index if not exists idx_daily_priorities_product_id on public.daily_priorities(product_id);

create index if not exists idx_marketing_angles_product_id on public.marketing_angles(product_id);

create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

create trigger set_publishing_queue_updated_at
before update on public.publishing_queue
for each row
execute function public.set_updated_at();

create or replace function public.ensure_single_current_listing()
returns trigger
language plpgsql
as $$
begin
  if new.is_current then
    update public.listing_versions
    set is_current = false
    where product_id = new.product_id
      and id <> new.id;
  end if;

  return new;
end;
$$;

create trigger trg_single_current_listing
before insert or update on public.listing_versions
for each row
execute function public.ensure_single_current_listing();

create or replace function public.calculate_product_priority_score(
  p_margin numeric,
  p_stock_status text,
  p_bestseller boolean,
  p_seasonality text,
  p_emotional_richness integer,
  p_manual_priority integer
)
returns integer
language plpgsql
as $$
declare
  stock_score integer;
  bestseller_score integer;
  seasonality_score integer;
  margin_score integer;
  result_score integer;
begin
  stock_score := case
    when p_stock_status = 'in_stock' then 100
    when p_stock_status = 'low_stock' then 60
    else 10
  end;

  bestseller_score := case
    when p_bestseller then 100
    else 40
  end;

  seasonality_score := case
    when p_seasonality in ('mothers_day', 'valentines_day', 'holiday') then 90
    when p_seasonality in ('gift', 'winter', 'summer') then 70
    else 50
  end;

  margin_score := least(100, greatest(0, round(p_margin * 2)));

  result_score := round(
    (margin_score * 0.25) +
    (stock_score * 0.15) +
    (bestseller_score * 0.15) +
    (seasonality_score * 0.10) +
    (p_emotional_richness * 0.20) +
    (p_manual_priority * 0.15)
  );

  return least(100, greatest(0, result_score));
end;
$$;

alter table public.products enable row level security;
alter table public.generated_content enable row level security;
alter table public.listing_versions enable row level security;
alter table public.visual_briefs enable row level security;
alter table public.publishing_queue enable row level security;
alter table public.daily_priorities enable row level security;
alter table public.marketing_angles enable row level security;

create policy "authenticated read products"
on public.products
for select
to authenticated
using (true);

create policy "authenticated write products"
on public.products
for all
to authenticated
using (true)
with check (true);

create policy "authenticated read generated_content"
on public.generated_content
for select
to authenticated
using (true);

create policy "authenticated write generated_content"
on public.generated_content
for all
to authenticated
using (true)
with check (true);

create policy "authenticated read listing_versions"
on public.listing_versions
for select
to authenticated
using (true);

create policy "authenticated write listing_versions"
on public.listing_versions
for all
to authenticated
using (true)
with check (true);

create policy "authenticated read visual_briefs"
on public.visual_briefs
for select
to authenticated
using (true);

create policy "authenticated write visual_briefs"
on public.visual_briefs
for all
to authenticated
using (true)
with check (true);

create policy "authenticated read publishing_queue"
on public.publishing_queue
for select
to authenticated
using (true);

create policy "authenticated write publishing_queue"
on public.publishing_queue
for all
to authenticated
using (true)
with check (true);

create policy "authenticated read daily_priorities"
on public.daily_priorities
for select
to authenticated
using (true);

create policy "authenticated write daily_priorities"
on public.daily_priorities
for all
to authenticated
using (true)
with check (true);

create policy "authenticated read marketing_angles"
on public.marketing_angles
for select
to authenticated
using (true);

create policy "authenticated write marketing_angles"
on public.marketing_angles
for all
to authenticated
using (true)
with check (true);
