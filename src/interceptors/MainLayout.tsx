import React from 'react';
import Header from '@/sections/Header';
import Sidebar from '@/sections/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}
export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );
};
