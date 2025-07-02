'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState({
    name: '',
    website: '',
    industry: '',
    size: '',
    description: '',
    logo: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyData(prev => ({
        ...prev,
        logo: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock company creation
    setTimeout(() => {
      localStorage.setItem('company_data', JSON.stringify(companyData));
      localStorage.setItem('company_verified', 'pending');
      setStep(2);
      setIsLoading(false);
    }, 1500);
  };

  const handleContinue = () => {
    toast({
      title: "Company profile created",
      description: "Welcome to your Dream Road dashboard!",
    });
    router.push('/employer/dashboard');
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold">Company Profile Created!</CardTitle>
            <CardDescription>
              Your company information has been submitted for verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Verification Status:</strong> Pending
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                We'll review your company information within 24-48 hours.
              </p>
            </div>
            <Button onClick={handleContinue} className="w-full">
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Company Information</CardTitle>
          <CardDescription>Tell us about your company to complete your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Acme Corporation"
                  value={companyData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="https://acme.com"
                  value={companyData.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Industry *</Label>
                <Select onValueChange={(value) => handleSelectChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Company Size *</Label>
                <Select onValueChange={(value) => handleSelectChange('size', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
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
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell us about your company, culture, and mission..."
                rows={4}
                value={companyData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Company Logo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="mt-2"
                />
              </div>
              {companyData.logo && (
                <p className="text-sm text-green-600">
                  Logo uploaded: {companyData.logo.name}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating company profile..." : "Create Company Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
