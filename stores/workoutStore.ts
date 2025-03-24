import {
  createWorkout,
  getUserWorkouts,
  removeWorkout,
  saveWorkoutProgress as saveWorkoutProgressAPI,
} from 'lib/supabase/workouts';
import { create } from 'zustand';

export interface Exercise {
  workoutId: string;
  id: string;
  name: string;
  sets: number;
  reps: number[];
  weight: number;
  weights?: number[];
  date?: Date;
  isDone?: boolean;
}

export interface Session {
  exercises: Exercise[];
}

export interface Workout {
  id: string;
  user_id: string;
  title: string;
  sessions: Session[];
  completed: boolean;
  created_at: Date;
  week: string;
}

interface WorkoutStore {
  workouts: Workout[];
  // Actions
  addWorkout: (userId: string, workout: Omit<Workout, 'id' | 'createdAt'>) => void;
  removeWorkout: (id: string) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
  updateExercise: (id: string, exercise: Partial<Exercise>) => void;
  toggleWorkoutCompletion: (id: string) => void;
  setWorkouts: (workouts: Workout[]) => void;
  // Getters
  getUserWorkouts: (userId: string) => Promise<Workout[]>;
  getWorkoutById: (id: string) => Workout | undefined;
  getExerciseById: (combinedId: string) => Exercise | undefined;
  getCompletedWorkouts: () => Workout[];
  getPreviousExercise: (workoutId: string, exerciseId: string) => Exercise | undefined;
  // Progress calculation
  calculateWorkoutProgress: (workoutId: string, comparisonMode?: 'last' | 'all') => any | null;
  saveWorkoutProgress: (workoutId: string, exercises: Exercise[]) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],
  addWorkout: async (userId, workoutData) => {
    // First add to database
    const { data, error } = await createWorkout(userId, workoutData);
    if (error) {
      console.error('Failed to add workout to database:', error);
      return;
    }

    // Then update local state with the data from the database
    set((state) => ({
      workouts: [
        ...state.workouts,
        data, // Use the returned data which includes the ID and created date
      ],
    }));
  },

  removeWorkout: async (id) => {
    const result = await removeWorkout(id);
    if (result?.error) {
      console.error('Failed to remove workout:', result.error);
      return;
    }
    set((state) => ({
      workouts: state.workouts.filter((workout) => workout.id !== id),
    }));
  },

  updateWorkout: (id, updatedWorkout) =>
    set((state) => ({
      workouts: state.workouts.map((workout) =>
        workout.id === id ? { ...workout, ...updatedWorkout } : workout
      ),
    })),

  updateExercise: (combinedId: string, updatedExercise: Partial<Exercise>) => {
    set((state) => ({
      workouts: state.workouts.map((workout) => {
        // Parse the UUID format
        const lastHyphenIndex = combinedId.lastIndexOf('-');
        if (lastHyphenIndex === -1) return workout;

        const workoutId = combinedId.substring(0, lastHyphenIndex);
        const exerciseId = combinedId.substring(lastHyphenIndex + 1);

        if (workout.id !== workoutId) return workout;

        const currentSessionIndex = workout.sessions.length - 1;
        const updatedSessions = [...workout.sessions];

        // Check if the current session is an array of exercises directly
        if (Array.isArray(updatedSessions[currentSessionIndex])) {
          // Use type assertion to tell TypeScript this is an array of Exercise
          const exercises = updatedSessions[currentSessionIndex] as unknown as Exercise[];
          updatedSessions[currentSessionIndex] = exercises.map((exercise) =>
            exercise.id === exerciseId
              ? { ...exercise, ...updatedExercise, date: new Date() }
              : exercise
          ) as unknown as Session;
        } else {
          // Fallback to the old structure if needed
          updatedSessions[currentSessionIndex] = {
            ...updatedSessions[currentSessionIndex],
            exercises: updatedSessions[currentSessionIndex].exercises.map((exercise) =>
              exercise.id === exerciseId
                ? { ...exercise, ...updatedExercise, date: new Date() }
                : exercise
            ),
          };
        }

        return {
          ...workout,
          sessions: updatedSessions,
        };
      }),
    }));
  },

  toggleWorkoutCompletion: (id) =>
    set((state) => ({
      workouts: state.workouts.map((workout) =>
        workout.id === id ? { ...workout, completed: !workout.completed } : workout
      ),
    })),

  setWorkouts: (workouts) => set({ workouts }),

  getUserWorkouts: async (userId: string) => {
    const { data, error } = await getUserWorkouts(userId);
    if (error) {
      console.error('Failed to get user workouts:', error);
      return [];
    }

    // Return the raw data without transformation
    return data;
  },

  getWorkoutById: (id) => get().workouts.find((workout) => workout.id === id),

  getExerciseById: (combinedId: string) => {
    if (!combinedId) {
      return undefined;
    }

    // Parse the UUID format
    const lastHyphenIndex = combinedId.lastIndexOf('-');
    if (lastHyphenIndex === -1) {
      return undefined;
    }

    // Extract the workout UUID and exercise identifier
    const workoutId = combinedId.substring(0, lastHyphenIndex);
    const exerciseId = combinedId.substring(lastHyphenIndex + 1);

    // Find the workout with this UUID
    const workout = get().workouts.find((w) => w.id === workoutId);

    if (!workout) {
      return undefined;
    }

    // Get the latest session
    const currentSession = workout.sessions[workout.sessions.length - 1];

    // Handle the case where the session is an array of exercises directly
    if (Array.isArray(currentSession)) {
      return currentSession.find((e) => e.id === exerciseId);
    }

    // Fallback to the old structure if needed
    return currentSession?.exercises?.find((e) => e.id === exerciseId);
  },

  getCompletedWorkouts: () => get().workouts.filter((workout) => workout.completed),

  getPreviousExercise: (workoutId: string, exerciseId: string) => {
    // Find the workout with this ID
    const workout = get().workouts.find((w) => w.id === workoutId);
    if (!workout) {
      return undefined;
    }

    // Check if we have at least two sessions of data
    if (!workout.sessions || workout.sessions.length < 2) {
      return undefined;
    }

    // Get the previous session's exercises (second to last in the array)
    const previousSessionIndex = workout.sessions.length - 2;
    const previousSessionExercises = workout.sessions[previousSessionIndex].exercises;

    // Find the exercise with this ID in the previous session
    return previousSessionExercises?.find((e) => e.id === exerciseId);
  },

  calculateWorkoutProgress: (workoutId: string, comparisonMode: 'last' | 'all' = 'all') => {
    const workout = get().workouts.find((w) => w.id === workoutId);
    if (!workout || workout.sessions.length < 2) return null;

    const progressByExercise = [];

    // Get all unique exercise IDs from the first session
    const firstSession = workout.sessions[0];
    const firstSessionExercises = Array.isArray(firstSession)
      ? (firstSession as Exercise[])
      : firstSession.exercises;

    const exerciseIds = firstSessionExercises.map((e) => e.id);

    for (const exerciseId of exerciseIds) {
      // Pass the comparison mode to the calculation functions
      const weightProgress = calculateWeightProgress(workoutId, exerciseId, comparisonMode);
      const repProgress = calculateRepProgress(workoutId, exerciseId, comparisonMode);
      const volumeProgress = calculateVolumeProgress(workoutId, exerciseId, comparisonMode);

      // Find exercise name
      const exercise = firstSessionExercises.find((e) => e.id === exerciseId);

      progressByExercise.push({
        exerciseId,
        exerciseName: exercise?.name || 'Unknown',
        weightProgress,
        repProgress,
        volumeProgress,
      });
    }

    return progressByExercise;
  },

  saveWorkoutProgress: async (workoutId: string, exercises: Exercise[]) => {
    const workout = get().workouts.find((w) => w.id === workoutId);
    if (!workout) {
      throw new Error('Workout not found');
    }

    // Save to database using the exercises passed as parameter
    const { error } = await saveWorkoutProgressAPI(workoutId, exercises);

    if (error) {
      console.error('Failed to save workout progress:', error);
      throw new Error('Failed to save workout progress');
    }

    // Mark workout as completed in local state
    set((state) => ({
      workouts: state.workouts.map((w) => (w.id === workoutId ? { ...w, completed: true } : w)),
    }));
  },
}));

function calculateWeightProgress(
  workoutId: string,
  exerciseId: string,
  comparisonMode: 'last' | 'all' = 'all'
) {
  const workout = useWorkoutStore.getState().getWorkoutById(workoutId);
  if (!workout || workout.sessions.length < 2) return null;

  // Get the first session's data for the exercise
  const firstSession = workout.sessions[0];
  const firstSessionExercises = Array.isArray(firstSession)
    ? (firstSession as Exercise[])
    : firstSession.exercises;
  const firstSessionExercise = firstSessionExercises.find((e) => e.id === exerciseId);

  // Get the comparison session based on mode
  let comparisonSessionExercise;
  if (comparisonMode === 'last') {
    // Compare with the previous session (second to last)
    const prevSessionIndex = workout.sessions.length - 2;
    const prevSession = workout.sessions[prevSessionIndex];
    const prevSessionExercises = Array.isArray(prevSession)
      ? (prevSession as Exercise[])
      : prevSession.exercises;
    comparisonSessionExercise = prevSessionExercises.find((e) => e.id === exerciseId);
  } else {
    // Compare with the first session (all history)
    comparisonSessionExercise = firstSessionExercise;
  }

  // Get the latest session's data
  const latestSession = workout.sessions[workout.sessions.length - 1];
  const latestSessionExercises = Array.isArray(latestSession)
    ? (latestSession as Exercise[])
    : latestSession.exercises;
  const latestSessionExercise = latestSessionExercises.find((e) => e.id === exerciseId);

  if (!comparisonSessionExercise || !latestSessionExercise) return null;

  // Calculate average weight for both sessions
  let comparisonWeight = comparisonSessionExercise.weight;
  let latestWeight = latestSessionExercise.weight;

  // Use weights array if available
  if (comparisonSessionExercise.weights && comparisonSessionExercise.weights.length > 0) {
    comparisonWeight =
      comparisonSessionExercise.weights.reduce((sum, w) => sum + w, 0) /
      comparisonSessionExercise.weights.length;
  }

  if (latestSessionExercise.weights && latestSessionExercise.weights.length > 0) {
    latestWeight =
      latestSessionExercise.weights.reduce((sum, w) => sum + w, 0) /
      latestSessionExercise.weights.length;
  }

  const weightDifference = latestWeight - comparisonWeight;
  const percentageIncrease = (weightDifference / comparisonWeight) * 100;

  return {
    initialWeight: Math.round(comparisonWeight * 10) / 10, // Round to 1 decimal place
    currentWeight: Math.round(latestWeight * 10) / 10,
    increase: Math.round(weightDifference * 10) / 10,
    percentageIncrease: percentageIncrease.toFixed(1) + '%',
  };
}

function calculateRepProgress(
  workoutId: string,
  exerciseId: string,
  comparisonMode: 'last' | 'all' = 'all'
) {
  const workout = useWorkoutStore.getState().getWorkoutById(workoutId);
  if (!workout || workout.sessions.length < 2) return null;

  // Get the first session's data for the exercise
  const firstSession = workout.sessions[0];
  const firstSessionExercises = Array.isArray(firstSession)
    ? (firstSession as Exercise[])
    : firstSession.exercises;
  const firstSessionExercise = firstSessionExercises.find((e) => e.id === exerciseId);

  // Get the comparison session based on mode
  let comparisonSessionExercise;
  if (comparisonMode === 'last') {
    // Compare with the previous session (second to last)
    const prevSessionIndex = workout.sessions.length - 2;
    const prevSession = workout.sessions[prevSessionIndex];
    const prevSessionExercises = Array.isArray(prevSession)
      ? (prevSession as Exercise[])
      : prevSession.exercises;
    comparisonSessionExercise = prevSessionExercises.find((e) => e.id === exerciseId);
  } else {
    // Compare with the first session (all history)
    comparisonSessionExercise = firstSessionExercise;
  }

  // Get the latest session's data
  const latestSession = workout.sessions[workout.sessions.length - 1];
  const latestSessionExercises = Array.isArray(latestSession)
    ? (latestSession as Exercise[])
    : latestSession.exercises;
  const latestSessionExercise = latestSessionExercises.find((e) => e.id === exerciseId);

  if (!comparisonSessionExercise || !latestSessionExercise) return null;

  // Calculate total reps for comparison and latest session
  const initialTotalReps = comparisonSessionExercise.reps.reduce((sum, reps) => sum + reps, 0);
  const currentTotalReps = latestSessionExercise.reps.reduce((sum, reps) => sum + reps, 0);

  const repDifference = currentTotalReps - initialTotalReps;
  const percentageIncrease = (repDifference / initialTotalReps) * 100;

  return {
    initialTotalReps,
    currentTotalReps,
    increase: repDifference,
    percentageIncrease: percentageIncrease.toFixed(1) + '%',
  };
}

function calculateVolumeProgress(
  workoutId: string,
  exerciseId: string,
  comparisonMode: 'last' | 'all' = 'all'
) {
  const workout = useWorkoutStore.getState().getWorkoutById(workoutId);
  if (!workout || workout.sessions.length < 2) return null;

  // Get the first session's data for the exercise
  const firstSession = workout.sessions[0];
  const firstSessionExercises = Array.isArray(firstSession)
    ? (firstSession as Exercise[])
    : firstSession.exercises;
  const firstSessionExercise = firstSessionExercises.find((e) => e.id === exerciseId);

  // Get the comparison session based on mode
  let comparisonSessionExercise;
  if (comparisonMode === 'last') {
    // Compare with the previous session (second to last)
    const prevSessionIndex = workout.sessions.length - 2;
    const prevSession = workout.sessions[prevSessionIndex];
    const prevSessionExercises = Array.isArray(prevSession)
      ? (prevSession as Exercise[])
      : prevSession.exercises;
    comparisonSessionExercise = prevSessionExercises.find((e) => e.id === exerciseId);
  } else {
    // Compare with the first session (all history)
    comparisonSessionExercise = firstSessionExercise;
  }

  // Get the latest session's data
  const latestSession = workout.sessions[workout.sessions.length - 1];
  const latestSessionExercises = Array.isArray(latestSession)
    ? (latestSession as Exercise[])
    : latestSession.exercises;
  const latestSessionExercise = latestSessionExercises.find((e) => e.id === exerciseId);

  if (!comparisonSessionExercise || !latestSessionExercise) return null;

  // Calculate volume for comparison and latest session
  let initialVolume = 0;
  let currentVolume = 0;

  // If weights array is available, calculate volume using each weight with corresponding rep
  if (comparisonSessionExercise.weights && comparisonSessionExercise.weights.length > 0) {
    initialVolume = comparisonSessionExercise.weights.reduce((sum, weight, index) => {
      const reps =
        index < comparisonSessionExercise.reps.length ? comparisonSessionExercise.reps[index] : 0;
      return sum + weight * reps;
    }, 0);
  } else {
    // Fallback to using the single weight value
    initialVolume =
      comparisonSessionExercise.weight *
      comparisonSessionExercise.reps.reduce((sum, reps) => sum + reps, 0);
  }

  if (latestSessionExercise.weights && latestSessionExercise.weights.length > 0) {
    currentVolume = latestSessionExercise.weights.reduce((sum, weight, index) => {
      const reps =
        index < latestSessionExercise.reps.length ? latestSessionExercise.reps[index] : 0;
      return sum + weight * reps;
    }, 0);
  } else {
    // Fallback to using the single weight value
    currentVolume =
      latestSessionExercise.weight *
      latestSessionExercise.reps.reduce((sum, reps) => sum + reps, 0);
  }

  const volumeDifference = currentVolume - initialVolume;
  const percentageIncrease = (volumeDifference / initialVolume) * 100;

  return {
    initialVolume: Math.round(initialVolume),
    currentVolume: Math.round(currentVolume),
    increase: Math.round(volumeDifference),
    percentageIncrease: percentageIncrease.toFixed(1) + '%',
  };
}
