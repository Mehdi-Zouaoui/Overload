import { v4 as uuidv4 } from 'uuid';

import { supabase } from './client';
import { Workout, Exercise, Session } from '../../stores/workoutStore';

// Create a new workout
export async function createWorkout(userId: string, workout: Omit<Workout, 'id' | 'createdAt'>) {
  const workoutId = uuidv4();

  const { data, error } = await supabase
    .from('workouts')
    .insert({
      id: workoutId,
      user_id: userId,
      title: workout.title,
      week: workout.week,
      completed: workout.completed || false,
      sessions: workout.sessions, // Store the entire sessions array as JSONB
    })
    .select();

  if (error) {
    console.error('Error creating workout:', error);
    return { data: null, error };
  }

  return { data: data[0], error: null };
}

// Get all workouts for a user
export async function getUserWorkouts(userId: string) {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching workouts:', error);
    return { data: null, error };
  }

  // Return raw data without transformation
  return { data, error: null };
}

// Update a workout's sessions
export async function updateWorkoutSessions(workoutId: string, sessions: Session[]) {
  const { data, error } = await supabase
    .from('workouts')
    .update({ sessions })
    .eq('id', workoutId)
    .select();

  if (error) {
    console.error('Error updating workout sessions:', error);
    return { data: null, error };
  }

  return { data: data[0], error: null };
}

export async function removeWorkout(workoutId: string) {
  const { data, error } = await supabase.from('workouts').delete().eq('id', workoutId);

  if (error) {
    console.error('Error removing workout:', error);
    return { data: null, error };
  }
}

// Toggle workout completion status
export async function toggleWorkoutCompletion(workoutId: string) {
  // First get the current status
  const { data: workoutData, error: fetchError } = await supabase
    .from('workouts')
    .select('completed')
    .eq('id', workoutId)
    .single();

  if (fetchError) {
    console.error('Error fetching workout:', fetchError);
    return { data: null, error: fetchError };
  }

  // Toggle the status
  const { data, error } = await supabase
    .from('workouts')
    .update({ completed: !workoutData.completed })
    .eq('id', workoutId)
    .select();

  if (error) {
    console.error('Error updating workout:', error);
    return { data: null, error };
  }

  return { data: data[0], error: null };
}

// Save workout progress
export async function saveWorkoutProgress(workoutId: string, exercises: Exercise[]) {
  try {
    // Get the current workout
    const { data: workoutData, error: fetchError } = await supabase
      .from('workouts')
      .select('sessions')
      .eq('id', workoutId)
      .single();

    if (fetchError) {
      console.error('Error fetching workout:', fetchError);
      return { data: null, error: fetchError };
    }

    // Update the exercises with the current date
    const updatedExercises = exercises.map((exercise) => ({
      ...exercise,
      date: new Date().toISOString(),
    }));

    // Get existing sessions and add the new session
    const sessions = workoutData.sessions || [];
    const updatedSessions = [...sessions, updatedExercises]; // Push as a new session instead of updating

    // Save the updated sessions
    const { data, error } = await supabase
      .from('workouts')
      .update({ sessions: updatedSessions })
      .eq('id', workoutId)
      .select();

    return { data, error };
  } catch (error) {
    console.error('Error in saveWorkoutProgress:', error);
    return { data: null, error };
  }
}

// Update a specific exercise
export async function updateExercise(
  workoutId: string,
  exerciseId: string,
  updatedExercise: Partial<Exercise>
) {
  // First get the current workout
  const { data: workoutData, error: fetchError } = await supabase
    .from('workouts')
    .select('sessions')
    .eq('id', workoutId)
    .single();

  if (fetchError) {
    console.error('Error fetching workout:', fetchError);
    return { data: null, error: fetchError };
  }

  // Update the specific exercise in the latest session
  const sessions = workoutData.sessions || [];
  if (sessions.length === 0) {
    console.error('No sessions found for workout');
    return { data: null, error: new Error('No sessions found') };
  }

  const currentSessionIndex = sessions.length - 1;
  const currentSession = sessions[currentSessionIndex];

  if (!currentSession.exercises) {
    console.error('No exercises found in the current session');
    return { data: null, error: new Error('No exercises found') };
  }

  // Update the exercise
  currentSession.exercises = currentSession.exercises.map((exercise: Exercise) =>
    exercise.id === exerciseId ? { ...exercise, ...updatedExercise, date: new Date() } : exercise
  );

  // Save the updated sessions array
  const { data, error } = await supabase
    .from('workouts')
    .update({ sessions })
    .eq('id', workoutId)
    .select();

  if (error) {
    console.error('Error updating exercise:', error);
    return { data: null, error };
  }

  return { data: data[0], error: null };
}
