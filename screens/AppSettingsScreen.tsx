import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Moon, Globe, Smartphone, Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import i18n from '../i18n';
import { useThemeStore } from '../stores/themeStore';
import { createStyles } from '../styles/AppSettingsScreenStyles';

export default function AppSettingsScreen() {
  const navigation = useNavigation();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  // App settings state
  const [soundEffects, setSoundEffects] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [language, setLanguage] = useState('English');
  const [units, setUnits] = useState('Imperial (lbs)');

  // Get styles based on theme
  const { styles, dynamicStyles } = createStyles(isDarkMode);

  const showLanguageSelector = () => {
    Alert.alert(
      i18n.t('appSettings.languageSelector.title'),
      i18n.t('appSettings.languageSelector.message'),
      [
        {
          text: i18n.t('appSettings.languageSelector.english'),
          onPress: () => setLanguage(i18n.t('appSettings.languageSelector.english')),
        },
        {
          text: i18n.t('appSettings.languageSelector.spanish'),
          onPress: () => setLanguage(i18n.t('appSettings.languageSelector.spanish')),
        },
        {
          text: i18n.t('appSettings.languageSelector.french'),
          onPress: () => setLanguage(i18n.t('appSettings.languageSelector.french')),
        },
        {
          text: i18n.t('appSettings.languageSelector.german'),
          onPress: () => setLanguage(i18n.t('appSettings.languageSelector.german')),
        },
        { text: i18n.t('common.cancel'), style: 'cancel' },
      ]
    );
  };

  const showUnitSelector = () => {
    Alert.alert(
      i18n.t('appSettings.unitSelector.title'),
      i18n.t('appSettings.unitSelector.message'),
      [
        {
          text: i18n.t('appSettings.unitSelector.imperial'),
          onPress: () => setUnits(i18n.t('appSettings.unitSelector.imperial')),
        },
        {
          text: i18n.t('appSettings.unitSelector.metric'),
          onPress: () => setUnits(i18n.t('appSettings.unitSelector.metric')),
        },
        { text: i18n.t('common.cancel'), style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]} edges={['top', 'bottom']}>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.title]}>{i18n.t('appSettings.title')}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            {i18n.t('appSettings.sections.appearance')}
          </Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.settingHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                    ]}>
                    <Moon size={16} color={isDarkMode ? '#FFF' : '#000'} />
                  </View>
                  <Text style={[styles.settingTitle, dynamicStyles.itemText]}>
                    {i18n.t('appSettings.darkMode')}
                  </Text>
                </View>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={isDarkMode ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={showLanguageSelector}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                  ]}>
                  <Globe size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>
                  {i18n.t('appSettings.language')}
                </Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={[styles.valueText, dynamicStyles.valueText]}>{language}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            {i18n.t('appSettings.sections.workout')}
          </Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <TouchableOpacity style={styles.menuItem} onPress={showUnitSelector}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                  ]}>
                  <Smartphone size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>
                  {i18n.t('appSettings.weightUnits')}
                </Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={[styles.valueText, dynamicStyles.valueText]}>{units}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            {i18n.t('appSettings.sections.soundHaptics')}
          </Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.settingHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                    ]}>
                    <Volume2 size={16} color={isDarkMode ? '#FFF' : '#000'} />
                  </View>
                  <Text style={[styles.settingTitle, dynamicStyles.itemText]}>
                    {i18n.t('appSettings.soundEffects')}
                  </Text>
                </View>
              </View>
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={soundEffects ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.settingHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                    ]}>
                    <Smartphone size={16} color={isDarkMode ? '#FFF' : '#000'} />
                  </View>
                  <Text style={[styles.settingTitle, dynamicStyles.itemText]}>
                    {i18n.t('appSettings.hapticFeedback')}
                  </Text>
                </View>
              </View>
              <Switch
                value={hapticFeedback}
                onValueChange={setHapticFeedback}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={hapticFeedback ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
