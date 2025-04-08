import { List, Dumbbell, BarChart3, Repeat } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

import i18n from '../i18n';
import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { styles } from '../styles/ProgressScreenStyles';

export default function ProgressScreen() {
  const { isDarkMode } = useThemeStore();
  const workouts = useWorkoutStore((state) => state.workouts);

  // Set the first workout as selected by default
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
    workouts.length > 0 ? workouts[0].id : null
  );

  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');
  const [comparisonMode, setComparisonMode] = useState<'last' | 'all'>('last');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'month' | 'quarter' | 'year' | 'all'>(
    'all'
  );

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

  // Calculate summary data for chart
  const chartData = useMemo(() => {
    if (!workoutProgress) return null;

    // Calculate overall progress metrics
    const weightProgress =
      workoutProgress.reduce((sum: number, exercise: any) => {
        if (exercise.weightProgress) {
          return sum + parseFloat(exercise.weightProgress.percentageIncrease);
        }
        return sum;
      }, 0) / workoutProgress.filter((ex: any) => ex.weightProgress).length || 0;

    const repProgress =
      workoutProgress.reduce((sum: number, exercise: any) => {
        if (exercise.repProgress) {
          return sum + parseFloat(exercise.repProgress.percentageIncrease);
        }
        return sum;
      }, 0) / workoutProgress.filter((ex: any) => ex.repProgress).length || 0;

    const volumeProgress =
      workoutProgress.reduce((sum: number, exercise: any) => {
        if (exercise.volumeProgress) {
          return sum + parseFloat(exercise.volumeProgress.percentageIncrease);
        }
        return sum;
      }, 0) / workoutProgress.filter((ex: any) => ex.volumeProgress).length || 0;

    // Get average initial and current values
    const initialWeight =
      workoutProgress.reduce((sum: number, exercise: any) => {
        if (exercise.weightProgress) {
          return sum + parseFloat(exercise.weightProgress.initialWeight);
        }
        return sum;
      }, 0) / workoutProgress.filter((ex: any) => ex.weightProgress).length || 0;

    const currentWeight =
      workoutProgress.reduce((sum: number, exercise: any) => {
        if (exercise.weightProgress) {
          return sum + parseFloat(exercise.weightProgress.currentWeight);
        }
        return sum;
      }, 0) / workoutProgress.filter((ex: any) => ex.weightProgress).length || 0;

    const initialReps =
      workoutProgress.reduce((sum: number, exercise: any) => {
        if (exercise.repProgress) {
          return sum + parseFloat(exercise.repProgress.initialTotalReps);
        }
        return sum;
      }, 0) / workoutProgress.filter((ex: any) => ex.repProgress).length || 0;

    const currentReps =
      workoutProgress.reduce((sum: number, exercise: any) => {
        if (exercise.repProgress) {
          return sum + parseFloat(exercise.repProgress.currentTotalReps);
        }
        return sum;
      }, 0) / workoutProgress.filter((ex: any) => ex.repProgress).length || 0;

    const initialVolume =
      workoutProgress.reduce((sum: number, exercise: any) => {
        if (exercise.volumeProgress) {
          return sum + parseFloat(exercise.volumeProgress.initialVolume);
        }
        return sum;
      }, 0) / workoutProgress.filter((ex: any) => ex.volumeProgress).length || 0;

    const currentVolume =
      workoutProgress.reduce((sum: number, exercise: any) => {
        if (exercise.volumeProgress) {
          return sum + parseFloat(exercise.volumeProgress.currentVolume);
        }
        return sum;
      }, 0) / workoutProgress.filter((ex: any) => ex.volumeProgress).length || 0;

    return {
      labels: [
        i18n.t('progressScreen.weight'),
        i18n.t('progressScreen.reps'),
        i18n.t('progressScreen.volume'),
      ],
      data: [Math.max(0, weightProgress), Math.max(0, repProgress), Math.max(0, volumeProgress)],
      percentages: [
        Math.max(0, weightProgress),
        Math.max(0, repProgress),
        Math.max(0, volumeProgress),
      ],
      initial: [initialWeight, initialReps, initialVolume],
      current: [currentWeight, currentReps, currentVolume],
    };
  }, [workoutProgress]);

  // Get theme-based colors
  const colors = useMemo(() => {
    return {
      background: isDarkMode ? '#121212' : '#FAFAFA',
      card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#000000',
      subText: isDarkMode ? '#AAAAAA' : '#6B7280',
      border: isDarkMode ? '#333333' : '#F5F5F5',
      accent: isDarkMode ? '#FFFFFF' : '#000000',
      chartBackground: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      chartColor: isDarkMode ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, ',
      chartLabelColor: isDarkMode ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, ',
      chartGridColor: isDarkMode ? '#333333' : '#E5E7EB',
      positiveChange: isDarkMode ? '#4ADE80' : '#1F2937',
      negativeChange: isDarkMode ? '#F87171' : '#6B7280',
      metricBackground: isDarkMode ? '#252525' : '#FAFAFA',
      success: isDarkMode ? '#4ADE80' : '#10B981', // Green color for positive improvements
    };
  }, [isDarkMode]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.scrollView, { backgroundColor: colors.background }]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {i18n.t('progressScreen.title')}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.subText }]}>
            {i18n.t('progressScreen.subtitle')}
          </Text>
        </View>

        {/* Workout Selection Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {i18n.t('progressScreen.selectWorkout')}
          </Text>
          <View style={styles.carouselContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
              snapToInterval={142} // 130 (minWidth) + 12 (marginRight)
              decelerationRate="fast">
              {workouts.map((workout) => (
                <TouchableOpacity
                  key={workout.id}
                  style={[
                    styles.workoutButton,
                    selectedWorkoutId === workout.id
                      ? [
                          styles.selectedWorkoutButton,
                          { backgroundColor: colors.accent, borderColor: colors.accent },
                        ]
                      : [
                          styles.unselectedWorkoutButton,
                          { backgroundColor: colors.card, borderColor: colors.border },
                        ],
                  ]}
                  onPress={() => setSelectedWorkoutId(workout.id)}>
                  <Text
                    style={[
                      styles.workoutButtonText,
                      selectedWorkoutId === workout.id
                        ? [
                            styles.selectedWorkoutButtonText,
                            { color: isDarkMode ? '#000000' : '#FFFFFF' },
                          ]
                        : [styles.unselectedWorkoutButtonText, { color: colors.text }],
                    ]}>
                    {workout.title}
                  </Text>
                  {selectedWorkoutId === workout.id && (
                    <View
                      style={[
                        styles.selectionHint,
                        { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' },
                      ]}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.carouselIndicator}>
            {workouts.length > 0 &&
              workouts.map((workout, index) => (
                <View
                  key={workout.id}
                  style={[
                    styles.indicatorDot,
                    selectedWorkoutId === workout.id && [
                      styles.activeIndicatorDot,
                      { backgroundColor: colors.accent },
                    ],
                  ]}
                />
              ))}
          </View>
        </View>

        {/* Comparison Mode Toggle */}
        {selectedWorkout && workoutProgress && (
          <View
            style={[
              styles.comparisonToggleContainer,
              { borderColor: colors.border, backgroundColor: colors.card },
            ]}>
            <TouchableOpacity
              onPress={() => setComparisonMode('last')}
              style={[
                styles.comparisonToggleButton,
                comparisonMode === 'last'
                  ? [styles.selectedComparisonToggleButton, { backgroundColor: colors.accent }]
                  : [styles.unselectedComparisonToggleButton, { backgroundColor: colors.card }],
              ]}>
              <Text
                style={[
                  styles.comparisonToggleText,
                  comparisonMode === 'last'
                    ? [
                        styles.selectedComparisonToggleText,
                        { color: isDarkMode ? '#000000' : '#FFFFFF' },
                      ]
                    : [styles.unselectedComparisonToggleText, { color: colors.text }],
                ]}>
                {i18n.t('progressScreen.lastSession')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setComparisonMode('all')}
              style={[
                styles.comparisonToggleButton,
                comparisonMode === 'all'
                  ? [styles.selectedComparisonToggleButton, { backgroundColor: colors.accent }]
                  : [styles.unselectedComparisonToggleButton, { backgroundColor: colors.card }],
              ]}>
              <Text
                style={[
                  styles.comparisonToggleText,
                  comparisonMode === 'all'
                    ? [
                        styles.selectedComparisonToggleText,
                        { color: isDarkMode ? '#000000' : '#FFFFFF' },
                      ]
                    : [styles.unselectedComparisonToggleText, { color: colors.text }],
                ]}>
                {i18n.t('progressScreen.allHistory')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* View Mode Toggle - Redesigned Version */}
        {selectedWorkout && workoutProgress && (
          <View style={styles.viewModeSection}>
            <View
              style={[
                styles.viewToggleContainer,
                { backgroundColor: isDarkMode ? '#1A1A1A' : '#F0F0F0' },
              ]}>
              <TouchableOpacity
                onPress={() => setViewMode('list')}
                style={[
                  styles.viewToggleButton,
                  viewMode === 'list' && [
                    styles.activeViewToggleButton,
                    { backgroundColor: isDarkMode ? '#333' : '#FFFFFF' },
                  ],
                ]}>
                <List
                  size={16}
                  color={viewMode === 'list' ? colors.accent : colors.subText}
                  style={styles.viewToggleIcon}
                />
                <Text
                  style={[
                    styles.viewToggleText,
                    { color: viewMode === 'list' ? colors.text : colors.subText },
                  ]}>
                  {i18n.t('progressScreen.listView')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setViewMode('chart')}
                style={[
                  styles.viewToggleButton,
                  viewMode === 'chart' && [
                    styles.activeViewToggleButton,
                    { backgroundColor: isDarkMode ? '#333' : '#FFFFFF' },
                  ],
                ]}>
                <BarChart3
                  size={16}
                  color={viewMode === 'chart' ? colors.accent : colors.subText}
                  style={styles.viewToggleIcon}
                />
                <Text
                  style={[
                    styles.viewToggleText,
                    { color: viewMode === 'chart' ? colors.text : colors.subText },
                  ]}>
                  {i18n.t('progressScreen.globalView')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Progress Display */}
        {selectedWorkout && workoutProgress ? (
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <Text style={[styles.progressCardTitle, { color: colors.text }]}>
                {selectedWorkout.title} {i18n.t('progressScreen.progress')}
              </Text>
              <Text style={[styles.progressCardSubtitle, { color: colors.subText }]}>
                {comparisonMode === 'all'
                  ? i18n.t('progressScreen.comparingToFirst')
                  : i18n.t('progressScreen.comparingToPrevious')}
              </Text>

              {viewMode === 'list' ? (
                // List View
                workoutProgress.map((exerciseProgress: any, index: number) => (
                  <View
                    key={exerciseProgress.exerciseId}
                    style={[
                      styles.exerciseContainer,
                      index !== workoutProgress.length - 1 && [
                        styles.exerciseDivider,
                        { borderBottomColor: colors.border },
                      ],
                    ]}>
                    <Text style={[styles.exerciseName, { color: colors.text }]}>
                      {exerciseProgress.exerciseName}
                    </Text>

                    {/* Weight Progress */}
                    {exerciseProgress.weightProgress && (
                      <View
                        style={[
                          styles.progressMetricContainer,
                          { backgroundColor: colors.metricBackground, borderColor: colors.border },
                        ]}>
                        <Text style={[styles.progressMetricTitle, { color: colors.subText }]}>
                          {i18n.t('progressScreen.weightProgress')}
                        </Text>
                        <View style={styles.progressMetricRow}>
                          <Text style={[styles.progressMetricValue, { color: colors.subText }]}>
                            {exerciseProgress.weightProgress.initialWeight}kg →{' '}
                            {exerciseProgress.weightProgress.currentWeight}kg
                          </Text>
                          <Text
                            style={[
                              styles.progressMetricChange,
                              parseFloat(exerciseProgress.weightProgress.percentageIncrease) >= 0
                                ? { color: colors.positiveChange }
                                : { color: colors.negativeChange },
                            ]}>
                            {exerciseProgress.weightProgress.increase > 0 ? '+' : ''}
                            {exerciseProgress.weightProgress.increase}kg (
                            {exerciseProgress.weightProgress.percentageIncrease})
                          </Text>
                        </View>
                      </View>
                    )}

                    {/* Rep Progress */}
                    {exerciseProgress.repProgress && (
                      <View
                        style={[
                          styles.progressMetricContainer,
                          { backgroundColor: colors.metricBackground, borderColor: colors.border },
                        ]}>
                        <Text style={[styles.progressMetricTitle, { color: colors.subText }]}>
                          {i18n.t('progressScreen.repProgress')}
                        </Text>
                        <View style={styles.progressMetricRow}>
                          <Text style={[styles.progressMetricValue, { color: colors.subText }]}>
                            {exerciseProgress.repProgress.initialTotalReps} →{' '}
                            {exerciseProgress.repProgress.currentTotalReps}{' '}
                            {i18n.t('progressScreen.totalReps')}
                          </Text>
                          <Text
                            style={[
                              styles.progressMetricChange,
                              parseFloat(exerciseProgress.repProgress.percentageIncrease) >= 0
                                ? { color: colors.positiveChange }
                                : { color: colors.negativeChange },
                            ]}>
                            {exerciseProgress.repProgress.increase > 0 ? '+' : ''}
                            {exerciseProgress.repProgress.increase} {i18n.t('progressScreen.reps')}{' '}
                            ({exerciseProgress.repProgress.percentageIncrease})
                          </Text>
                        </View>
                      </View>
                    )}

                    {/* Volume Progress */}
                    {exerciseProgress.volumeProgress && (
                      <View
                        style={[
                          styles.progressMetricContainer,
                          { backgroundColor: colors.metricBackground, borderColor: colors.border },
                        ]}>
                        <Text style={[styles.progressMetricTitle, { color: colors.subText }]}>
                          {i18n.t('progressScreen.volumeProgress')}
                        </Text>
                        <View style={styles.progressMetricRow}>
                          <Text style={[styles.progressMetricValue, { color: colors.subText }]}>
                            {exerciseProgress.volumeProgress.initialVolume} →{' '}
                            {exerciseProgress.volumeProgress.currentVolume} kg
                          </Text>
                          <Text
                            style={[
                              styles.progressMetricChange,
                              parseFloat(exerciseProgress.volumeProgress.percentageIncrease) >= 0
                                ? { color: colors.positiveChange }
                                : { color: colors.negativeChange },
                            ]}>
                            {exerciseProgress.volumeProgress.increase > 0 ? '+' : ''}
                            {exerciseProgress.volumeProgress.increase} kg (
                            {exerciseProgress.volumeProgress.percentageIncrease})
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                ))
              ) : viewMode === 'chart' && chartData ? (
                <View style={styles.chartSummaryContainer}>
                  <Text style={[styles.chartTitle, { color: colors.text }]}>
                    {i18n.t('progressScreen.overallWorkoutProgress')}
                  </Text>

                  {/* Enhanced Progress Cards with Lucide Icons */}
                  <View style={styles.progressCardContainer}>
                    {/* Weight Progress */}
                    <View
                      style={[
                        styles.progressCardItem,
                        {
                          backgroundColor: colors.card,
                          borderColor: colors.border,
                          borderLeftWidth: 4,
                          borderLeftColor: isDarkMode ? '#FFFFFF' : '#000000',
                        },
                      ]}>
                      <View style={styles.progressCardHeader}>
                        <View style={styles.metricIconContainer}>
                          <View
                            style={[
                              styles.metricIcon,
                              { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' },
                            ]}>
                            <Dumbbell size={18} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                          </View>
                          <Text style={[styles.progressCardMetricTitle, { color: colors.text }]}>
                            {i18n.t('progressScreen.weight')}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.progressCardBadge,
                            { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' },
                          ]}>
                          <Text style={[styles.progressCardBadgeText, { color: colors.text }]}>
                            +
                            {(
                              ((chartData.current[0] - chartData.initial[0]) /
                                chartData.initial[0]) *
                              100
                            ).toFixed(0)}
                            %
                          </Text>
                        </View>
                      </View>

                      {/* Rest of weight card content */}
                      <View style={styles.progressCardContent}>
                        <View style={styles.progressCardValues}>
                          <Text style={[styles.progressCardCurrentValue, { color: colors.text }]}>
                            {chartData.current[0].toFixed(1)} {i18n.t('progressScreen.kg')}
                          </Text>
                          <Text
                            style={[styles.progressCardInitialValue, { color: colors.subText }]}>
                            {i18n.t('progressScreen.from')} {chartData.initial[0].toFixed(1)}{' '}
                            {i18n.t('progressScreen.kg')}
                          </Text>
                        </View>
                        <Text style={[styles.progressCardAbsoluteChange, { color: colors.text }]}>
                          +{(chartData.current[0] - chartData.initial[0]).toFixed(1)}
                        </Text>
                      </View>
                    </View>

                    {/* Reps Progress */}
                    <View
                      style={[
                        styles.progressCardItem,
                        {
                          backgroundColor: colors.card,
                          borderColor: colors.border,
                          borderLeftWidth: 4,
                          borderLeftColor: isDarkMode ? '#FFFFFF' : '#000000',
                        },
                      ]}>
                      <View style={styles.progressCardHeader}>
                        <View style={styles.metricIconContainer}>
                          <View
                            style={[
                              styles.metricIcon,
                              { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' },
                            ]}>
                            <Repeat size={18} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                          </View>
                          <Text style={[styles.progressCardMetricTitle, { color: colors.text }]}>
                            {i18n.t('progressScreen.reps')}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.progressCardBadge,
                            { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' },
                          ]}>
                          <Text style={[styles.progressCardBadgeText, { color: colors.text }]}>
                            +
                            {(
                              ((chartData.current[1] - chartData.initial[1]) /
                                chartData.initial[1]) *
                              100
                            ).toFixed(0)}
                            %
                          </Text>
                        </View>
                      </View>

                      {/* Rest of reps card content */}
                      <View style={styles.progressCardContent}>
                        <View style={styles.progressCardValues}>
                          <Text style={[styles.progressCardCurrentValue, { color: colors.text }]}>
                            {chartData.current[1].toFixed(0)} {i18n.t('progressScreen.reps')}
                          </Text>
                          <Text
                            style={[styles.progressCardInitialValue, { color: colors.subText }]}>
                            {i18n.t('progressScreen.from')} {chartData.initial[1].toFixed(0)}{' '}
                            {i18n.t('progressScreen.reps')}
                          </Text>
                        </View>
                        <Text style={[styles.progressCardAbsoluteChange, { color: colors.text }]}>
                          +{(chartData.current[1] - chartData.initial[1]).toFixed(0)}
                        </Text>
                      </View>
                    </View>

                    {/* Volume Progress */}
                    <View
                      style={[
                        styles.progressCardItem,
                        {
                          backgroundColor: colors.card,
                          borderColor: colors.border,
                          borderLeftWidth: 4,
                          borderLeftColor: isDarkMode ? '#FFFFFF' : '#000000',
                        },
                      ]}>
                      <View style={styles.progressCardHeader}>
                        <View style={styles.metricIconContainer}>
                          <View
                            style={[
                              styles.metricIcon,
                              { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' },
                            ]}>
                            <BarChart3 size={18} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                          </View>
                          <Text style={[styles.progressCardMetricTitle, { color: colors.text }]}>
                            {i18n.t('progressScreen.volume')}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.progressCardBadge,
                            { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' },
                          ]}>
                          <Text style={[styles.progressCardBadgeText, { color: colors.text }]}>
                            +
                            {(
                              ((chartData.current[2] - chartData.initial[2]) /
                                chartData.initial[2]) *
                              100
                            ).toFixed(0)}
                            %
                          </Text>
                        </View>
                      </View>

                      {/* Rest of volume card content */}
                      <View style={styles.progressCardContent}>
                        <View style={styles.progressCardValues}>
                          <Text style={[styles.progressCardCurrentValue, { color: colors.text }]}>
                            {chartData.current[2].toFixed(0)} {i18n.t('progressScreen.kg')}
                          </Text>
                          <Text
                            style={[styles.progressCardInitialValue, { color: colors.subText }]}>
                            {i18n.t('progressScreen.from')} {chartData.initial[2].toFixed(0)}{' '}
                            {i18n.t('progressScreen.kg')}
                          </Text>
                        </View>
                        <Text style={[styles.progressCardAbsoluteChange, { color: colors.text }]}>
                          +{(chartData.current[2] - chartData.initial[2]).toFixed(0)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Legend/Explanation */}
                  <View
                    style={[
                      styles.chartLegendContainer,
                      { backgroundColor: colors.metricBackground },
                    ]}>
                    <Text style={[styles.chartLegendText, { color: colors.subText }]}>
                      {comparisonMode === 'all'
                        ? i18n.t('progressScreen.comparingToFirst')
                        : i18n.t('progressScreen.comparingToPrevious')}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        ) : selectedWorkoutId ? (
          <View
            style={[
              styles.emptyProgressCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <Text style={[styles.emptyText, { color: colors.subText }]}>
              {selectedWorkout?.sessions && selectedWorkout?.sessions.length < 2
                ? i18n.t('progressScreen.notEnoughData')
                : i18n.t('progressScreen.noProgressData')}
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.emptyProgressCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <Text style={[styles.emptyText, { color: colors.subText }]}>
              {i18n.t('progressScreen.selectWorkout')}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
