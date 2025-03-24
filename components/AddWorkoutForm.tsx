import { useNavigation } from '@react-navigation/native';
import { useSession } from 'context/SessionProvider';
import { Plus, X, Dumbbell, Save } from 'lucide-react-native';
import { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';

import { Toast } from './Toast';
import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore, Exercise } from '../stores/workoutStore';

type WorkoutFormData = {
  title: string;
  exercises: Omit<Exercise, 'id' | 'workoutId'>[];
};

export default function AddWorkoutForm() {
  const navigation = useNavigation();
  const [showToast, setShowToast] = useState(false);
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { session } = useSession();
  const user = session?.user?.user_metadata;
  const { control, handleSubmit } = useForm<WorkoutFormData>({
    defaultValues: {
      title: '',
      exercises: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const onSubmit = (data: WorkoutFormData) => {
    const exercisesWithIds = data.exercises.map((exercise) => ({
      ...exercise,
      id: Math.random().toString(36).substr(2, 9),
      workoutId: '', // This will be set by the store
      reps: Array(exercise.sets).fill(8), // Initialize reps array based on sets
      date: new Date(), // Add date for tracking
    }));

    addWorkout(user?.sub, {
      title: data.title,
      exercises: [exercisesWithIds], // First week's exercises
      completed: false,
      week: 'Week 1',
      userId: user?.sub,
    });

    setShowToast(true);
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  const addExercise = () => {
    append({
      name: '',
      sets: 3,
      reps: [8, 8, 8],
      weight: 0,
    });
  };

  return (
    <>
      <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, isDarkMode && styles.darkText]}>Create New Workout</Text>
          <Text style={[styles.headerSubtext, isDarkMode && styles.darkSubtext]}>
            Design your perfect workout routine
          </Text>
        </View>

        <Controller
          control={control}
          name="title"
          rules={{ required: 'Workout title is required' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.formGroup}>
              <Text style={[styles.label, isDarkMode && styles.darkText]}>Workout Title</Text>
              <TextInput
                style={[styles.input, error && styles.errorInput, isDarkMode && styles.darkInput]}
                onChangeText={onChange}
                value={value}
                placeholder="Enter workout title"
                placeholderTextColor={isDarkMode ? '#888888' : undefined}
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </View>
          )}
        />

        {fields.map((field, index) => (
          <View
            key={field.id}
            style={[styles.exerciseContainer, isDarkMode && styles.darkExerciseContainer]}>
            <View style={styles.exerciseHeaderContainer}>
              <View style={styles.exerciseHeaderLeft}>
                <Dumbbell size={18} color={isDarkMode ? '#FFFFFF' : '#1A1A1A'} />
                <Text style={[styles.exerciseHeader, isDarkMode && styles.darkText]}>
                  Exercise {index + 1}
                </Text>
              </View>
              <Pressable
                style={[styles.removeIconButton, isDarkMode && styles.darkRemoveIconButton]}
                onPress={() => remove(index)}
                hitSlop={10}>
                <X size={20} color="#FF3B30" />
              </Pressable>
            </View>

            <Controller
              control={control}
              name={`exercises.${index}.name`}
              rules={{ required: 'Exercise name is required' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.formGroup}>
                  <Text style={[styles.label, isDarkMode && styles.darkText]}>Exercise Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      error && styles.errorInput,
                      isDarkMode && styles.darkInput,
                    ]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter exercise name"
                    placeholderTextColor={isDarkMode ? '#888888' : undefined}
                  />
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name={`exercises.${index}.sets`}
              rules={{ required: 'Sets are required' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.formGroup}>
                  <Text style={[styles.label, isDarkMode && styles.darkText]}>Sets</Text>
                  <TextInput
                    style={[
                      styles.input,
                      error && styles.errorInput,
                      isDarkMode && styles.darkInput,
                    ]}
                    onChangeText={(text) => onChange(parseInt(text) || 0)}
                    value={value?.toString()}
                    keyboardType="numeric"
                    placeholder="Number of sets"
                    placeholderTextColor={isDarkMode ? '#888888' : undefined}
                  />
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name={`exercises.${index}.weight`}
              rules={{ required: 'Weight is required' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.formGroup}>
                  <Text style={[styles.label, isDarkMode && styles.darkText]}>Weight (kg)</Text>
                  <TextInput
                    style={[
                      styles.input,
                      error && styles.errorInput,
                      isDarkMode && styles.darkInput,
                    ]}
                    onChangeText={(text) => onChange(parseFloat(text) || 0)}
                    value={value?.toString()}
                    keyboardType="numeric"
                    placeholder="Weight in kg"
                    placeholderTextColor={isDarkMode ? '#888888' : undefined}
                  />
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                </View>
              )}
            />
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.addButton, isDarkMode && styles.darkAddButton]}
            onPress={addExercise}>
            <Plus size={18} color={isDarkMode ? '#FFFFFF' : '#1A1A1A'} />
            <Text style={[styles.addButtonText, isDarkMode && styles.darkAddButtonText]}>
              Add Exercise
            </Text>
          </Pressable>

          <View style={[styles.divider, isDarkMode && styles.darkDivider]} />

          <Pressable
            style={[styles.submitButton, isDarkMode && styles.darkSubmitButton]}
            onPress={handleSubmit(onSubmit)}>
            <Save size={18} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Create Workout</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Toast
        message="Workout created successfully"
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  headerSubtext: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 4,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  exerciseContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  exerciseHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
    letterSpacing: -0.3,
  },
  removeIconButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
    gap: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginVertical: 8,
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: -0.3,
  },
  submitButton: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: -0.3,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSubtext: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  darkInput: {
    backgroundColor: '#2A2A2A',
    borderColor: '#3A3A3A',
    color: '#FFFFFF',
  },
  darkExerciseContainer: {
    backgroundColor: '#1E1E1E',
    borderColor: '#3A3A3A',
  },
  darkRemoveIconButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
  },
  darkAddButton: {
    backgroundColor: '#2A2A2A',
    borderColor: '#3A3A3A',
  },
  darkAddButtonText: {
    color: '#FFFFFF',
  },
  darkSubmitButton: {
    backgroundColor: '#1A1A1A',
  },
  darkDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
