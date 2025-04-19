import { useNavigation } from '@react-navigation/native';
import { useSession } from 'context/SessionProvider';
import {
  Settings,
  LogOut,
  Shield,
  ChevronRight,
  Activity,
  Calendar,
  Edit2,
} from 'lucide-react-native';
import { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import DefaultProfileImage from '../assets/default_profile.png';
import i18n from '../i18n';
import { supabase } from '../lib/supabase';
import { useProfileStore } from '../stores/profileStore';
import { useThemeStore } from '../stores/themeStore';
import { createStyles } from '../styles/ProfileScreenStyles';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { session } = useSession();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { profile, loading: profileLoading, fetchProfile } = useProfileStore();

  const { styles, dynamicStyles } = createStyles(isDarkMode);

  // Add useEffect to refetch profile data when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Refetch profile when screen comes into focus
      fetchProfile();
    });

    // Initial fetch if profile is null
    if (!profile) {
      fetchProfile();
    }

    return unsubscribe;
  }, [navigation, fetchProfile, profile]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Get current date for display
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Use profile data if available, otherwise fallback to mock data
  const userStats = profile?.stats || {
    workoutsCompleted: 12,
    daysActive: 8,
    totalSets: 145,
    lastWorkout: '2 days ago',
  };

  // Function to format the date nicely
  const formatMemberSinceDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Show loading indicator while profile is loading
  if (profileLoading) {
    return (
      <View style={[styles.container, dynamicStyles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={isDarkMode ? '#FFFFFF' : '#000000'} />
      </View>
    );
  }

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Date Display */}
        <View style={styles.dateContainer}>
          <Text style={[styles.dateText, dynamicStyles.dateText]}>{formattedDate}</Text>
        </View>

        {/* Profile Header */}
        <View style={[styles.header, dynamicStyles.header]}>
          <View style={styles.profileSection}>
            <Image
              source={
                profile?.avatar_url
                  ? { uri: profile.avatar_url }
                  : session?.user?.user_metadata?.avatar_url
                    ? { uri: session.user.user_metadata.avatar_url }
                    : DefaultProfileImage
              }
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={[styles.userName, dynamicStyles.userName]}>
                {profile?.full_name ||
                  session?.user?.user_metadata?.full_name ||
                  i18n.t('profileScreen.defaultName')}
              </Text>
              <Text style={[styles.userEmail, dynamicStyles.userEmail]}>
                {session?.user?.email || 'email@example.com'}
              </Text>
              <View style={styles.userMeta}>
                <View style={styles.metaItem}>
                  <Calendar
                    size={12}
                    color={isDarkMode ? '#BBBBBB' : '#666666'}
                    style={styles.metaIcon}
                  />
                  <Text style={[styles.metaText, dynamicStyles.userEmail]}>
                    {i18n.t('profileScreen.memberSince')}{' '}
                    {session?.user?.created_at
                      ? formatMemberSinceDate(session.user.created_at)
                      : 'N/A'}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.editProfileButton, dynamicStyles.editProfileButton]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ProfileUpdate' as never)}>
              <Edit2 size={16} color={dynamicStyles.editProfileIconColor.color} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, dynamicStyles.card]}>
            <View style={styles.statHeader}>
              <Activity size={16} color={dynamicStyles.userName.color} />
              <Text style={[styles.statValue, dynamicStyles.userName, { marginLeft: 8 }]}>
                {userStats.workoutsCompleted}
              </Text>
            </View>
            <View style={styles.statContent}>
              <Text style={[styles.statLabel, dynamicStyles.userEmail]}>
                {i18n.t('profileScreen.workouts')}
              </Text>
              <Text style={[styles.statDetail, dynamicStyles.userEmail]}>
                {userStats.totalSets} {i18n.t('profileScreen.setsCompleted')}
              </Text>
            </View>
          </View>

          <View style={[styles.statCard, dynamicStyles.card]}>
            <View style={styles.statHeader}>
              <Calendar size={16} color={dynamicStyles.userName.color} />
              <Text style={[styles.statValue, dynamicStyles.userName, { marginLeft: 8 }]}>
                {userStats.daysActive}
              </Text>
            </View>
            <View style={styles.statContent}>
              <Text style={[styles.statLabel, dynamicStyles.userEmail]}>
                {i18n.t('profileScreen.daysActive')}
              </Text>
              <Text style={[styles.statDetail, dynamicStyles.userEmail]}>
                {i18n.t('profileScreen.lastWorkout')}: {userStats.lastWorkout}
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.sectionsContainer}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
              {i18n.t('profileScreen.account')}
            </Text>

            <View style={[styles.card, dynamicStyles.card]}>
              <View style={[styles.divider, dynamicStyles.divider]} />

              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.6}
                onPress={() => navigation.navigate('PrivacySecurity' as never)}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, dynamicStyles.iconBackground]}>
                    <Shield size={16} color={dynamicStyles.iconColor.color} />
                  </View>
                  <Text style={[styles.menuItemText, dynamicStyles.menuItemText]}>
                    {i18n.t('profileScreen.privacySecurity')}
                  </Text>
                </View>
                <ChevronRight size={14} color={dynamicStyles.chevronColor.color} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
              {i18n.t('profileScreen.preferences')}
            </Text>

            <View style={[styles.card, dynamicStyles.card]}>
              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.6}
                onPress={() => navigation.navigate('AppSettings' as never)}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, dynamicStyles.iconBackground]}>
                    <Settings size={16} color={dynamicStyles.iconColor.color} />
                  </View>
                  <Text style={[styles.menuItemText, dynamicStyles.menuItemText]}>
                    {i18n.t('profileScreen.appSettings')}
                  </Text>
                </View>
                <ChevronRight size={14} color={dynamicStyles.chevronColor.color} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.signOutButton, dynamicStyles.signOutButton]}
            activeOpacity={0.7}
            onPress={signOut}>
            <View style={styles.buttonContent}>
              <LogOut size={16} color={dynamicStyles.signOutText.color} style={styles.buttonIcon} />
              <Text style={[styles.signOutText, dynamicStyles.signOutText]}>
                {i18n.t('profileScreen.signOut')}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={[styles.versionText, dynamicStyles.versionText]}>
              {i18n.t('profileScreen.version')} 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
