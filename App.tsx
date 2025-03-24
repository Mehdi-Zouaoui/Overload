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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AddWorkoutScreen from 'screens/AddWorkoutScreen';
import ProfileScreen from 'screens/ProfileScreen';
import ProgressScreen from 'screens/ProgressScreen';
import Test from 'screens/Test';

import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { SessionProvider } from './context/SessionProvider';
import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LogInScreen';
import { useThemeStore } from './stores/themeStore';

type RootStackParamList = {
  MainTabs: undefined;
  Details: { id: string };
  AddWorkout: undefined;
  Test: undefined;
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
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'barbell' : 'barbell-outline';
            } else if (route.name === 'Progress') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: isDarkMode ? '#FFFFFF' : '#000000',
          tabBarInactiveTintColor: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
            borderTopColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            elevation: 0,
            shadowOpacity: 0,
            height: 70,
            paddingTop: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerShown: false,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => <ThemeToggle />,
            headerTitle: 'Overload',
          }}
        />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Profile">{() => session && <ProfileScreen />}</Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const queryClient = new QueryClient();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Define the status bar color - you can change these values to any color you want
  const statusBarColor = isDarkMode ? '#121212' : '#f5f5f5'; // Example: slightly different shade

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaProvider style={{ backgroundColor: statusBarColor }}>
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
                        name="AddWorkout"
                        component={AddWorkoutScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
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
