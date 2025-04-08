import { create } from 'zustand';

import { supabase } from '../lib/supabase';

export type Profile = {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  // Add any other fields from your profiles table
  updated_at?: string;
  stats?: {
    workoutsCompleted: number;
    daysActive: number;
    setsCompleted: number;
    weightLifted: number;
    lastWorkout: string;
    totalSets: number;
    // Add any other stats you have in your stats table
  };
};

type ProfileState = {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  fetchProfile: () => Promise<Profile | null>;
  updateProfile: (updates: Partial<Profile>) => Promise<Profile | null>;
  createProfile: (profileData: Partial<Profile>) => Promise<Profile | null>;
  clearProfile: () => void;
  initialize: () => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  loading: false,
  error: null,
  initialized: false,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        set({ profile: null, loading: false });
        return null;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        set({ error: error.message, loading: false });
        return null;
      }

      set({ profile: data, loading: false });
      return data;
    } catch (err) {
      console.error('Unexpected error in fetchProfile:', err);
      set({ error: err instanceof Error ? err.message : 'Unknown error', loading: false });
      return null;
    }
  },

  updateProfile: async (updates) => {
    set({ loading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        set({ error: error.message, loading: false });
        return null;
      }

      set({ profile: data, loading: false });
      return data;
    } catch (err) {
      console.error('Unexpected error in updateProfile:', err);
      set({ error: err instanceof Error ? err.message : 'Unknown error', loading: false });
      return null;
    }
  },

  createProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (existingProfile) {
        // Profile exists, update it instead
        return get().updateProfile(profileData);
      }

      // Create a new profile
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ id: user.id, ...profileData }])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        set({ error: error.message, loading: false });
        return null;
      }

      set({ profile: data, loading: false });
      return data;
    } catch (err) {
      console.error('Unexpected error in createProfile:', err);
      set({ error: err instanceof Error ? err.message : 'Unknown error', loading: false });
      return null;
    }
  },

  clearProfile: () => {
    set({ profile: null, error: null });
  },

  initialize: async () => {
    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await get().fetchProfile();
      } else if (event === 'SIGNED_OUT') {
        get().clearProfile();
      }
    });

    // Initial fetch
    await get().fetchProfile();
    set({ initialized: true });

    // We don't need to unsubscribe since this is a global store
    // that should listen for the entire app lifecycle
  },
}));
