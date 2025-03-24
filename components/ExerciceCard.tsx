import { Ionicons } from '@expo/vector-icons';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useThemeStore } from 'stores/themeStore';

interface ExerciseCardProps {
  workoutId: string;
  exerciseId: string;
  name: string;
  sets: number;
  reps: number[];
  weight: number;
  weights: number[];
  isDone?: boolean;
  onPress?: (combinedId: string) => void;
}

export const ExerciceCard = ({
  workoutId,
  exerciseId,
  name,
  sets,
  reps,
  weight,
  weights,
  isDone = false,
  onPress,
}: ExerciseCardProps) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Create a unique key that changes when theme or props change
  const componentKey = `${isDarkMode ? 'dark' : 'light'}-${isDone}-${weight}-${sets}-${Array.isArray(reps) ? reps.join('-') : '0'}`;

  // Calculate weight range if weights array exists and has values
  const weightDisplay = (() => {
    if (Array.isArray(weights) && weights.length > 0) {
      const validWeights = weights.filter((w) => w > 0);
      if (validWeights.length > 0) {
        const minWeight = Math.min(...validWeights);
        const maxWeight = Math.max(...validWeights);

        if (minWeight === maxWeight) {
          return `${minWeight} kg`;
        } else {
          return `${minWeight} - ${maxWeight} kg`;
        }
      }
    }
    // Fallback to the default weight if no valid weights array
    return `${weight} kg`;
  })();

  const handlePress = () => {
    if (onPress) {
      onPress(`${workoutId}-${exerciseId}`);
    }
  };

  // Dynamic styles based on theme - updated to match the statCard in DetailsScreen
  const dynamicStyles = {
    cardBackground: {
      backgroundColor: isDarkMode ? '#1E1E1E' : 'rgba(0, 0, 0, 0.04)',
      borderColor: isDarkMode ? '#333333' : 'rgba(0, 0, 0, 0.05)',
      borderWidth: 1,
    },
    titleText: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    weightText: {
      color: isDarkMode ? '#BBBBBB' : '#444444',
    },
    setsBadge: {
      backgroundColor: isDarkMode ? '#333333' : '#EEEEEE',
    },
    setsText: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    repsText: {
      color: isDarkMode ? '#BBBBBB' : '#444444',
    },
    cardShadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    divider: {
      backgroundColor: isDarkMode ? '#333333' : 'rgba(0, 0, 0, 0.05)',
    },
    completedBadge: {
      backgroundColor: isDone
        ? isDarkMode
          ? '#134e4a'
          : '#d1fae5' // Darker green in dark mode, light green in light mode
        : isDarkMode
          ? '#292524'
          : '#f5f5f4', // Darker gray in dark mode, light gray in light mode
      borderRadius: 20,
      paddingHorizontal: 8,
      paddingVertical: 4,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      marginLeft: 8,
      borderWidth: 1,
      borderColor: isDone
        ? isDarkMode
          ? '#065f46'
          : '#10b981' // Border for done state
        : isDarkMode
          ? '#44403c'
          : '#d6d3d1', // Border for todo state
    },
    completedText: {
      color: isDone
        ? isDarkMode
          ? '#a7f3d0'
          : '#047857' // Text for done state
        : isDarkMode
          ? '#d6d3d1'
          : '#57534e', // Text for todo state
      fontSize: 12,
      fontWeight: '600' as const,
      marginLeft: 3,
    },
  };

  return (
    <Pressable
      key={componentKey}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}>
      <View style={[styles.card, dynamicStyles.cardBackground, dynamicStyles.cardShadow]}>
        <View style={styles.headerSection}>
          <View style={styles.titleContainer}>
            <Text style={[styles.nameText, dynamicStyles.titleText]} numberOfLines={1}>
              {name}
            </Text>
            <View style={[dynamicStyles.completedBadge]}>
              <Ionicons
                name={isDone ? 'checkmark-circle' : 'barbell-outline'}
                size={14}
                color={
                  isDone ? (isDarkMode ? '#a7f3d0' : '#047857') : isDarkMode ? '#d4d4d4' : '#525252'
                }
              />
              <Text style={[dynamicStyles.completedText]}>{isDone ? 'Done' : 'To do'}</Text>
            </View>
          </View>
          <Text style={[styles.weightText, dynamicStyles.weightText]}>{weightDisplay}</Text>
        </View>

        <View style={[styles.divider, dynamicStyles.divider]} />

        <View style={styles.footerSection}>
          <View style={[styles.setsBadge, dynamicStyles.setsBadge]}>
            <Text style={[styles.setsText, dynamicStyles.setsText]}>{sets} sets</Text>
          </View>
          <Text style={[styles.repsText, dynamicStyles.repsText]}>
            {Array.isArray(reps) ? reps.join(' · ') : '0'} reps
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerSection: {
    marginBottom: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  weightText: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 12,
  },
  footerSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  setsBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 10,
    marginBottom: 4,
  },
  setsText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  repsText: {
    fontSize: 13,
    fontWeight: '400',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
});
