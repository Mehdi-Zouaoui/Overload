import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus } from 'lucide-react-native';
import { Text, View, Pressable } from 'react-native';

import i18n from '../i18n';
import { useThemeStore } from '../stores/themeStore';
import { styles, createDynamicStyles } from '../styles/AddWorkoutCardStyles';

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
  onDatabaseOperation: (operation: () => Promise<any>) => void;
};

export const AddWorkoutCard = ({ navigation }: AddWorkoutCardProps) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const dynamicStyles = createDynamicStyles(isDarkMode);

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

  return (
    <Pressable
      style={[styles.card, dynamicStyles.card]}
      onPress={handlePress}
      android_ripple={{ color: isDarkMode ? '#333' : '#E0E0E0', radius: 300 }}>
      <View style={styles.contentSection}>
        <Text style={[styles.title, dynamicStyles.text]}>{i18n.t('addWorkoutCard.title')}</Text>
        <Text style={[styles.subtitle, dynamicStyles.subtext]}>
          {i18n.t('addWorkoutCard.subtitle')}
        </Text>

        <View style={[styles.divider, dynamicStyles.divider]} />

        <View style={styles.infoRow}>
          <View style={[styles.badge, dynamicStyles.badge]}>
            <Text style={[styles.badgeText, dynamicStyles.badgeText]}>
              {i18n.t('addWorkoutCard.badgeText')}
            </Text>
          </View>
          <Text style={[styles.infoText, dynamicStyles.subtext]}>
            {i18n.t('addWorkoutCard.infoText')}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={[styles.iconContainer, dynamicStyles.iconBg]}>
          <Plus size={22} color={dynamicStyles.plusIcon.color} />
        </View>
      </View>
    </Pressable>
  );
};
