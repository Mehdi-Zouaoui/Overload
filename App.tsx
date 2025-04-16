import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { supabase } from 'lib/supabase';
import { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfileScreen from 'screens/ProfileScreen';
import ProfileUpdateScreen from 'screens/ProfileUpdateScreen';
import ProgressScreen from 'screens/ProgressScreen';
import WorkoutFormScreen from 'screens/WorkoutFormScreen';

import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { SessionProvider } from './context/SessionProvider';
import { initLanguage } from './i18n';
import AppSettingsScreen from './screens/AppSettingsScreen';
import DetailsScreen from './screens/DetailsScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LogInScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import PrivacySecurityScreen from './screens/PrivacySecurityScreen';
import { useProfileStore } from './stores/profileStore';
import { useThemeStore } from './stores/themeStore';

import { Platform } from 'react-native';

type RootStackParamList = {
  MainTabs: undefined;
  Details: { id: string };
  AddWorkout: undefined;
  EditWorkout: undefined;
  WorkoutForm: { mode?: 'add' | 'edit'; id?: string }; // Add this line
  ProfileUpdate: undefined;
  AppSettings: undefined;
  HelpSupport: undefined;
  Notifications: undefined;
  PrivacySecurity: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#FFFFFF' : '#000000',
        tabBarInactiveTintColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
          borderTopColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          borderTopWidth: 0.5,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'android' ? 60 : 80,

          paddingTop: Platform.OS === 'android' ? 0 : 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          letterSpacing: -0.2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        headerShown: false,
        headerStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0.5,
          borderBottomColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
          letterSpacing: -0.5,
        },
        headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => <ThemeToggle />,
          headerTitle: 'Overload',
          headerRightContainerStyle: { paddingRight: 16 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'barbell' : 'barbell-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
          ),
        }}>
        {() => session && <ProfileScreen />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const queryClient = new QueryClient();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const initializeProfile = useProfileStore((state) => state.initialize);

  // Define the status bar color - you can change these values to any color you want
  const statusBarColor = isDarkMode ? '#121212' : '#f5f5f5'; // Example: slightly different shade

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Initialize the profile store when the app starts
    initializeProfile();

    // Initialize language settings
    initLanguage();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} backgroundColor={statusBarColor} />
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <SessionProvider session={session}>
              <ThemeProvider>
                <BottomSheetModalProvider>
                  {session && session.user ? (
                    <Stack.Navigator
                      screenOptions={{
                        headerShown: false,
                        contentStyle: {
                          backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
                        },
                      }}>
                      <Stack.Screen
                        name="MainTabs"
                        component={MainTabs}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="Details"
                        component={DetailsScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="ProfileUpdate"
                        component={ProfileUpdateScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="AddWorkout"
                        component={WorkoutFormScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="WorkoutForm"
                        component={WorkoutFormScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="AppSettings"
                        component={AppSettingsScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="HelpSupport"
                        component={HelpSupportScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="Notifications"
                        component={NotificationsScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="PrivacySecurity"
                        component={PrivacySecurityScreen}
                        options={{ headerShown: false }}
                      />
                    </Stack.Navigator>
                  ) : (
                    <LoginScreen />
                  )}
                </BottomSheetModalProvider>
              </ThemeProvider>
            </SessionProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
