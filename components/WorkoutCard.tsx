import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { List } from 'lucide-react-native';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import i18n from '../i18n';
import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore, Session } from '../stores/workoutStore';
import { styles, createDynamicStyles } from '../styles/WorkoutCardStyles';

interface WorkoutCardProps {
  title: string;
  id: string;
  sessions: Session[];
  completed?: boolean;
  onPress?: () => void;
  className?: string;
  week: string;
  isFavorite?: boolean;
}

type NavigationProps = {
  navigate: (screen: string, params: { title?: string; id: string; mode?: 'add' | 'edit' }) => void;
};

export const WorkoutCard = ({
  title,
  id,
  sessions,
  completed,
  onPress,
  week,
  isFavorite,
}: WorkoutCardProps) => {
  const navigation = useNavigation<NavigationProps>();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const removeWorkout = useWorkoutStore((state) => state.removeWorkout);
  const toggleFavorite = useWorkoutStore((state) => state.toggleFavorite);

  const dynamicStyles = createDynamicStyles(isDarkMode);

  // Handle the case where sessions is an array of exercise arrays
  const exercises = Array.isArray(sessions?.[0]) ? sessions[0] : sessions?.[0]?.exercises || [];

  const handleMenuPress = (event: any) => {
    event.stopPropagation(); // Prevent triggering the card's onPress
    Alert.alert(i18n.t('workoutCard.options'), i18n.t('workoutCard.chooseAction'), [
      {
        text: isFavorite
          ? i18n.t('workoutCard.removeFromFavorites')
          : i18n.t('workoutCard.addToFavorites'),
        onPress: () => toggleFavorite(id),
      },
      {
        text: i18n.t('workoutCard.edit'),
        onPress: () => navigation.navigate('WorkoutForm', { mode: 'edit', id }),
      },
      {
        text: i18n.t('workoutCard.delete'),
        style: 'destructive',
        onPress: () => {
          Alert.alert(i18n.t('workoutCard.deleteWorkout'), i18n.t('workoutCard.confirmDelete'), [
            { text: i18n.t('common.cancel'), style: 'cancel' },
            {
              text: i18n.t('workoutCard.delete'),
              style: 'destructive',
              onPress: () => {
                removeWorkout(id);
              },
            },
          ]);
        },
      },
      { text: i18n.t('common.cancel'), style: 'cancel' },
    ]);
  };

  // Handle direct favorite toggle
  const handleFavoriteToggle = (event: any) => {
    event.stopPropagation(); // Prevent triggering the card's onPress
    toggleFavorite(id);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', { title, id });
        onPress?.();
      }}
      activeOpacity={0.85}
      style={[
        styles.container,
        dynamicStyles.container,
        isFavorite && styles.favoriteContainer,
        isFavorite && dynamicStyles.favoriteContainer,
      ]}>
      {isFavorite && <View style={[styles.favoriteIndicator, dynamicStyles.favoriteIndicator]} />}

      <View style={styles.contentContainer}>
        <View style={styles.leftSection}>
          <View style={[styles.iconContainer, dynamicStyles.iconContainer]}>
            <List size={24} color={dynamicStyles.arrowIcon.color} strokeWidth={1.5} />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.title, dynamicStyles.title]} numberOfLines={1}>
              {title}
            </Text>
            <Text style={[styles.week, dynamicStyles.week]}>{week}</Text>
            {exercises.length > 0 && (
              <View style={styles.exerciseInfoContainer}>
                <Text style={[styles.exerciseCount, dynamicStyles.exerciseCount]}>
                  {exercises.length}{' '}
                  {i18n.t(
                    exercises.length !== 1 ? 'workoutCard.exercises' : 'workoutCard.exercise'
                  )}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.rightSection}>
          {completed && (
            <View style={[styles.completedBadge, dynamicStyles.completedBadge]}>
              <Text style={[styles.completedText, dynamicStyles.completedText]}>
                {i18n.t('workoutCard.completed')}
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleFavoriteToggle}
            style={styles.pinButton}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <MaterialIcons
              name={isFavorite ? 'push-pin' : 'outlined-flag'}
              size={20}
              color={isFavorite ? dynamicStyles.pinIconActive.color : dynamicStyles.pinIcon.color}
              style={isFavorite ? {} : { display: 'none' }}
            />
          </TouchableOpacity>

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
