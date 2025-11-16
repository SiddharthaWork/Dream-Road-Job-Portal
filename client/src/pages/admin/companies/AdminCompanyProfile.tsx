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
import { Building2, Globe, Users, MapPin, Edit, Save, X, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

interface CompanyData {
  name: string;
  website: string;
  industry: string;
  size: string;
  description: string;
  location: string;
  founded: string;
  employees: string;
  benefits: string;
  logo: string;
}

const AdminCompanyProfile = () => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    website: '',
    industry: '',
    size: '',
    description: '',
    location: '',
    founded: '',
    employees: '',
    benefits: '',
    logo: '',
  });
  const [verificationStatus, setVerificationStatus] = useState<any>();

  const params = useParams<any>();
  const id = params?.id;

    useEffect(() => {
      if (!id) {
        return;
      }
      fetchCompanyData();
    }, [id]);

    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/company/getcompany/${id}`);
        const data = response.data.data;
        setVerificationStatus(response.data.data.adminApproved);

        setCompanyData({
          name: data.name,
          website: data.website,
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

  const approveCompany = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/approveCompany/${id}`);
      const data = response.data.data;
      toast.success("Company approved successfully");
      fetchCompanyData();

    } catch (error) {
      console.error('Failed to approve company', error);
      toast.error("Failed to approve company.");
    }
  };

  const rejectCompany = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rejectCompany/${id}`);
      const data = response.data.data;
      toast.success("Company rejected successfully");
      fetchCompanyData();
    } catch (error) {
      console.error('Failed to reject company', error);
      toast.error("Failed to reject company.");
    }
  };


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Company Profile</h2>
          <p className="text-muted-foreground">View company information</p>
        </div>
        <div className="flex items-center gap-2" >
          <Button
            onClick={approveCompany}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={verificationStatus}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Company
          </Button>

          <Button
            onClick={rejectCompany}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <X className="h-4 w-4 mr-2" />
            Reject Company
          </Button>
        </div>
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
              </div>
            </div>
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
            Company information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <p className="text-sm p-2 bg-gray-50 rounded">{companyData.name}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <p className="text-sm p-2 bg-gray-50 rounded">{companyData.website}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Industry</Label>
              <p className="text-sm p-2 bg-gray-50 rounded">{companyData.industry}</p>
            </div>
            <div className="space-y-2">
              <Label>Company Size</Label>
              <p className="text-sm p-2 bg-gray-50 rounded">{companyData.size}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <p className="text-sm p-3 bg-gray-50 rounded leading-relaxed">{companyData.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCompanyProfile;
