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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, Upload, X, Move, AlertCircle, MapPin, DollarSign, Clock, Save, Info, CreditCard, Shield, Copy, Share2, ExternalLink, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface JobFormData {
  title: string;
  description: string;
  category: string;
  address: string;
  paymentType: 'fixed' | 'hourly';
  approximatedBudget?: number;
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
  const [showSharingDialog, setShowSharingDialog] = useState(false);
  const [copiedItems, setCopiedItems] = useState<Record<string, boolean>>({});
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
      setShowSharingDialog(true);
    }
  };

  const handleCopyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => ({ ...prev, [key]: true }));
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
      setTimeout(() => {
        setCopiedItems(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the text manually",
        variant: "destructive",
      });
    }
  };

  const generateSharingContent = () => {
    const jobUrl = `https://proconnect.app/jobs/${Date.now()}`; // Placeholder URL
    
    const shortPost = `🚀 New ${formData.category} job available!

"${formData.title}"

Looking for talented professionals to help with this project.
${formData.paymentType === "fixed" ? "Fixed project" : "Hourly work"} opportunity.

Apply here: ${jobUrl}

#freelance #${formData.category.replace(/\s+/g, '').toLowerCase()} #remote`;

    const detailedPost = `🎯 Exciting ${formData.category} Opportunity Available!

📋 Project: ${formData.title}

📍 Location: ${formData.address}

💼 Type: ${formData.paymentType === "fixed" ? "Fixed Price Project" : "Hourly Work"}
${formData.approximatedBudget ? `💰 Budget: ~$${formData.approximatedBudget.toLocaleString()}` : ""}

⏰ Urgency: ${formData.urgencyLevel === "asap" ? "ASAP" : formData.urgencyLevel === "within_week" ? "Within a week" : "Flexible timeline"}

🔍 What we're looking for:
${formData.description.substring(0, 200)}${formData.description.length > 200 ? "..." : ""}

Ready to apply? Check out the full details: ${jobUrl}

#freelancework #${formData.category.replace(/\s+/g, '').toLowerCase()} #hiring #remotework`;

    const linkedInPost = `I'm looking for a skilled ${formData.category.toLowerCase()} professional for an exciting project opportunity.

Project: ${formData.title}
${formData.approximatedBudget ? `Budget: ~$${formData.approximatedBudget.toLocaleString()}` : ""}
Timeline: ${formData.urgencyLevel === "asap" ? "Immediate start" : formData.urgencyLevel === "within_week" ? "Start within a week" : "Flexible start date"}

If you're interested or know someone who might be, please check out the details here: ${jobUrl}

#freelancer #${formData.category.replace(/\s+/g, '').toLowerCase()} #opportunity`;

    return { shortPost, detailedPost, linkedInPost, jobUrl };
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
                    How Should Providers Submit Bids?
                  </Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose how you want providers to structure their proposals and pricing
                  </p>
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
                            <p className="font-medium">Fixed Project Price</p>
                            <p className="text-sm text-muted-foreground">Providers bid with a total project cost</p>
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
                            <p className="font-medium">Hourly Rate</p>
                            <p className="text-sm text-muted-foreground">Providers bid with their hourly rate</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Bidding Structure</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    {formData.paymentType === "fixed" ? (
                      <div>
                        <p>• Providers will submit bids with a <strong>total project cost</strong></p>
                        <p>• You'll see proposals with complete project pricing</p>
                        <p>• Best for projects with well-defined scope and deliverables</p>
                      </div>
                    ) : (
                      <div>
                        <p>• Providers will submit bids with their <strong>hourly rate</strong></p>
                        <p>• You'll need to estimate project duration</p>
                        <p>• Best for ongoing work or projects with flexible scope</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="approximatedBudget" className="flex items-center gap-2">
                    <DollarSign size={16} />
                    Approximated Budget (Optional)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="approximatedBudget"
                      type="number"
                      placeholder="e.g., 5000"
                      className="pl-10"
                      value={formData.approximatedBudget || ""}
                      onChange={(e) => updateFormData("approximatedBudget", parseFloat(e.target.value))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Share your budget expectations to help providers submit more targeted bids. This helps attract realistic proposals within your range.
                  </p>
                </div>

                {/* Platform Fees & Monetization Explanation */}
                <Card className="border-blue-500/20 bg-blue-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Info size={18} className="text-blue-600" />
                      Platform Fees & How We Monetize
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CreditCard size={16} className="text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-sm">Service Fee</h4>
                            <p className="text-xs text-muted-foreground">
                              We charge a 5% service fee on completed projects, split between client and provider (2.5% each)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Shield size={16} className="text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-sm">Payment Protection</h4>
                            <p className="text-xs text-muted-foreground">
                              Secure escrow system protects both parties. Funds released upon project completion
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <DollarSign size={16} className="text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-sm">Processing Fee</h4>
                            <p className="text-xs text-muted-foreground">
                              Standard payment processing fee of 2.9% + $0.30 per transaction
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock size={16} className="text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-sm">No Upfront Costs</h4>
                            <p className="text-xs text-muted-foreground">
                              Free to post jobs. Fees only apply when you successfully hire a provider
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <h5 className="font-medium text-sm text-blue-800 dark:text-blue-300 mb-2">Example Fee Breakdown</h5>
                      <div className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                        <div className="flex justify-between">
                          <span>Project Value:</span>
                          <span className="font-medium">
                            {formData.approximatedBudget 
                              ? `$${formData.approximatedBudget.toLocaleString()} (your budget)`
                              : "$1,000 (example)"
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Your Service Fee (2.5%):</span>
                          <span className="font-medium">
                            {formData.approximatedBudget 
                              ? `$${(formData.approximatedBudget * 0.025).toFixed(2)}`
                              : "$25"
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Provider Service Fee (2.5%):</span>
                          <span className="font-medium">
                            {formData.approximatedBudget 
                              ? `$${(formData.approximatedBudget * 0.025).toFixed(2)}`
                              : "$25"
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment Processing:</span>
                          <span className="font-medium">
                            {formData.approximatedBudget 
                              ? `$${(formData.approximatedBudget * 0.029 + 0.30).toFixed(2)}`
                              : "$29.30"
                            }
                          </span>
                        </div>
                        <div className="border-t border-blue-200 dark:border-blue-700 pt-1 mt-2">
                          <div className="flex justify-between font-medium">
                            <span>Total Platform Fees:</span>
                            <span>
                              {formData.approximatedBudget 
                                ? `$${(formData.approximatedBudget * 0.079 + 0.30).toFixed(2)}`
                                : "$79.30"
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <strong>Note:</strong> Fees are only charged upon successful project completion. 
                      Job posting and browsing proposals are completely free. This model ensures we're aligned 
                      with your success - we only succeed when you do.
                    </div>
                  </CardContent>
                </Card>

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

            {/* Step 3: Timeline */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="flex items-center gap-2">
                      <CalendarIcon className="mr-1" size={16} />
                      Bidding Start Date
                      <span className="text-destructive">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.biddingStartDate && "text-muted-foreground",
                            errors.biddingStartDate && "border-destructive"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.biddingStartDate ? format(formData.biddingStartDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.biddingStartDate}
                          onSelect={(date) => updateFormData("biddingStartDate", date)}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.biddingStartDate && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                        <AlertCircle size={14} />
                        {errors.biddingStartDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      <CalendarIcon className="mr-1" size={16} />
                      Bidding End Date
                      <span className="text-destructive">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.biddingEndDate && "text-muted-foreground",
                            errors.biddingEndDate && "border-destructive"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.biddingEndDate ? format(formData.biddingEndDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.biddingEndDate}
                          onSelect={(date) => updateFormData("biddingEndDate", date)}
                          disabled={(date) => date < new Date() || (formData.biddingStartDate && date <= formData.biddingStartDate)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.biddingEndDate && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                        <AlertCircle size={14} />
                        {errors.biddingEndDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Recommended Bidding Duration</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Small projects (under $1,000): 3-5 days</li>
                    <li>• Medium projects ($1,000-$5,000): 5-7 days</li>
                    <li>• Large projects (over $5,000): 7-14 days</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="flex items-center gap-2">
                      <CalendarIcon className="mr-1" size={16} />
                      Project Start Date (Optional)
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.projectStartDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.projectStartDate ? format(formData.projectStartDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.projectStartDate}
                          onSelect={(date) => updateFormData("projectStartDate", date)}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground mt-1">
                      When do you want the project to begin?
                    </p>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      <CalendarIcon className="mr-1" size={16} />
                      Project End Date (Optional)
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.projectEndDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.projectEndDate ? format(formData.projectEndDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.projectEndDate}
                          onSelect={(date) => updateFormData("projectEndDate", date)}
                          disabled={(date) => 
                            date < new Date() || 
                            (formData.projectStartDate && date <= formData.projectStartDate)
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground mt-1">
                      Expected completion date
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-blue-600 dark:text-blue-400 mt-0.5" size={16} />
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Timeline Tips</h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                        <li>• Allow enough time for quality bids to come in</li>
                        <li>• Consider time zones if working with global talent</li>
                        <li>• Buffer time for revisions and feedback</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Media & Guidelines */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="flex items-center gap-2 mb-4">
                    <Upload size={16} />
                    Project Images (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Upload project images</p>
                      <p className="text-sm text-muted-foreground">
                        Add images, mockups, or reference materials to help bidders understand your vision
                      </p>
                      <Button variant="outline" className="mt-4">
                        Choose Files
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Supported formats: JPG, PNG, GIF (max 10MB each, up to 10 images)
                    </p>
                  </div>

                  {formData.imageUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {formData.imageUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const newUrls = formData.imageUrls.filter((_, i) => i !== index);
                              updateFormData("imageUrls", newUrls);
                            }}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="guidelines" className="flex items-center gap-2">
                    Additional Guidelines & Requirements
                  </Label>
                  <Textarea
                    id="guidelines"
                    placeholder="Any specific requirements, preferred technologies, communication preferences, or additional details that bidders should know..."
                    rows={8}
                    value={formData.guidelines}
                    onChange={(e) => updateFormData("guidelines", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Include any special requirements, preferred tools, or working style preferences
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">What to Include</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Technical requirements</li>
                      <li>• Preferred technologies</li>
                      <li>• Communication preferences</li>
                      <li>• Deliverable formats</li>
                      <li>• Quality standards</li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Avoid Including</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Personal contact information</li>
                      <li>• Extremely detailed specifications</li>
                      <li>• Unrealistic expectations</li>
                      <li>• Overly restrictive requirements</li>
                      <li>• Biased language</li>
                    </ul>
                  </Card>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Review Your Job Posting</h3>
                  <p className="text-muted-foreground">
                    Please review all details before publishing. You can edit your job after posting if needed.
                  </p>
                </div>

                {/* Job Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{formData.title || "Untitled Job"}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{formData.category || "No category"}</Badge>
                      <Badge variant="outline">{formData.paymentType === "fixed" ? "Fixed Price" : "Hourly Rate"}</Badge>
                      <Badge variant="outline" className={
                        formData.urgencyLevel === "asap" ? "border-red-500 text-red-500" :
                        formData.urgencyLevel === "within_week" ? "border-yellow-500 text-yellow-500" :
                        "border-green-500 text-green-500"
                      }>
                        {formData.urgencyLevel === "asap" ? "Urgent" :
                         formData.urgencyLevel === "within_week" ? "Within a week" : "Flexible"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {formData.description || "No description provided"}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Location</h4>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <MapPin size={14} />
                          {formData.address || "No location specified"}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Bidding Structure & Budget</h4>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <DollarSign size={14} />
                          {formData.paymentType === "fixed" 
                            ? "Providers bid with total project cost"
                            : "Providers bid with hourly rates"
                          }
                        </p>
                        {formData.approximatedBudget && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Approximated budget: ${formData.approximatedBudget.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {(formData.biddingStartDate || formData.biddingEndDate) && (
                      <div>
                        <h4 className="font-medium mb-2">Timeline</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                          {formData.biddingStartDate && (
                            <p>Bidding starts: {format(formData.biddingStartDate, "PPP")}</p>
                          )}
                          {formData.biddingEndDate && (
                            <p>Bidding ends: {format(formData.biddingEndDate, "PPP")}</p>
                          )}
                          {formData.projectStartDate && (
                            <p>Project starts: {format(formData.projectStartDate, "PPP")}</p>
                          )}
                          {formData.projectEndDate && (
                            <p>Project due: {format(formData.projectEndDate, "PPP")}</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Materials</p>
                        <p className="font-medium">{formData.materialsProvided ? "Provided" : "Not provided"}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">MVA</p>
                        <p className="font-medium">{formData.mvaEnabled ? "Enabled" : "Disabled"}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Images</p>
                        <p className="font-medium">{formData.imageUrls.length} uploaded</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Guidelines</p>
                        <p className="font-medium">{formData.guidelines ? "Provided" : "None"}</p>
                      </div>
                    </div>

                    {formData.guidelines && (
                      <div>
                        <h4 className="font-medium mb-2">Additional Guidelines</h4>
                        <p className="text-muted-foreground whitespace-pre-wrap text-sm">
                          {formData.guidelines}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="text-green-600 dark:text-green-400 mt-0.5" size={16} />
                      <div>
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Ready to Publish</h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          Your job posting looks complete! Once published, it will be visible to our community of professionals. 
                          You can edit details or close the posting at any time from your dashboard.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>

          {/* Navigation */}
          <div className="flex justify-between p-6 border-t">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save size={16} className="mr-2" />
                Save as Draft
              </Button>
              {currentStep === steps.length ? (
                <Button onClick={handlePublish} className="bg-gradient-to-r from-primary to-accent hover:shadow-lg">
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

        {/* Sharing Dialog */}
        <Dialog open={showSharingDialog} onOpenChange={setShowSharingDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Share2 size={24} className="text-primary" />
                Boost Your Job Visibility!
              </DialogTitle>
              <DialogDescription className="text-base">
                Share your job posting on social media and professional networks to attract more qualified bidders faster.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Benefits */}
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-4">
                  <h3 className="font-medium text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                    <CheckCircle size={16} />
                    Why Share Your Job Post?
                  </h3>
                  <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                    <li>• Get 3x more qualified applicants</li>
                    <li>• Reduce time to hire by 50%</li>
                    <li>• Reach professionals in your network</li>
                    <li>• Increase project success rate</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Sharing Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(() => {
                  const { shortPost, detailedPost, linkedInPost } = generateSharingContent();
                  
                  const sharingOptions = [
                    {
                      key: "short",
                      title: "Twitter/X & Quick Posts",
                      description: "Perfect for Twitter, Instagram stories, or quick social media posts",
                      content: shortPost,
                      platforms: ["Twitter/X", "Instagram", "Facebook"]
                    },
                    {
                      key: "detailed",
                      title: "Detailed Social Media Post",
                      description: "Great for Facebook, professional groups, or community forums",
                      content: detailedPost,
                      platforms: ["Facebook", "Reddit", "Discord"]
                    },
                    {
                      key: "linkedin",
                      title: "LinkedIn Professional Post",
                      description: "Optimized for LinkedIn and professional networks",
                      content: linkedInPost,
                      platforms: ["LinkedIn", "Professional Groups"]
                    }
                  ];

                  return sharingOptions.map((option) => (
                    <Card key={option.key} className="h-fit">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{option.title}</CardTitle>
                        <CardDescription className="text-sm">{option.description}</CardDescription>
                        <div className="flex gap-1 flex-wrap">
                          {option.platforms.map((platform) => (
                            <Badge key={platform} variant="secondary" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="bg-muted/50 p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                          <pre className="whitespace-pre-wrap font-sans">{option.content}</pre>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyToClipboard(option.content, option.key)}
                          className="w-full"
                        >
                          {copiedItems[option.key] ? (
                            <>
                              <CheckCircle size={14} className="mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={14} className="mr-2" />
                              Copy to Clipboard
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ));
                })()}
              </div>

              {/* Recommended Platforms */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <ExternalLink size={16} />
                    Recommended Platforms to Share
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="space-y-2">
                      <h4 className="font-medium">Professional</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• LinkedIn</li>
                        <li>• AngelList</li>
                        <li>• GitHub</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Social Media</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Twitter/X</li>
                        <li>• Facebook</li>
                        <li>• Instagram</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Communities</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Reddit</li>
                        <li>• Discord</li>
                        <li>• Slack groups</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Direct Reach</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Email contacts</li>
                        <li>• WhatsApp</li>
                        <li>• Team chats</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSharingDialog(false);
                    onClose();
                  }}
                  className="flex-1"
                >
                  Maybe Later
                </Button>
                <Button
                  onClick={() => {
                    setShowSharingDialog(false);
                    onClose();
                    toast({
                      title: "Happy Sharing!",
                      description: "Your job post is live and ready to attract great talent.",
                    });
                  }}
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};