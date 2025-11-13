import { useState, useEffect } from 'react';

interface User {
  token: string;
  role: string;
  userId: string;
  fullname?: string;
  isLoggedIn?: boolean;
  profileCompleted?: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userId = localStorage.getItem('userId');
        const fullname = localStorage.getItem('fullname');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const profile = localStorage.getItem('profile');

        if (token && role && userId) {
          setUser({
            token,
            role,
            userId,
            fullname: fullname || undefined,
            isLoggedIn: isLoggedIn === 'true',
            profileCompleted: profile ? JSON.parse(profile) : false,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted localStorage data
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('fullname');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('profile');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('fullname');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('profile');
  window.location.href = '/login';
};
