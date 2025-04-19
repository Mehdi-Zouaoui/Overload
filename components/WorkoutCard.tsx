import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import i18n from '../i18n';
import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore, Session } from '../stores/workoutStore';
import { createDynamicStyles, styles as baseStyles } from '../styles/WorkoutCardStyles';

interface WorkoutCardProps {
  title: string;
  id: string;
  sessions: Session[];
  completed?: boolean;
  onPress?: () => void;
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
  const combinedStyles = { ...baseStyles, ...dynamicStyles };

  // Ensure sessions is always an array
  const sessionsArray = Array.isArray(sessions) ? sessions : [];

  // Handle the case where sessions is an array of exercise arrays
  const exercises =
    sessionsArray.length > 0
      ? Array.isArray(sessionsArray[0])
        ? sessionsArray[0]
        : sessionsArray[0]?.exercises || []
      : [];

  // For debugging
  console.log('Exercises:', JSON.stringify(exercises, null, 2));

  // Calculate total sets across all exercises correctly based on the data model
  const totalSets = exercises.reduce((total, exercise) => {
    if (!exercise) return total;
    // sets is a number in your data model, not an array
    return total + (typeof exercise.sets === 'number' ? exercise.sets : 0);
  }, 0);

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

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', { title, id });
        onPress?.();
      }}
      activeOpacity={0.7}
      style={[
        combinedStyles.card,
        baseStyles.card,
        baseStyles.container,
        combinedStyles.cardShadow,
      ]}>
      <View style={baseStyles.headerRow}>
        <Text style={[combinedStyles.text, baseStyles.title, { marginRight: 12, fontSize: 24 }]}>
          {sessionsArray.length}
        </Text>
        <View style={baseStyles.titleContainer}>
          <Text style={[combinedStyles.text, baseStyles.title]}>
            {title.toUpperCase() || 'UNTITLED WORKOUT'}
          </Text>
          {week && (
            <View style={baseStyles.badgeContainer}>
              <View style={[combinedStyles.badge, baseStyles.badge]}>
                <Text style={[combinedStyles.badgeText, baseStyles.badgeText]}>
                  {i18n.t('common.sessions')} {sessionsArray.length}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isFavorite && <MaterialIcons name="star" size={24} color={combinedStyles.iconColor} />}
          <TouchableOpacity
            onPress={handleMenuPress}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            style={{ marginLeft: 8 }}>
            <MaterialIcons name="more-vert" size={24} color={combinedStyles.iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={combinedStyles.divider} />

      <View style={baseStyles.statsRow}>
        <View style={baseStyles.statItem}>
          <MaterialIcons name="fitness-center" size={18} color={combinedStyles.iconColor} />
          <Text style={[combinedStyles.text, baseStyles.statText, { marginLeft: 8 }]}>
            {exercises.length} exercises
          </Text>
        </View>
        <View style={baseStyles.statItem}>
          <MaterialIcons name="repeat" size={18} color={combinedStyles.iconColor} />
          <Text style={[combinedStyles.text, baseStyles.statText, { marginLeft: 8 }]}>
            {totalSets} sets
          </Text>
        </View>
      </View>

      <View style={baseStyles.footerRow}>
        <View style={[baseStyles.statItem]} />
        <TouchableOpacity
          style={[
            baseStyles.detailsButton,
            {
              borderColor: combinedStyles.iconButtonColor,
              paddingHorizontal: 16,
              paddingVertical: 8,
            },
          ]}
          onPress={() => {
            navigation.navigate('Details', { title, id });
            onPress?.();
          }}>
          <Text style={[combinedStyles.text, baseStyles.detailsButtonText]}>
            {i18n.t('workoutCard.details') || 'DÉTAILS'}
          </Text>
          <MaterialIcons
            name="chevron-right"
            size={16}
            color={combinedStyles.iconButtonColor}
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
