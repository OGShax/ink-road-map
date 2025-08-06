-- Create service categories enum
CREATE TYPE service_category AS ENUM (
  'electrical',
  'plumbing', 
  'carpentry',
  'gardening',
  'cleaning',
  'painting',
  'roofing',
  'hvac',
  'flooring',
  'general'
);

-- Create provider specialties table
CREATE TABLE public.provider_specialties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  specialty service_category NOT NULL,
  experience_years INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, specialty)
);

-- Enable RLS
ALTER TABLE public.provider_specialties ENABLE ROW LEVEL SECURITY;

-- Create policies for provider specialties
CREATE POLICY "Users can view all provider specialties" 
ON public.provider_specialties 
FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own specialties" 
ON public.provider_specialties 
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  job_id UUID,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data JSONB
);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add service_category to jobs table
ALTER TABLE public.jobs 
ADD COLUMN service_category service_category DEFAULT 'general';

-- Add verification fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN is_verified_professional BOOLEAN DEFAULT false,
ADD COLUMN verification_documents JSONB,
ADD COLUMN company_name TEXT,
ADD COLUMN business_license TEXT,
ADD COLUMN insurance_info JSONB;

-- Create function to notify relevant providers when job is created
CREATE OR REPLACE FUNCTION public.notify_relevant_providers()
RETURNS TRIGGER AS $$
BEGIN
  -- Only notify for published jobs (not drafts)
  IF NEW.status != 'draft' AND NEW.service_category IS NOT NULL THEN
    -- Insert notifications for providers with matching specialties
    INSERT INTO public.notifications (user_id, job_id, type, title, message, data)
    SELECT 
      ps.user_id,
      NEW.id,
      'new_job_opportunity',
      'New Job Opportunity in ' || INITCAP(NEW.service_category::text),
      'A new job in your specialty area has been posted: ' || NEW.title,
      jsonb_build_object(
        'job_id', NEW.id,
        'job_title', NEW.title,
        'service_category', NEW.service_category,
        'location', NEW.address
      )
    FROM public.provider_specialties ps
    WHERE ps.specialty = NEW.service_category
    AND ps.user_id != NEW.user_id; -- Don't notify the job creator
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for job notifications
CREATE TRIGGER trigger_notify_providers
  AFTER INSERT OR UPDATE OF status ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_relevant_providers();

-- Create indexes for better performance
CREATE INDEX idx_provider_specialties_user_id ON public.provider_specialties(user_id);
CREATE INDEX idx_provider_specialties_specialty ON public.provider_specialties(specialty);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX idx_jobs_service_category ON public.jobs(service_category);