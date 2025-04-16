import { useNavigation } from '@react-navigation/native';
import { useSession } from 'context/SessionProvider';
import { Plus, X, Save, ArrowLeft } from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { Toast } from './Toast';
import i18n from '../i18n';
import { useThemeStore } from '../stores/themeStore';
import { Workout, useWorkoutStore, Exercise } from '../stores/workoutStore';
import { styles, createDynamicStyles } from '../styles/AddWorkoutFormStyles';

type WorkoutFormData = {
  title: string;
  exercises: Omit<Exercise, 'id' | 'workoutId'>[];
};

interface AddWorkoutFormProps {
  isEditMode?: boolean;
  workoutToEdit?: Workout | null;
  onUpdate?: (updatedWorkout: any) => void;
}

const AddWorkoutForm: React.FC<AddWorkoutFormProps> = ({
  isEditMode = false,
  workoutToEdit = null,
  onUpdate,
}) => {
  const navigation = useNavigation();
  const [showToast, setShowToast] = useState(false);
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { session } = useSession();
  const user = session?.user?.user_metadata;

  // Log the props to debug
  console.log('AddWorkoutForm - isEditMode:', isEditMode);
  console.log('AddWorkoutForm - workoutToEdit:', workoutToEdit);

  // Initialize form with default values or edit values
  const { control, handleSubmit, reset } = useForm<WorkoutFormData>({
    defaultValues: {
      title: '',
      exercises: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  // Use useEffect to set form values when workoutToEdit changes
  useEffect(() => {
    if (isEditMode && workoutToEdit) {
      console.log('Setting form values for edit mode');
      console.log('Workout sessions structure:', JSON.stringify(workoutToEdit.sessions, null, 2));

      // Check if sessions is an array of arrays or an array of objects
      let exercisesToEdit: Exercise[] = [];

      if (workoutToEdit.sessions && workoutToEdit.sessions.length > 0) {
        // Handle different possible structures of sessions
        if (Array.isArray(workoutToEdit.sessions[0])) {
          // If sessions[0] is an array, use it directly
          exercisesToEdit = workoutToEdit.sessions[0];
          console.log('Sessions is array of arrays, using first array');
        } else if (workoutToEdit.sessions[0] && workoutToEdit.sessions[0].exercises) {
          // If sessions[0] is an object with exercises property
          exercisesToEdit = workoutToEdit.sessions[0].exercises;
          console.log('Sessions is array of objects with exercises property');
        } else {
          console.log('Unknown sessions structure:', workoutToEdit.sessions[0]);
        }
      }

      console.log('Exercises to edit:', exercisesToEdit);

      // Map exercises to the format expected by the form
      const formattedExercises = exercisesToEdit.map((exercise) => ({
        name: exercise.name || '',
        sets: exercise.sets || 3,
        reps: exercise.reps || [],
        weight: exercise.weight || 0,
      }));

      console.log('Formatted exercises for form:', formattedExercises);

      // Reset the form with the workout data
      reset({
        title: workoutToEdit.title,
        exercises: formattedExercises.length > 0 ? formattedExercises : [],
      });

      // If no exercises were found, add a default one
      if (formattedExercises.length === 0) {
        append({
          name: '',
          sets: 3,
          reps: [8, 8, 8],
          weight: 0,
        });
      }
    }
  }, [isEditMode, workoutToEdit, reset, append]);

  const dynamicStyles = createDynamicStyles(isDarkMode);

  const onSubmit = (data: WorkoutFormData) => {
    // Show confirmation dialog
    Alert.alert(
      isEditMode
        ? i18n.t('addWorkoutForm.confirmUpdateTitle') || 'Confirm Update'
        : i18n.t('addWorkoutForm.confirmTitle') || 'Confirm Workout',
      isEditMode
        ? i18n.t('addWorkoutForm.confirmUpdateMessage') ||
            'Are you sure you want to update this workout?'
        : i18n.t('addWorkoutForm.confirmMessage') ||
            'Are you sure you want to create this workout?',
      [
        {
          text: i18n.t('addWorkoutForm.cancel') || 'Cancel',
          style: 'cancel',
        },
        {
          text: i18n.t('addWorkoutForm.confirm') || 'Confirm',
          onPress: () => {
            if (isEditMode && workoutToEdit && onUpdate) {
              // Handle update
              const exercisesWithIds = data.exercises.map((exercise) => ({
                ...exercise,
                id: Math.random().toString(36).substr(2, 9),
                workoutId: workoutToEdit.id,
                reps: Array.isArray(exercise.reps) ? exercise.reps : Array(exercise.sets).fill(8),
                date: new Date(),
              }));

              // Create updated workout object
              const updatedWorkout = {
                ...workoutToEdit,
                title: data.title,
                sessions: [{ exercises: exercisesWithIds }],
              };

              onUpdate(updatedWorkout);
              setShowToast(true);
              setTimeout(() => {
                navigation.goBack();
              }, 2000);
            } else {
              // Handle create new workout
              const exercisesWithIds = data.exercises.map((exercise) => ({
                ...exercise,
                id: Math.random().toString(36).substr(2, 9),
                workoutId: '', // This will be set by the store
                reps: Array(exercise.sets).fill(8), // Initialize reps array based on sets
                date: new Date(), // Add date for tracking
              }));

              addWorkout(user?.sub, {
                title: data.title,
                completed: false,
                week: 'Week 1',
                user_id: user?.sub,
                created_at: new Date(),
                isFavorite: false,
                sessions: [{ exercises: exercisesWithIds }], // Only use the proper sessions structure
              });

              setShowToast(true);
              setTimeout(() => {
                navigation.goBack();
              }, 2000);
            }
          },
        },
      ]
    );
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
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={[styles.container, isDarkMode && dynamicStyles.container]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={[styles.backButton, isDarkMode && dynamicStyles.darkBackButton]}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <ArrowLeft size={20} color={isDarkMode ? '#FFFFFF' : '#000000'} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, isDarkMode && dynamicStyles.darkText]}>
            {isEditMode
              ? i18n.t('addWorkoutForm.editWorkout') || 'Edit Workout'
              : i18n.t('addWorkoutForm.createNewWorkout') || 'Create New Workout'}
          </Text>
          <Text style={[styles.headerSubtext, isDarkMode && dynamicStyles.darkSubtext]}>
            {isEditMode
              ? i18n.t('addWorkoutForm.modifyWorkout') || 'Modify your workout details'
              : i18n.t('addWorkoutForm.designWorkout') || 'Design your workout'}
          </Text>
        </View>

        <View style={styles.formWrapper}>
          <Controller
            control={control}
            name="title"
            rules={{ required: i18n.t('addWorkoutForm.titleRequired') || 'Title is required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.formGroup}>
                <Text style={[styles.label, isDarkMode && dynamicStyles.darkText]}>
                  {i18n.t('addWorkoutForm.workoutTitle') || 'Workout Title'}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    error && styles.errorInput,
                    isDarkMode && dynamicStyles.darkInput,
                  ]}
                  onChangeText={onChange}
                  value={value}
                  placeholder={i18n.t('addWorkoutForm.enterTitle') || 'Enter title'}
                  placeholderTextColor={isDarkMode ? '#888888' : '#AAAAAA'}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />

          {fields.length > 0 && (
            <View style={styles.exercisesHeader}>
              <Text style={[styles.exercisesTitle, isDarkMode && dynamicStyles.darkText]}>
                {i18n.t('addWorkoutForm.exercises') || 'Exercises'}
              </Text>
              <Text style={[styles.exercisesCount, isDarkMode && dynamicStyles.darkSubtext]}>
                {fields.length} {fields.length === 1 ? 'exercise' : 'exercises'}
              </Text>
            </View>
          )}

          {fields.map((field, index) => (
            <View
              key={field.id}
              style={[styles.exerciseContainer, isDarkMode && dynamicStyles.darkExerciseContainer]}>
              <View style={styles.exerciseHeaderContainer}>
                <View style={styles.exerciseHeaderLeft}>
                  <Text style={[styles.exerciseHeader, isDarkMode && dynamicStyles.darkText]}>
                    {i18n.t('addWorkoutForm.exercise') || 'Exercise'} {index + 1}
                  </Text>
                </View>
                <Pressable
                  style={[
                    styles.removeIconButton,
                    isDarkMode && dynamicStyles.darkRemoveIconButton,
                  ]}
                  onPress={() => remove(index)}
                  hitSlop={10}>
                  <X size={20} color="#FF3B30" />
                </Pressable>
              </View>

              <Controller
                control={control}
                name={`exercises.${index}.name`}
                rules={{
                  required:
                    i18n.t('addWorkoutForm.exerciseNameRequired') || 'Exercise name is required',
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, isDarkMode && dynamicStyles.darkText]}>
                      {i18n.t('addWorkoutForm.exerciseName') || 'Exercise Name'}
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        error && styles.errorInput,
                        isDarkMode && dynamicStyles.darkInput,
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder={
                        i18n.t('addWorkoutForm.enterExerciseName') || 'Enter exercise name'
                      }
                      placeholderTextColor={isDarkMode ? '#888888' : undefined}
                    />
                    {error && <Text style={styles.errorText}>{error.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name={`exercises.${index}.sets`}
                rules={{ required: i18n.t('addWorkoutForm.setsRequired') || 'Sets are required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, isDarkMode && dynamicStyles.darkText]}>
                      {i18n.t('addWorkoutForm.sets') || 'Sets'}
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        error && styles.errorInput,
                        isDarkMode && dynamicStyles.darkInput,
                      ]}
                      onChangeText={(text) => onChange(parseInt(text) || 0)}
                      value={value?.toString()}
                      keyboardType="numeric"
                      placeholder={i18n.t('addWorkoutForm.numberOfSets') || 'Number of sets'}
                      placeholderTextColor={isDarkMode ? '#888888' : undefined}
                    />
                    {error && <Text style={styles.errorText}>{error.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name={`exercises.${index}.weight`}
                rules={{
                  required: i18n.t('addWorkoutForm.weightRequired') || 'Weight is required',
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, isDarkMode && dynamicStyles.darkText]}>
                      {i18n.t('addWorkoutForm.weight') || 'Weight'}
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        error && styles.errorInput,
                        isDarkMode && dynamicStyles.darkInput,
                      ]}
                      onChangeText={(text) => onChange(parseFloat(text) || 0)}
                      value={value?.toString()}
                      keyboardType="numeric"
                      placeholder={i18n.t('addWorkoutForm.weightInKg') || 'Weight in kg'}
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
              style={[styles.addButton, isDarkMode && dynamicStyles.darkAddButton]}
              onPress={addExercise}>
              <Plus size={18} color={isDarkMode ? '#FFFFFF' : '#1A1A1A'} />
              <Text style={[styles.addButtonText, isDarkMode && dynamicStyles.darkAddButtonText]}>
                {i18n.t('addWorkoutForm.addExercise') || 'Add Exercise'}
              </Text>
            </Pressable>

            <View style={[styles.divider, isDarkMode && dynamicStyles.darkDivider]} />

            <Pressable
              style={[styles.submitButton, isDarkMode && dynamicStyles.darkSubmitButton]}
              onPress={handleSubmit(onSubmit)}>
              <Save size={18} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>
                {isEditMode
                  ? i18n.t('addWorkoutForm.updateWorkout') || 'Update Workout'
                  : i18n.t('addWorkoutForm.createWorkout') || 'Create Workout'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Toast
        message={
          isEditMode
            ? i18n.t('addWorkoutForm.workoutUpdatedSuccess') || 'Workout updated successfully!'
            : i18n.t('addWorkoutForm.workoutCreatedSuccess') || 'Workout created successfully!'
        }
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </>
  );
};

export default AddWorkoutForm;
