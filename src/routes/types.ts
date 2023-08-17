import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  Welcome,
  NotFound,
}

enum AuthPages {
  Login,
  Register,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;
type AuthRoutes = Record<AuthPages, PathRouteProps & PathRouteCustomProps>;

export type { Routes, AuthRoutes };
export { Pages, AuthPages };
