import { useNavigation } from '@react-navigation/native';
import { Save, Camera, User, Mail, FileText, ChevronLeft } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Keyboard,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { supabase } from '../lib/supabase';
import { useProfileStore } from '../stores/profileStore';
import { useThemeStore } from '../stores/themeStore';

export default function ProfileUpdateScreen() {
  const navigation = useNavigation();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { profile, loading: profileLoading, updateProfile } = useProfileStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const loadUserData = async () => {
      // Get the current user's email from auth
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      }

      // Set profile data if available
      if (profile) {
        setName(profile.full_name || '');
        setBio(profile.bio || '');
      }
    };

    loadUserData();
  }, [profile]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsFormValid(name.trim().length > 0 && emailRegex.test(email) && bio.trim().length > 0);
  }, [name, email, bio]);

  const handleImagePicker = () => {
    Alert.alert('Profile Picture', 'Choose an option', [
      { text: 'Take Photo', onPress: () => console.log('Camera') },
      { text: 'Choose from Gallery', onPress: () => console.log('Gallery') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    if (!isFormValid) {
      Alert.alert('Invalid Input', 'Please check your information and try again.');
      return;
    }

    setIsLoading(true);
    try {
      const updatedProfile = await updateProfile({
        full_name: name,
        bio,
      });

      if (updatedProfile) {
        Alert.alert('Success', 'Your profile has been updated!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <SafeAreaView
        style={[styles.safeArea, isDarkMode && styles.darkSafeArea]}
        edges={['top', 'bottom']}>
        <View
          style={[styles.container, isDarkMode && styles.darkContainer, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, isDarkMode && styles.darkSafeArea]}
      edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ChevronLeft size={24} color={isDarkMode ? '#FFFFFF' : '#1A1A1A'} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.container, isDarkMode && styles.darkContainer]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.formWrapper}>
          <View style={styles.headerContainer}>
            <Text style={[styles.headerText, isDarkMode && styles.darkText]}>Edit Profile</Text>
            <Text style={[styles.headerSubtext, isDarkMode && styles.darkSubtext]}>
              Update your personal information
            </Text>
          </View>

          <View style={styles.profileImageSection}>
            <View style={styles.profileImageContainer}>
              <View
                style={[
                  styles.profileImagePlaceholder,
                  isDarkMode && styles.darkProfileImagePlaceholder,
                ]}>
                <User size={40} color={isDarkMode ? '#FFFFFF' : '#1A1A1A'} />
              </View>
              <TouchableOpacity
                style={[styles.cameraButton, isDarkMode && styles.darkCameraButton]}
                onPress={handleImagePicker}>
                <Camera size={16} color={isDarkMode ? '#FFFFFF' : '#1A1A1A'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, isDarkMode && styles.darkText]}>Name</Text>
              <View style={styles.inputWrapper}>
                <User
                  size={18}
                  color={isDarkMode ? '#777777' : '#888888'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.inputWithIcon, isDarkMode && styles.darkInput]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor={isDarkMode ? '#888888' : '#AAAAAA'}
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, isDarkMode && styles.darkText]}>Email</Text>
              <View style={styles.inputWrapper}>
                <Mail
                  size={18}
                  color={isDarkMode ? '#777777' : '#888888'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.inputWithIcon, isDarkMode && styles.darkInput]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={isDarkMode ? '#888888' : '#AAAAAA'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, isDarkMode && styles.darkText]}>Bio</Text>
              <View style={styles.inputWrapper}>
                <FileText
                  size={18}
                  color={isDarkMode ? '#777777' : '#888888'}
                  style={[styles.inputIcon, { top: 14 }]}
                />
                <TextInput
                  style={[
                    styles.input,
                    styles.bioInput,
                    styles.inputWithIcon,
                    isDarkMode && styles.darkInput,
                  ]}
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Tell us about yourself"
                  placeholderTextColor={isDarkMode ? '#888888' : '#AAAAAA'}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.infoText, isDarkMode && styles.darkInfoText]}>
                Your profile information will be visible to other users in the community.
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.submitButton, isDarkMode && styles.darkSubmitButton]}
                onPress={handleSave}
                disabled={!isFormValid || isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <View style={styles.saveButtonContent}>
                    <Save size={18} color="#FFFFFF" />
                    <Text style={styles.submitButtonText}>Save Profile</Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkSafeArea: {
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  headerSubtext: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 4,
    textAlign: 'center',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSubtext: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkProfileImagePlaceholder: {
    backgroundColor: '#2A2A2A',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  darkCameraButton: {
    backgroundColor: '#2A2A2A',
    borderColor: '#3A3A3A',
  },
  formContainer: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    width: '100%',
  },
  inputWithIcon: {
    paddingLeft: 42,
  },
  darkInput: {
    backgroundColor: '#2A2A2A',
    borderColor: '#3A3A3A',
    color: '#FFFFFF',
  },
  bioInput: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  infoContainer: {
    marginTop: 8,
    marginBottom: 24,
    width: '100%',
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
  },
  darkInfoText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 32,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkSubmitButton: {
    backgroundColor: '#1A1A1A',
  },
  saveButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: -0.3,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
