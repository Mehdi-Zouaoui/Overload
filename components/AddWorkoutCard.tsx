import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus } from 'lucide-react-native';
import { Text, View, Pressable, StyleSheet } from 'react-native';

import { useThemeStore } from '../stores/themeStore';

type RootStackParamList = {
  AddWorkout: {
    initialWorkout: {
      title: string;
      exercises: any[][];
      completed: boolean;
      week: string;
    };
  };
};

type AddWorkoutCardProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddWorkout'>;
};

export const AddWorkoutCard = ({ navigation }: AddWorkoutCardProps) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const handlePress = () => {
    navigation.navigate('AddWorkout', {
      initialWorkout: {
        title: '',
        exercises: [[]], // Initialize with empty array for first week
        completed: false,
        week: 'Week 1',
      },
    });
  };

  // Dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1A1B1E' : '#FFFFFF',
      shadowColor: isDarkMode ? '#000' : '#888',
    },
    title: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    subtitle: {
      color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
    },
    bulletText: {
      color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    },
    addButton: {
      backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
    },
    plusIcon: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    bullet: {
      color: isDarkMode ? '#777' : '#555',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, dynamicStyles.title]}>Add Workout</Text>
        <Pressable
          style={[styles.addButton, dynamicStyles.addButton]}
          onPress={handlePress}
          android_ripple={{ color: isDarkMode ? '#555' : '#ddd', radius: 20 }}>
          <Plus size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </Pressable>
      </View>

      <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
        Track your progress and reach new goals
      </Text>

      <View style={styles.bulletPoints}>
        {['Track sets & reps', 'Monitor progress', 'Analyze performance'].map((item, index) => (
          <View key={index} style={styles.bulletRow}>
            <Text style={[styles.bullet, dynamicStyles.bullet]}>•</Text>
            <Text style={[styles.bulletText, dynamicStyles.bulletText]}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderTopWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  bulletPoints: {
    marginTop: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 18,
    marginRight: 10,
  },
  bulletText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
