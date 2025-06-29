import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import AuthGuard from '@/components/common/AuthGuard';
import FooterWrapper from '@/components/layout/FooterWrapper';
import routeConfig from '@/routes/RouteConfig';
import { JSX } from 'react';

/**
 * Component responsible for rendering all application routes
 * and handling protected route logic
 */
const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        {routeConfig.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                route.element ? (
                  <ProtectedRoute>
                    {route.element as JSX.Element}
                  </ProtectedRoute>
                ) : null
              ) : route.authRoute ? (
                route.element ? (
                  <AuthGuard>{route.element as JSX.Element}</AuthGuard>
                ) : null
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
      <FooterWrapper />
    </>
  );
};

export default AppRoutes;
