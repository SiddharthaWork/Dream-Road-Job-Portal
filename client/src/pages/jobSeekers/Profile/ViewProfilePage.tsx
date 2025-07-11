"use client"
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';

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
  const [username,setUsername] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<ProfileFormData>();

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
    if (!userId) {
      console.error("User ID not found in localStorage");
      setLoading(false);
      return;
    }
    setUserId(userId);
    setUsername(fullname);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
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
              <h1 className="w-full p-2 border rounded" >{username}</h1>
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
              <input className="w-full p-2 border rounded" {...register('phoneNumber')} />
            </div>
            <div>
              <label className="block mb-1">Date of Birth</label>
              <input type="date" className="w-full p-2 border rounded" {...register('dateOfBirth')} />
            </div>
            <div>
              <label className="block mb-1">Designation</label>
              <input className="w-full p-2 border rounded" {...register('designation')} />
            </div>
            <div className="col-span-2">
              <label className="block mb-1">Sectors</label>
              <input className="w-full p-2 border rounded" {...register('sectors')} placeholder="Comma separated sectors" />
            </div>
            <div className="col-span-2">
              <label className="block mb-1">About Me</label>
              <textarea className="w-full p-2 border rounded" {...register('aboutMe')} rows={3} />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">City</label>
              <input className="w-full p-2 border rounded" {...register('city')} />
            </div>
            <div>
              <label className="block mb-1">Current Address</label>
              <input className="w-full p-2 border rounded" {...register('currentAddress')} />
            </div>
            <div>
              <label className="block mb-1">Postal Code</label>
              <input className="w-full p-2 border rounded" {...register('postalCode')} />
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
                  <label className="block mb-1">College Type</label>
                  <input className="w-full p-2 border rounded" {...register(`education.${index}.collegeType`)} />
                </div>
                <div>
                  <label className="block mb-1">Degree</label>
                  <input className="w-full p-2 border rounded" {...register(`education.${index}.degree`)} />
                </div>
                <div>
                  <label className="block mb-1">Name</label>
                  <input className="w-full p-2 border rounded" {...register(`education.${index}.city`)} />
                </div>
                <div>
                  <label className="block mb-1">Start Date</label>
                  <input type="date" className="w-full p-2 border rounded" {...register(`education.${index}.startDate`)} />
                </div>
                <div>
                  <label className="block mb-1">Graduation Date</label>
                  <input type="date" className="w-full p-2 border rounded" {...register(`education.${index}.graduationDate`)} />
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
                  <label className="block mb-1">Title</label>
                  <input className="w-full p-2 border rounded" {...register(`achievements.${index}.title`)} />
                </div>
                <div className="col-span-2">
                  <label className="block mb-1">Description</label>
                  <textarea className="w-full p-2 border rounded" {...register(`achievements.${index}.description`)} rows={3} />
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
                  <input className="w-full p-2 border rounded" {...register(`certificates.${index}.title`)} />
                </div>
                <div>
                  <label className="block mb-1">Issued By</label>
                  <input className="w-full p-2 border rounded" {...register(`certificates.${index}.issuedBy`)} />
                </div>
                <div>
                  <label className="block mb-1">Issue Date</label>
                  <input type="date" className="w-full p-2 border rounded" {...register(`certificates.${index}.issueDate`)} />
                </div>
                <div>
                  <label className="block mb-1">Expiration Date</label>
                  <input type="date" className="w-full p-2 border rounded" {...register(`certificates.${index}.expirationDate`)} />
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
                  <input className="w-full p-2 border rounded" {...register(`experiences.${index}.jobTitle`)} />
                </div>
                <div>
                  <label className="block mb-1">Company</label>
                  <input className="w-full p-2 border rounded" {...register(`experiences.${index}.company`)} />
                </div>
                <div>
                  <label className="block mb-1">Start Date</label>
                  <input type="date" className="w-full p-2 border rounded" {...register(`experiences.${index}.startDate`)} />
                </div>
                <div>
                  <label className="block mb-1">End Date</label>
                  <input type="date" className="w-full p-2 border rounded" {...register(`experiences.${index}.endDate`)} />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" {...register(`experiences.${index}.currentlyWorking`)} />
                  <label>Currently Working</label>
                </div>
                <div>
                  <label className="block mb-1">Location</label>
                  <input className="w-full p-2 border rounded" {...register(`experiences.${index}.location`)} />
                </div>
                <div className="col-span-2">
                  <label className="block mb-1">Description</label>
                  <textarea className="w-full p-2 border rounded" {...register(`experiences.${index}.description`)} rows={3} />
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
                  <input className="w-full p-2 border rounded" {...register(`projects.${index}.title`)} />
                </div>
                <div className="col-span-2">
                  <label className="block mb-1">Description</label>
                  <textarea className="w-full p-2 border rounded" {...register(`projects.${index}.description`)} rows={3} />
                </div>
                <div>
                  <label className="block mb-1">Start Date</label>
                  <input type="date" className="w-full p-2 border rounded" {...register(`projects.${index}.startDate`)} />
                </div>
                <div>
                  <label className="block mb-1">End Date</label>
                  <input type="date" className="w-full p-2 border rounded" {...register(`projects.${index}.endDate`)} />
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