import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type UserRole = 'user' | 'admin' | 'company';

interface AuthData {
  token: string;
  role: UserRole;
  userId: string;
}

// Server-side authentication check
export async function getServerAuth(): Promise<AuthData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const role = cookieStore.get('role')?.value as UserRole;
  const userId = cookieStore.get('userId')?.value;

  if (!token || !role || !userId) {
    return null;
  }

  return { token, role, userId };
}

// Server-side role protection for pages that REQUIRE authentication
export async function requireAuth(allowedRoles: UserRole[]) {
  const auth = await getServerAuth();
  
  if (!auth) {
    redirect('/login');
  }
  
  if (!allowedRoles.includes(auth.role)) {
    // Redirect to appropriate dashboard based on role
    switch (auth.role) {
      case 'admin':
        redirect('/admin/dashboard');
        break;
      case 'company':
        redirect('/employer/dashboard');
        break;
      case 'user':
        redirect('/');
        break;
      default:
        redirect('/login');
    }
  }
  
  return auth;
}

// Optional auth check - allows unauthenticated users but redirects wrong roles
export async function checkOptionalAuth(allowedRoles: UserRole[]) {
  const auth = await getServerAuth();
  
  // If no auth, allow access (for public browsing)
  if (!auth) {
    return null;
  }
  
  // If authenticated but wrong role, redirect to appropriate dashboard
  if (!allowedRoles.includes(auth.role)) {
    switch (auth.role) {
      case 'admin':
        redirect('/admin/dashboard');
        break;
      case 'company':
        redirect('/employer/dashboard');
        break;
      case 'user':
        redirect('/');
        break;
    }
  }
  
  return auth;
}

// Helper functions for specific roles
export const requireAdmin = () => requireAuth(['admin']);
export const requireCompany = () => requireAuth(['company']);
export const requireUser = () => requireAuth(['user']);
export const requireAnyAuth = () => requireAuth(['user', 'admin', 'company']);

// Optional auth helpers - for pages that allow public browsing
export const checkOptionalAdmin = () => checkOptionalAuth(['admin']);
export const checkOptionalCompany = () => checkOptionalAuth(['company']);
export const checkOptionalUser = () => checkOptionalAuth(['user']);
export const checkOptionalAnyAuth = () => checkOptionalAuth(['user', 'admin', 'company']);
