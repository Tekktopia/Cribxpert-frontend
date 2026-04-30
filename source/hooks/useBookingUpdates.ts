/**
 * Hook for real-time booking updates.
 * Real-time is handled via Supabase channels; this hook is a no-op placeholder
 * for socket-based updates (socket is always null in the current Supabase-only setup).
 */
export const useBookingUpdates = () => {
  // No-op: socket transport not active; Supabase Realtime handles live updates
};

