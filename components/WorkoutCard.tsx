import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CircleArrowRight } from 'lucide-react-native';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Session } from 'stores/workoutStore';

import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore } from '../stores/workoutStore';

interface WorkoutCardProps {
  title: string;
  id: string;
  sessions: Session[];
  completed?: boolean;
  onPress?: () => void;
  className?: string;
  week: string;
}

type NavigationProps = {
  navigate: (screen: string, params: { title?: string; id: string }) => void;
};

export const WorkoutCard = ({
  title,
  id,
  sessions,
  completed,
  onPress,
  week,
}: WorkoutCardProps) => {
  const navigation = useNavigation<NavigationProps>();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const removeWorkout = useWorkoutStore((state) => state.removeWorkout);

  // Handle the case where sessions is an array of exercise arrays
  const exercises = Array.isArray(sessions?.[0]) ? sessions[0] : sessions?.[0]?.exercises || [];

  const handleMenuPress = (event: any) => {
    event.stopPropagation(); // Prevent triggering the card's onPress
    Alert.alert('Workout Options', 'Choose an action', [
      {
        text: 'Edit',
        onPress: () => navigation.navigate('EditWorkout', { id }),
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Delete Workout', 'Are you sure you want to delete this workout?', [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                removeWorkout(id);
              },
            },
          ]);
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // Dynamic styles based on theme - black and white palette
  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
      borderColor: isDarkMode ? '#333333' : '#E0E0E0',
      shadowColor: isDarkMode ? '#000' : 'rgba(0, 0, 0, 0.12)',
    },
    iconContainer: {
      backgroundColor: isDarkMode ? '#2A2A2A' : '#F5F5F5',
      borderColor: isDarkMode ? '#333333' : '#E0E0E0',
    },
    title: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    week: {
      color: isDarkMode ? '#BBBBBB' : '#555555',
    },
    exerciseCount: {
      color: isDarkMode ? '#999999' : '#777777',
    },
    completedBadge: {
      backgroundColor: isDarkMode ? '#333333' : '#F0F0F0',
    },
    completedText: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    menuIcon: {
      color: isDarkMode ? '#BBBBBB' : '#555555',
    },
    arrowIcon: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', { title, id });
        onPress?.();
      }}
      activeOpacity={0.85}
      style={[styles.container, dynamicStyles.container]}>
      <View style={styles.contentContainer}>
        <View style={styles.leftSection}>
          <View style={[styles.iconContainer, dynamicStyles.iconContainer]}>
            <CircleArrowRight size={24} color={dynamicStyles.arrowIcon.color} strokeWidth={1.5} />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.title, dynamicStyles.title]} numberOfLines={1}>
              {title}
            </Text>
            <Text style={[styles.week, dynamicStyles.week]}>{week}</Text>
            {exercises.length > 0 && (
              <View style={styles.exerciseInfoContainer}>
                <Text style={[styles.exerciseCount, dynamicStyles.exerciseCount]}>
                  {exercises.length} exercise{exercises.length !== 1 ? 's' : ''}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.rightSection}>
          {completed && (
            <View style={[styles.completedBadge, dynamicStyles.completedBadge]}>
              <Text style={[styles.completedText, dynamicStyles.completedText]}>Completed</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleMenuPress}
            style={styles.menuButton}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <MaterialIcons name="more-vert" size={24} color={dynamicStyles.menuIcon.color} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 18,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  week: {
    fontSize: 15,
    marginBottom: 4,
    letterSpacing: -0.2,
    fontWeight: '500',
  },
  exerciseInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  exerciseCount: {
    fontSize: 14,
    letterSpacing: -0.1,
    fontWeight: '400',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedBadge: {
    marginRight: 10,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  completedText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  menuButton: {
    padding: 8,
    marginRight: -8,
  },
});
