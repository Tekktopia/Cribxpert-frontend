/**
 * Supabase → Redux bridge.
 * Call startAuthListener(store) once in main.tsx.
 * It fires immediately with the current session, then re-fires on every
 * SIGNED_IN / SIGNED_OUT / TOKEN_REFRESHED event.
 */
import type { AppStore } from '../store/store';
import { supabase } from './supabase';
import {
  setSession,
  clearSession,
  setAuthLoading,
  setProfile,
} from '../features/auth/authSlice';

export function startAuthListener(store: AppStore) {
  // Immediately check for an existing session (page reload case)
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      store.dispatch(setSession({ user: data.session.user, session: data.session }));
      fetchAndStoreProfile(store, data.session.user.id);
    } else {
      store.dispatch(setAuthLoading(false));
    }
  });

  // Subscribe to future changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      if (session) {
        store.dispatch(setSession({ user: session.user, session }));
        fetchAndStoreProfile(store, session.user.id);
      } else {
        store.dispatch(clearSession());
      }
    }
  );

  // Return unsubscribe for cleanup (not strictly needed in a long-lived app)
  return () => subscription.unsubscribe();
}

async function fetchAndStoreProfile(store: AppStore, userId: string) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (data) {
    store.dispatch(setProfile(data));
  }
}
