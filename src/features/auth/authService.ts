import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => '/auth/me',
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery } =
  authApi;
