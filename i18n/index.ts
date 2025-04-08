import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';
import { I18nManager } from 'react-native';

// Import translations
import en from './translations/en';
import es from './translations/es';
import fr from './translations/fr';

// Create a new i18n instance
const i18n = new I18n({
  en,
  es,
  fr,
});

// Set default locale and fallback
i18n.defaultLocale = 'fr';
i18n.enableFallback = true;

// Function to initialize language from storage
export const initLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('userLanguage');
    if (savedLanguage) {
      i18n.locale = savedLanguage;
      // Handle RTL languages if needed
      I18nManager.forceRTL(['ar', 'he'].includes(savedLanguage));
    } else {
      i18n.locale = 'fr'; // Default to French
    }
  } catch (error) {
    console.error('Error loading language preference:', error);
    i18n.locale = 'fr'; // Default to French on error
  }
};

// Function to change language
export const changeLanguage = async (language: string) => {
  try {
    i18n.locale = language;
    await AsyncStorage.setItem('userLanguage', language);
    // Handle RTL languages if needed
    I18nManager.forceRTL(['ar', 'he'].includes(language));
    return true;
  } catch (error) {
    console.error('Error saving language preference:', error);
    return false;
  }
};

export default i18n;
