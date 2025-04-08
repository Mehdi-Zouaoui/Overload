import { useNavigation } from '@react-navigation/native';
import { useSession } from 'context/SessionProvider';
import { Plus, X, Dumbbell, Save } from 'lucide-react-native';
import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';

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
  const { control, handleSubmit } = useForm<WorkoutFormData>({
    defaultValues: {
      title: '',
      exercises: [],
    },
  });

  const dynamicStyles = createDynamicStyles(isDarkMode);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const onSubmit = (data: WorkoutFormData) => {
    // Show confirmation dialog
    Alert.alert(
      i18n.t('addWorkoutForm.confirmTitle') || 'Confirm Workout',
      i18n.t('addWorkoutForm.confirmMessage') || 'Are you sure you want to create this workout?',
      [
        {
          text: i18n.t('addWorkoutForm.cancel') || 'Cancel',
          style: 'cancel',
        },
        {
          text: i18n.t('addWorkoutForm.confirm') || 'Confirm',
          onPress: () => {
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
      <ScrollView style={[styles.container, isDarkMode && dynamicStyles.container]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, isDarkMode && dynamicStyles.darkText]}>
            {i18n.t('addWorkoutForm.createNewWorkout')}
          </Text>
          <Text style={[styles.headerSubtext, isDarkMode && dynamicStyles.darkSubtext]}>
            {i18n.t('addWorkoutForm.designWorkout')}
          </Text>
        </View>

        <Controller
          control={control}
          name="title"
          rules={{ required: i18n.t('addWorkoutForm.titleRequired') }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.formGroup}>
              <Text style={[styles.label, isDarkMode && dynamicStyles.darkText]}>
                {i18n.t('addWorkoutForm.workoutTitle')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  error && styles.errorInput,
                  isDarkMode && dynamicStyles.darkInput,
                ]}
                onChangeText={onChange}
                value={value}
                placeholder={i18n.t('addWorkoutForm.enterTitle')}
                placeholderTextColor={isDarkMode ? '#888888' : undefined}
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </View>
          )}
        />

        {fields.map((field, index) => (
          <View
            key={field.id}
            style={[styles.exerciseContainer, isDarkMode && dynamicStyles.darkExerciseContainer]}>
            <View style={styles.exerciseHeaderContainer}>
              <View style={styles.exerciseHeaderLeft}>
                <Dumbbell size={18} color={isDarkMode ? '#FFFFFF' : '#1A1A1A'} />
                <Text style={[styles.exerciseHeader, isDarkMode && dynamicStyles.darkText]}>
                  {i18n.t('addWorkoutForm.exercise')} {index + 1}
                </Text>
              </View>
              <Pressable
                style={[styles.removeIconButton, isDarkMode && dynamicStyles.darkRemoveIconButton]}
                onPress={() => remove(index)}
                hitSlop={10}>
                <X size={20} color="#FF3B30" />
              </Pressable>
            </View>

            <Controller
              control={control}
              name={`exercises.${index}.name`}
              rules={{ required: i18n.t('addWorkoutForm.exerciseNameRequired') }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.formGroup}>
                  <Text style={[styles.label, isDarkMode && dynamicStyles.darkText]}>
                    {i18n.t('addWorkoutForm.exerciseName')}
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      error && styles.errorInput,
                      isDarkMode && dynamicStyles.darkInput,
                    ]}
                    onChangeText={onChange}
                    value={value}
                    placeholder={i18n.t('addWorkoutForm.enterExerciseName')}
                    placeholderTextColor={isDarkMode ? '#888888' : undefined}
                  />
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name={`exercises.${index}.sets`}
              rules={{ required: i18n.t('addWorkoutForm.setsRequired') }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.formGroup}>
                  <Text style={[styles.label, isDarkMode && dynamicStyles.darkText]}>
                    {i18n.t('addWorkoutForm.sets')}
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
                    placeholder={i18n.t('addWorkoutForm.numberOfSets')}
                    placeholderTextColor={isDarkMode ? '#888888' : undefined}
                  />
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name={`exercises.${index}.weight`}
              rules={{ required: i18n.t('addWorkoutForm.weightRequired') }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.formGroup}>
                  <Text style={[styles.label, isDarkMode && dynamicStyles.darkText]}>
                    {i18n.t('addWorkoutForm.weight')}
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
                    placeholder={i18n.t('addWorkoutForm.weightInKg')}
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
              {i18n.t('addWorkoutForm.addExercise')}
            </Text>
          </Pressable>

          <View style={[styles.divider, isDarkMode && dynamicStyles.darkDivider]} />

          <Pressable
            style={[styles.submitButton, isDarkMode && dynamicStyles.darkSubmitButton]}
            onPress={handleSubmit(onSubmit)}>
            <Save size={18} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>{i18n.t('addWorkoutForm.createWorkout')}</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Toast
        message={i18n.t('addWorkoutForm.workoutCreatedSuccess')}
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </>
  );
};

export default AddWorkoutForm;
