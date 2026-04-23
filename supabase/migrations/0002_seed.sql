insert into public.products (
  id,
  name,
  asin,
  brand,
  product_type,
  main_stone,
  secondary_stones,
  bead_size_mm,
  audience,
  price,
  margin,
  amazon_url,
  stock_status,
  bestseller_flag,
  seasonality,
  primary_keyword,
  secondary_keywords,
  emotional_angles,
  notes,
  emotional_richness_score,
  manual_priority
)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'Bracelet Apaisement Labradorite',
    'B0FELI001',
    'Felicidade',
    'bracelet',
    'Labradorite',
    '{"Hematite"}',
    8,
    'femme',
    39.90,
    22.00,
    'https://www.amazon.fr/dp/B0FELI001',
    'in_stock',
    true,
    'evergreen',
    'bracelet pierre naturelle femme',
    '{"bracelet labradorite","bijou energie symbolique","cadeau femme raffine"}',
    '{"protection elegante","rituel quotidien","cadeau porteur de sens"}',
    'Produit hero pour acquisition et contenus emotionnels.',
    88,
    92
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Bracelet Amour Quartz Rose',
    'B0FELI002',
    'Felicidade',
    'bracelet',
    'Quartz Rose',
    '{"Howlite"}',
    6,
    'femme',
    34.90,
    19.00,
    'https://www.amazon.fr/dp/B0FELI002',
    'in_stock',
    false,
    'gift',
    'bracelet quartz rose femme',
    '{"bracelet amour","bijou pierre rose","idee cadeau femme"}',
    '{"tendresse moderne","cadeau coeur","douceur premium"}',
    'Tres bon candidat pour campagnes cadeau.',
    93,
    85
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Bracelet Protection Oeil de Tigre',
    'B0FELI003',
    'Felicidade',
    'bracelet',
    'Oeil de Tigre',
    '{"Onyx Noir"}',
    8,
    'mixte',
    42.90,
    24.00,
    'https://www.amazon.fr/dp/B0FELI003',
    'low_stock',
    true,
    'evergreen',
    'bracelet oeil de tigre',
    '{"bracelet homme pierre naturelle","bracelet protection symbolique","bijou mixte premium"}',
    '{"force calme","confiance quotidienne","presence affirmee"}',
    'Tres bon potentiel conversion, stock a surveiller.',
    84,
    78
  );

insert into public.generated_content (
  id,
  product_id,
  platform,
  tone,
  objective,
  length,
  variant_label,
  hook,
  body,
  hashtags,
  call_to_action,
  emotion_score,
  conversion_score,
  readability_score,
  model,
  prompt_version,
  compliance_notes
)
values
  (
    '44444444-4444-4444-4444-444444444444',
    '11111111-1111-1111-1111-111111111111',
    'instagram',
    'emotionnel',
    'achat',
    'court',
    'emotionnelle',
    'Et si votre bijou racontait enfin quelque chose de vous ?',
    'Le Bracelet Apaisement Labradorite accompagne vos looks avec une allure douce, lumineuse et pleine de sens. Un cadeau a porter tous les jours pour se reconnecter a l essentiel avec elegance.',
    '{"#braceletpierresnaturelles","#bijoufemme","#labradorite","#cadeaufemme"}',
    'Decouvrir le bracelet sur Amazon',
    90,
    82,
    88,
    'gpt-5.2',
    'content_v1',
    'Aucun claim medical. Formulation symbolique uniquement.'
  );

insert into public.listing_versions (
  id,
  product_id,
  source_listing,
  marketing_angle,
  keyword_set,
  title,
  bullet_points,
  description,
  backend_keywords,
  seo_score,
  conversion_score,
  compliance_score,
  is_current,
  prompt_version
)
values
  (
    '55555555-5555-5555-5555-555555555555',
    '11111111-1111-1111-1111-111111111111',
    'Bracelet labradorite femme simple',
    'protection elegante',
    '{"bracelet pierre naturelle femme","bracelet labradorite","cadeau femme"}',
    'Felicidade Bracelet Labradorite Femme, Bijou Pierre Naturelle Premium, Idee Cadeau Elegante',
    '[
      "Bracelet en labradorite au style premium, pense pour sublimer le quotidien avec une touche symbolique et raffinee.",
      "Perles de 8 mm soigneusement selectionnees pour une presence elegante et facile a porter au bureau comme en sortie.",
      "Idee cadeau pleine de sens pour anniversaire, fete des meres, Noel ou attention spontanee.",
      "Design Felicidade concu pour s associer facilement a une tenue chic, minimaliste ou emotionnelle.",
      "Bijou confortable et visuellement harmonieux, adapte a un usage quotidien."
    ]'::jsonb,
    'Un bracelet Felicidade en labradorite pense pour les clientes qui recherchent un bijou de pierre naturelle a la fois esthetique, credible et facile a offrir. Son design premium met en valeur une allure douce et inspiree, ideale pour enrichir une routine style avec un accessoire porteur de sens.',
    '{"bracelet femme premium","pierre naturelle cadeau","bijou labradorite"}',
    86,
    84,
    95,
    true,
    'listing_v1'
  );

insert into public.visual_briefs (
  id,
  product_id,
  platform,
  marketing_angle,
  visual_type,
  primary_text,
  secondary_text,
  mood,
  composition,
  design_instructions,
  prompt_version
)
values
  (
    '66666666-6666-6666-6666-666666666666',
    '11111111-1111-1111-1111-111111111111',
    'instagram',
    'rituel quotidien',
    'premium',
    'Un bijou qui habille votre energie avec elegance',
    'Labradorite naturelle - style raffine - cadeau porteur de sens',
    'Lumiere douce, tons creme, gris pierre et reflets argentes',
    'Bracelet en gros plan sur fond texture clair avec espace reserve pour texte en haut a gauche',
    'Creer un visuel editorial premium, minimaliste, feminin, avec mise en valeur de la texture des pierres. Eviter tout code visuel medical ou mystique excessif.',
    'visual_brief_v1'
  );

insert into public.publishing_queue (
  id,
  product_id,
  generated_content_id,
  visual_brief_id,
  platform,
  status,
  scheduled_at,
  make_payload
)
values
  (
    '77777777-7777-7777-7777-777777777777',
    '11111111-1111-1111-1111-111111111111',
    '44444444-4444-4444-4444-444444444444',
    '66666666-6666-6666-6666-666666666666',
    'instagram',
    'ready',
    timezone('utc', now()) + interval '1 day',
    jsonb_build_object(
      'product_name', 'Bracelet Apaisement Labradorite',
      'platform', 'instagram',
      'content', 'Le Bracelet Apaisement Labradorite accompagne vos looks avec une allure douce, lumineuse et pleine de sens.',
      'hashtags', jsonb_build_array('#braceletpierresnaturelles', '#bijoufemme', '#labradorite'),
      'cta', 'Decouvrir le bracelet sur Amazon',
      'amazon_url', 'https://www.amazon.fr/dp/B0FELI001',
      'visual_brief', 'Visuel editorial premium et minimaliste avec bracelet en gros plan.',
      'scheduled_time', to_char(timezone('utc', now()) + interval '1 day', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
    )
  );

insert into public.daily_priorities (
  id,
  priority_date,
  product_id,
  priority_score,
  recommended_angle,
  recommended_platform,
  justification,
  rank_position
)
values
  (
    '88888888-8888-8888-8888-888888888881',
    current_date,
    '11111111-1111-1111-1111-111111111111',
    public.calculate_product_priority_score(22, 'in_stock', true, 'evergreen', 88, 92),
    'protection elegante',
    'instagram',
    'Marge solide, produit bestseller, stock disponible et fort potentiel de narration emotionnelle.',
    1
  ),
  (
    '88888888-8888-8888-8888-888888888882',
    current_date,
    '22222222-2222-2222-2222-222222222222',
    public.calculate_product_priority_score(19, 'in_stock', false, 'gift', 93, 85),
    'cadeau coeur',
    'facebook',
    'Excellent angle cadeau et forte richesse emotionnelle pour campagnes conversion ou engagement.',
    2
  ),
  (
    '88888888-8888-8888-8888-888888888883',
    current_date,
    '33333333-3333-3333-3333-333333333333',
    public.calculate_product_priority_score(24, 'low_stock', true, 'evergreen', 84, 78),
    'force calme',
    'x',
    'Bonne marge et statut bestseller, mais stock a surveiller. Priorite commerciale secondaire.',
    3
  );

insert into public.marketing_angles (
  id,
  product_id,
  angle_name,
  dominant_emotion,
  symbolic_promise,
  target_customer,
  short_hook,
  recommended_usage
)
values
  (
    '99999999-9999-9999-9999-999999999991',
    '11111111-1111-1111-1111-111111111111',
    'Protection elegante',
    'reassurance',
    'Un bijou qui accompagne avec presence et subtilite',
    'Femme active qui veut un accessoire porteur de sens',
    'La force douce au poignet',
    'post'
  ),
  (
    '99999999-9999-9999-9999-999999999992',
    '22222222-2222-2222-2222-222222222222',
    'Cadeau coeur',
    'tendresse',
    'Offrir une attention delicate et memorable',
    'Acheteur cadeau premium',
    'Offrir plus qu un bijou',
    'ad'
  ),
  (
    '99999999-9999-9999-9999-999999999993',
    '33333333-3333-3333-3333-333333333333',
    'Force calme',
    'confiance',
    'Affirmer un style pose et maitrise',
    'Client mixte sensible au style symbolique',
    'Un style qui inspire la confiance',
    'amazon'
  );
