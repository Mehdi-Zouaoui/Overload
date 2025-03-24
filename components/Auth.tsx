import { Button, Input } from '@rneui/themed';
import { Mail, Lock } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, StyleSheet, View, AppState } from 'react-native';

import { supabase } from '../lib/supabase';

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

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Input
          label="Email"
          leftIcon={<Mail size={20} color="#666" style={styles.inputIcon} />}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          inputStyle={styles.inputText}
          labelStyle={styles.inputLabel}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputInnerContainer}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Input
          label="Password"
          leftIcon={<Lock size={20} color="#666" style={styles.inputIcon} />}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          inputStyle={styles.inputText}
          labelStyle={styles.inputLabel}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputInnerContainer}
          placeholderTextColor="#999"
        />
      </View>

      <View style={[styles.buttonContainer]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={signInWithEmail}
          buttonStyle={styles.primaryButton}
          titleStyle={styles.primaryButtonTitle}
          disabledStyle={styles.disabledButton}
          disabledTitleStyle={styles.disabledButtonTitle}
          loading={loading}
          loadingProps={{ color: '#fff' }}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
          buttonStyle={styles.secondaryButton}
          titleStyle={styles.buttonTitle}
          disabledStyle={styles.disabledButton}
          disabledTitleStyle={styles.disabledButtonTitle}
          loading={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  inputInnerContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#333333',
    paddingVertical: 10,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputLabel: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputText: {
    color: '#000000',
    fontSize: 16,
    paddingVertical: 6,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.75,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 16,
    paddingVertical: 14,
  },
  buttonTitle: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.75,
  },
  disabledButton: {
    backgroundColor: '#E5E5E5',
    opacity: 0.7,
  },
  disabledButtonTitle: {
    color: '#666666',
  },
  verticallySpaced: {
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'stretch',
  },
});
