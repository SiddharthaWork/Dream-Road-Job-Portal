'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Upload, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState({
    name: '',
    website: '',
    industry: '',
    size: '',
    description: '',
    password: '',
    logo: null as File | null,
    email: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    website: '',
    industry: '',
    size: '',
    description: '',
    password: '',
    logo: '',
    email: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handlePhoneNumberChange = (value: string) => {
    setCompanyData(prev => ({ ...prev, phoneNumber: value }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    // Reset errors
    (Object.keys(newErrors) as Array<keyof typeof newErrors>).forEach(key => {
      newErrors[key] = '';
    });

    // Validate name
    if (!companyData.name.trim()) {
      newErrors.name = 'Company name is required';
      isValid = false;
    } else if (companyData.name.trim().length < 4) {
      newErrors.name = 'Company name must be at least 4 characters';
      isValid = false;
    } else if (companyData.name.trim().length > 30) {
      newErrors.name = 'Company name must be at most 30 characters';
      isValid = false;
    }

    // Validate email
    if (!companyData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(companyData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Validate phoneNumber
    const phoneDigits = companyData.phoneNumber.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (phoneDigits.length < 10) {
      newErrors.phoneNumber = 'Phone number must be at least 10 digits';
      isValid = false;
    }

    // Validate industry
    if (!companyData.industry) {
      newErrors.industry = 'Industry is required';
      isValid = false;
    }

    // Validate size
    if (!companyData.size) {
      newErrors.size = 'Company size is required';
      isValid = false;
    }

    // Validate password
    if (!companyData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (companyData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (companyData.password.length > 20) {
      newErrors.password = 'Password must be at most 20 characters';
      isValid = false;
    }

    // Validate website
    if (!companyData.website) {
      newErrors.website = 'Website is required';
      isValid = false;
    } else if (companyData.website.length < 4) {
      newErrors.website = 'Website must be at least 4 characters';
      isValid = false;
    } else {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(companyData.website)) {
        newErrors.website = 'Please enter a valid website URL';
        isValid = false;
      }
    }

    // Validate logo
    if (!companyData.logo) {
      newErrors.logo = 'Company logo is required';
      isValid = false;
    }

    // Validate description
    if (!companyData.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (companyData.description.length < 4) {
      newErrors.description = 'Description must be at least 4 characters';
      isValid = false;
    } else if (companyData.description.length > 100) {
      newErrors.description = 'Description must be at most 100 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', companyData.name);
    formDataToSend.append('website', companyData.website);
    formDataToSend.append('industry', companyData.industry);
    formDataToSend.append('size', companyData.size);
    formDataToSend.append('description', companyData.description);
    formDataToSend.append('password', companyData.password);
    formDataToSend.append('email', companyData.email); 
    formDataToSend.append('phoneNumber', companyData.phoneNumber); 
    formDataToSend.append('role', 'company'); 
    if (companyData.logo) {
      formDataToSend.append('file', companyData.logo);
    }

    try {
      const response = await fetch('http://localhost:4000/api/company/register', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

     toast.success("Company registered successfully");
      router.push('/employer/login');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    toast.success("Company profile created");
    router.push('/employer/login');
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
              Continue to Login
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
                  
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website *</Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="https://acme.com"
                  value={companyData.website}
                  onChange={handleInputChange}
                />
                {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
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
                {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
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
                {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
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
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Company Logo *</Label>
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
              {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Company Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  value={companyData.email}
                  onChange={handleInputChange}
                
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="123-456-7890"
                  value={companyData.phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits up to 10
                    if (/^\d{0,10}$/.test(value)) {
                      handlePhoneNumberChange(value);
                    }
                  }}
                  maxLength={10}
                  
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                  value={companyData.password}
                  onChange={handleInputChange}
                  
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
            

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Company"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
