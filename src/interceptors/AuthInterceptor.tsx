import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IsUserLoggedIn, RefreshToken } from '@/api/Auth/UserData';

interface AuthInterceptorProps {
  children: React.ReactNode;
}
const AuthInterceptor: React.FC<AuthInterceptorProps> = ({ children }) => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['isUserLoggedIn'],
    queryFn: IsUserLoggedIn,
    retry: false,
  });
  const query = useQuery({
    queryKey: ['refreshToken'],
    queryFn: RefreshToken,
    retry: false,
    refetchOnMount: false,
  });

  data?.status === 401 &&
    query.refetch().then(({ data }) => {
      data?.status == 401 && navigate('/login');
    });

  return <>{children}</>;
};

export default AuthInterceptor;
