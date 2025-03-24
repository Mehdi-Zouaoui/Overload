import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { AddWorkoutCard } from 'components/AddWorkoutCard';
import { useSession } from 'context/SessionProvider';
import { useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';

import { WorkoutCard } from '../components/WorkoutCard';
import { useThemeStore } from '../stores/themeStore';
import { useWorkoutStore } from '../stores/workoutStore';

function HomeScreen({ navigation }: { navigation: any }) {
  const { session } = useSession();
  const getUserWorkouts = useWorkoutStore((state) => state.getUserWorkouts);
  const setWorkouts = useWorkoutStore((state) => state.setWorkouts);
  const user = session?.user?.user_metadata;
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Use React Query to fetch workouts
  const { isLoading, data: workouts = [] } = useQuery({
    queryKey: ['workouts', user?.sub],
    queryFn: async () => {
      const data = await getUserWorkouts(user?.sub);
      setWorkouts(data);
      return data;
    },
    enabled: !!user?.sub,
  });

  // Enhanced dynamic styles with better color contrast and spacing
  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
    },
    emptyText: {
      color: isDarkMode ? '#BBBBBB' : 'rgba(0, 0, 0, 0.6)',
    },
    sectionTitle: {
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    divider: {
      backgroundColor: isDarkMode ? '#333333' : 'rgba(0, 0, 0, 0.08)',
    },
    createButton: {
      backgroundColor: isDarkMode ? '#FFFFFF' : '#111827',
    },
    createButtonText: {
      color: isDarkMode ? '#000000' : '#FFFFFF',
    },
    badgeContainer: {
      backgroundColor: isDarkMode ? '#1E1E1E' : 'rgba(0, 0, 0, 0.05)',
    },
    workoutCard: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    },
    activityIndicator: {
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
  };

  const handleAddWorkout = () => {
    navigation.navigate('CreateWorkout');
  };

  // Refresh workouts when screen is focused
  useFocusEffect(
    useCallback(() => {
      // This could be used to refresh data when returning to this screen
      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  // Show loading state
  if (isLoading) {
    return (
      <View style={[styles.container, dynamicStyles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={dynamicStyles.activityIndicator.color} />
      </View>
    );
  }

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Enhanced Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>My Workouts</Text>

        <View style={[styles.badgeContainer, dynamicStyles.badgeContainer]}>
          <Text style={[styles.workoutCount, dynamicStyles.emptyText]}>
            {workouts.length} {workouts.length === 1 ? 'workout' : 'workouts'}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={[styles.divider, dynamicStyles.divider]} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          workouts.length === 0 && styles.emptyScrollContent,
        ]}
        showsVerticalScrollIndicator={false}>
        {workouts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, dynamicStyles.emptyText]}>
              No workouts yet. Create your first workout to get started!
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.createButton,
                dynamicStyles.createButton,
                { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
              ]}
              onPress={handleAddWorkout}>
              <Text style={[styles.createButtonText, dynamicStyles.createButtonText]}>
                Create Workout
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.workoutsContainer}>
            {workouts.map((workout) => {
              if (workout.user_id === user?.sub) {
                return (
                  <Pressable
                    key={workout.id}
                    style={({ pressed }) => [
                      styles.workoutCardWrapper,
                      { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] },
                    ]}
                    onPress={() => navigation.navigate('Details', { id: workout.id })}>
                    <WorkoutCard
                      id={workout.id}
                      title={workout.title || 'Untitled Workout'}
                      week={workout.week || ''}
                      sessions={workout.sessions}
                    />
                  </Pressable>
                );
              }
              return null;
            })}
          </View>
        )}
      </ScrollView>

      <AddWorkoutCard navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  badgeContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  workoutCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  emptyScrollContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
  },
  createButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  workoutsContainer: {
    flex: 1,
    gap: 16,
  },
  workoutCardWrapper: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
