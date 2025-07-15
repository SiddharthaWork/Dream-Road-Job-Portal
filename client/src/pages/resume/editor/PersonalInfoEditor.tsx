"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo } from "@/types/resume";
import { useEffect, useRef } from "react";

interface PersonalInfoEditorProps {
  personalInfo: PersonalInfo;
  onUpdate: (personalInfo: PersonalInfo) => void;
}

export const PersonalInfoEditor = ({ personalInfo, onUpdate }: PersonalInfoEditorProps) => {
  const { register, watch, setValue } = useForm<PersonalInfo>({
    defaultValues: personalInfo
  });

  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    const subscription = watch((value) => {
      onUpdateRef.current(value as PersonalInfo);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-resume-heading">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input 
                id="fullName"
                {...register("fullName")}
                placeholder="Your full name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input 
                id="jobTitle"
                {...register("jobTitle")}
                placeholder="Your current or desired position"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email"
                type="email"
                {...register("email")}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input 
                id="phone"
                {...register("phone")}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address"
              {...register("address")}
              placeholder="City, State, Country"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input 
                id="linkedin"
                {...register("linkedin")}
                placeholder="linkedin.com/in/yourprofile"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website"
                {...register("website")}
                placeholder="yourportfolio.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="summary">Professional Summary *</Label>
            <Textarea 
              id="summary"
              {...register("summary")}
              placeholder="Write a brief summary of your professional background and career objectives..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    notFound: true,
  };
};

export default PersonalInfoEditor;