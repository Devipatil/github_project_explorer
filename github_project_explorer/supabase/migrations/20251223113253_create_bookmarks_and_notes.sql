/*
  # GitHub Explorer Database Schema
  
  1. New Tables
    - `bookmarks`
      - `id` (uuid, primary key)
      - `repo_id` (bigint) - GitHub repository ID
      - `repo_name` (text) - Full repository name (owner/repo)
      - `repo_url` (text) - Repository URL
      - `description` (text) - Repository description
      - `stars` (integer) - Number of stars
      - `forks` (integer) - Number of forks
      - `language` (text) - Primary programming language
      - `topics` (text[]) - Repository topics/tags
      - `created_at` (timestamptz) - When bookmark was created
      
    - `notes`
      - `id` (uuid, primary key)
      - `bookmark_id` (uuid, foreign key) - Reference to bookmark
      - `content` (text) - Note content
      - `created_at` (timestamptz) - When note was created
      - `updated_at` (timestamptz) - When note was last updated
  
  2. Security
    - Enable RLS on both tables
    - Public access policies (no auth required for demo purposes)
*/

CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id bigint NOT NULL,
  repo_name text NOT NULL,
  repo_url text NOT NULL,
  description text DEFAULT '',
  stars integer DEFAULT 0,
  forks integer DEFAULT 0,
  language text DEFAULT '',
  topics text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bookmark_id uuid REFERENCES bookmarks(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to bookmarks"
  ON bookmarks FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public delete to bookmarks"
  ON bookmarks FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access to notes"
  ON notes FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to notes"
  ON notes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to notes"
  ON notes FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete to notes"
  ON notes FOR DELETE
  USING (true);