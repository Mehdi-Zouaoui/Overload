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
        exercises: [[]],
        completed: false,
        week: 'Week 1',
      },
    });
  };

  const dynamicStyles = {
    card: {
      backgroundColor: isDarkMode ? '#1E1E2E' : '#FFFFFF',
      shadowColor: isDarkMode ? '#000000' : '#AAAAAA',
    },
    text: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    subtext: {
      color: isDarkMode ? '#AAAAAA' : '#666666',
    },
    iconBg: {
      backgroundColor: isDarkMode ? '#2A2A3A' : '#F0F0F5',
    },
    divider: {
      backgroundColor: isDarkMode ? '#333344' : '#EEEEEE',
    },
    highlight: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    badge: {
      backgroundColor: isDarkMode ? '#3A3A4A' : '#F0F0F5',
    },
    statsBox: {
      borderColor: isDarkMode ? '#333344' : '#EEEEEE',
      backgroundColor: isDarkMode ? '#2A2A3A' : '#F8F8FC',
    },
    plusIcon: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
  };

  return (
    <Pressable
      style={[styles.card, dynamicStyles.card]}
      onPress={handlePress}
      android_ripple={{ color: isDarkMode ? '#333' : '#E0E0E0', radius: 300 }}>
      <View style={styles.contentSection}>
        <Text style={[styles.title, dynamicStyles.text]}>Create Workout</Text>
        <Text style={[styles.subtitle, dynamicStyles.subtext]}>
          Design your perfect fitness routine
        </Text>

        <View style={[styles.divider, dynamicStyles.divider]} />

        <View style={styles.infoRow}>
          <View style={[styles.badge, dynamicStyles.badge]}>
            <Text style={[styles.badgeText, dynamicStyles.text]}>Quick</Text>
          </View>
          <Text style={[styles.infoText, dynamicStyles.subtext]}>Est. time: 5 min</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={[styles.iconContainer, dynamicStyles.iconBg]}>
          <Plus size={24} color={dynamicStyles.plusIcon.color} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  contentSection: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  divider: {
    height: 1,
    marginTop: 14,
    marginBottom: 14,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  statsBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    alignItems: 'center',
  },
  statsValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  statsLabel: {
    fontSize: 11,
    marginTop: 3,
  },
});
