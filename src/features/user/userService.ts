import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';
import { User } from '@/features/auth/authTypes';

// Types for responses
export interface GetUserResponse {
  message: string;
  user: User;
}

export interface GetAllUsersResponse {
  message: string;
  users: User[];
}

export interface UpdateUserRequest {
  // Only allow updatable fields
  fullName?: string;
  email?: string;
  profileImage?: string;
  // Add other updatable fields as needed
}

export interface UpdateUserResponse {
  message: string;
  user: User;
}

export interface DeleteUserResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserById: builder.query<GetUserResponse, string>({
      query: (id) => `/user/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    updateUserById: builder.mutation<
      UpdateUserResponse,
      { id: string; data: UpdateUserRequest }
    >({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }],
    }),
    deleteUserById: builder.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    getAllUsers: builder.query<GetAllUsersResponse, void>({
      query: () => '/user',
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
  useGetAllUsersQuery,
} = userApi;
