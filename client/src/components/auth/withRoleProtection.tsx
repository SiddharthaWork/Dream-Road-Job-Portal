import React, { useEffect, ComponentType } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

type UserRole = 'user' | 'admin' | 'company';

interface WithRoleProtectionProps {
  [key: string]: any;
}

const withRoleProtection = <P extends WithRoleProtectionProps>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: UserRole[]
) => {
  const ProtectedComponent: React.FC<P> = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        // If user is not authenticated, redirect to login
        if (!user) {
          router.push('/login');
          return;
        }

        // If user role is not allowed, redirect to appropriate dashboard
        if (!allowedRoles.includes(user.role as UserRole)) {
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
    }, [user, loading, router]);

    // Show loading spinner while checking authentication
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    // Don't render component if user is not authenticated or doesn't have required role
    if (!user || !allowedRoles.includes(user.role as UserRole)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Set display name for debugging
  ProtectedComponent.displayName = `withRoleProtection(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ProtectedComponent;
};

export default withRoleProtection;
