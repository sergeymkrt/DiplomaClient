import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';

import asyncComponentLoader from '@/utils/loader';

import { AuthPages, AuthRoutes, Pages, Routes } from './types';

const pageRoutes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: HomeIcon,
  },
  [Pages.Groups]: {
    component: asyncComponentLoader(() => import('@/pages/Groups')),
    path: '/groups',
    title: 'Groups',
    icon: GroupIcon,
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
  [AuthPages.VerifyEmail]: {
    component: asyncComponentLoader(() => import('@/pages/VerifyEmail')),
    path: '/verifyEmail',
    title: 'VerifyEmail'
  }

};

export { pageRoutes, authRoutes };
