import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useMemo, useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  Switch,
} from 'react-native';

import SetCarousel from '../components/SetCaroussel';
import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore } from '../stores/workoutStore';

export interface PerformanceScreenRef {
  present: (exerciseId: string) => void;
  dismiss: () => void;
}

export const PerformanceScreen = forwardRef<PerformanceScreenRef>((_, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [currentExerciseId, setCurrentExerciseId] = useState<string>('');
  const { getExerciseById, updateExercise, getPreviousExercise } = useWorkoutStore();
  const { isDarkMode } = useThemeStore();
  const [localWeight, setLocalWeight] = useState<number>(0);
  const [localReps, setLocalReps] = useState<number[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [localWeights, setLocalWeights] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Create dynamic styles based on theme (similar to DetailsScreen)
  const dynamicStyles = {
    background: { backgroundColor: isDarkMode ? '#121212' : '#FAFAFA' },
    contentBackground: { backgroundColor: isDarkMode ? '#1E1E1E' : 'white' },
    text: { color: isDarkMode ? '#FFFFFF' : '#111827' },
    subText: { color: isDarkMode ? '#BBBBBB' : '#6b7280' },
    border: { borderColor: isDarkMode ? '#333333' : '#F0F0F0' },
    metaBackground: { backgroundColor: isDarkMode ? '#2A2A2A' : '#f9fafb' },
    divider: { backgroundColor: isDarkMode ? '#333333' : '#e5e7eb' },
    saveButton: { backgroundColor: isDarkMode ? '#FFFFFF' : '#111827' },
    saveButtonText: { color: isDarkMode ? '#111827' : '#FFFFFF' },
    closeButton: { backgroundColor: isDarkMode ? '#2A2A2A' : '#f3f4f6' },
    closeButtonText: { color: isDarkMode ? '#BBBBBB' : '#4b5563' },
    successBackground: { backgroundColor: isDarkMode ? '#065f46' : '#111827' },
  };

  // Parse the ID for getting the exercise and previous exercise
  let workoutId: string | undefined;
  let exerciseId: string | undefined;

  if (currentExerciseId) {
    const lastHyphenIndex = currentExerciseId.lastIndexOf('-');
    if (lastHyphenIndex !== -1) {
      workoutId = currentExerciseId.substring(0, lastHyphenIndex);
      exerciseId = currentExerciseId.substring(lastHyphenIndex + 1);
    } else {
      // Add this to handle IDs without hyphens
      exerciseId = currentExerciseId;
    }
  }

  // Get the exercise using the combined ID
  const exercise = currentExerciseId ? getExerciseById(currentExerciseId) : undefined;

  // Add more debugging to see what's happening
  useEffect(() => {
    if (currentExerciseId) {
      // Let's try to get the exercise using just the exerciseId part
      if (exerciseId && !exercise) {
        const exerciseByJustId = getExerciseById(exerciseId);

        // If we find it with just the exerciseId, let's use that instead
        if (exerciseByJustId) {
          console.log('Found exercise using just the exerciseId!');
        }
      }
    }
  }, [currentExerciseId, exercise, workoutId, exerciseId, getExerciseById]);

  // Get previous exercise only if we have valid IDs
  const previousExercise =
    workoutId && exerciseId ? getPreviousExercise(workoutId, exerciseId) : undefined;

  // Handle save success animation
  useEffect(() => {
    if (saveSuccess) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setSaveSuccess(false);
        // Dismiss the modal after the animation completes
        bottomSheetModalRef.current?.dismiss();
      });
    }
  }, [saveSuccess, fadeAnim]);

  useImperativeHandle(ref, () => ({
    present: (exerciseId: string) => {
      setCurrentExerciseId(exerciseId);
      const exercise = getExerciseById(exerciseId);
      if (exercise) {
        setLocalWeight(exercise.weight);
        setLocalReps([...exercise.reps]);
        // Initialize per-set weights (either from exercise or default to main weight)
        const initialWeights =
          exercise.weights || Array(exercise.reps.length).fill(exercise.weight);
        setLocalWeights(initialWeights);
        setIsCompleted(exercise.isDone || false);
        // Reset active set index to 0 (Set 1) when opening
        setActiveSetIndex(0);
      }
      setHasChanges(false);
      setSaveSuccess(false);
      bottomSheetModalRef.current?.present();
    },
    dismiss: () => bottomSheetModalRef.current?.dismiss(),
  }));

  const snapPoints = useMemo(() => ['82%', '82%'], []);

  const handleUpdateSetWeight = (index: number, newWeight: number) => {
    // Provide haptic feedback
    const updatedWeights = [...localWeights];
    updatedWeights[index] = newWeight;
    setLocalWeights(updatedWeights);
    setHasChanges(true);
  };

  const handleUpdateReps = (index: number, newReps: number) => {
    // Provide haptic feedback
    const updatedReps = [...localReps];
    updatedReps[index] = newReps;
    setLocalReps(updatedReps);
    setHasChanges(true);
  };

  const handleCompletionToggle = (value: boolean) => {
    // Provide haptic feedback
    setIsCompleted(value);
    setHasChanges(true);
  };

  const handleSave = () => {
    if (!currentExerciseId || !hasChanges) return;

    // Provide stronger haptic feedback for save

    updateExercise(currentExerciseId, {
      weight: localWeight,
      reps: localReps,
      weights: localWeights,
      isDone: isCompleted,
    });

    setHasChanges(false);
    setSaveSuccess(true);

    // The modal will be dismissed after the animation completes in the useEffect
  };

  const handleClose = () => {
    if (hasChanges) {
      Alert.alert('Unsaved Changes', 'You have unsaved changes. Are you sure you want to close?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => {
            bottomSheetModalRef.current?.dismiss();
          },
        },
      ]);
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  };

  return (
    <BottomSheetModal
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          opacity={0.6}
          enableTouchThrough
          style={[{ backgroundColor: 'black', flex: 1 }]}
        />
      )}
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={dynamicStyles.background}
      handleIndicatorStyle={{ backgroundColor: isDarkMode ? '#555555' : '#CCCCCC' }}>
      <BottomSheetView style={[styles.contentContainer, dynamicStyles.background]}>
        {/* Header Section */}
        <View
          style={[styles.headerContainer, { borderBottomColor: dynamicStyles.border.borderColor }]}>
          <Text style={[styles.headerTitle, dynamicStyles.text]}>Performance</Text>
          <View style={styles.headerButtonsContainer}>
            <Pressable
              onPress={handleSave}
              style={[
                styles.headerButton,
                styles.saveButton,
                !hasChanges && styles.disabledButton,
                { backgroundColor: dynamicStyles.saveButton.backgroundColor },
              ]}>
              <Text style={[styles.saveButtonText, { color: dynamicStyles.saveButtonText.color }]}>
                Save
              </Text>
            </Pressable>
            <Pressable
              onPress={handleClose}
              style={[styles.headerButton, styles.closeButton, dynamicStyles.closeButton]}>
              <Text style={[styles.closeButtonText, dynamicStyles.closeButtonText]}>Close</Text>
            </Pressable>
          </View>
        </View>

        {/* Success Message */}
        <Animated.View
          style={[
            styles.successMessage,
            {
              opacity: fadeAnim,
              backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.9)' : 'rgba(16, 185, 129, 0.9)',
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [15, 0],
                  }),
                },
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 0.2, 1],
                    outputRange: [0.9, 1.05, 1],
                  }),
                },
              ],
            },
          ]}
          pointerEvents="none">
          <View style={styles.successInner}>
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.successText}>Saved</Text>
          </View>
        </Animated.View>

        {exercise && (
          <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
            {/* Exercise Info Section */}
            <View style={[styles.exerciseInfoContainer, dynamicStyles.contentBackground]}>
              <View style={styles.exerciseNameRow}>
                <Text style={[styles.exerciseName, dynamicStyles.text]}>{exercise.name}</Text>
              </View>

              {/* Completion Status Toggle */}
              <View style={[styles.completionContainer, dynamicStyles.metaBackground]}>
                <Text style={[styles.completionLabel, dynamicStyles.text]}>Mark as completed</Text>
                <Switch
                  value={isCompleted}
                  onValueChange={handleCompletionToggle}
                  trackColor={{ false: isDarkMode ? '#4b5563' : '#d1d5db', true: '#10b981' }}
                  thumbColor={isCompleted ? '#ffffff' : '#ffffff'}
                  ios_backgroundColor={isDarkMode ? '#4b5563' : '#d1d5db'}
                />
              </View>

              <View style={[styles.exerciseMetaContainer, dynamicStyles.metaBackground]}>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, dynamicStyles.subText]}>Sets</Text>
                  <Text style={[styles.metaValue, dynamicStyles.text]}>{exercise.sets}</Text>
                </View>
                <View style={[styles.metaDivider, dynamicStyles.divider]} />
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, dynamicStyles.subText]}>Reps</Text>
                  <Text style={[styles.metaValue, dynamicStyles.text]}>{localReps.join(', ')}</Text>
                </View>
                <View style={[styles.metaDivider, dynamicStyles.divider]} />
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, dynamicStyles.subText]}>Weight</Text>
                  <Text style={[styles.metaValue, dynamicStyles.text]}>{localWeight} kg</Text>
                </View>
              </View>
            </View>

            {/* Reps Controls with Carousel */}
            <View style={[styles.repsContainer, dynamicStyles.contentBackground]}>
              <Text style={[styles.repsTitle, dynamicStyles.subText]}>REPS PER SET</Text>

              {/* Use the SetCarousel component */}
              <SetCarousel
                localReps={localReps}
                localWeights={localWeights}
                previousExercise={previousExercise}
                activeSetIndex={activeSetIndex}
                setActiveSetIndex={setActiveSetIndex}
                handleUpdateReps={handleUpdateReps}
                handleUpdateSetWeight={handleUpdateSetWeight}
                isDarkMode={isDarkMode}
              />
            </View>

            {/* Previous Performance */}
            {previousExercise ? (
              <View style={[styles.previousPerformance, dynamicStyles.contentBackground]}>
                <View style={styles.previousHeaderContainer}>
                  <Text style={[styles.previousTitle, dynamicStyles.subText]}>Previous Week</Text>
                  <View style={[styles.previousBadge, dynamicStyles.metaBackground]}>
                    <Text style={[styles.previousBadgeText, dynamicStyles.subText]}>History</Text>
                  </View>
                </View>
                <View style={styles.previousDataContainer}>
                  <View style={styles.previousWeightContainer}>
                    <Text style={[styles.previousWeight, dynamicStyles.text]}>
                      {previousExercise.weight}
                    </Text>
                    <Text style={[styles.previousWeightUnit, dynamicStyles.subText]}>kg</Text>
                  </View>
                  <View style={styles.previousRepsContainer}>
                    <Text style={[styles.previousRepsLabel, dynamicStyles.subText]}>Reps</Text>
                    <Text style={[styles.previousRepsValues, dynamicStyles.subText]}>
                      {previousExercise.reps.join(' • ')}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.comparisonContainer,
                    { borderTopColor: dynamicStyles.border.borderColor },
                  ]}>
                  {exercise && previousExercise && (
                    <>
                      {/* Weight comparison */}
                      <View style={styles.comparisonItem}>
                        <Text style={[styles.comparisonLabel, dynamicStyles.subText]}>Weight:</Text>
                        {localWeight > previousExercise.weight ? (
                          <Text style={styles.improvementText}>
                            +{(localWeight - previousExercise.weight).toFixed(1)}kg from last week
                          </Text>
                        ) : localWeight < previousExercise.weight ? (
                          <Text style={styles.decreaseText}>
                            {(localWeight - previousExercise.weight).toFixed(1)}kg from last week
                          </Text>
                        ) : (
                          <Text style={[styles.sameText, dynamicStyles.subText]}>
                            Same weight as last week
                          </Text>
                        )}
                      </View>

                      {/* Reps comparison */}
                      <View style={styles.comparisonItem}>
                        <Text style={[styles.comparisonLabel, dynamicStyles.subText]}>Reps:</Text>
                        {(() => {
                          const totalCurrentReps = localReps.reduce((sum, rep) => sum + rep, 0);
                          const totalPreviousReps = previousExercise.reps.reduce(
                            (sum, rep) => sum + rep,
                            0
                          );

                          if (totalCurrentReps > totalPreviousReps) {
                            return (
                              <Text style={styles.improvementText}>
                                +{totalCurrentReps - totalPreviousReps} total reps from last week
                              </Text>
                            );
                          } else if (totalCurrentReps < totalPreviousReps) {
                            return (
                              <Text style={styles.decreaseText}>
                                {totalCurrentReps - totalPreviousReps} total reps from last week
                              </Text>
                            );
                          } else {
                            return (
                              <Text style={[styles.sameText, dynamicStyles.subText]}>
                                Same total reps as last week
                              </Text>
                            );
                          }
                        })()}
                      </View>
                    </>
                  )}
                </View>
              </View>
            ) : (
              <View style={[styles.previousPerformance, dynamicStyles.contentBackground]}>
                <View style={styles.previousHeaderContainer}>
                  <Text style={[styles.previousTitle, dynamicStyles.subText]}>
                    Previous Performance
                  </Text>
                  <View style={[styles.previousBadge, dynamicStyles.metaBackground]}>
                    <Text style={[styles.previousBadgeText, dynamicStyles.subText]}>New</Text>
                  </View>
                </View>
                <View style={[styles.noPreviousDataContainer, dynamicStyles.metaBackground]}>
                  <Text style={[styles.noPreviousDataText, dynamicStyles.text]}>
                    No previous data available
                  </Text>
                  <Text style={[styles.noPreviousDataSubtext, dynamicStyles.subText]}>
                    This is your first time tracking this exercise. Your performance will be saved
                    for future comparison.
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 4,
    backgroundColor: '#FAFAFA',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 0.3,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  saveButton: {
    backgroundColor: '#111827',
  },
  disabledButton: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: '#f3f4f6',
  },
  closeButtonText: {
    fontWeight: '600',
    color: '#4b5563',
    fontSize: 14,
  },
  successMessage: {
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  successInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  checkmarkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: -1,
  },
  successText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  exerciseInfoContainer: {
    width: '100%',
    marginBottom: 12,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  exerciseNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 0.2,
    flex: 1,
  },
  exerciseTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  exerciseTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
  },
  exerciseMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 8,
  },
  metaItem: {
    alignItems: 'center',
    flex: 1,
  },
  metaLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
  },
  metaDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e5e7eb',
  },
  weightControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 12,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  weightButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#111827',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  weightButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 22,
    includeFontPadding: false,
  },
  weightDisplayContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  exerciseWeight: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 48,
    includeFontPadding: false,
    letterSpacing: -0.5,
  },
  exerciseWeightUnit: {
    color: '#6b7280',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 4,
  },
  repsContainer: {
    width: '100%',
    marginTop: 12,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  repsTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  previousPerformance: {
    width: '100%',
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  previousHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  previousTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  previousBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  previousBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  previousDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previousWeightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  previousWeight: {
    fontSize: 48,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  previousWeightUnit: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 4,
  },
  previousRepsContainer: {
    alignItems: 'flex-end',
  },
  previousRepsLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  previousRepsValues: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  comparisonContainer: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  comparisonLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginRight: 8,
    width: 60,
  },
  improvementText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981', // green
    flex: 1,
  },
  decreaseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444', // red
    flex: 1,
  },
  sameText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280', // gray
    flex: 1,
  },
  defaultWeightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  weightControlsInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  completionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  completionLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  noPreviousDataContainer: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  noPreviousDataText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  noPreviousDataSubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
