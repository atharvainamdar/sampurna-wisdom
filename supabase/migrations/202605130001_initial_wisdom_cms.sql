-- Sampurna Samruddhi Wisdom CMS
-- Secure-first schema for a free, public, multilingual wisdom library.

CREATE TYPE public.content_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
CREATE TYPE public.language_code AS ENUM ('en', 'hi', 'mr');
CREATE TYPE public.pillar_slug AS ENUM ('arogya', 'sampatti', 'sambandh', 'karya', 'adhyatma');
CREATE TYPE public.media_kind AS ENUM ('video', 'audio', 'ppt', 'pdf', 'image', 'link');

CREATE TABLE public.admin_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = _user_id)
$$;

CREATE TABLE public.wisdom_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  content_date DATE NOT NULL UNIQUE,
  pillar pillar_slug NOT NULL,
  status content_status NOT NULL DEFAULT 'draft',
  scheduled_for TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  tags TEXT[] NOT NULL DEFAULT '{}',
  thumbnail_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT scheduled_posts_need_time CHECK (status <> 'scheduled' OR scheduled_for IS NOT NULL),
  CONSTRAINT published_posts_need_time CHECK (status <> 'published' OR published_at IS NOT NULL)
);

CREATE TABLE public.wisdom_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.wisdom_posts(id) ON DELETE CASCADE,
  language language_code NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  reflection_prompt TEXT NOT NULL DEFAULT '',
  video_url TEXT,
  audio_url TEXT,
  resources JSONB NOT NULL DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (post_id, language),
  CONSTRAINT resources_are_array CHECK (jsonb_typeof(resources) = 'array')
);

CREATE TABLE public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language language_code,
  kind media_kind NOT NULL,
  title TEXT NOT NULL,
  storage_path TEXT,
  external_url TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT media_has_location CHECK (storage_path IS NOT NULL OR external_url IS NOT NULL)
);

CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER wisdom_posts_touch_updated_at
  BEFORE UPDATE ON public.wisdom_posts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER wisdom_translations_touch_updated_at
  BEFORE UPDATE ON public.wisdom_translations
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wisdom_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wisdom_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Admin roles are never public. Existing admins can view/manage roles.
CREATE POLICY "Admins can view admin roles" ON public.admin_roles
  FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage admin roles" ON public.admin_roles
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Public users can only read published posts. Admins can manage everything.
CREATE POLICY "Public can read published wisdom posts" ON public.wisdom_posts
  FOR SELECT USING (status = 'published' AND published_at <= now());
CREATE POLICY "Admins can manage wisdom posts" ON public.wisdom_posts
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can read published translations" ON public.wisdom_translations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.wisdom_posts p
      WHERE p.id = post_id AND p.status = 'published' AND p.published_at <= now()
    )
  );
CREATE POLICY "Admins can manage translations" ON public.wisdom_translations
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Media metadata is public only when linked to public content or an external public URL.
-- Upload/update/delete remains admin-only.
CREATE POLICY "Public can read public media metadata" ON public.media_assets
  FOR SELECT USING (external_url IS NOT NULL);
CREATE POLICY "Admins can manage media assets" ON public.media_assets
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can read site settings" ON public.site_settings
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE INDEX wisdom_posts_public_idx ON public.wisdom_posts (status, published_at DESC, content_date DESC);
CREATE INDEX wisdom_posts_pillar_idx ON public.wisdom_posts (pillar, content_date DESC);
CREATE INDEX wisdom_translations_language_idx ON public.wisdom_translations (language, post_id);
CREATE INDEX media_assets_kind_language_idx ON public.media_assets (kind, language, created_at DESC);

-- Storage buckets are intentionally separate by purpose.
INSERT INTO storage.buckets (id, name, public) VALUES
  ('published-wisdom-media', 'published-wisdom-media', true),
  ('draft-wisdom-media', 'draft-wisdom-media', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view published wisdom media" ON storage.objects
  FOR SELECT USING (bucket_id = 'published-wisdom-media');
CREATE POLICY "Admins can manage published wisdom media" ON storage.objects
  FOR ALL USING (bucket_id = 'published-wisdom-media' AND public.is_admin())
  WITH CHECK (bucket_id = 'published-wisdom-media' AND public.is_admin());
CREATE POLICY "Admins can manage draft wisdom media" ON storage.objects
  FOR ALL USING (bucket_id = 'draft-wisdom-media' AND public.is_admin())
  WITH CHECK (bucket_id = 'draft-wisdom-media' AND public.is_admin());
