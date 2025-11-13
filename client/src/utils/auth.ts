// Utility functions for authentication
export const setAuthCookies = (data: any) => {
  // Set cookies that can be read by middleware
  document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
  document.cookie = `role=${data.role}; path=/; max-age=${7 * 24 * 60 * 60}`;
  document.cookie = `userId=${data.id}; path=/; max-age=${7 * 24 * 60 * 60}`;
  
  // Keep localStorage for client-side access
  localStorage.setItem('token', data.token);
  localStorage.setItem('userId', data.id);
  localStorage.setItem('role', data.role);
  localStorage.setItem('isLoggedIn', data.isLoggedIn.toString());
  localStorage.setItem('fullname', data.fullname);
  localStorage.setItem('profile', JSON.stringify(data.profileCompleted));
};

export const clearAuthData = () => {
  // Clear cookies
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  
  // Clear localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('fullname');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('profile');
};
