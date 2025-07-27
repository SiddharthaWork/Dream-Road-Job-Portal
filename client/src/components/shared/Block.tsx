import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Block = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('companyId');
    localStorage.removeItem('companyName');
    router.push('/employer/login');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mx-auto bg-red-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
          <Lock className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold mt-6 text-gray-900">Account Blocked</h1>
        <p className="mt-4 text-gray-600">
          Your account with Dream Road has been blocked due to a violation of our terms of service.
        </p>
        <p className="mt-4 text-gray-600">
          If you believe this is a mistake, please contact our support team for assistance.
        </p>
        <div className="mt-6">
          <div className="text-sm text-gray-500">
            <p>Email: support@dreamroad.com</p>
            <p className="mt-2">Phone: +91 1234567890</p>
          </div>
        </div>
        <Button className="mt-8" variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Block;