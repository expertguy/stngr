/*
  # Create newsletter subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key) - Unique identifier for each subscriber
      - `email` (text, unique) - Subscriber's email address
      - `subscribed_at` (timestamptz) - Timestamp when user subscribed
      - `confirmed` (boolean) - Whether the email has been confirmed
      - `confirmation_token` (text, nullable) - Token for email confirmation
      - `confirmed_at` (timestamptz, nullable) - When the email was confirmed
      
  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for inserting new subscribers (public access for signup)
    - Subscribers cannot view other subscribers' data
    
  3. Indexes
    - Index on email for faster lookups
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  confirmed boolean DEFAULT false,
  confirmation_token text,
  confirmed_at timestamptz
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "No one can view subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO anon
  USING (false);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email 
  ON newsletter_subscribers(email);