import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IsUserLoggedIn } from '@/api/Auth/UserData';

interface AuthInterceptorProps {
  children: React.ReactNode;
}
const AuthInterceptor: React.FC<AuthInterceptorProps> = ({ children }) => {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ['isUserLoggedIn'],
    queryFn: IsUserLoggedIn,
    // throwOnError: (error, query) => {
    //   navigate('/login');
    // },

    // onError: () => {
    //   navigate('/login');
    // },
    retry: false,
  });
  query.isError && navigate('/login');
  return <>{children}</>;
};

export default AuthInterceptor;
