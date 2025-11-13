import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define role-based route mappings
const roleRoutes = {
  admin: ['/admin'],
  company: ['/employer'],
  user: ['/profile', '/job/applied', '/savedjob']
};

const publicRoutes = ['/login', '/register', '/forget-password', '/reset-password', '/', '/job', '/company'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get user data from cookies or headers (you'll need to set these during login)
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // If not authenticated and trying to access protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated, check role-based access
  if (token && role) {
    // Redirect authenticated users away from auth pages
    if (['/login', '/register'].includes(pathname)) {
      return NextResponse.redirect(new URL(getRoleBasedHomePage(role), request.url));
    }

    // Check if user has access to the current route
    const hasAccess = checkRouteAccess(pathname, role);
    
    if (!hasAccess) {
      // Redirect to appropriate dashboard based on role
      return NextResponse.redirect(new URL(getRoleBasedHomePage(role), request.url));
    }
  }

  return NextResponse.next();
}

function checkRouteAccess(pathname: string, role: string): boolean {
  // Admin routes - only admins allowed
  if (pathname.startsWith('/admin')) {
    return role === 'admin';
  }
  
  // Company routes - only companies allowed
  if (pathname.startsWith('/employer')) {
    return role === 'company';
  }
  
  // User-specific routes (jobseekers section) - only users allowed
  if (pathname.startsWith('/(jobseekers)') || ['/profile', '/job/applied', '/savedjob'].some(route => pathname.startsWith(route))) {
    return role === 'user';
  }
  
  // Define truly public routes that all roles can access
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/forget-password',
    '/company-forget-password',
    '/admin-forget-password',
    '/reset-password',
    '/adminlogin'
  ];
  
  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  if (isPublicRoute) {
    return true;
  }
  
  // If not a public route and not matching any role-specific route, deny access
  return false;
}

function getRoleBasedHomePage(role: string): string {
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
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
