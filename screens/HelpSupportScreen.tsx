import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MessageCircle,
  Mail,
  FileText,
  Star,
} from 'lucide-react-native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStore } from '../stores/themeStore';

export default function HelpSupportScreen() {
  const navigation = useNavigation();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
    },
    header: {
      backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
    },
    title: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    card: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      borderColor: isDarkMode ? '#333333' : '#EEEEEE',
    },
    sectionTitle: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    itemText: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    descriptionText: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
  };

  const openEmail = () => {
    Linking.openURL('mailto:support@overloadapp.com?subject=Help%20Request');
  };

  const openRateApp = () => {
    // This would open the app store page in a real app
    Alert.alert('Rate Our App', 'This would open the app store in a real app.', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]} edges={['top', 'bottom']}>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.title]}>Help & Support</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Support Options</Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                  ]}>
                  <HelpCircle size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>FAQs</Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                  ]}>
                  <MessageCircle size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>Live Chat</Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={openEmail}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                  ]}>
                  <Mail size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>Email Support</Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Help Resources</Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                  ]}>
                  <FileText size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>User Guide</Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                  ]}>
                  <FileText size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>Video Tutorials</Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                  ]}>
                  <HelpCircle size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>Workout Tips</Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Feedback</Text>

          <View style={[styles.card, dynamicStyles.card]}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                  ]}>
                  <MessageCircle size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>Send Feedback</Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={openRateApp}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' },
                  ]}>
                  <Star size={16} color={isDarkMode ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.menuItemText, dynamicStyles.itemText]}>Rate Our App</Text>
              </View>
              <ChevronRight size={14} color={isDarkMode ? '#BBBBBB' : '#666666'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.supportInfo}>
          <Text style={[styles.supportInfoTitle, dynamicStyles.itemText]}>
            Need immediate help?
          </Text>
          <Text style={[styles.supportInfoText, dynamicStyles.descriptionText]}>
            Our support team is available Monday-Friday, 9am-5pm EST.
          </Text>
          <TouchableOpacity style={styles.contactButton} onPress={openEmail}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: 16,
  },
  supportInfo: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  supportInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  supportInfoText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
