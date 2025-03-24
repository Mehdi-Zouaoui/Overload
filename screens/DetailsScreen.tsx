import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ExerciceCard } from 'components/ExerciceCard';
import { Dumbbell, Weight, Save, ArrowLeft, Calendar, Clock } from 'lucide-react-native';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { useThemeStore } from 'stores/themeStore';
import { useWorkoutStore } from 'stores/workoutStore';

import { PerformanceScreen, PerformanceScreenRef } from './PerformanceScreen';

type RootStackParamList = {
  Details: { id: string };
};

type DetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Details'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
};

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const workout = useWorkoutStore((state) => state.getWorkoutById(id));
  const performanceScreenRef = useRef<PerformanceScreenRef>(null);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const saveWorkoutProgress = useWorkoutStore((state) => state.saveWorkoutProgress);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // State for tracking when save is in progress
  const [isSaving, setIsSaving] = useState(false);

  // Get the current session's exercises and ensure each has isDone property
  const currentSessionExercises = useMemo(() => {
    if (!workout) return [];

    const currentSession = workout.sessions[workout.sessions.length - 1];
    if (!currentSession) return [];

    // currentSession is already the array of exercises
    const exercises = Array.isArray(currentSession) ? currentSession : [];

    return exercises.map((exercise) => ({
      ...exercise,
      isDone: exercise.isDone !== undefined ? exercise.isDone : false,
    }));
  }, [workout]);

  // Calculate total weight for current session
  const totalWeight = useMemo(() => {
    if (!currentSessionExercises.length) return 0;
    return currentSessionExercises.reduce((sum, exercise) => {
      const exerciseTotal = exercise.sets * exercise.weight;
      return sum + exerciseTotal;
    }, 0);
  }, [currentSessionExercises]);

  // Check if workout is done (all exercises are completed)
  const isAllExercisesDone = useMemo(() => {
    if (!currentSessionExercises.length) return false;
    return currentSessionExercises.every((exercise) => exercise.isDone);
  }, [currentSessionExercises]);

  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    if (!currentSessionExercises.length) return 0;
    return (
      (currentSessionExercises.filter((e) => e.isDone).length / currentSessionExercises.length) *
      100
    );
  }, [currentSessionExercises]);

  // Calculate total weight for previous session
  const calculatePreviousSessionWeight = () => {
    if (!workout || workout.sessions.length < 2) return 0;

    const previousSessionIndex = workout.sessions.length - 2;
    const previousSession = workout.sessions[previousSessionIndex];

    // Handle both session formats
    const previousExercises = Array.isArray(previousSession)
      ? previousSession
      : previousSession.exercises;

    return previousExercises.reduce((sum, exercise) => {
      const exerciseTotal = exercise.sets * exercise.weight;
      return sum + exerciseTotal;
    }, 0);
  };

  // Format date for display
  const formattedDate = useMemo(() => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  // Animate elements when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: completionPercentage / 100,
      duration: 800,
      delay: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, [fadeAnim, slideAnim, progressAnim, completionPercentage]);

  // Update progress animation when completion changes
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: completionPercentage / 100,
      duration: 600,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, [completionPercentage, progressAnim]);

  // Create dynamic styles based on theme
  const dynamicStyles = {
    background: { backgroundColor: isDarkMode ? '#121212' : '#f8f9fa' },
    text: { color: isDarkMode ? '#ffffff' : '#000000' },
    weekBadge: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    statCard: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#ffffff',
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    },
    divider: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
    },
    countBadge: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    subText: {
      color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
    },
    iconColor: isDarkMode ? '#ffffff' : '#000000',
    saveButton: {
      backgroundColor: isAllExercisesDone
        ? isDarkMode
          ? '#ffffff'
          : '#000000'
        : isDarkMode
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.2)',
      color: isAllExercisesDone
        ? isDarkMode
          ? '#000000'
          : '#ffffff'
        : isDarkMode
          ? 'rgba(255, 255, 255, 0.5)'
          : 'rgba(0, 0, 0, 0.5)',
    },
    backButton: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
    },
    progressBar: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
      filledColor: isAllExercisesDone ? '#10b981' : isDarkMode ? '#ffffff' : '#000000',
    },
    highlight: {
      color: isDarkMode ? '#ffffff' : '#000000',
      fontWeight: '700' as const,
    },
    cardShadow: {
      shadowColor: isDarkMode ? '#000000' : '#000000',
      shadowOpacity: isDarkMode ? 0.4 : 0.1,
    },
    dateCard: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    },
    statIcon: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    statHighlight: {
      color: isDarkMode ? '#ffffff' : '#000000',
      fontWeight: '700' as const,
    },
  };

  const handleSaveWorkout = async () => {
    if (isAllExercisesDone) {
      setIsSaving(true);
      // Remove isDone property from each exercise before saving
      const exercisesToSave = currentSessionExercises.map(({ isDone, ...rest }) => rest);
      try {
        // Save workout progress to database
        await saveWorkoutProgress(workout?.id || '', exercisesToSave);
        Alert.alert('Success', 'Workout progress saved successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('MainTabs' as never) },
        ]);
      } catch (error) {
        console.error('Error saving workout progress:', error);
        Alert.alert('Error', 'Failed to save workout progress. Please try again.');
      } finally {
        setIsSaving(false);
      }
    } else {
      Alert.alert('Please complete all exercises before saving.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.background]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section with Back Button and Title */}
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={[styles.backButton, dynamicStyles.backButton]}
            onPress={() => navigation.navigate('MainTabs' as never)}>
            <ArrowLeft size={22} color={dynamicStyles.iconColor} />
            <Text style={[styles.backButtonText, dynamicStyles.text]}>Back</Text>
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.titleRow,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}>
            <Text style={[styles.title, dynamicStyles.text]}>{workout?.title}</Text>
            <View style={[styles.weekBadge, dynamicStyles.weekBadge]}>
              <Text style={[styles.weekText, { color: dynamicStyles.weekBadge.color }]}>
                Session {workout?.sessions.length}
              </Text>
            </View>
          </Animated.View>

          {/* Date and Time Card */}
          <Animated.View
            style={[
              styles.dateCard,
              dynamicStyles.dateCard,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}>
            <View style={styles.dateItem}>
              <Calendar size={16} color={dynamicStyles.subText.color} />
              <Text style={[styles.dateText, dynamicStyles.subText]}>{formattedDate}</Text>
            </View>
            <View style={styles.dateItem}>
              <Clock size={16} color={dynamicStyles.subText.color} />
              <Text style={[styles.dateText, dynamicStyles.subText]}>
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </Animated.View>
        </View>

        {/* Workout Progress Summary */}
        <View style={styles.progressSummary}>
          <View style={[styles.statCard, dynamicStyles.statCard]}>
            <View style={styles.statHeader}>
              <Dumbbell size={18} color={dynamicStyles.statIcon.color} />
              <Text style={[styles.statLabel, dynamicStyles.subText]}>Exercises</Text>
            </View>
            <View style={styles.statContent}>
              <View style={styles.statRow}>
                <Text style={[styles.statValue, dynamicStyles.text]}>
                  <Text style={dynamicStyles.statHighlight}>
                    {currentSessionExercises.filter((e) => e.isDone).length}
                  </Text>
                  /{currentSessionExercises.length}
                </Text>
                <Text style={[styles.statSubtext, dynamicStyles.subText]}>
                  {isAllExercisesDone ? 'Complete' : `${Math.round(completionPercentage)}%`}
                </Text>
              </View>
              <Animated.View
                style={[
                  styles.progressBar,
                  { backgroundColor: dynamicStyles.progressBar.backgroundColor },
                ]}>
                <Animated.View
                  style={[
                    styles.progressBarFilled,
                    {
                      backgroundColor: isDarkMode ? '#ffffff' : '#000000',
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </Animated.View>
              <Text style={[styles.statDetail, dynamicStyles.subText]}>
                {currentSessionExercises.reduce((sum, ex) => sum + ex.sets, 0)} sets total
              </Text>
            </View>
          </View>

          <View style={[styles.statCard, dynamicStyles.statCard]}>
            <View style={styles.statHeader}>
              <Weight size={18} color={dynamicStyles.statIcon.color} />
              <Text style={[styles.statLabel, dynamicStyles.subText]}>Total Weight</Text>
            </View>
            <View style={styles.statContent}>
              <View style={styles.statRow}>
                <Text style={[styles.statValue, dynamicStyles.text]}>
                  {totalWeight}
                  <Text style={styles.unitText}>kg</Text>
                </Text>
                {workout?.sessions.length &&
                  workout.sessions.length > 1 &&
                  totalWeight !== calculatePreviousSessionWeight() && (
                    <Text
                      style={[
                        styles.statChange,
                        calculatePreviousSessionWeight() < totalWeight
                          ? styles.trendUp
                          : styles.trendDown,
                      ]}>
                      {calculatePreviousSessionWeight() < totalWeight ? '↑' : '↓'}
                      {Math.abs(totalWeight - calculatePreviousSessionWeight())}kg
                    </Text>
                  )}
              </View>
              {workout?.sessions.length && workout.sessions.length > 1 && (
                <View style={styles.statDetail}>
                  <Text style={dynamicStyles.subText}>
                    Previous: {calculatePreviousSessionWeight()}kg
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Divider */}
        <View
          style={[styles.divider, { backgroundColor: dynamicStyles.divider.backgroundColor }]}
        />

        {/* Section Title with Save Button */}
        <View style={styles.sectionTitleContainer}>
          <View style={styles.sectionTitleRow}>
            <Text style={[styles.sectionTitle, dynamicStyles.text]}>Exercises</Text>
            <View style={[styles.countBadge, dynamicStyles.countBadge]}>
              <Text style={[styles.countText, { color: dynamicStyles.countBadge.color }]}>
                {currentSessionExercises.length}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, dynamicStyles.saveButton]}
            onPress={handleSaveWorkout}
            disabled={!isAllExercisesDone || isSaving}
            activeOpacity={0.7}>
            {isSaving ? (
              <Text style={[styles.saveButtonText, { color: dynamicStyles.saveButton.color }]}>
                Saving...
              </Text>
            ) : (
              <>
                <Save size={16} color={dynamicStyles.saveButton.color} strokeWidth={2} />
                <Text style={[styles.saveButtonText, { color: dynamicStyles.saveButton.color }]}>
                  Save Workout
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Exercise List */}
        <View style={styles.exercisesContainer}>
          {currentSessionExercises.map((exercise, index) => (
            <Animated.View
              key={exercise.id}
              style={[
                styles.exerciseItem,
                index % 2 === 0 ? styles.exerciseItemLeft : styles.exerciseItemRight,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <ExerciceCard
                workoutId={workout?.id || ''}
                exerciseId={exercise.id}
                name={exercise.name}
                sets={exercise.sets}
                reps={exercise.reps}
                weight={exercise.weight}
                weights={exercise.weights}
                isDone={exercise.isDone}
                onPress={(combinedId) => {
                  performanceScreenRef.current?.present(combinedId);
                }}
              />
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      <PerformanceScreen ref={performanceScreenRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  weekBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  weekText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '500',
  },
  progressSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 6,
  },
  statContent: {
    width: '100%',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statSubtext: {
    fontSize: 12,
    fontWeight: '600',
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  statDetail: {
    fontSize: 11,
    marginTop: 6,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 2,
  },
  progressBar: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFilled: {
    height: '100%',
    borderRadius: 2,
  },
  trendUp: {
    color: '#000000',
    fontWeight: 'bold',
  },
  trendDown: {
    color: '#000000',
    fontWeight: 'bold',
  },
  trendSame: {
    color: '#000000',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    width: '92%',
    alignSelf: 'center',
    marginBottom: 24,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  countBadge: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
  },
  exercisesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exerciseItem: {
    width: '50%',
    marginBottom: 16,
  },
  exerciseItemLeft: {
    paddingRight: 6,
  },
  exerciseItemRight: {
    paddingLeft: 6,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    letterSpacing: 0.2,
  },
});

export default DetailsScreen;
