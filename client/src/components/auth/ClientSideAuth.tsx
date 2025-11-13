'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type UserRole = 'user' | 'admin' | 'company';

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  loading: boolean;
}

export const useClientAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    loading: true,
  });

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role') as UserRole;

        if (token && role) {
          setAuthState({
            isAuthenticated: true,
            role,
            loading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            role: null,
            loading: false,
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState({
          isAuthenticated: false,
          role: null,
          loading: false,
        });
      }
    };

    checkAuth();
  }, []);

  return authState;
};

// Client-side role protection hook for layouts that REQUIRE authentication
export const useRoleProtection = (allowedRoles: UserRole[]) => {
  const { isAuthenticated, role, loading } = useClientAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      if (role && !allowedRoles.includes(role)) {
        // Redirect based on actual role
        switch (role) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'company':
            router.push('/employer/dashboard');
            break;
          case 'user':
            router.push('/');
            break;
          default:
            router.push('/login');
        }
      }
    }
  }, [isAuthenticated, role, loading, allowedRoles, router]);

  return { isAuthenticated, role, loading };
};

// Optional role protection - allows unauthenticated users but redirects wrong roles
export const useOptionalRoleProtection = (allowedRoles: UserRole[]) => {
  const { isAuthenticated, role, loading } = useClientAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated && role) {
      // Only redirect if authenticated but has wrong role
      if (!allowedRoles.includes(role)) {
        switch (role) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'company':
            router.push('/employer/dashboard');
            break;
          case 'user':
            router.push('/');
            break;
        }
      }
    }
  }, [isAuthenticated, role, loading, allowedRoles, router]);

  return { isAuthenticated, role, loading };
};

// Specific role protection hooks (REQUIRE authentication)
export const useAdminProtection = () => useRoleProtection(['admin']);
export const useCompanyProtection = () => useRoleProtection(['company']);
export const useUserProtection = () => useRoleProtection(['user']);

// Optional role protection hooks (allow public browsing)
export const useOptionalAdminProtection = () => useOptionalRoleProtection(['admin']);
export const useOptionalCompanyProtection = () => useOptionalRoleProtection(['company']);
export const useOptionalUserProtection = () => useOptionalRoleProtection(['user']);
