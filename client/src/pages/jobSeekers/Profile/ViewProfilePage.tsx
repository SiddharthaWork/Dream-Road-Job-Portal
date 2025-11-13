"use client"
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  sectors: string[];
  designation: string;
  aboutMe: string;
  city: string;
  currentAddress: string;
  postalCode: string;
  province: string;
  education: Array<{
    collegeType: string;
    degree: string;
    city: string;
    startDate: string;
    graduationDate: string;
    currentlyStudying: boolean;
    id: string;
  }>;
  skills: string;
  achievements: Array<{
    title: string;
    description: string;
    id: string;
  }>;
  certificates: Array<{
    title: string;
    issuedBy: string;
    issueDate: string;
    expirationDate: string;
    id: string;
  }>;
  experiences: Array<{
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    location: string;
    description: string;
    id: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    projectLink: string;
    id: string;
  }>;
}

export default function ViewProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
  const [resumeUrl, setResumeUrl] = useState<string>('');
  const [username, setUsername] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<ProfileFormData>({
    defaultValues: {
      // ... any default values ...
    },
    mode: 'onChange',
  });

  const onSubmit = async (formData: ProfileFormData) => {
    if (!userId) return;
    setIsSaving(true);

    const skillsArray = formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : [];

    const dataToSend = {
      ...formData,
      skills: skillsArray
    };

    const formDataToSend = new FormData();
    formDataToSend.append('userId', userId);
    formDataToSend.append('data', JSON.stringify(dataToSend));

    if (profilePictureFile) {
      formDataToSend.append('profilePicture', profilePictureFile);
    }
    if (resumeFile) {
      formDataToSend.append('resume', resumeFile);
    }

    try {
      const response = await fetch('http://localhost:4000/api/user/save-profile', {
        method: 'PUT',
        body: formDataToSend,
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Profile updated successfully');
        // Optionally, refetch the profile
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating the profile');
    } finally {
      setIsSaving(false);
    }
  };

  // Initialize field arrays
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const { fields: achievementFields, append: appendAchievement, remove: removeAchievement } = useFieldArray({
    control,
    name: 'achievements'
  });

  const { fields: certificateFields, append: appendCertificate, remove: removeCertificate } = useFieldArray({
    control,
    name: 'certificates'
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experiences'
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fullname = localStorage.getItem('fullname');
    const isProfileComplete = localStorage.getItem('profile');
    if (!userId) {
      console.error("User ID not found in localStorage");
      setLoading(false);
      return;
    }
    setUserId(userId);
    setUsername(fullname);
    setIsProfileComplete(isProfileComplete === 'true');
  }, []);
  console.log(username);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:4000/api/user/getuser/${userId}`);
          const data = await response.json();
          console.log(data);
          if (data.success) {
            setProfile(data.data);
            const profileData = data.data.profile;
            if (profileData) {
              reset({
                ...profileData,
                skills: profileData.skills ? profileData.skills.join(', ') : ''
              });
            } else {
              reset(profileData);
            }
            setProfilePictureUrl(data.data.profile?.profilePicture || '');
            setResumeUrl(data.data.profile?.resume || '');
          }
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [userId, reset]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  // Show profile completion prompt if profile is not complete
  if (!isProfileComplete) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Profile</h2>
            <p className="text-gray-600 mb-6">
              Please complete your profile to access all features and get personalized job recommendations.
            </p>
          </div>
          <Button
            onClick={() => router.push('/profile')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Complete Profile Now
          </Button>
        </div>
      </div>
      );
  }


  return (
    <div className="container mx-auto p-4 max-w-7xl">

      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* About Yourself Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">About Yourself</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Full Name</label>
              <input className="w-full p-2 border rounded" value={username} readOnly />
            </div>

            <div>
              <label className="block mb-1">Gender</label>
              <select className="w-full p-2 border rounded" {...register('gender')}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Phone Number</label>
              <input className="w-full p-2 border rounded" {...register('phoneNumber', { required: true, pattern: /^\d{10}$/ })} />
              {errors.phoneNumber && <p className="text-red-500">Phone number must be exactly 10 digits</p>}
            </div>
            <div>
              <label className="block mb-1">Date of Birth</label>
              <input 
                type="date" 
                className="w-full p-2 border rounded" 
                {...register('dateOfBirth', { 
                  required: 'Date of birth is required',
                  validate: {
                    notFuture: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return selectedDate <= today || 'Date of birth cannot be in the future';
                    },
                    minimumAge: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      const age = today.getFullYear() - selectedDate.getFullYear();
                      const monthDiff = today.getMonth() - selectedDate.getMonth();
                      const dayDiff = today.getDate() - selectedDate.getDate();
                      const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
                      return actualAge >= 18 || 'You must be at least 18 years old';
                    }
                  }
                })} 
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
            </div>
            <div className="col-span-2">
              <label className="block mb-1">About Me</label>
              <textarea 
                className="w-full p-2 border rounded" 
                {...register('aboutMe', { 
                  required: 'About me is required',
                  validate: {
                    wordCount: (value) => {
                      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
                      const wordCount = words.length;
                      if (wordCount < 10) return 'About me must be at least 10 words';
                      if (wordCount > 100) return 'About me must not exceed 100 words';
                      return true;
                    }
                  }
                })} 
                rows={3} 
              />
              {errors.aboutMe && <p className="text-red-500 text-sm mt-1">{errors.aboutMe.message}</p>}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">City</label>
              <input 
                className="w-full p-2 border rounded" 
                {...register('city', {
                  minLength: {
                    value: 2,
                    message: 'City must be at least 2 characters'
                  },
                  maxLength: {
                    value: 30,
                    message: 'City must not exceed 30 characters'
                  }
                })} 
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            {/* <div>
              <label className="block mb-1">Current Address</label>
              <input 
                className="w-full p-2 border rounded" 
                {...register('currentAddress', {
                  minLength: {
                    value: 2,
                    message: 'Current address must be at least 2 characters'
                  },
                  maxLength: {
                    value: 30,
                    message: 'Current address must not exceed 30 characters'
                  }
                })} 
              />
              {errors.currentAddress && <p className="text-red-500 text-sm mt-1">{errors.currentAddress.message}</p>}
            </div> */}
            <div>
              <label className="block mb-1">Postal Code</label>
              <input 
                className="w-full p-2 border rounded" 
                {...register('postalCode', {
                  maxLength: {
                    value: 8,
                    message: 'Postal code must not exceed 8 characters'
                  }
                })} 
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
            </div>
            {/* <div>
              <label className="block mb-1">Province</label>
              <input className="w-full p-2 border rounded" {...register('province')} />
            </div> */}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Education</h2>
            <button type="button" onClick={() => appendEducation({ collegeType: '', degree: '', city: '', startDate: '', graduationDate: '', currentlyStudying: false, id: Date.now().toString() })} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Education
            </button>
          </div>
          {educationFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">College Type <span className="text-red-500">*</span></label>
                  <input 
                    className="w-full p-2 border rounded" 
                    {...register(`education.${index}.collegeType`, {
                      required: 'College type is required'
                    })} 
                  />
                  {errors.education?.[index]?.collegeType && (
                    <p className="text-red-500 text-sm mt-1">{errors.education[index]?.collegeType?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Degree <span className="text-red-500">*</span></label>
                  <input 
                    className="w-full p-2 border rounded" 
                    {...register(`education.${index}.degree`, {
                      required: 'Degree is required'
                    })} 
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="text-red-500 text-sm mt-1">{errors.education[index]?.degree?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Name <span className="text-red-500">*</span></label>
                  <input 
                    className="w-full p-2 border rounded" 
                    {...register(`education.${index}.city`, {
                      required: 'Name is required'
                    })} 
                  />
                  {errors.education?.[index]?.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.education[index]?.city?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Start Date</label>
                  <input 
                    type="date" 
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 border rounded" 
                    {...register(`education.${index}.startDate`, {
                      required: 'Start date is required',
                      validate: (value) => {
                        if (value && new Date(value) > new Date()) {
                          return 'Start date cannot be in the future';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.education?.[index]?.startDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.education[index]?.startDate?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Graduation Date</label>
                  <input 
                    type="date" 
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 border rounded" 
                    {...register(`education.${index}.graduationDate`, {
                      validate: (value) => {
                        if (value && new Date(value) > new Date()) {
                          return 'Graduation date cannot be in the future';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.education?.[index]?.graduationDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.education[index]?.graduationDate?.message}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" {...register(`education.${index}.currentlyStudying`)} />
                  <label>Currently Studying</label>
                </div>
              </div>
              <button type="button" onClick={() => removeEducation(index)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <input className="w-full p-2 border rounded" {...register('skills')} placeholder="Comma separated skills" />
        </div>

        {/* Achievements Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Achievements</h2>
            <button type="button" onClick={() => appendAchievement({ title: '', description: '', id: Date.now().toString() })} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Achievement
            </button>
          </div>
          {achievementFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Title <span className="text-red-500">*</span></label>
                  <input 
                    className="w-full p-2 border rounded" 
                    {...register(`achievements.${index}.title`, {
                      required: 'Title is required',
                      maxLength: {
                        value: 40,
                        message: 'Title must not exceed 40 characters'
                      }
                    })} 
                  />
                  {errors.achievements?.[index]?.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.achievements[index]?.title?.message}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block mb-1">Description <span className="text-red-500">*</span></label>
                  <textarea 
                    className="w-full p-2 border rounded" 
                    {...register(`achievements.${index}.description`, {
                      required: 'Description is required'
                    })} 
                    rows={3} 
                  />
                  {errors.achievements?.[index]?.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.achievements[index]?.description?.message}</p>
                  )}
                </div>
              </div>
              <button type="button" onClick={() => removeAchievement(index)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Certificates Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Certificates</h2>
            <button type="button" onClick={() => appendCertificate({ title: '', issuedBy: '', issueDate: '', expirationDate: '', id: Date.now().toString() })} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Certificate
            </button>
          </div>
          {certificateFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Title</label>
                  <input 
                    className="w-full p-2 border rounded" 
                    {...register(`certificates.${index}.title`, {
                      maxLength: {
                        value: 40,
                        message: 'Title must not exceed 40 characters'
                      },
                      validate: (value, formValues) => {
                        const issueDate = formValues.certificates?.[index]?.issueDate;
                        const expirationDate = formValues.certificates?.[index]?.expirationDate;
                        if ((issueDate || expirationDate) && (!value || !value.trim())) {
                          return 'Title is required when dates are provided';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.certificates?.[index]?.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.certificates[index]?.title?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Issued By <span className="text-red-500">*</span></label>
                  <input 
                    className="w-full p-2 border rounded" 
                    {...register(`certificates.${index}.issuedBy`, {
                      required: 'Issued by is required'
                    })} 
                  />
                  {errors.certificates?.[index]?.issuedBy && (
                    <p className="text-red-500 text-sm mt-1">{errors.certificates[index]?.issuedBy?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Issue Date</label>
                  <input 
                    type="date" 
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 border rounded" 
                    {...register(`certificates.${index}.issueDate`, {
                      required: 'Issue date is required',
                      validate: (value) => {
                        if (value && new Date(value) > new Date()) {
                          return 'Issue date cannot be in the future';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.certificates?.[index]?.issueDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.certificates[index]?.issueDate?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Expiration Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded" 
                    {...register(`certificates.${index}.expirationDate`, {
                      validate: (value, formValues) => {
                        const issueDate = formValues.certificates?.[index]?.issueDate;
                        if (value && issueDate && new Date(value) < new Date(issueDate)) {
                          return 'Expiration date cannot be earlier than issue date';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.certificates?.[index]?.expirationDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.certificates[index]?.expirationDate?.message}</p>
                  )}
                </div>
              </div>
              <button type="button" onClick={() => removeCertificate(index)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Experiences Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Experiences</h2>
            <button type="button" onClick={() => appendExperience({ jobTitle: '', company: '', startDate: '', endDate: '', currentlyWorking: false, location: '', description: '', id: Date.now().toString() })} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Experience
            </button>
          </div>
          {experienceFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Job Title</label>
                  <input 
                    className="w-full p-2 border rounded" 
                    {...register(`experiences.${index}.jobTitle`, {
                      maxLength: {
                        value: 40,
                        message: 'Job title must not exceed 40 characters'
                      },
                      validate: (value, formValues) => {
                        const startDate = formValues.experiences?.[index]?.startDate;
                        const endDate = formValues.experiences?.[index]?.endDate;
                        if ((startDate || endDate) && (!value || !value.trim())) {
                          return 'Job title is required when dates are provided';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.experiences?.[index]?.jobTitle && (
                    <p className="text-red-500 text-sm mt-1">{errors.experiences[index]?.jobTitle?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Company <span className="text-red-500">*</span></label>
                  <input 
                    className="w-full p-2 border rounded" 
                    {...register(`experiences.${index}.company`, {
                      required: 'Company is required'
                    })} 
                  />
                  {errors.experiences?.[index]?.company && (
                    <p className="text-red-500 text-sm mt-1">{errors.experiences[index]?.company?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Start Date</label>
                  <input 
                    type="date" 
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 border rounded" 
                    {...register(`experiences.${index}.startDate`, {
                      required: 'Start date is required',
                      validate: (value) => {
                        if (value && new Date(value) > new Date()) {
                          return 'Start date cannot be in the future';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.experiences?.[index]?.startDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.experiences[index]?.startDate?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">End Date</label>
                  <input 
                    type="date" 
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 border rounded" 
                    {...register(`experiences.${index}.endDate`, {
                      validate: (value, formValues) => {
                        const startDate = formValues.experiences?.[index]?.startDate;
                        const currentlyWorking = formValues.experiences?.[index]?.currentlyWorking;
                        if (value && new Date(value) > new Date()) {
                          return 'End date cannot be in the future';
                        }
                        if (value && startDate && !currentlyWorking && new Date(value) < new Date(startDate)) {
                          return 'End date cannot be earlier than start date';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.experiences?.[index]?.endDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.experiences[index]?.endDate?.message}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" {...register(`experiences.${index}.currentlyWorking`)} />
                  <label>Currently Working</label>
                </div>
                <div>
                  <label className="block mb-1">Location <span className="text-red-500">*</span></label>
                  <input 
                    className="w-full p-2 border rounded" 
                    {...register(`experiences.${index}.location`, {
                      required: 'Location is required'
                    })} 
                  />
                  {errors.experiences?.[index]?.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.experiences[index]?.location?.message}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block mb-1">Description <span className="text-red-500">*</span></label>
                  <textarea 
                    className="w-full p-2 border rounded" 
                    {...register(`experiences.${index}.description`, {
                      required: 'Description is required'
                    })} 
                    rows={3} 
                  />
                  {errors.experiences?.[index]?.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.experiences[index]?.description?.message}</p>
                  )}
                </div>
              </div>
              <button type="button" onClick={() => removeExperience(index)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Projects</h2>
            <button type="button" onClick={() => appendProject({ title: '', description: '', startDate: '', endDate: '', projectLink: '', id: Date.now().toString() })} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Project
            </button>
          </div>
          {projectFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Title</label>
                  <input 
                    className="w-full p-2 border rounded" 
                    {...register(`projects.${index}.title`, {
                      maxLength: {
                        value: 40,
                        message: 'Title must not exceed 40 characters'
                      },
                      validate: (value, formValues) => {
                        const startDate = formValues.projects?.[index]?.startDate;
                        const endDate = formValues.projects?.[index]?.endDate;
                        if ((startDate || endDate) && (!value || !value.trim())) {
                          return 'Title is required when dates are provided';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.projects?.[index]?.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.projects[index]?.title?.message}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block mb-1">Description <span className="text-red-500">*</span></label>
                  <textarea 
                    className="w-full p-2 border rounded" 
                    {...register(`projects.${index}.description`, {
                      required: 'Description is required'
                    })} 
                    rows={3} 
                  />
                  {errors.projects?.[index]?.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.projects[index]?.description?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Start Date</label>
                  <input 
                    type="date" 
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 border rounded" 
                    {...register(`projects.${index}.startDate`, {
                      required: 'Start date is required',
                      validate: (value) => {
                        if (value && new Date(value) > new Date()) {
                          return 'Start date cannot be in the future';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.projects?.[index]?.startDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.projects[index]?.startDate?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">End Date</label>
                  <input 
                    type="date" 
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 border rounded" 
                    {...register(`projects.${index}.endDate`, {
                      validate: (value, formValues) => {
                        const startDate = formValues.projects?.[index]?.startDate;
                        if (value && new Date(value) > new Date()) {
                          return 'End date cannot be in the future';
                        }
                        if (value && startDate && new Date(value) < new Date(startDate)) {
                          return 'End date cannot be earlier than start date';
                        }
                        return true;
                      }
                    })} 
                  />
                  {errors.projects?.[index]?.endDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.projects[index]?.endDate?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Project Link</label>
                  <input className="w-full p-2 border rounded" {...register(`projects.${index}.projectLink`)} />
                </div>
              </div>
              <button type="button" onClick={() => removeProject(index)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Files Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Files</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Profile Picture</label>
              {profilePictureUrl && (
                <div className="mb-2">
                  <img src={profilePictureUrl} alt="Profile" className="w-24 h-24 object-cover rounded" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setProfilePictureFile(e.target.files[0]);
                  }
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Resume</label>
              {resumeUrl && (
                <div className="mb-2">
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Current Resume</a>
                </div>
              )}
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setResumeFile(e.target.files[0]);
                  }
                }}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
          {isSaving ? 'Saving...' : 'Save Profile'}
        </button>
        {isSaving && <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#255cf4]"></div>
        </div>}
      </form>
    </div>
  );
}