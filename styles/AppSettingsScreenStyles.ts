import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
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
    valueText: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
  };

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
      padding: 20,
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontSize: 17,
      fontWeight: '600',
      marginBottom: 14,
      marginLeft: 4,
    },
    card: {
      borderRadius: 12,
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
      padding: 18,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },
    menuItemText: {
      fontSize: 15,
      fontWeight: '500',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 18,
    },
    settingInfo: {
      flex: 1,
      marginRight: 16,
    },
    settingHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingTitle: {
      fontSize: 15,
      fontWeight: '500',
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    valueText: {
      fontSize: 14,
      marginRight: 8,
    },
    divider: {
      height: 1,
      backgroundColor: 'rgba(0,0,0,0.1)',
      marginLeft: 16,
    },
  });

  return { styles, dynamicStyles };
};
