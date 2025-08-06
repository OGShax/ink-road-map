import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SERVICE_CATEGORIES = [
  { value: 'electrical', label: 'Electrical Work' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'carpentry', label: 'Carpentry' },
  { value: 'gardening', label: 'Gardening & Landscaping' },
  { value: 'cleaning', label: 'Cleaning Services' },
  { value: 'painting', label: 'Painting' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'flooring', label: 'Flooring' },
  { value: 'general', label: 'General Services' }
];

interface Specialty {
  id: string;
  specialty: string;
  experience_years: number;
  is_verified: boolean;
}

export const ProviderSpecialtiesManager = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [experienceYears, setExperienceYears] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    const { data, error } = await supabase
      .from('provider_specialties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching specialties:', error);
      return;
    }

    setSpecialties(data || []);
  };

  const addSpecialty = async () => {
    if (!newSpecialty) return;

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('You must be logged in to add specialties');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('provider_specialties')
      .insert({
        user_id: user.id,
        specialty: newSpecialty as any,
        experience_years: experienceYears
      });

    if (error) {
      toast.error('Failed to add specialty');
      console.error('Error adding specialty:', error);
    } else {
      toast.success('Specialty added successfully!');
      setNewSpecialty('');
      setExperienceYears(0);
      fetchSpecialties();
    }
    setLoading(false);
  };

  const removeSpecialty = async (id: string) => {
    const { error } = await supabase
      .from('provider_specialties')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to remove specialty');
      console.error('Error removing specialty:', error);
    } else {
      toast.success('Specialty removed');
      fetchSpecialties();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Specialties</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add your service specialties to receive notifications for relevant job opportunities.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Specialties */}
        <div>
          <Label className="text-base font-medium">Your Specialties</Label>
          {specialties.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-2">
              No specialties added yet. Add some to start receiving job notifications!
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2">
              {specialties.map((specialty) => (
                <Badge key={specialty.id} variant="secondary" className="flex items-center gap-2">
                  {SERVICE_CATEGORIES.find(cat => cat.value === specialty.specialty)?.label}
                  <span className="text-xs">({specialty.experience_years} years)</span>
                  {specialty.is_verified && (
                    <Badge variant="outline" className="ml-1 text-xs">Verified</Badge>
                  )}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeSpecialty(specialty.id)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Add New Specialty */}
        <div className="space-y-4 p-4 border rounded-lg">
          <Label className="text-base font-medium">Add New Specialty</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="specialty">Service Category</Label>
              <Select value={newSpecialty} onValueChange={setNewSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a specialty" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_CATEGORIES
                    .filter(cat => !specialties.some(s => s.specialty === cat.value))
                    .map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                value={experienceYears}
                onChange={(e) => setExperienceYears(parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>

          <Button 
            onClick={addSpecialty} 
            disabled={!newSpecialty || loading}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Specialty
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};