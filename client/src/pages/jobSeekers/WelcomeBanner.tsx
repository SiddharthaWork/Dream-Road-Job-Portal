import { Briefcase } from "lucide-react"
import { useEffect, useState } from "react";

interface WelcomeBannerProps {
  userName: any
  platformName: any
}

export default function WelcomeBanner({ userName, platformName }: WelcomeBannerProps) {
  const [profile, setProfile] = useState<string>('');
  const [loading, setLoading] = useState(true);

   useEffect(() => {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        console.error("User ID not found in localStorage");
        setLoading(false);
        return;
      }
            
      const fetchProfile = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/user/getuserprofilelogo/${userId}`);
          const data = await response.json();
          // console.log(data,"data");
          
          if (data.success && data.data) {
            // console.log(data.data,"data.data");
            setProfile(data.data);
          }
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-6 text-white">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
          {profile ? (
            <img src={profile} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Briefcase className="w-6 h-6" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>
          <p className="text-blue-100">We're so glad to have you on {platformName}</p>
        </div>
      </div>
    </div>
  )
}
