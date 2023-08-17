import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import { AuthPages, AuthRoutes, Pages, Routes } from './types';

const pageRoutes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: HomeIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

const authRoutes: AuthRoutes = {
  [AuthPages.Login]: {
    component: asyncComponentLoader(() => import('@/pages/Login')),
    path: '/login',
    title: 'Login',
  },
  [AuthPages.Register]: {
    component: asyncComponentLoader(() => import('@/pages/Register')),
    path: '/register',
    title: 'Register',
  },
};

export { pageRoutes, authRoutes };
