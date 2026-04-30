import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Define base API URL to be used across services
export const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Create a base fetchBaseQuery instance
// Token is written to sessionStorage by authSlice.setSession on every auth state change
const baseQueryWithTimeout = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem('sb_access_token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Wrapper to add timeout functionality
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Create an abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    // Modify args to include signal
    const modifiedArgs: FetchArgs = typeof args === 'string' 
      ? { url: args, signal: controller.signal as AbortSignal }
      : { ...args, signal: controller.signal as AbortSignal };
    
    const result = await baseQueryWithTimeout(modifiedArgs, api, extraOptions);
    clearTimeout(timeoutId);
    return result;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    const err = error as { name?: string; message?: string };
    if (err?.name === 'AbortError' || err?.message?.includes('aborted')) {
      return {
        error: {
          status: 'TIMEOUT_ERROR' as const,
          error: 'Request timeout. Please check your connection and try again.',
        } as FetchBaseQueryError,
      };
    }
    throw error;
  }
};