import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';

import AddWorkoutForm from '../components/AddWorkoutForm';
import { useThemeStore } from '../stores/themeStore';

export default function AddWorkoutScreen() {
  const { isDarkMode } = useThemeStore();
  const navigation = useNavigation();

  // Create dynamic styles based on theme
  const dynamicStyles = {
    background: { backgroundColor: isDarkMode ? '#121212' : '#f8f9fa' },
    text: { color: isDarkMode ? '#ffffff' : '#000000' },
    iconColor: isDarkMode ? '#ffffff' : '#000000',
    backButton: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.background]}>
      <TouchableOpacity
        style={[styles.backButton, dynamicStyles.backButton]}
        onPress={() => navigation.goBack()}>
        <ArrowLeft size={24} color={dynamicStyles.iconColor} />
        <Text style={[styles.backButtonText, dynamicStyles.text]}>Back</Text>
      </TouchableOpacity>

      <AddWorkoutForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 16,
    marginTop: 16,
    marginLeft: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});
