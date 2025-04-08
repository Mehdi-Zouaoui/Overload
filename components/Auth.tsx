import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import {
  Alert,
  View,
  AppState,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import i18n from '../i18n';
import { supabase } from '../lib/supabase';
import { styles } from '../styles/AuthStyles';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

interface AuthProps {
  onAuthModeChange?: (mode: 'signin' | 'signup') => void;
  onEmailChange?: (email: string) => void;
}

export default function Auth({ onAuthModeChange, onEmailChange }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    // Validate inputs
    if (!fullName.trim()) {
      Alert.alert(i18n.t('auth.fullNameRequired'));
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(i18n.t('auth.passwordsDoNotMatch'));
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      Alert.alert(i18n.t('auth.passwordTooShort'));
      setLoading(false);
      return;
    }

    setLoading(true);
    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert(i18n.t('auth.checkInbox'));
    setLoading(false);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthMode = () => {
    const newMode = !isSignUp;
    setIsSignUp(newMode);
    // Notify parent component about the mode change
    if (onAuthModeChange) {
      onAuthModeChange(newMode ? 'signup' : 'signin');
    }

    // Reset fields when switching modes
    if (!isSignUp) {
      setFullName('');
      setConfirmPassword('');
    }
  };

  // Call onAuthModeChange on initial render
  useEffect(() => {
    if (onAuthModeChange) {
      onAuthModeChange(isSignUp ? 'signup' : 'signin');
    }
  }, []);

  // Update email and notify parent
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (onEmailChange) {
      onEmailChange(value);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            {isSignUp && (
              <>
                <Text style={styles.inputLabel}>{i18n.t('auth.fullName')}</Text>
                <View style={styles.inputContainer}>
                  <User size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    onChangeText={setFullName}
                    value={fullName}
                    placeholder={i18n.t('auth.fullNamePlaceholder')}
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                  />
                </View>
              </>
            )}

            <Text style={styles.inputLabel}>{i18n.t('auth.email')}</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                onChangeText={handleEmailChange}
                value={email}
                placeholder={i18n.t('auth.emailPlaceholder')}
                placeholderTextColor="#999"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <Text style={styles.inputLabel}>{i18n.t('auth.password')}</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder={i18n.t('auth.passwordPlaceholder')}
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                {showPassword ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
              </TouchableOpacity>
            </View>

            {isSignUp && (
              <>
                <Text style={styles.inputLabel}>{i18n.t('auth.confirmPassword')}</Text>
                <View style={styles.inputContainer}>
                  <Lock size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholder={i18n.t('auth.confirmPasswordPlaceholder')}
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                </View>
              </>
            )}
          </View>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={isSignUp ? signUpWithEmail : signInWithEmail}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.signInButtonText}>
                  {isSignUp ? i18n.t('auth.signUp') : i18n.t('auth.signIn')}
                </Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.switchModeContainer}>
            <Text style={styles.switchModeText}>
              {isSignUp ? i18n.t('auth.alreadyHaveAccount') : i18n.t('auth.dontHaveAccount')}
            </Text>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={styles.switchModeButton}>
                {isSignUp ? i18n.t('auth.signIn') : i18n.t('auth.signUp')}
              </Text>
            </TouchableOpacity>
          </View>

          {isSignUp && (
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                {i18n.t('auth.bySigningUp')}
                <Text style={styles.termsLink}> {i18n.t('auth.termsOfService')}</Text>
                {i18n.t('auth.and')}
                <Text style={styles.termsLink}> {i18n.t('auth.privacyPolicy')}</Text>
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
