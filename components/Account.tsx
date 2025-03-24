import { Input } from '@rneui/themed';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { supabase } from '../lib/supabase';
import { useThemeStore } from '../stores/themeStore';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, avatar_url }: { username: string; avatar_url: string }) {
    try {
      setUpdating(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }

      Alert.alert('Profile updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setUpdating(false);
    }
  }

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#111111' : '#f5f5f5',
    },
    text: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    input: {
      color: isDarkMode ? '#ffffff' : '#000000',
      backgroundColor: isDarkMode ? '#222222' : '#ffffff',
    },
    inputLabel: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, dynamicStyles.container]}>
        <ActivityIndicator size="large" color={isDarkMode ? '#ffffff' : '#000000'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, dynamicStyles.text]}>EMAIL</Text>
        <View style={[styles.inputField, dynamicStyles.input]}>
          <Text style={[styles.inputText, dynamicStyles.text]}>{session?.user?.email}</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, dynamicStyles.text]}>USERNAME</Text>
        <View style={[styles.inputField, dynamicStyles.input]}>
          <Input
            placeholder="Enter a username"
            value={username || ''}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
            containerStyle={styles.inputContainerStyle}
            inputContainerStyle={styles.inputInnerContainerStyle}
            inputStyle={[styles.inputText, dynamicStyles.text]}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => updateProfile({ username, avatar_url: avatarUrl })}
        disabled={updating}>
        {updating ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text style={styles.updateButtonText}>Update Profile</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputField: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputText: {
    fontSize: 16,
    paddingVertical: 8,
  },
  inputContainerStyle: {
    paddingHorizontal: 0,
    marginBottom: -25,
  },
  inputInnerContainerStyle: {
    borderBottomWidth: 0,
  },
  updateButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
