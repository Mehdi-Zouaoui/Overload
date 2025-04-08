import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { AddWorkoutCard } from 'components/AddWorkoutCard';
import { useSession } from 'context/SessionProvider';
import { ChevronDown } from 'lucide-react-native';
import { useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';

import { WorkoutCard } from '../components/WorkoutCard';
import i18n from '../i18n';
import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { styles, createDynamicStyles } from '../styles/HomeScreenStyles';

function HomeScreen({ navigation }: { navigation: any }) {
  const { session } = useSession();
  const getUserWorkouts = useWorkoutStore((state) => state.getUserWorkouts);
  const setWorkouts = useWorkoutStore((state) => state.setWorkouts);
  const setRefetchWorkouts = useWorkoutStore((state) => state.setRefetchWorkouts);
  const user = session?.user?.user_metadata;
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Create dynamic styles based on theme
  const dynamicStyles = createDynamicStyles(isDarkMode);

  // Use React Query to fetch workouts with better error handling
  const {
    isLoading,
    error,
    data: workouts = [],
    refetch,
  } = useQuery({
    queryKey: ['workouts', user?.sub],
    queryFn: async () => {
      try {
        const data = await getUserWorkouts(user?.sub);
        setWorkouts(data);
        return data;
      } catch (err) {
        console.error('Error fetching workouts:', err);
        throw err;
      }
    },
    enabled: !!user?.sub,
  });

  // Store the refetch function in the global store
  useEffect(() => {
    setRefetchWorkouts(refetch);

    return () => {
      // Clean up when component unmounts
      setRefetchWorkouts(() => Promise.resolve());
    };
  }, [refetch, setRefetchWorkouts]);

  // Function to handle database operations and refresh
  const handleDatabaseOperation = useCallback(
    async (operation: () => Promise<any>) => {
      try {
        // Execute the database operation
        await operation();
        // Refresh the workouts data
        refetch();
      } catch (err) {
        console.error('Error during database operation:', err);
      }
    },
    [refetch]
  );

  const handleAddWorkout = () => {
    navigation.navigate('CreateWorkout');
  };

  // Refresh workouts when screen is focused
  useFocusEffect(
    useCallback(() => {
      // Refresh data when returning to this screen
      refetch();

      return () => {
        // Cleanup if needed
      };
    }, [refetch])
  );

  // Show loading state
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, dynamicStyles.container]}>
        <View style={[styles.container, dynamicStyles.container, styles.centerContent]}>
          <ActivityIndicator size="large" color={dynamicStyles.activityIndicator.color} />
          <Text style={[styles.loadingText, dynamicStyles.emptyText]}>
            Loading your workouts...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error state
  if (error) {
    return (
      <SafeAreaView style={[styles.safeArea, dynamicStyles.container]}>
        <View style={[styles.container, dynamicStyles.container, styles.centerContent]}>
          <Text style={[styles.errorText, dynamicStyles.errorText]}>
            Unable to load workouts. Please try again.
          </Text>
          <Pressable
            style={[styles.refreshButton, dynamicStyles.refreshButton]}
            onPress={() => refetch()}>
            <Text style={[styles.refreshButtonText, dynamicStyles.refreshButtonText]}>Retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Get current date for display
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={[styles.safeArea, dynamicStyles.container]}>
      <View style={[styles.container, dynamicStyles.container]}>
        {/* Enhanced Custom Header with i18n */}
        <View style={[styles.customHeader, dynamicStyles.container]}>
          <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>
            {i18n.t('common.workouts')}
          </Text>
          <View style={[styles.badgeContainer, dynamicStyles.badgeContainer]}>
            <Text style={[styles.workoutCount, dynamicStyles.workoutCount]}>{workouts.length}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, dynamicStyles.divider]} />

        {/* Vertical Scroll Indicator */}
        {workouts.length > 0 && (
          <View style={styles.scrollIndicatorContainer}>
            <Text style={[styles.scrollHintText, dynamicStyles.emptyText]}>
              {i18n.t('common.swipeDown')}
            </Text>
            <View style={styles.arrowContainer}>
              <ChevronDown size={20} color={isDarkMode ? '#AAAAAA' : '#666666'} />
            </View>
          </View>
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            workouts.length === 0 && styles.emptyScrollContent,
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              colors={[dynamicStyles.activityIndicator.color]}
              tintColor={dynamicStyles.activityIndicator.color}
            />
          }>
          {workouts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, dynamicStyles.emptyText]}>
                {i18n.t('common.emptyState')}
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.createButton,
                  dynamicStyles.createButton,
                  { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
                ]}
                onPress={handleAddWorkout}
                accessibilityLabel="Create a new workout"
                accessibilityRole="button">
                <Text style={[styles.createButtonText, dynamicStyles.createButtonText]}>
                  {i18n.t('common.createWorkout')}
                </Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.workoutsContainer}>
              {workouts
                .filter((workout) => workout.user_id === user?.sub)
                .sort((a, b) => {
                  // Sort by favorite status (favorites first)
                  if (a.isFavorite && !b.isFavorite) return -1;
                  if (!a.isFavorite && b.isFavorite) return 1;
                  return 0;
                })
                .map((workout) => (
                  <Pressable
                    key={workout.id}
                    style={({ pressed }) => [
                      styles.workoutCardWrapper,
                      { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] },
                    ]}
                    onPress={() => navigation.navigate('Details', { id: workout.id })}
                    accessibilityLabel={`View ${workout.title || 'Untitled Workout'} details`}
                    accessibilityRole="button">
                    <WorkoutCard
                      id={workout.id}
                      title={workout.title || 'Untitled Workout'}
                      week={workout.week || ''}
                      sessions={workout.sessions}
                      isFavorite={workout.isFavorite}
                    />
                  </Pressable>
                ))}

              {/* Last updated info */}
              <Text style={[styles.lastUpdated, dynamicStyles.lastUpdated]}>
                {i18n.t('common.lastUpdated')}: {new Date().toLocaleTimeString()}
              </Text>
            </View>
          )}
        </ScrollView>

        <AddWorkoutCard navigation={navigation} onDatabaseOperation={handleDatabaseOperation} />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
