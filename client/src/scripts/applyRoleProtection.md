# Role Protection Implementation Guide

## Quick Implementation Examples

### Method 1: Using HOC (Recommended)

```typescript
// For Admin Pages
import withRoleProtection from '@/components/auth/withRoleProtection';
export default withRoleProtection(YourComponent, ['admin']);

// For Company Pages  
import withRoleProtection from '@/components/auth/withRoleProtection';
export default withRoleProtection(YourComponent, ['company']);

// For User Pages
import withRoleProtection from '@/components/auth/withRoleProtection';
export default withRoleProtection(YourComponent, ['user']);

// For Any Authenticated User
import withRoleProtection from '@/components/auth/withRoleProtection';
export default withRoleProtection(YourComponent, ['user', 'admin', 'company']);
```

### Method 2: Using Helper Functions

```typescript
import { protectAdminPage, protectCompanyPage, protectUserPage } from '@/utils/roleProtectionHelper';

// Admin pages
export default protectAdminPage(YourAdminComponent);

// Company pages
export default protectCompanyPage(YourCompanyComponent);

// User pages
export default protectUserPage(YourUserComponent);
```

### Method 3: Using ProtectedRoute Component

```typescript
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const YourPage = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <YourPageContent />
    </ProtectedRoute>
  );
};
```

## Pages That Need Protection

### Admin Pages (Role: 'admin')
- `/admin/dashboard`
- `/admin/companies`
- `/admin/companies/[id]`
- `/admin/companies/pending`
- `/admin/companies/verified`
- `/admin/jobs`
- `/admin/jobs/[id]`
- `/admin/jobseekers`
- `/admin/jobseekers/[id]`

### Company Pages (Role: 'company')
- `/employer/dashboard`
- `/employer/dashboard/company`
- `/employer/dashboard/jobs`
- `/employer/dashboard/jobs/[id]`
- `/employer/dashboard/post-job`
- `/employer/dashboard/applicants`
- `/employer/dashboard/applicants/profile/[id]`

### User Pages (Role: 'user')
- `/profile`
- `/profile/[id]`
- `/profile/edit/[id]`
- `/job/applied`
- `/savedjob`

### Public Pages (No Protection Needed)
- `/login`
- `/register`
- `/forget-password`
- `/reset-password`
- `/` (home page - but show different content based on role)
- `/job` (job listings)
- `/job/[id]` (job details)
- `/company` (company listings)
- `/company/[id]` (company details)

## Implementation Steps

1. **Apply to Admin Pages**: Add `withRoleProtection(Component, ['admin'])` to all admin pages
2. **Apply to Company Pages**: Add `withRoleProtection(Component, ['company'])` to all employer pages  
3. **Apply to User Pages**: Add `withRoleProtection(Component, ['user'])` to all user-specific pages
4. **Test Each Role**: Login as each role type and verify redirects work correctly
5. **Handle Edge Cases**: Ensure proper loading states and error handling

## Testing Checklist

- [ ] Admin can access admin pages but not company/user pages
- [ ] Company can access company pages but not admin/user pages  
- [ ] User can access user pages but not admin/company pages
- [ ] Unauthenticated users are redirected to login
- [ ] Wrong role users are redirected to their appropriate dashboard
- [ ] Loading states work properly
- [ ] No console errors or infinite redirects
