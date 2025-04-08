import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Lock } from 'lucide-react-native';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';

import Auth from '../components/Auth';
import i18n from '../i18n';
import { supabase } from '../lib/supabase';
import { useThemeStore } from '../stores/themeStore';
import { styles } from '../styles/LogInScreenStyle';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Listen for auth mode changes from the Auth component
  const handleAuthModeChange = (mode: 'signin' | 'signup') => {
    setIsSignUp(mode === 'signup');
  };

  // Get email from Auth component
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert(i18n.t('loginScreen.emailRequired'));
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'yourapp://reset-password',
      });

      if (error) {
        Alert.alert(i18n.t('loginScreen.resetPasswordError'), error.message);
      } else {
        Alert.alert(
          i18n.t('loginScreen.resetPasswordSent'),
          i18n.t('loginScreen.resetPasswordInstructions')
        );
      }
    } catch (error: any) {
      Alert.alert(i18n.t('loginScreen.resetPasswordError'), error.message || String(error));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Image
                  source={require('../assets/white_logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.appName}>{i18n.t('loginScreen.appName')}</Text>
            <Text style={styles.title}>
              {isSignUp ? i18n.t('loginScreen.joinUs') : i18n.t('loginScreen.welcomeBack')}
            </Text>
            <Text style={styles.subtitle}>
              {isSignUp ? i18n.t('loginScreen.signUpTagline') : i18n.t('loginScreen.tagline')}
            </Text>
          </View>

          <View style={styles.authContainer}>
            <Auth onAuthModeChange={handleAuthModeChange} onEmailChange={handleEmailChange} />
          </View>

          {!isSignUp && (
            <View style={styles.footerContainer}>
              <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
                <Lock size={16} color="#000" style={styles.lockIcon} />
                <Text style={styles.forgotPasswordText}>
                  {i18n.t('loginScreen.forgotPassword')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.motivationContainer}>
            <Text style={styles.motivationText}>{i18n.t('loginScreen.motivationalQuote')}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
