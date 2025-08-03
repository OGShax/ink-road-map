import { BookOpen, PlayCircle, FileText, Users, Clock, Star, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const StudyCenter = () => {
  const courses = [
    {
      id: 1,
      title: "Complete Hair Styling Mastery",
      category: "Hair Styling",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 12500,
      duration: "8 hours",
      level: "Beginner to Advanced",
      price: "$199",
      image: "/placeholder.svg",
      description: "Learn advanced hair styling techniques from celebrity stylist Sarah Johnson."
    },
    {
      id: 2,
      title: "Professional Tattoo Artistry",
      category: "Tattoo",
      instructor: "Mike Rodriguez",
      rating: 4.8,
      students: 8200,
      duration: "12 hours",
      level: "Intermediate",
      price: "$299",
      image: "/placeholder.svg",
      description: "Master the art of professional tattooing with safety protocols and advanced techniques."
    },
    {
      id: 3,
      title: "Therapeutic Massage Certification",
      category: "Massage",
      instructor: "Dr. Lisa Chen",
      rating: 4.9,
      students: 15000,
      duration: "20 hours",
      level: "Beginner",
      price: "$399",
      image: "/placeholder.svg",
      description: "Get certified in therapeutic massage with this comprehensive course."
    },
    {
      id: 4,
      title: "Construction Project Management",
      category: "Construction",
      instructor: "Robert Williams",
      rating: 4.7,
      students: 6500,
      duration: "15 hours",
      level: "Advanced",
      price: "$249",
      image: "/placeholder.svg",
      description: "Learn to manage construction projects efficiently and profitably."
    }
  ];

  const articles = [
    {
      title: "10 Essential Tools Every Hair Stylist Needs",
      category: "Hair Styling",
      readTime: "5 min read",
      views: "2.5K views"
    },
    {
      title: "Tattoo Aftercare: A Complete Guide",
      category: "Tattoo",
      readTime: "8 min read",
      views: "4.1K views"
    },
    {
      title: "Building Your Construction Business",
      category: "Construction",
      readTime: "12 min read",
      views: "1.8K views"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ProConnect Study Center</h1>
          <p className="text-xl mb-8 opacity-90">Master your craft with expert-led courses and resources</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              50,000+ Students
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              Certified Courses
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Career Growth
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="courses">Online Courses</TabsTrigger>
            <TabsTrigger value="articles">Articles & Guides</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-primary" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{course.category}</Badge>
                      <span className="text-lg font-bold text-primary">{course.price}</span>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <p className="text-muted-foreground">{course.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>By {course.instructor}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="w-fit">{course.level}</Badge>
                      <Button className="w-full" size="lg">
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                    <FileText className="w-16 h-16 text-primary" />
                  </div>
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">{article.category}</Badge>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{article.readTime}</span>
                      <span>{article.views}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-8">
            <div className="text-center py-12">
              <Award className="w-24 h-24 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Professional Certifications</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Earn industry-recognized certifications to boost your credibility and attract more clients. 
                Our certification programs are designed by industry experts and recognized by professional organizations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {["Hair Styling Professional", "Certified Tattoo Artist", "Licensed Massage Therapist", "Construction Safety Certified", "Nail Technician Licensed", "Master Barber Certified"].map((cert, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{cert}</h3>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};