-- Make user_id nullable so we can seed posts without a user
ALTER TABLE posts ALTER COLUMN user_id DROP NOT NULL;

-- Update RLS policies to allow any authenticated user to manage all posts
-- (since this is a single-admin blog, not a multi-tenant system)
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can update their posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can delete their posts" ON posts;
DROP POLICY IF EXISTS "Authors can read their own drafts" ON posts;

-- Any authenticated user can insert posts
CREATE POLICY "Authenticated users can insert posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Any authenticated user can update any posts
CREATE POLICY "Authenticated users can update posts"
  ON posts FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Any authenticated user can delete any posts
CREATE POLICY "Authenticated users can delete posts"
  ON posts FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can read all posts (including drafts)
CREATE POLICY "Authenticated users can read all posts"
  ON posts FOR SELECT
  USING (auth.uid() IS NOT NULL);
