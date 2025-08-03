-- Create enum types for better data integrity
CREATE TYPE public.job_status AS ENUM ('draft', 'active', 'bidding_closed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.payment_type AS ENUM ('fixed', 'hourly');
CREATE TYPE public.urgency_level AS ENUM ('asap', 'within_week', 'flexible');
CREATE TYPE public.bid_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE public.deposit_option AS ENUM ('25_percent', 'custom', 'full_payment');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  is_service_provider BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_jobs_completed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  payment_type payment_type NOT NULL DEFAULT 'fixed',
  fixed_price DECIMAL(10,2),
  hourly_rate DECIMAL(10,2),
  approximate_hours INTEGER,
  budget_max DECIMAL(10,2),
  urgency_level urgency_level NOT NULL DEFAULT 'flexible',
  materials_provided BOOLEAN DEFAULT false,
  bidding_start_date TIMESTAMPTZ,
  bidding_end_date TIMESTAMPTZ,
  project_start_date TIMESTAMPTZ,
  project_end_date TIMESTAMPTZ,
  mva_enabled BOOLEAN DEFAULT false,
  bid_includes_mva BOOLEAN DEFAULT false,
  status job_status NOT NULL DEFAULT 'draft',
  image_urls TEXT[],
  guidelines TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bids table
CREATE TABLE public.bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  estimated_hours INTEGER,
  hourly_rate DECIMAL(10,2),
  deposit_option deposit_option NOT NULL DEFAULT '25_percent',
  custom_deposit_percentage INTEGER,
  deposit_amount DECIMAL(10,2),
  proposal TEXT NOT NULL,
  status bid_status NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  UNIQUE(job_id, bidder_id)
);

-- Create job_qa table for questions and answers
CREATE TABLE public.job_qa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question TEXT,
  answer TEXT,
  parent_id UUID REFERENCES public.job_qa(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create job_followers table for notifications
CREATE TABLE public.job_followers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  followed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(job_id, user_id)
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  bid_id UUID REFERENCES public.bids(id) ON DELETE CASCADE,
  payer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  payee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_type TEXT NOT NULL, -- 'deposit', 'full_payment', 'final_payment'
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for jobs
CREATE POLICY "Anyone can view active jobs" ON public.jobs
  FOR SELECT USING (status != 'draft' OR user_id = auth.uid());

CREATE POLICY "Users can create their own jobs" ON public.jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs" ON public.jobs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs" ON public.jobs
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for bids
CREATE POLICY "Bids are viewable by job owner and bidder" ON public.bids
  FOR SELECT USING (
    bidder_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.jobs WHERE jobs.id = job_id AND jobs.user_id = auth.uid())
  );

CREATE POLICY "Users can create bids" ON public.bids
  FOR INSERT WITH CHECK (auth.uid() = bidder_id);

CREATE POLICY "Bidders can update their own bids" ON public.bids
  FOR UPDATE USING (auth.uid() = bidder_id);

-- Create RLS policies for job_qa
CREATE POLICY "Q&A is viewable by everyone" ON public.job_qa
  FOR SELECT USING (true);

CREATE POLICY "Users can create Q&A entries" ON public.job_qa
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Q&A entries" ON public.job_qa
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for job_followers
CREATE POLICY "Users can view their own follows" ON public.job_followers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can follow jobs" ON public.job_followers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unfollow jobs" ON public.job_followers
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (auth.uid() = payer_id OR auth.uid() = payee_id);

CREATE POLICY "System can insert payments" ON public.payments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update payments" ON public.payments
  FOR UPDATE USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();