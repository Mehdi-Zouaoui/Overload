import { useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';

import { useThemeStore } from '../stores/themeStore';

export interface SetCarouselProps {
  localReps: number[];
  localWeights: number[];
  previousExercise: any;
  activeSetIndex: number;
  setActiveSetIndex: (index: number) => void;
  handleUpdateReps: (index: number, reps: number) => void;
  handleUpdateSetWeight: (index: number, weight: number) => void;
  isDarkMode?: boolean; // Make this optional
}

export default function SetCarousel({
  localReps,
  localWeights,
  previousExercise,
  activeSetIndex,
  setActiveSetIndex,
  handleUpdateReps,
  handleUpdateSetWeight,
  isDarkMode: propIsDarkMode,
}: SetCarouselProps) {
  const carouselRef = useRef<FlatList>(null);
  // Use the theme store if isDarkMode is not provided as a prop
  const themeStore = useThemeStore();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : themeStore.isDarkMode;

  // Add useEffect to scroll to the active set when it changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollToIndex({
        index: activeSetIndex,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [activeSetIndex]);

  const handleSetChange = (index: number) => {
    setActiveSetIndex(index);
  };

  // Create dynamic styles based on theme
  const dynamicStyles = {
    text: { color: isDarkMode ? '#FFFFFF' : '#111827' },
    subText: { color: isDarkMode ? '#BBBBBB' : '#6B7280' },
    setIndicator: { backgroundColor: isDarkMode ? '#2A2A2A' : '#F3F4F6' },
    activeSetIndicator: { backgroundColor: isDarkMode ? '#FFFFFF' : '#111827' },
    setIndicatorText: { color: isDarkMode ? '#BBBBBB' : '#000000' },
    activeSetIndicatorText: { color: isDarkMode ? '#111827' : '#FFFFFF' },
    completionDot: { backgroundColor: isDarkMode ? '#10b981' : '#4ade80' },
    activeCompletionDot: { backgroundColor: '#4ade80' },
    controlButton: { backgroundColor: isDarkMode ? '#FFFFFF' : '#111827' },
    controlButtonText: { color: isDarkMode ? '#111827' : '#FFFFFF' },
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      {/* Set Pills */}
      <View style={styles.setIndicatorContainer}>
        {localReps.map((_, index) => (
          <Pressable
            key={index}
            style={[
              styles.setIndicator,
              activeSetIndex === index && styles.activeSetIndicator,
              {
                backgroundColor:
                  activeSetIndex === index
                    ? dynamicStyles.activeSetIndicator.backgroundColor
                    : dynamicStyles.setIndicator.backgroundColor,
              },
            ]}
            onPress={() => handleSetChange(index)}>
            <Text
              style={[
                styles.setIndicatorText,
                {
                  color:
                    activeSetIndex === index
                      ? dynamicStyles.activeSetIndicatorText.color
                      : dynamicStyles.setIndicatorText.color,
                },
              ]}>
              Set {index + 1}
            </Text>

            {/* Simple completion indicator */}
            {localReps[index] > 0 && (
              <View
                style={[
                  styles.completionDot,
                  {
                    backgroundColor:
                      activeSetIndex === index
                        ? dynamicStyles.activeCompletionDot.backgroundColor
                        : dynamicStyles.completionDot.backgroundColor,
                  },
                ]}
              />
            )}
          </Pressable>
        ))}
      </View>

      {/* Current Set Title */}
      <Text style={[styles.setTitle, dynamicStyles.text]}>Set {activeSetIndex + 1}</Text>

      {/* Weight Section */}
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionLabel, dynamicStyles.subText]}>WEIGHT</Text>
        <View style={styles.controlsRow}>
          <Pressable
            style={[
              styles.controlButton,
              { backgroundColor: dynamicStyles.controlButton.backgroundColor },
            ]}
            onPress={() => {
              if (localWeights[activeSetIndex] > 0) {
                handleUpdateSetWeight(activeSetIndex, localWeights[activeSetIndex] - 2.5);
              }
            }}>
            <Text
              style={[styles.controlButtonText, { color: dynamicStyles.controlButtonText.color }]}>
              −
            </Text>
          </Pressable>

          <View style={styles.valueContainer}>
            <Text style={[styles.valueText, dynamicStyles.text]}>
              {localWeights[activeSetIndex]}
            </Text>
            <Text style={[styles.unitText, dynamicStyles.subText]}>kg</Text>
          </View>

          <Pressable
            style={[
              styles.controlButton,
              { backgroundColor: dynamicStyles.controlButton.backgroundColor },
            ]}
            onPress={() => {
              handleUpdateSetWeight(activeSetIndex, localWeights[activeSetIndex] + 2.5);
            }}>
            <Text
              style={[styles.controlButtonText, { color: dynamicStyles.controlButtonText.color }]}>
              +
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Reps Section */}
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionLabel, dynamicStyles.subText]}>REPS</Text>
        <View style={styles.controlsRow}>
          <Pressable
            onPress={() => {
              handleUpdateReps(activeSetIndex, Math.max(0, localReps[activeSetIndex] - 1));
            }}
            style={[
              styles.controlButton,
              { backgroundColor: dynamicStyles.controlButton.backgroundColor },
            ]}>
            <Text
              style={[styles.controlButtonText, { color: dynamicStyles.controlButtonText.color }]}>
              −
            </Text>
          </Pressable>

          <View style={styles.valueContainer}>
            <Text style={[styles.valueText, dynamicStyles.text]}>{localReps[activeSetIndex]}</Text>
          </View>

          <Pressable
            onPress={() => {
              handleUpdateReps(activeSetIndex, Math.max(0, localReps[activeSetIndex] + 1));
            }}
            style={[
              styles.controlButton,
              { backgroundColor: dynamicStyles.controlButton.backgroundColor },
            ]}>
            <Text
              style={[styles.controlButtonText, { color: dynamicStyles.controlButtonText.color }]}>
              +
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
    alignSelf: 'center',
  },
  setIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  setIndicator: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeSetIndicator: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  setIndicatorText: {
    fontSize: 13,
    fontWeight: '600',
  },
  completionDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  setTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionContainer: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
    textAlign: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  controlButtonText: {
    fontWeight: '600',
    fontSize: 22,
    includeFontPadding: false,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    minWidth: 80,
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 36,
    fontWeight: '700',
    includeFontPadding: false,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 3,
  },
});
