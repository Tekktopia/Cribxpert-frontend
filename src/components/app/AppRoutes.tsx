import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import AuthGuard from '@/components/common/AuthGuard';
import FooterWrapper from '@/components/layout/FooterWrapper';
import routeConfig from '@/routes/RouteConfig';
import { JSX } from 'react';
import PageLayout from '@/pages/PageLayout';

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
                  <PageLayout header={route.header}>
                    <ProtectedRoute>
                      {route.element as JSX.Element}
                    </ProtectedRoute>
                  </PageLayout>
                ) : null
              ) : route.authRoute ? (
                route.element ? (
                  <AuthGuard>{route.element as JSX.Element}</AuthGuard>
                ) : null
              ) : (
                <PageLayout header={route.header}>
                  {route.element as JSX.Element}
                </PageLayout>
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
