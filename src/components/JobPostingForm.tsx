import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, X, Move, AlertCircle, MapPin, DollarSign, Clock, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface JobFormData {
  title: string;
  description: string;
  category: string;
  address: string;
  paymentType: 'fixed' | 'hourly';
  fixedPrice?: number;
  hourlyRate?: number;
  approximateHours?: number;
  budgetMax?: number;
  urgencyLevel: 'asap' | 'within_week' | 'flexible';
  materialsProvided: boolean;
  biddingStartDate?: Date;
  biddingEndDate?: Date;
  projectStartDate?: Date;
  projectEndDate?: Date;
  mvaEnabled: boolean;
  bidIncludesMva: boolean;
  imageUrls: string[];
  guidelines: string;
}

const steps = [
  { id: 1, title: "Basic Info", description: "Job title, description, and category" },
  { id: 2, title: "Details", description: "Location, pricing, and requirements" },
  { id: 3, title: "Timeline", description: "Bidding and project dates" },
  { id: 4, title: "Media & Guidelines", description: "Images and additional information" },
  { id: 5, title: "Review", description: "Review and publish your job" }
];

const categories = [
  "Web Development",
  "Mobile Development",
  "Design & Creative",
  "Writing & Translation",
  "Digital Marketing",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Data Science",
  "Business Services"
];

export const JobPostingForm = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    category: "",
    address: "",
    paymentType: "fixed",
    urgencyLevel: "flexible",
    materialsProvided: false,
    mvaEnabled: false,
    bidIncludesMva: false,
    imageUrls: [],
    guidelines: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDraft, setIsDraft] = useState(false);
  const { toast } = useToast();

  const updateFormData = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = "Job title is required";
        if (!formData.description.trim()) newErrors.description = "Job description is required";
        if (!formData.category) newErrors.category = "Category is required";
        break;
      case 2:
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (formData.paymentType === "fixed" && !formData.fixedPrice) {
          newErrors.fixedPrice = "Fixed price is required";
        }
        if (formData.paymentType === "hourly") {
          if (!formData.hourlyRate) newErrors.hourlyRate = "Hourly rate is required";
          if (!formData.approximateHours) newErrors.approximateHours = "Approximate hours required";
        }
        break;
      case 3:
        if (!formData.biddingStartDate) newErrors.biddingStartDate = "Bidding start date is required";
        if (!formData.biddingEndDate) newErrors.biddingEndDate = "Bidding end date is required";
        if (formData.biddingStartDate && formData.biddingEndDate && formData.biddingStartDate >= formData.biddingEndDate) {
          newErrors.biddingEndDate = "Bidding end date must be after start date";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    toast({
      title: "Draft Saved",
      description: "Your job posting has been saved as a draft.",
    });
  };

  const handlePublish = () => {
    if (validateStep(currentStep)) {
      toast({
        title: "Job Published",
        description: "Your job has been published successfully!",
      });
      onClose();
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Post a New Job
            </h1>
            <p className="text-muted-foreground mt-2">Create a detailed job posting to attract the best talent</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft} className="flex items-center gap-2">
              <Save size={16} />
              Save as Draft
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step.id}
                </div>
                <div className="ml-3 hidden md:block">
                  <p className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-px mx-4",
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  )} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Form Content */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Step {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="flex items-center gap-2">
                    Job Title
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Build a Modern E-commerce Website"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle size={14} />
                      {errors.title}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Choose a clear, descriptive title that accurately represents your project
                  </p>
                </div>

                <div>
                  <Label htmlFor="description" className="flex items-center gap-2">
                    Job Description
                    <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project in detail. Include requirements, expectations, and any specific technologies or skills needed..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle size={14} />
                      {errors.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Be specific about your requirements to attract the right professionals
                  </p>
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    Category
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => updateFormData("category", value)}
                  >
                    <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle size={14} />
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin size={16} />
                    Project Location
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="Enter project address or 'Remote'"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle size={14} />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <DollarSign size={16} />
                    Payment Type
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Card 
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        formData.paymentType === "fixed" 
                          ? "ring-2 ring-primary bg-primary/5" 
                          : "hover:bg-muted/50"
                      )}
                      onClick={() => updateFormData("paymentType", "fixed")}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className={cn(
                            "w-4 h-4 rounded-full border-2",
                            formData.paymentType === "fixed" 
                              ? "bg-primary border-primary" 
                              : "border-muted-foreground"
                          )} />
                          <div>
                            <p className="font-medium">Fixed Price</p>
                            <p className="text-sm text-muted-foreground">One-time payment for the entire project</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card 
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        formData.paymentType === "hourly" 
                          ? "ring-2 ring-primary bg-primary/5" 
                          : "hover:bg-muted/50"
                      )}
                      onClick={() => updateFormData("paymentType", "hourly")}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className={cn(
                            "w-4 h-4 rounded-full border-2",
                            formData.paymentType === "hourly" 
                              ? "bg-primary border-primary" 
                              : "border-muted-foreground"
                          )} />
                          <div>
                            <p className="font-medium">Pay by Hour</p>
                            <p className="text-sm text-muted-foreground">Payment based on time worked</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {formData.paymentType === "fixed" && (
                  <div>
                    <Label htmlFor="fixedPrice" className="flex items-center gap-2">
                      Fixed Price
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        id="fixedPrice"
                        type="number"
                        placeholder="0.00"
                        className={cn("pl-10", errors.fixedPrice ? "border-destructive" : "")}
                        value={formData.fixedPrice || ""}
                        onChange={(e) => updateFormData("fixedPrice", parseFloat(e.target.value))}
                      />
                    </div>
                    {errors.fixedPrice && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                        <AlertCircle size={14} />
                        {errors.fixedPrice}
                      </p>
                    )}
                  </div>
                )}

                {formData.paymentType === "hourly" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hourlyRate" className="flex items-center gap-2">
                        Hourly Rate
                        <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input
                          id="hourlyRate"
                          type="number"
                          placeholder="0.00"
                          className={cn("pl-10", errors.hourlyRate ? "border-destructive" : "")}
                          value={formData.hourlyRate || ""}
                          onChange={(e) => updateFormData("hourlyRate", parseFloat(e.target.value))}
                        />
                      </div>
                      {errors.hourlyRate && (
                        <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                          <AlertCircle size={14} />
                          {errors.hourlyRate}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="approximateHours" className="flex items-center gap-2">
                        <Clock size={16} />
                        Approximate Hours
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="approximateHours"
                        type="number"
                        placeholder="40"
                        className={errors.approximateHours ? "border-destructive" : ""}
                        value={formData.approximateHours || ""}
                        onChange={(e) => updateFormData("approximateHours", parseInt(e.target.value))}
                      />
                      {errors.approximateHours && (
                        <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                          <AlertCircle size={14} />
                          {errors.approximateHours}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <Label>Budget Range (Optional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      type="number"
                      placeholder="Maximum budget"
                      className="pl-10"
                      value={formData.budgetMax || ""}
                      onChange={(e) => updateFormData("budgetMax", parseFloat(e.target.value))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Optional: Set a maximum budget to help filter proposals
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Urgency Level</Label>
                    <Select
                      value={formData.urgencyLevel}
                      onValueChange={(value: 'asap' | 'within_week' | 'flexible') => updateFormData("urgencyLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP - Urgent</SelectItem>
                        <SelectItem value="within_week">Within a Week</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Materials Provided by You?</Label>
                      <p className="text-xs text-muted-foreground">
                        Will you provide necessary materials/resources?
                      </p>
                    </div>
                    <Switch
                      checked={formData.materialsProvided}
                      onCheckedChange={(checked) => updateFormData("materialsProvided", checked)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>MVA/VAT Enabled</Label>
                      <p className="text-xs text-muted-foreground">
                        Include tax calculations
                      </p>
                    </div>
                    <Switch
                      checked={formData.mvaEnabled}
                      onCheckedChange={(checked) => updateFormData("mvaEnabled", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Bid Includes MVA</Label>
                      <p className="text-xs text-muted-foreground">
                        Bids should include tax
                      </p>
                    </div>
                    <Switch
                      checked={formData.bidIncludesMva}
                      onCheckedChange={(checked) => updateFormData("bidIncludesMva", checked)}
                      disabled={!formData.mvaEnabled}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Additional steps would continue here... */}
            {currentStep > 2 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Step {currentStep} content coming soon...</p>
              </div>
            )}
          </CardContent>

          {/* Navigation */}
          <div className="flex justify-between p-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {currentStep === steps.length ? (
                <Button onClick={handlePublish} className="bg-gradient-to-r from-primary to-accent">
                  Publish Job
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};