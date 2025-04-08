import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useMemo, useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Alert, Animated, Switch } from 'react-native';

import SetCarousel from '../components/SetCaroussel';
import i18n from '../i18n';
import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { createStyles } from '../styles/PerformanceScreenStyles';

export interface PerformanceScreenRef {
  present: (exerciseId: string) => void;
  dismiss: () => void;
}

interface PerformanceScreenProps {
  onDataChange?: () => void;
}

export const PerformanceScreen = forwardRef<PerformanceScreenRef, PerformanceScreenProps>(
  ({ onDataChange }, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [currentExerciseId, setCurrentExerciseId] = useState<string>('');
    const { getExerciseById, updateExercise, getPreviousExercise } = useWorkoutStore();
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const [localWeight, setLocalWeight] = useState<number>(0);
    const [localReps, setLocalReps] = useState<number[]>([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [activeSetIndex, setActiveSetIndex] = useState(0);
    const [localWeights, setLocalWeights] = useState<number[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

    // Get styles based on theme
    const { styles, dynamicStyles } = createStyles(isDarkMode);

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
        ]).start(({ finished }) => {
          if (finished) {
            setSaveSuccess(false);
            // Dismiss the modal after the animation completes
            bottomSheetModalRef.current?.dismiss();
          }
        });
      }
    }, [saveSuccess, fadeAnim]);

    // Add this useEffect to sync localWeight with the active set's weight
    useEffect(() => {
      if (localWeights.length > activeSetIndex) {
        setLocalWeight(localWeights[activeSetIndex]);
      }
    }, [activeSetIndex, localWeights]);

    useImperativeHandle(ref, () => ({
      present: (exerciseId: string) => {
        setCurrentExerciseId(exerciseId);
        const exercise = getExerciseById(exerciseId);
        console.log('Exercise:', exercise);
        if (exercise) {
          setLocalWeight(exercise.weight);
          setLocalReps([...exercise.reps]);
          // Initialize per-set weights (either from exercise or default to main weight)
          const initialWeights =
            exercise.weights || Array(exercise.reps.length).fill(exercise.weight);
          console.log('Initial weights:', initialWeights);
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

      // Also update the main weight if this is the first set
      if (index === 0) {
        setLocalWeight(newWeight);
      }

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

      try {
        updateExercise(currentExerciseId, {
          weight: localWeight,
          reps: localReps,
          weights: localWeights,
          isDone: isCompleted,
        });

        console.log('Exercise updated successfully');
        setHasChanges(false);
        setSaveSuccess(true);

        // Call the onDataChange callback to notify parent component
        if (onDataChange) {
          onDataChange();
        }

        // The modal will be dismissed after the animation completes in the useEffect
      } catch (error) {
        console.error('Error saving exercise:', error);
        Alert.alert(
          i18n.t('performanceScreen.errorTitle') || 'Error',
          i18n.t('performanceScreen.errorSaving') || 'There was an error saving your changes.'
        );
      }
    };

    const handleClose = () => {
      if (hasChanges) {
        Alert.alert(
          i18n.t('performanceScreen.unsavedChangesTitle'),
          i18n.t('performanceScreen.unsavedChangesMessage'),
          [
            { text: i18n.t('performanceScreen.cancel'), style: 'cancel' },
            {
              text: i18n.t('performanceScreen.discard'),
              style: 'destructive',
              onPress: () => {
                bottomSheetModalRef.current?.dismiss();
              },
            },
          ]
        );
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
        handleIndicatorStyle={dynamicStyles.handleIndicator}>
        <BottomSheetView style={[styles.contentContainer, dynamicStyles.background]}>
          {/* Header Section */}
          <View
            style={[
              styles.headerContainer,
              { borderBottomColor: dynamicStyles.border.borderColor },
            ]}>
            <Text style={[styles.headerTitle, dynamicStyles.text]}>
              {i18n.t('performanceScreen.title')}
            </Text>
            <View style={styles.headerButtonsContainer}>
              <Pressable
                onPress={handleSave}
                style={[
                  styles.headerButton,
                  styles.saveButton,
                  !hasChanges && styles.disabledButton,
                  dynamicStyles.saveButton,
                ]}>
                <Text style={[styles.saveButtonText, dynamicStyles.saveButtonText]}>
                  {i18n.t('performanceScreen.save')}
                </Text>
              </Pressable>
              <Pressable
                onPress={handleClose}
                style={[styles.headerButton, styles.closeButton, dynamicStyles.closeButton]}>
                <Text style={[styles.closeButtonText, dynamicStyles.closeButtonText]}>
                  {i18n.t('performanceScreen.close')}
                </Text>
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
              <Text style={styles.successText}>{i18n.t('performanceScreen.saved')}</Text>
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
                  <Text style={[styles.completionLabel, dynamicStyles.text]}>
                    {i18n.t('performanceScreen.markAsCompleted')}
                  </Text>
                  <Switch
                    value={isCompleted}
                    onValueChange={handleCompletionToggle}
                    trackColor={dynamicStyles.switchTrackColor}
                    thumbColor={dynamicStyles.switchThumbColor}
                    ios_backgroundColor={dynamicStyles.switchTrackColor.false}
                  />
                </View>

                <View style={[styles.exerciseMetaContainer, dynamicStyles.metaBackground]}>
                  <View style={styles.metaItem}>
                    <Text style={[styles.metaLabel, dynamicStyles.subText]}>
                      {i18n.t('performanceScreen.sets')}
                    </Text>
                    <Text style={[styles.metaValue, dynamicStyles.text]}>{exercise.sets}</Text>
                  </View>
                  <View style={[styles.metaDivider, dynamicStyles.divider]} />
                  <View style={styles.metaItem}>
                    <Text style={[styles.metaLabel, dynamicStyles.subText]}>
                      {i18n.t('performanceScreen.reps')}
                    </Text>
                    <Text style={[styles.metaValue, dynamicStyles.text]}>
                      {localReps.join(', ')}
                    </Text>
                  </View>
                  <View style={[styles.metaDivider, dynamicStyles.divider]} />
                  <View style={styles.metaItem}>
                    <Text style={[styles.metaLabel, dynamicStyles.subText]}>
                      {i18n.t('performanceScreen.weight')}
                    </Text>
                    <Text style={[styles.metaValue, dynamicStyles.text]}>{localWeight} kg</Text>
                  </View>
                </View>
              </View>

              {/* Reps Controls with Carousel */}
              <View style={[styles.repsContainer, dynamicStyles.contentBackground]}>
                <Text style={[styles.repsTitle, dynamicStyles.subText]}>
                  {i18n.t('performanceScreen.repsPerSet')}
                </Text>

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
                    <Text style={[styles.previousTitle, dynamicStyles.subText]}>
                      {i18n.t('performanceScreen.previousWeek')}
                    </Text>
                    <View style={[styles.previousBadge, dynamicStyles.metaBackground]}>
                      <Text style={[styles.previousBadgeText, dynamicStyles.subText]}>
                        {i18n.t('performanceScreen.history')}
                      </Text>
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
                      <Text style={[styles.previousRepsLabel, dynamicStyles.subText]}>
                        {i18n.t('performanceScreen.reps')}
                      </Text>
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
                          <Text style={[styles.comparisonLabel, dynamicStyles.subText]}>
                            {i18n.t('performanceScreen.weight')}:
                          </Text>
                          {localWeight > previousExercise.weight ? (
                            <Text style={[styles.improvementText, dynamicStyles.improvementText]}>
                              +{(localWeight - previousExercise.weight).toFixed(1)}kg{' '}
                              {i18n.t('performanceScreen.fromLastWeek')}
                            </Text>
                          ) : localWeight < previousExercise.weight ? (
                            <Text style={[styles.decreaseText, dynamicStyles.decreaseText]}>
                              {(localWeight - previousExercise.weight).toFixed(1)}kg{' '}
                              {i18n.t('performanceScreen.fromLastWeek')}
                            </Text>
                          ) : (
                            <Text style={[styles.sameText, dynamicStyles.sameText]}>
                              {i18n.t('performanceScreen.sameWeightAsLastWeek')}
                            </Text>
                          )}
                        </View>

                        {/* Reps comparison */}
                        <View style={styles.comparisonItem}>
                          <Text style={[styles.comparisonLabel, dynamicStyles.subText]}>
                            {i18n.t('performanceScreen.reps')}:
                          </Text>
                          {(() => {
                            const totalCurrentReps = localReps.reduce((sum, rep) => sum + rep, 0);
                            const totalPreviousReps = previousExercise.reps.reduce(
                              (sum, rep) => sum + rep,
                              0
                            );

                            if (totalCurrentReps > totalPreviousReps) {
                              return (
                                <Text
                                  style={[styles.improvementText, dynamicStyles.improvementText]}>
                                  +{totalCurrentReps - totalPreviousReps}{' '}
                                  {i18n.t('performanceScreen.totalReps')}{' '}
                                  {i18n.t('performanceScreen.fromLastWeek')}
                                </Text>
                              );
                            } else if (totalCurrentReps < totalPreviousReps) {
                              return (
                                <Text style={[styles.decreaseText, dynamicStyles.decreaseText]}>
                                  {totalCurrentReps - totalPreviousReps}{' '}
                                  {i18n.t('performanceScreen.totalReps')}{' '}
                                  {i18n.t('performanceScreen.fromLastWeek')}
                                </Text>
                              );
                            } else {
                              return (
                                <Text style={[styles.sameText, dynamicStyles.sameText]}>
                                  {i18n.t('performanceScreen.sameTotalRepsAsLastWeek')}
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
                      {i18n.t('performanceScreen.previousPerformance')}
                    </Text>
                    <View style={[styles.previousBadge, dynamicStyles.metaBackground]}>
                      <Text style={[styles.previousBadgeText, dynamicStyles.subText]}>
                        {i18n.t('performanceScreen.new')}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.noPreviousDataContainer, dynamicStyles.metaBackground]}>
                    <Text style={[styles.noPreviousDataText, dynamicStyles.text]}>
                      {i18n.t('performanceScreen.noPreviousData')}
                    </Text>
                    <Text style={[styles.noPreviousDataSubtext, dynamicStyles.subText]}>
                      {i18n.t('performanceScreen.firstTimeTracking')}
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
