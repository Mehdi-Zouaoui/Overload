import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ExerciceCard } from 'components/ExerciceCard';
import { Dumbbell, Weight, Save, ArrowLeft, Calendar, Clock } from 'lucide-react-native';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { useThemeStore } from 'stores/themeStore';
import { useWorkoutStore } from 'stores/workoutStore';

import { PerformanceScreen, PerformanceScreenRef } from './PerformanceScreen';
import i18n from '../i18n';
import { createStyles } from '../styles/DetailsScreenStyles';

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
  const [refreshKey, setRefreshKey] = useState(0);

  // Get the current session's exercises and ensure each has isDone property
  const currentSessionExercises = useMemo(() => {
    if (!workout) return [];

    const currentSession = workout.sessions[workout.sessions.length - 1];
    if (!currentSession) return [];

    // Check if currentSession is an array or has exercises property
    const exercises = Array.isArray(currentSession)
      ? currentSession
      : currentSession.exercises || [];

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

  // Get styles based on theme
  const { styles, dynamicStyles } = createStyles(isDarkMode);

  // Create dynamic styles that depend on component state
  const getSaveButtonStyle = () => ({
    backgroundColor: dynamicStyles.saveButton.backgroundColor(isAllExercisesDone),
    color: dynamicStyles.saveButton.color(isAllExercisesDone),
  });

  const getProgressBarFilledStyle = () => ({
    backgroundColor: dynamicStyles.progressBar.filledColor(isAllExercisesDone),
  });

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

  // Add a refresh function
  const refreshWorkoutData = useCallback(() => {
    // Force a re-render by updating the refresh key
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

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
            <Text style={[styles.backButtonText, dynamicStyles.text]}>
              {i18n.t('detailsScreen.back')}
            </Text>
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.titleRow,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}>
            <Text style={[styles.title, dynamicStyles.text]}>{workout?.title}</Text>
            <View style={[styles.weekBadge, dynamicStyles.weekBadge]}>
              <Text style={[styles.weekText, { color: dynamicStyles.weekBadge.color }]}>
                {i18n.t('detailsScreen.session')} {workout?.sessions.length}
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
              <Text style={[styles.statLabel, dynamicStyles.subText]}>
                {i18n.t('detailsScreen.exercises')}
              </Text>
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
                  {isAllExercisesDone
                    ? i18n.t('detailsScreen.complete')
                    : `${Math.round(completionPercentage)}%`}
                </Text>
              </View>
              <Animated.View
                style={[
                  styles.progressBar,
                  { backgroundColor: dynamicStyles.progressBar.backgroundColor },
                ]}>
                <Animated.View style={[styles.progressBarFilled, getProgressBarFilledStyle()]} />
              </Animated.View>
              <Text style={[styles.statDetail, dynamicStyles.subText]}>
                {currentSessionExercises.reduce((sum, ex) => sum + ex.sets, 0)}{' '}
                {i18n.t('detailsScreen.setsTotal')}
              </Text>
            </View>
          </View>

          <View style={[styles.statCard, dynamicStyles.statCard]}>
            <View style={styles.statHeader}>
              <Weight size={18} color={dynamicStyles.statIcon.color} />
              <Text style={[styles.statLabel, dynamicStyles.subText]}>
                {i18n.t('detailsScreen.totalWeight')}
              </Text>
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
                    {i18n.t('detailsScreen.previous')}: {calculatePreviousSessionWeight()}kg
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
            <Text style={[styles.sectionTitle, dynamicStyles.text]}>
              {i18n.t('detailsScreen.exercises')}
            </Text>
            <View style={[styles.countBadge, dynamicStyles.countBadge]}>
              <Text style={[styles.countText, { color: dynamicStyles.countBadge.color }]}>
                {currentSessionExercises.length}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, getSaveButtonStyle()]}
            onPress={handleSaveWorkout}
            disabled={!isAllExercisesDone || isSaving}
            activeOpacity={0.7}>
            {isSaving ? (
              <Text
                style={[
                  styles.saveButtonText,
                  { color: dynamicStyles.saveButton.color(isAllExercisesDone) },
                ]}>
                {i18n.t('detailsScreen.saving')}
              </Text>
            ) : (
              <>
                <Save
                  size={16}
                  color={dynamicStyles.saveButton.color(isAllExercisesDone)}
                  strokeWidth={2}
                />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Exercise List */}
        <View style={styles.exercisesContainer}>
          {currentSessionExercises.map((exercise, index) => (
            <Animated.View
              key={`${exercise.id}-${refreshKey}`}
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

      <PerformanceScreen ref={performanceScreenRef} onDataChange={refreshWorkoutData} />
    </SafeAreaView>
  );
};

export default DetailsScreen;
