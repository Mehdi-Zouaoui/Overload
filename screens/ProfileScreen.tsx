import { useNavigation } from '@react-navigation/native';
import { useSession } from 'context/SessionProvider';
import { User, Settings, LogOut, Moon, Sun, ChevronRight } from 'lucide-react-native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

import { supabase } from '../lib/supabase';
import { useThemeStore } from '../stores/themeStore';

export default function ProfileScreen() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const navigation = useNavigation();
  const { session } = useSession();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigation.navigate('Login' as never);
  };

  const theme = {
    colors: {
      background: isDarkMode ? '#121212' : '#FFFFFF',
      card: isDarkMode ? '#1E1E1E' : '#F5F5F5',
      text: isDarkMode ? '#FFFFFF' : '#000000',
      textSecondary: isDarkMode ? '#BBBBBB' : '#555555',
      accent: isDarkMode ? '#FFFFFF' : '#000000',
      border: isDarkMode ? '#333333' : '#E0E0E0',
      icon: isDarkMode ? '#FFFFFF' : '#000000',
      danger: isDarkMode ? '#FFFFFF' : '#000000',
      toggle: {
        track: isDarkMode ? '#555555' : '#CCCCCC',
        thumb: isDarkMode ? '#FFFFFF' : '#000000',
      },
    },
    spacing: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32,
    },
    radius: {
      sm: 8,
      md: 12,
      lg: 16,
      full: 9999,
    },
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: session?.user?.user_metadata?.avatar_url || 'https://via.placeholder.com/100',
            }}
            style={[styles.avatar, { borderColor: theme.colors.accent }]}
          />
        </View>

        <Text style={[styles.userName, { color: theme.colors.text }]}>
          {session?.user?.user_metadata?.full_name || 'User Name'}
        </Text>

        <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
          {session?.user?.email || 'email@example.com'}
        </Text>

        <TouchableOpacity
          style={[styles.editProfileButton, { backgroundColor: theme.colors.accent }]}
          activeOpacity={0.8}>
          <Text style={[styles.editProfileText, { color: isDarkMode ? '#000000' : '#FFFFFF' }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Settings</Text>

        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
              <User size={20} color={theme.colors.icon} />
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                Personal Information
              </Text>
            </View>
            <ChevronRight size={18} color={theme.colors.icon} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
              <Settings size={20} color={theme.colors.icon} />
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>Preferences</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.icon} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <TouchableOpacity style={styles.menuItem} onPress={toggleTheme} activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
              {isDarkMode ? (
                <Sun size={20} color={theme.colors.icon} />
              ) : (
                <Moon size={20} color={theme.colors.icon} />
              )}
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Text>
            </View>
            <View style={[styles.toggle, { backgroundColor: theme.colors.toggle.track }]}>
              <View
                style={[
                  styles.toggleThumb,
                  { backgroundColor: theme.colors.toggle.thumb },
                  isDarkMode && styles.toggleThumbActive,
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Account</Text>

        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <TouchableOpacity style={styles.menuItem} onPress={signOut} activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
              <LogOut size={20} color={theme.colors.danger} />
              <Text style={[styles.menuItemText, { color: theme.colors.danger }]}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 24,
  },
  editProfileButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  editProfileText: {
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    transform: [{ translateX: 22 }],
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
  },
});
