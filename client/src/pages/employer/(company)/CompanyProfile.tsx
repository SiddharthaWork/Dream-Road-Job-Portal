'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, Globe, Users, MapPin, Edit, Save, X, CheckCircle, Clock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

interface CompanyData {
  name: string;
  website: string;
  email: string;
  industry: string;
  size: string;
  description: string;
  location: string;
  founded: string;
  employees: string;
  benefits: string;
  logo: string;
}

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get company data from localStorage (mock data)
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    website: '',
    email: '',
    industry: '',
    size: '',
    description: '',
    location: '',
    founded: '',
    employees: '',
    benefits: '',
    logo: '',
  });

  const [formData, setFormData] = useState<CompanyData>(companyData);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/company/getcompany/${localStorage.getItem('companyId')}`);
        const data = response.data.data;
        setCompanyData({
          name: data.name,
          website: data.website,
          email: data.email,
          industry: data.industry,
          size: data.size,
          description: data.description,
          location: data.location,
          founded: data.founded,
          employees: data.employees,
          benefits: data.benefits,
          logo: data.logo,
        });
        setFormData({
          name: data.name,
          website: data.website,
          email: data.email,
          industry: data.industry,
          size: data.size,
          description: data.description,
          location: data.location,
          founded: data.founded,
          employees: data.employees,
          benefits: data.benefits,
          logo: data.logo,
        });
      } catch (error) {
        console.error('Failed to fetch company data', error);
        toast.error("Failed to fetch company data.");
      }
    };

    fetchCompanyData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: keyof CompanyData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({ ...prev, logo: event?.target?.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append updated fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== companyData[key as keyof CompanyData]) {
          formDataToSend.append(key, value as string);
        }
      });

      // Append logo file if changed
      if (logoFile) {
        formDataToSend.append('file', logoFile);
      }

      const response = await axios.put(
        `http://localhost:4000/api/company/updatecompany/${localStorage.getItem('companyId')}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Update company data with response
      setCompanyData(response.data.data);

      toast.success("Company profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error("Failed to update company profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(companyData);
    setIsEditing(false);
  };

  const verificationStatus = 'pending';

  // const getVerificationBadge = () => {
  //   switch (verificationStatus) {
  //     case 'verified':
  //       return (
  //         <Badge className="bg-green-100 text-green-800">
  //           <CheckCircle className="h-3 w-3 mr-1" />
  //           Verified
  //         </Badge>
  //       );
  //     case 'pending':
  //       return (
  //         <Badge className="bg-yellow-100 text-yellow-800">
  //           <Clock className="h-3 w-3 mr-1" />
  //           Pending Verification
  //         </Badge>
  //       );
  //     default:
  //       return (
  //         <Badge className="bg-gray-100 text-gray-800">
  //           <X className="h-3 w-3 mr-1" />
  //           Not Verified
  //         </Badge>
  //       );
  //   }
  // };

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
              <div className="h-16 w-16">
                <img src={companyData.logo || '/placeholder.png'} alt="logo" className="h-16 w-16 rounded-full" />
              </div>
              <div>
                <CardTitle className="text-2xl">{companyData.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Globe className="h-4 w-4" />
                  {companyData.website}
                </CardDescription>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  {companyData.email}
                </CardDescription>
              </div>
            </div>
            {/* {getVerificationBadge()} */}
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
                <p className="font-medium">{companyData.size}</p>
                <p className="text-sm text-gray-500">Employees</p>
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
                  disabled={isEditing}
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
            {isEditing ? (
              <>
              <Label>Logo</Label>
              <Input
                type="file"
                id="logo"
                name="logo"
                onChange={handleFileChange}
              />
              </>
            ) : (
              // <img src={companyData.logo || '/placeholder.png'} alt="logo" className="h-16 w-16 rounded-full" />
              <></>
            )}
          </div>

        </CardContent>
      </Card>

      {/* Verification Status */}
      {/* {verificationStatus === 'pending' && (
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
      )} */}
    </div>
  );
};

export default CompanyProfile;
