import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStore } from '../stores/themeStore';

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Notification settings state
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [friendActivity, setFriendActivity] = useState(false);
  const [appUpdates, setAppUpdates] = useState(true);

  // Dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
    },
    header: {
      backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
    },
    title: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    card: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      borderColor: isDarkMode ? '#333333' : '#EEEEEE',
    },
    sectionTitle: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    itemText: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    descriptionText: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]} edges={['top', 'bottom']}>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.title]}>Notifications</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            Workout Notifications
          </Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, dynamicStyles.itemText]}>Workout Reminders</Text>
                <Text style={[styles.settingDescription, dynamicStyles.descriptionText]}>
                  Receive reminders for scheduled workouts
                </Text>
              </View>
              <Switch
                value={workoutReminders}
                onValueChange={setWorkoutReminders}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={workoutReminders ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, dynamicStyles.itemText]}>
                  Achievement Alerts
                </Text>
                <Text style={[styles.settingDescription, dynamicStyles.descriptionText]}>
                  Get notified when you reach fitness milestones
                </Text>
              </View>
              <Switch
                value={achievementAlerts}
                onValueChange={setAchievementAlerts}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={achievementAlerts ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>App Notifications</Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, dynamicStyles.itemText]}>Weekly Reports</Text>
                <Text style={[styles.settingDescription, dynamicStyles.descriptionText]}>
                  Receive weekly summaries of your progress
                </Text>
              </View>
              <Switch
                value={weeklyReports}
                onValueChange={setWeeklyReports}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={weeklyReports ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, dynamicStyles.itemText]}>Friend Activity</Text>
                <Text style={[styles.settingDescription, dynamicStyles.descriptionText]}>
                  Get updates when friends complete workouts
                </Text>
              </View>
              <Switch
                value={friendActivity}
                onValueChange={setFriendActivity}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={friendActivity ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, dynamicStyles.itemText]}>App Updates</Text>
                <Text style={[styles.settingDescription, dynamicStyles.descriptionText]}>
                  Receive notifications about new features and updates
                </Text>
              </View>
              <Switch
                value={appUpdates}
                onValueChange={setAppUpdates}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={appUpdates ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: 16,
  },
});
