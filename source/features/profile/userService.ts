import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';

export interface UserProfile {
  _id: string;
  id: string;
  fullName: string;
  email: string;
  profileImage?: string;
  role?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetUserResponse {
  message: string;
  user: UserProfile;
}

export interface UpdateUserRequest {
  fullName?: string;
  email?: string;
  profileImage?: string;
  phoneNumber?: string;
}

export interface UpdateUserResponse {
  message: string;
  user: UserProfile;
}

export interface DeleteUserResponse {
  message: string;
}

function mapProfile(row: Record<string, unknown>): UserProfile {
  return {
    _id: row.id as string,
    id: row.id as string,
    fullName: (row.full_name as string) ?? '',
    email: (row.email as string) ?? '',
    profileImage: row.profile_image as string | undefined,
    role: row.role as string | undefined,
    phoneNumber: row.phone_number as string | undefined,
    createdAt: row.created_at as string | undefined,
    updatedAt: row.updated_at as string | undefined,
  };
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 120,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getUserById: builder.query<GetUserResponse, string>({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: { message: 'success', user: mapProfile(data) } };
      },
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    updateUserById: builder.mutation<UpdateUserResponse, { id: string; data: UpdateUserRequest }>({
      queryFn: async ({ id, data: payload }) => {
        const row: Record<string, unknown> = {};
        if (payload.fullName !== undefined) row.full_name = payload.fullName;
        if (payload.email !== undefined) row.email = payload.email;
        if (payload.profileImage !== undefined) row.profile_image = payload.profileImage;
        if (payload.phoneNumber !== undefined) row.phone_number = payload.phoneNumber;

        const { data, error } = await supabase
          .from('profiles')
          .update(row)
          .eq('id', id)
          .select('*')
          .single();
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: { message: 'success', user: mapProfile(data) } };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }],
    }),

    deleteUserById: builder.mutation<DeleteUserResponse, string>({
      queryFn: async (id) => {
        const { error } = await supabase.from('profiles').delete().eq('id', id);
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: { message: 'User deleted successfully' } };
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    getAllUsers: builder.query<{ message: string; users: UserProfile[] }, void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: { message: 'success', users: (data ?? []).map(mapProfile) } };
      },
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
