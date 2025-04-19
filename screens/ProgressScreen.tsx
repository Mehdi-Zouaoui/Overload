import { List, BarChart3, Globe } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

import i18n from '../i18n';
import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { createStyles } from '../styles/ProgressScreenStyles';

// Get the screen width
const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const { isDarkMode } = useThemeStore();
  const workouts = useWorkoutStore((state) => state.workouts);

  // Set the first workout as selected by default
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
    workouts.length > 0 ? workouts[0].id : null
  );

  const [viewMode, setViewMode] = useState<'list' | 'chart' | 'global'>('list');
  const [comparisonMode, setComparisonMode] = useState<'last' | 'all'>('last');

  // Get theme-specific styles
  const { styles, colors } = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

  // Use useMemo to prevent repeated calculations that might trigger re-renders
  const workoutProgress = useMemo(() => {
    if (!selectedWorkoutId) return null;

    // Use the calculateWorkoutProgress function from the store with the selected comparison mode
    const progress = useWorkoutStore
      .getState()
      .calculateWorkoutProgress?.(selectedWorkoutId, comparisonMode);
    return progress;
  }, [selectedWorkoutId, comparisonMode]);

  // Get the selected workout details
  const selectedWorkout = useMemo(() => {
    if (!selectedWorkoutId) return null;
    return workouts.find((workout) => workout.id === selectedWorkoutId);
  }, [selectedWorkoutId, workouts]);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight },
      ]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{i18n.t('progressScreen.title')}</Text>
          <Text style={styles.headerSubtitle}>{i18n.t('progressScreen.subtitle')}</Text>
        </View>

        {/* Workout Selection Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{i18n.t('progressScreen.selectWorkout')}</Text>
          <View style={styles.workoutCarouselContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.workoutCarouselContent}
              decelerationRate="fast"
              snapToInterval={width * 0.85 + 16}
              snapToAlignment="center">
              {workouts.map((workout, index) => {
                const isSelected = selectedWorkoutId === workout.id;
                const borderColor = colors.border;
                const textColor = colors.text;
                const subTextColor = colors.subText;

                return (
                  <TouchableOpacity
                    key={workout.id}
                    activeOpacity={0.9}
                    style={[
                      styles.workoutCard,
                      {
                        backgroundColor: colors.card,
                        borderColor,
                      },
                    ]}
                    onPress={() => setSelectedWorkoutId(workout.id)}>
                    <View style={styles.workoutCardGrid}>
                      {/* Left column */}
                      <View
                        style={[styles.workoutCardLeftColumn, { borderRightColor: borderColor }]}>
                        <Text style={[styles.workoutCardIndex, { color: textColor }]}>
                          {(index + 1).toString().padStart(2, '0')}
                        </Text>

                        <Text style={[styles.workoutCardStatus, { color: subTextColor }]}>
                          {isSelected ? i18n.t('common.selected') : i18n.t('common.tapToSelect')}
                        </Text>
                      </View>

                      {/* Right column */}
                      <View style={styles.workoutCardRightColumn}>
                        <Text
                          style={[styles.workoutCardTitle, { color: textColor }]}
                          numberOfLines={2}>
                          {workout.title}
                        </Text>
                        <View
                          style={{ height: 1, backgroundColor: subTextColor, marginVertical: 6 }}
                        />

                        {/* Workout stats */}
                        <View style={styles.workoutCardStats}>
                          <View style={styles.workoutCardStat}>
                            <Text style={[styles.workoutCardStatValue, { color: textColor }]}>
                              {workout.sessions?.[0]?.exercises?.length || 0}
                            </Text>
                            <Text style={[styles.workoutCardStatLabel, { color: subTextColor }]}>
                              {i18n.t('progressScreen.exercises')}
                            </Text>
                          </View>

                          <View style={styles.workoutCardStat}>
                            <Text style={[styles.workoutCardStatValue, { color: textColor }]}>
                              {workout.sessions?.length || 0}
                            </Text>
                            <Text style={[styles.workoutCardStatLabel, { color: subTextColor }]}>
                              {i18n.t('progressScreen.sessions')}
                            </Text>
                          </View>
                        </View>

                        {/* Select button */}
                        <View
                          style={[
                            styles.selectButton,
                            {
                              borderColor: textColor,
                              backgroundColor: isSelected ? colors.accent : 'transparent',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.selectButtonText,
                              {
                                color: isSelected
                                  ? isDarkMode
                                    ? '#000000'
                                    : '#FFFFFF'
                                  : textColor,
                              },
                            ]}>
                            {isSelected ? i18n.t('common.selected') : i18n.t('common.select')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* View Mode Toggle */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{i18n.t('progressScreen.viewMode')}</Text>
          <View style={styles.viewToggleContainer}>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                {
                  borderRightWidth: 1,
                  borderColor: colors.text,
                  backgroundColor: viewMode === 'list' ? colors.accent : colors.card,
                },
              ]}
              onPress={() => setViewMode('list')}>
              <List
                size={18}
                style={styles.viewToggleIcon}
                color={viewMode === 'list' ? (isDarkMode ? '#000000' : '#FFFFFF') : colors.text}
              />
              <Text
                style={[
                  styles.viewToggleText,
                  {
                    color: viewMode === 'list' ? (isDarkMode ? '#000000' : '#FFFFFF') : colors.text,
                    fontWeight: viewMode === 'list' ? '700' : '500',
                  },
                ]}>
                {i18n.t('progressScreen.listView')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                {
                  borderRightWidth: 1,
                  borderColor: colors.text,
                  backgroundColor: viewMode === 'chart' ? colors.accent : colors.card,
                },
              ]}
              onPress={() => setViewMode('chart')}>
              <BarChart3
                size={18}
                style={styles.viewToggleIcon}
                color={viewMode === 'chart' ? (isDarkMode ? '#000000' : '#FFFFFF') : colors.text}
              />
              <Text
                style={[
                  styles.viewToggleText,
                  {
                    color:
                      viewMode === 'chart' ? (isDarkMode ? '#000000' : '#FFFFFF') : colors.text,
                    fontWeight: viewMode === 'chart' ? '700' : '500',
                  },
                ]}>
                {i18n.t('progressScreen.chartView')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                {
                  backgroundColor: viewMode === 'global' ? colors.accent : colors.card,
                },
              ]}
              onPress={() => setViewMode('global')}>
              <Globe
                size={18}
                style={styles.viewToggleIcon}
                color={viewMode === 'global' ? (isDarkMode ? '#000000' : '#FFFFFF') : colors.text}
              />
              <Text
                style={[
                  styles.viewToggleText,
                  {
                    color:
                      viewMode === 'global' ? (isDarkMode ? '#000000' : '#FFFFFF') : colors.text,
                    fontWeight: viewMode === 'global' ? '700' : '500',
                  },
                ]}>
                {i18n.t('progressScreen.globalView')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comparison Mode Toggle */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{i18n.t('progressScreen.comparisonMode')}</Text>
          <View style={styles.comparisonToggleContainer}>
            <TouchableOpacity
              style={[
                styles.comparisonToggleButton,
                {
                  borderRightWidth: 1,
                  borderColor: colors.text,
                  backgroundColor: comparisonMode === 'last' ? colors.accent : colors.card,
                },
              ]}
              onPress={() => setComparisonMode('last')}>
              <Text
                style={[
                  styles.comparisonToggleText,
                  {
                    color:
                      comparisonMode === 'last'
                        ? isDarkMode
                          ? '#000000'
                          : '#FFFFFF'
                        : colors.text,
                    fontWeight: comparisonMode === 'last' ? '700' : '500',
                  },
                ]}>
                {i18n.t('progressScreen.compareToLast')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.comparisonToggleButton,
                {
                  backgroundColor: comparisonMode === 'all' ? colors.accent : colors.card,
                },
              ]}
              onPress={() => setComparisonMode('all')}>
              <Text
                style={[
                  styles.comparisonToggleText,
                  {
                    color:
                      comparisonMode === 'all' ? (isDarkMode ? '#000000' : '#FFFFFF') : colors.text,
                    fontWeight: comparisonMode === 'all' ? '700' : '500',
                  },
                ]}>
                {i18n.t('progressScreen.compareToFirst')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Content */}
        {selectedWorkout && workoutProgress ? (
          <>
            {/* Progress Card */}
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <Text style={[styles.progressCardTitle, { color: colors.text }]}>
                  {selectedWorkout.title}
                </Text>
                <Text style={[styles.progressCardSubtitle, { color: colors.subText }]}>
                  {i18n.t('progressScreen.progressDetails')}
                </Text>

                {/* Exercise Progress */}
                {viewMode === 'list' &&
                  workoutProgress.map((exerciseProgress: any, index: number) => (
                    <View key={exerciseProgress.exerciseId}>
                      <View style={styles.exerciseContainer}>
                        <Text style={[styles.exerciseName, { color: colors.text }]}>
                          {exerciseProgress.exerciseName}
                        </Text>

                        {/* Weight Progress */}
                        {exerciseProgress.weightProgress && (
                          <View
                            style={[
                              styles.progressMetricContainer,
                              {
                                backgroundColor: colors.card,
                                borderColor: colors.border,
                              },
                            ]}>
                            <Text style={[styles.progressMetricTitle, { color: colors.text }]}>
                              {i18n.t('progressScreen.weightProgress')}
                            </Text>
                            <View style={styles.progressMetricRow}>
                              <Text style={[styles.progressMetricValue, { color: colors.text }]}>
                                {exerciseProgress.weightProgress.initialWeight} kg →{' '}
                                {exerciseProgress.weightProgress.currentWeight} kg
                              </Text>
                              <Text
                                style={[
                                  styles.progressMetricChange,
                                  {
                                    color:
                                      parseFloat(
                                        exerciseProgress.weightProgress.percentageIncrease
                                      ) >= 0
                                        ? colors.success
                                        : colors.negativeChange,
                                  },
                                ]}>
                                {exerciseProgress.weightProgress.increase > 0 ? '+' : ''}
                                {exerciseProgress.weightProgress.increase} kg (
                                {exerciseProgress.weightProgress.percentageIncrease})
                              </Text>
                            </View>

                            {/* Visual progress bar */}
                            <View style={styles.progressBarContainer}>
                              <View
                                style={[
                                  styles.progressBarFill,
                                  {
                                    width: `${Math.min(
                                      100,
                                      Math.abs(
                                        parseFloat(
                                          exerciseProgress.weightProgress.percentageIncrease
                                        )
                                      )
                                    )}%`,
                                    backgroundColor:
                                      parseFloat(
                                        exerciseProgress.weightProgress.percentageIncrease
                                      ) >= 0
                                        ? colors.success
                                        : colors.negativeChange,
                                  },
                                ]}
                              />
                            </View>
                          </View>
                        )}

                        {/* Reps Progress */}
                        {exerciseProgress.repProgress && (
                          <View
                            style={[
                              styles.progressMetricContainer,
                              {
                                backgroundColor: colors.card,
                                borderColor: colors.border,
                              },
                            ]}>
                            <Text style={[styles.progressMetricTitle, { color: colors.text }]}>
                              {i18n.t('progressScreen.repProgress')}
                            </Text>
                            <View style={styles.progressMetricRow}>
                              <Text style={[styles.progressMetricValue, { color: colors.text }]}>
                                {exerciseProgress.repProgress.initialTotalReps} →{' '}
                                {exerciseProgress.repProgress.currentTotalReps}{' '}
                                {i18n.t('progressScreen.reps')}
                              </Text>
                              <Text
                                style={[
                                  styles.progressMetricChange,
                                  {
                                    color:
                                      parseFloat(exerciseProgress.repProgress.percentageIncrease) >=
                                      0
                                        ? colors.success
                                        : colors.negativeChange,
                                  },
                                ]}>
                                {exerciseProgress.repProgress.increase > 0 ? '+' : ''}
                                {exerciseProgress.repProgress.increase} (
                                {exerciseProgress.repProgress.percentageIncrease})
                              </Text>
                            </View>

                            {/* Visual progress bar */}
                            <View style={styles.progressBarContainer}>
                              <View
                                style={[
                                  styles.progressBarFill,
                                  {
                                    width: `${Math.min(
                                      100,
                                      Math.abs(
                                        parseFloat(exerciseProgress.repProgress.percentageIncrease)
                                      )
                                    )}%`,
                                    backgroundColor:
                                      parseFloat(exerciseProgress.repProgress.percentageIncrease) >=
                                      0
                                        ? colors.success
                                        : colors.negativeChange,
                                  },
                                ]}
                              />
                            </View>
                          </View>
                        )}

                        {/* Volume Progress */}
                        {exerciseProgress.volumeProgress && (
                          <View
                            style={[
                              styles.progressMetricContainer,
                              {
                                backgroundColor: colors.card,
                                borderColor: colors.border,
                              },
                            ]}>
                            <Text style={[styles.progressMetricTitle, { color: colors.text }]}>
                              {i18n.t('progressScreen.volumeProgress')}
                            </Text>
                            <View style={styles.progressMetricRow}>
                              <Text style={[styles.progressMetricValue, { color: colors.text }]}>
                                {exerciseProgress.volumeProgress.initialVolume} kg →{' '}
                                {exerciseProgress.volumeProgress.currentVolume} kg
                              </Text>
                              <Text
                                style={[
                                  styles.progressMetricChange,
                                  {
                                    color:
                                      parseFloat(
                                        exerciseProgress.volumeProgress.percentageIncrease
                                      ) >= 0
                                        ? colors.success
                                        : colors.negativeChange,
                                  },
                                ]}>
                                {exerciseProgress.volumeProgress.increase > 0 ? '+' : ''}
                                {exerciseProgress.volumeProgress.increase} kg (
                                {exerciseProgress.volumeProgress.percentageIncrease})
                              </Text>
                            </View>

                            {/* Visual progress bar */}
                            <View style={styles.progressBarContainer}>
                              <View
                                style={[
                                  styles.progressBarFill,
                                  {
                                    width: `${Math.min(
                                      100,
                                      Math.abs(
                                        parseFloat(
                                          exerciseProgress.volumeProgress.percentageIncrease
                                        )
                                      )
                                    )}%`,
                                    backgroundColor:
                                      parseFloat(
                                        exerciseProgress.volumeProgress.percentageIncrease
                                      ) >= 0
                                        ? colors.success
                                        : colors.negativeChange,
                                  },
                                ]}
                              />
                            </View>
                          </View>
                        )}
                      </View>
                      {index < workoutProgress.length - 1 && (
                        <View
                          style={[styles.exerciseDivider, { borderBottomColor: colors.border }]}
                        />
                      )}
                    </View>
                  ))}

                {/* Chart View */}
              </View>
            </View>
          </>
        ) : (
          <View
            style={[
              styles.emptyProgressCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              {selectedWorkoutId
                ? i18n.t('progressScreen.noProgressData')
                : i18n.t('progressScreen.selectWorkoutPrompt')}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
