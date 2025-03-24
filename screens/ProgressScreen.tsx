import { List, BarChart2 } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore } from '../stores/workoutStore';

export default function ProgressScreen() {
  const { isDarkMode } = useThemeStore();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');
  const [comparisonMode, setComparisonMode] = useState<'last' | 'all'>('last');

  // Use useMemo to prevent repeated calculations that might trigger re-renders
  const workouts = useMemo(() => {
    return useWorkoutStore.getState().workouts;
  }, []);

  // Get progress data for the selected workout
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

    return {
      labels: ['Weight', 'Reps', 'Volume'],
      data: [
        Math.round(Math.max(0, weightProgress)), // Round to whole numbers
        Math.round(Math.max(0, repProgress)),
        Math.round(Math.max(0, volumeProgress)),
      ],
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
    };
  }, [isDarkMode]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.scrollView, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Progress</Text>
        <Text style={[styles.headerSubtitle, { color: colors.subText }]}>
          Track your fitness journey
        </Text>
      </View>

      {/* Workout Selection Section */}
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Workout</Text>
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
                  { backgroundColor: isDarkMode ? '#555555' : '#E0E0E0' },
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
              Last Session
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
              All History
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
                List View
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
              <BarChart2
                size={16}
                color={viewMode === 'chart' ? colors.accent : colors.subText}
                style={styles.viewToggleIcon}
              />
              <Text
                style={[
                  styles.viewToggleText,
                  { color: viewMode === 'chart' ? colors.text : colors.subText },
                ]}>
                Chart View
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
              {selectedWorkout.title} Progress
            </Text>
            <Text style={[styles.progressCardSubtitle, { color: colors.subText }]}>
              {comparisonMode === 'all'
                ? 'Comparing to first session'
                : 'Comparing to previous session'}
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
                        Weight Progress
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
                        Rep Progress
                      </Text>
                      <View style={styles.progressMetricRow}>
                        <Text style={[styles.progressMetricValue, { color: colors.subText }]}>
                          {exerciseProgress.repProgress.initialTotalReps} →{' '}
                          {exerciseProgress.repProgress.currentTotalReps} total reps
                        </Text>
                        <Text
                          style={[
                            styles.progressMetricChange,
                            parseFloat(exerciseProgress.repProgress.percentageIncrease) >= 0
                              ? { color: colors.positiveChange }
                              : { color: colors.negativeChange },
                          ]}>
                          {exerciseProgress.repProgress.increase > 0 ? '+' : ''}
                          {exerciseProgress.repProgress.increase} reps (
                          {exerciseProgress.repProgress.percentageIncrease})
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
                        Volume Progress
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
            ) : (
              // Chart View - Simple Summary Chart
              <View style={styles.chartSummaryContainer}>
                <Text style={[styles.chartTitle, { color: colors.text }]}>
                  Overall Workout Progress
                </Text>

                {chartData && (
                  <BarChart
                    data={{
                      labels: chartData.labels,
                      datasets: [
                        {
                          data: chartData.data,
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width - 60}
                    height={250}
                    yAxisLabel=""
                    yAxisSuffix="%"
                    chartConfig={{
                      backgroundColor: colors.chartBackground,
                      backgroundGradientFrom: colors.chartBackground,
                      backgroundGradientTo: colors.chartBackground,
                      decimalPlaces: 0,
                      color: (opacity = 1) => `${colors.chartColor}${opacity})`,
                      labelColor: (opacity = 1) => `${colors.chartLabelColor}${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      barPercentage: 0.8,
                      propsForLabels: {
                        fontSize: 14,
                        fontWeight: 'bold',
                      },
                      propsForBackgroundLines: {
                        strokeDasharray: '',
                        stroke: colors.chartGridColor,
                        strokeWidth: 1,
                      },
                    }}
                    style={styles.chart}
                    showValuesOnTopOfBars
                    fromZero
                  />
                )}

                <View
                  style={[
                    styles.chartLegend,
                    { backgroundColor: colors.metricBackground, borderColor: colors.border },
                  ]}>
                  <Text style={[styles.chartLegendText, { color: colors.subText }]}>
                    This chart shows your average progress in each category.
                  </Text>
                  <Text style={[styles.chartLegendText, { color: colors.subText }]}>
                    Higher percentages indicate better progress.
                  </Text>
                </View>
              </View>
            )}
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
              ? 'Not enough data to show progress. Complete at least two sessions of workouts.'
              : 'No progress data available for this workout.'}
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.emptyProgressCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <Text style={[styles.emptyText, { color: colors.subText }]}>
            Select a workout to view progress
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerContainer: {
    marginBottom: 24,
    marginTop: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  carouselContainer: {
    marginHorizontal: -20, // Extend beyond the screen padding
    paddingHorizontal: 20,
    paddingBottom: 6,
  },
  horizontalScroll: {
    paddingVertical: 8,
  },
  workoutButton: {
    marginRight: 10,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    minWidth: 110,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  selectedWorkoutButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
  },
  unselectedWorkoutButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
  },
  workoutButtonText: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  selectedWorkoutButtonText: {
    color: '#FFFFFF',
  },
  unselectedWorkoutButtonText: {
    color: '#000000',
  },
  carouselIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 4,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: '#E0E0E0',
  },
  activeIndicatorDot: {
    backgroundColor: '#000000',
    width: 18,
    borderRadius: 3,
  },
  selectionHint: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  viewModeSection: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    height: 44,
    width: '90%',
    maxWidth: 360,
    backgroundColor: '#F0F0F0',
    padding: 4,
  },
  viewToggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: '100%',
    marginHorizontal: 2,
  },
  activeViewToggleButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  viewToggleIcon: {
    marginRight: 6,
  },
  viewToggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listIconLine: {
    width: 16,
    height: 2,
    marginVertical: 2,
    borderRadius: 1,
  },
  chartIconBar1: {
    position: 'absolute',
    width: 4,
    height: 8,
    bottom: 4,
    left: 6,
    borderRadius: 1,
  },
  chartIconBar2: {
    position: 'absolute',
    width: 4,
    height: 12,
    bottom: 4,
    left: 12,
    borderRadius: 1,
  },
  chartIconBar3: {
    position: 'absolute',
    width: 4,
    height: 16,
    bottom: 4,
    left: 18,
    borderRadius: 1,
  },
  emptyWorkoutsCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    minWidth: 200,
    alignItems: 'center',
  },
  progressContainer: {
    marginBottom: 28,
    marginHorizontal: 20,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  progressCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000000',
    letterSpacing: -0.3,
  },
  progressCardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    letterSpacing: 0.1,
  },
  exerciseContainer: {
    marginBottom: 24,
  },
  exerciseDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingBottom: 24,
  },
  exerciseName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 14,
    color: '#000000',
    letterSpacing: 0.1,
  },
  progressMetricContainer: {
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  progressMetricTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  progressMetricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  progressMetricValue: {
    fontSize: 15,
    color: '#4B5563',
    fontWeight: '500',
  },
  progressMetricChange: {
    fontWeight: '600',
    fontSize: 15,
  },
  positiveChange: {
    color: '#1F2937',
  },
  negativeChange: {
    color: '#6B7280',
  },
  chartSummaryContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  chart: {
    marginVertical: 12,
    borderRadius: 12,
    paddingVertical: 6,
  },
  chartLegend: {
    marginTop: 20,
    paddingHorizontal: 14,
    width: '100%',
    backgroundColor: '#FAFAFA',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  chartLegendText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  emptyProgressCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 28,
    paddingHorizontal: 18,
    marginHorizontal: 20,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  overloadCard: {
    marginBottom: 28,
  },
  comparisonToggleContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#FFFFFF',
  },
  comparisonToggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedComparisonToggleButton: {
    backgroundColor: '#000000',
  },
  unselectedComparisonToggleButton: {
    backgroundColor: '#FFFFFF',
  },
  comparisonToggleText: {
    fontWeight: '500',
    fontSize: 14,
  },
  selectedComparisonToggleText: {
    color: '#FFFFFF',
  },
  unselectedComparisonToggleText: {
    color: '#000000',
  },
});
