import withRoleProtection from '@/components/auth/withRoleProtection';

type UserRole = 'user' | 'admin' | 'company';

// Helper functions to quickly apply role protection
export const protectAdminPage = (Component: any) => withRoleProtection(Component, ['admin']);
export const protectCompanyPage = (Component: any) => withRoleProtection(Component, ['company']);
export const protectUserPage = (Component: any) => withRoleProtection(Component, ['user']);
export const protectAuthenticatedPage = (Component: any) => withRoleProtection(Component, ['user', 'admin', 'company']);

// For pages that should only be accessible by specific combinations
export const protectAdminAndCompanyPage = (Component: any) => withRoleProtection(Component, ['admin', 'company']);
export const protectUserAndCompanyPage = (Component: any) => withRoleProtection(Component, ['user', 'company']);

// Role-based redirect helper
export const getRoleBasedRedirectPath = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'company':
      return '/employer/dashboard';
    case 'user':
      return '/';
    default:
      return '/login';
  }
};

// Check if user has required role
export const hasRequiredRole = (userRole: string, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(userRole as UserRole);
};
