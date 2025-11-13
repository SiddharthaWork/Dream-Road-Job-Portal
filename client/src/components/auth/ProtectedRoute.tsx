import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

type UserRole = 'user' | 'admin' | 'company';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallbackPath = '/login',
  requireAuth = true,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If authentication is required but user is not logged in
      if (requireAuth && !user) {
        router.push(fallbackPath);
        return;
      }

      // If user is logged in but doesn't have the required role
      if (user && !allowedRoles.includes(user.role as UserRole)) {
        // Redirect based on user's actual role
        switch (user.role) {
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
        return;
      }
    }
  }, [user, loading, router, allowedRoles, fallbackPath, requireAuth]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !user) {
    return null;
  }

  // If user doesn't have required role
  if (user && !allowedRoles.includes(user.role as UserRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500">Redirecting you to the appropriate dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
