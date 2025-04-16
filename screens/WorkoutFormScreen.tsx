import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, ScrollView } from 'react-native';

import AddWorkoutForm from '../components/AddWorkoutForm';
import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { styles, createDynamicStyles } from '../styles/WorkoutFormStyles';

// Define the route params type
type WorkoutFormScreenRouteProp = RouteProp<
  { WorkoutForm: { mode?: 'add' | 'edit'; id?: string } },
  'WorkoutForm'
>;

export default function WorkoutFormScreen() {
  const { isDarkMode } = useThemeStore();
  const navigation = useNavigation();
  const route = useRoute<WorkoutFormScreenRouteProp>();
  const { mode = 'add', id: workoutId } = route.params || {};
  const isEditMode = mode === 'edit' || !!workoutId;

  const workouts = useWorkoutStore((state) => state.workouts);
  const updateWorkout = useWorkoutStore((state) => state.updateWorkout);

  // Create dynamic styles based on theme
  const dynamicStyles = createDynamicStyles(isDarkMode);

  // If in edit mode, pass the workout data to the form
  const workoutToEdit = isEditMode ? workouts.find((w) => w.id === workoutId) : null;

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.background]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.formContainer,
          {
            paddingHorizontal: 20,
            paddingBottom: 40,
          },
        ]}>
        <AddWorkoutForm
          isEditMode={isEditMode}
          workoutToEdit={workoutToEdit}
          onUpdate={(updatedWorkout) => {
            if (isEditMode && workoutId) {
              updateWorkout(workoutId, updatedWorkout);
              navigation.goBack();
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
