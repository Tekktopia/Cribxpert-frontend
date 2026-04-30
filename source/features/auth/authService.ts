// All auth operations now go through Supabase directly.
// This file keeps authApi in the Redux store for cache invalidation hooks that other
// slices may depend on, and exposes useGetCurrentUserQuery for LoadingManager.
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
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  keepUnusedDataFor: 600,
  refetchOnMountOrArgChange: 300,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  tagTypes: ['CurrentUser'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<{ message: string; user: UserProfile }, void>({
      queryFn: async () => {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          return { error: { status: 'CUSTOM_ERROR', error: authError?.message ?? 'Not authenticated' } };
        }
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (profileError) {
          return { error: { status: 'CUSTOM_ERROR', error: profileError.message } };
        }
        return {
          data: {
            message: 'success',
            user: {
              _id: profile.id,
              id: profile.id,
              fullName: profile.full_name ?? '',
              email: profile.email ?? user.email ?? '',
              profileImage: profile.profile_image ?? undefined,
              role: profile.role ?? undefined,
              phoneNumber: profile.phone_number ?? undefined,
            },
          },
        };
      },
      providesTags: ['CurrentUser'],
    }),

    completeRegistration: builder.mutation<
      { message: string; user: UserProfile },
      { id: string; fullName: string; dob?: string; phoneNo?: string; password?: string }
    >({
      queryFn: async ({ id, fullName, dob, phoneNo }) => {
        // Password was already set at signup — just update the profile
        const { data, error: profileErr } = await supabase
          .from('profiles')
          .update({
            full_name: fullName,
            date_of_birth: dob ?? null,
            phone_number: phoneNo ?? null,
          })
          .eq('id', id)
          .select('*')
          .single();
        if (profileErr) return { error: { status: 'CUSTOM_ERROR', error: profileErr.message } };

        return {
          data: {
            message: 'Registration complete',
            user: {
              _id: data.id,
              id: data.id,
              fullName: data.full_name ?? '',
              email: data.email ?? '',
              role: data.role,
            },
          },
        };
      },
      invalidatesTags: ['CurrentUser'],
    }),

    updatePassword: builder.mutation<
      { message: string },
      { currentPassword?: string; newPassword: string }
    >({
      queryFn: async ({ newPassword }) => {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: { message: 'Password updated successfully' } };
      },
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useCompleteRegistrationMutation,
  useUpdatePasswordMutation,
} = authApi;
