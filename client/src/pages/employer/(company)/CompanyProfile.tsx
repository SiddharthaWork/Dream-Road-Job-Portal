'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, Globe, Users, MapPin, Edit, Save, X, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Get company data from localStorage (mock data)
  const [companyData, setCompanyData] = useState({
    name: 'LeapFrog',
    website: 'https://leapfrog.com',
    industry: 'Technology',
    size: '51-200',
    description: 'We are a leading technology company focused on creating innovative solutions for modern businesses. Our team is passionate about delivering high-quality software products that make a difference.',
    location: 'Kathmandu, Bāgmatī, Nepal',
    founded: '2018',
    employees: '150+',
    benefits: 'Health insurance, Dental coverage, Vision insurance, 401(k) matching, Flexible PTO, Remote work options, Professional development budget',
  });

  const [formData, setFormData] = useState(companyData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Mock save
    setTimeout(() => {
      setCompanyData(formData);
      localStorage.setItem('company_data', JSON.stringify(formData));
      setIsEditing(false);
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your company profile has been updated successfully.",
      });
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(companyData);
    setIsEditing(false);
  };

  const verificationStatus = localStorage.getItem('company_verified') || 'pending';

  const getVerificationBadge = () => {
    switch (verificationStatus) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending Verification
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <X className="h-3 w-3 mr-1" />
            Not Verified
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Company Profile</h2>
          <p className="text-muted-foreground">Manage your company information and settings</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Company Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" />
                <AvatarFallback className="text-lg">
                  <Building2 className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{companyData.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Globe className="h-4 w-4" />
                  {companyData.website}
                </CardDescription>
              </div>
            </div>
            {getVerificationBadge()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">{companyData.industry}</p>
                <p className="text-sm text-gray-500">Industry</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">{companyData.employees}</p>
                <p className="text-sm text-gray-500">Employees</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">{companyData.location}</p>
                <p className="text-sm text-gray-500">Location</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Details */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            {isEditing ? 'Update your company details' : 'Your company information'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{companyData.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              {isEditing ? (
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{companyData.website}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Industry</Label>
              {isEditing ? (
                <Select value={formData.industry} onValueChange={(value) => handleSelectChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{companyData.industry}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Company Size</Label>
              {isEditing ? (
                <Select value={formData.size} onValueChange={(value) => handleSelectChange('size', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{companyData.size}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            {isEditing ? (
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-sm p-3 bg-gray-50 rounded leading-relaxed">{companyData.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits & Perks</Label>
            {isEditing ? (
              <Textarea
                id="benefits"
                name="benefits"
                rows={3}
                value={formData.benefits}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-sm p-3 bg-gray-50 rounded leading-relaxed">{companyData.benefits}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Verification Status */}
      {verificationStatus === 'pending' && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <h4 className="font-medium text-yellow-800">Verification Pending</h4>
                <p className="text-sm text-yellow-700">
                  Your company profile is under review. This usually takes 24-48 hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyProfile;
