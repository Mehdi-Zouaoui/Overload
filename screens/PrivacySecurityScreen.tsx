import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ChevronRight, Lock, Eye, Database } from 'lucide-react-native';
import { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import i18n from '../i18n';
import { useThemeStore } from '../stores/themeStore';
import { createStyles } from '../styles/PrivacySecurityScreenStyles';

export default function PrivacySecurityScreen() {
  const navigation = useNavigation();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { styles, dynamicStyles } = createStyles(isDarkMode);

  // Privacy settings state
  const [activityVisible, setActivityVisible] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);
  const [dataCollection, setDataCollection] = useState(true);

  const showPasswordChangeAlert = () => {
    Alert.alert(
      i18n.t('privacySecurityScreen.accountSecurity.passwordAlertTitle'),
      i18n.t('privacySecurityScreen.accountSecurity.passwordAlertMessage'),
      [
        {
          text: i18n.t('privacySecurityScreen.accountSecurity.okButton'),
          onPress: () => console.log('OK Pressed'),
        },
      ]
    );
  };

  const showDataDeletionAlert = () => {
    Alert.alert(
      i18n.t('privacySecurityScreen.dataManagement.deleteAlertTitle'),
      i18n.t('privacySecurityScreen.dataManagement.deleteAlertMessage'),
      [
        { text: i18n.t('privacySecurityScreen.dataManagement.cancelButton'), style: 'cancel' },
        {
          text: i18n.t('privacySecurityScreen.dataManagement.deleteButton'),
          style: 'destructive',
          onPress: () => console.log('Delete Pressed'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]} edges={['top', 'bottom']}>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.title]}>
          {i18n.t('privacySecurityScreen.title')}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            {i18n.t('privacySecurityScreen.accountSecurity.sectionTitle')}
          </Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <TouchableOpacity style={styles.menuItem} onPress={showPasswordChangeAlert}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, dynamicStyles.iconBackground]}>
                  <Lock size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>
                  {i18n.t('privacySecurityScreen.accountSecurity.changePassword')}
                </Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>

            <View style={[styles.divider, dynamicStyles.divider]} />

            {/* Two-factor authentication option removed */}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            {i18n.t('privacySecurityScreen.privacySettings.sectionTitle')}
          </Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.settingHeader}>
                  <View style={[styles.iconContainer, dynamicStyles.iconBackground]}>
                    <Eye size={16} color={isDarkMode ? '#FFF' : '#000'} />
                  </View>
                  <Text style={[styles.settingTitle, dynamicStyles.itemText]}>
                    {i18n.t('privacySecurityScreen.privacySettings.activityVisibility')}
                  </Text>
                </View>
                <Text style={[styles.settingDescription, dynamicStyles.descriptionText]}>
                  {i18n.t('privacySecurityScreen.privacySettings.activityDescription')}
                </Text>
              </View>
              <Switch
                value={activityVisible}
                onValueChange={setActivityVisible}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={activityVisible ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>

            <View style={[styles.divider, dynamicStyles.divider]} />

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.settingHeader}>
                  <View style={[styles.iconContainer, dynamicStyles.iconBackground]}>
                    <Database size={16} color={isDarkMode ? '#FFF' : '#000'} />
                  </View>
                  <Text style={[styles.settingTitle, dynamicStyles.itemText]}>
                    {i18n.t('privacySecurityScreen.privacySettings.dataCollection')}
                  </Text>
                </View>
                <Text style={[styles.settingDescription, dynamicStyles.descriptionText]}>
                  {i18n.t('privacySecurityScreen.privacySettings.dataCollectionDescription')}
                </Text>
              </View>
              <Switch
                value={dataCollection}
                onValueChange={setDataCollection}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={dataCollection ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            {i18n.t('privacySecurityScreen.dataManagement.sectionTitle')}
          </Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, dynamicStyles.iconBackground]}>
                  <Database size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>
                  {i18n.t('privacySecurityScreen.dataManagement.exportData')}
                </Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>

            <View style={[styles.divider, dynamicStyles.divider]} />

            <TouchableOpacity style={styles.menuItem} onPress={showDataDeletionAlert}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, styles.dangerIconContainer]}>
                  <Database size={16} color="#D32F2F" />
                </View>
                <Text style={styles.dangerText}>
                  {i18n.t('privacySecurityScreen.dataManagement.deleteData')}
                </Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.privacyPolicyButton}>
          <Text style={[styles.privacyPolicyText, dynamicStyles.buttonText]}>
            {i18n.t('privacySecurityScreen.viewPrivacyPolicy')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
