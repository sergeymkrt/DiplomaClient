import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IsUserLoggedIn } from '@/api/Auth/UserData';

interface AuthInterceptorProps {
  children: React.ReactNode;
}
const AuthInterceptor: React.FC<AuthInterceptorProps> = ({ children }) => {
  const navigate = useNavigate();
  useQuery({
    queryFn: IsUserLoggedIn,
    onError: () => navigate('/login'),
    retry: false,
  });
  return <>{children}</>;
};

export default AuthInterceptor;
