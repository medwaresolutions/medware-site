-- Create the posts table for The Signal blog
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT,
  tags TEXT[],
  author_name TEXT DEFAULT 'Matt Martin',
  author_role TEXT DEFAULT 'Founder',
  read_time TEXT,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID NOT NULL REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Anyone can read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- Authenticated users can manage their own posts
CREATE POLICY "Authenticated users can insert posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);

-- Authenticated users can also read their own draft posts
CREATE POLICY "Authors can read their own drafts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);
