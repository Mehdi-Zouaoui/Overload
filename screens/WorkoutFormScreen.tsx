import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView, TouchableOpacity, Text, View, ScrollView } from 'react-native';

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
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.backButton,
            dynamicStyles.backButton,
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 4,
              borderWidth: 2,
              borderColor: isDarkMode ? '#333333' : '#DDDDDD',
            },
          ]}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={dynamicStyles.iconColor} />
          <Text
            style={[
              styles.backButtonText,
              dynamicStyles.text,
              {
                fontWeight: '800',
                letterSpacing: -0.3,
                textTransform: 'uppercase',
              },
            ]}>
            Back
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            dynamicStyles.text,
            {
              fontSize: 28,
              fontWeight: '900',
              letterSpacing: -0.5,
              textTransform: 'uppercase',
            },
          ]}>
          {isEditMode ? 'Edit Workout' : 'Add Workout'}
        </Text>
        <View style={{ width: 50 }} /> {/* Empty view for spacing */}
      </View>

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
