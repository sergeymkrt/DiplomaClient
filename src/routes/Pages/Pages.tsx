import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import { pageRoutes, authRoutes } from '@/routes';
import { getPageHeight } from './utils';
import AuthInterceptor from '@/interceptors/AuthInterceptor';
import { MainLayout } from '@/interceptors/MainLayout';

function Pages() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {Object.values(pageRoutes).map(({ path, component: Component }) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                <AuthInterceptor>
                  <MainLayout>
                    <Component />
                  </MainLayout>
                </AuthInterceptor>
              }
            />
          );
        })}
        {Object.values(authRoutes).map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
    </Box>
  );
}

export default Pages;
