import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
    },
    header: {
      backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
      borderBottomColor: isDarkMode ? '#333333' : 'rgba(0,0,0,0.1)',
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
    buttonText: {
      color: isDarkMode ? '#4CAF50' : '#4CAF50',
    },
    divider: {
      backgroundColor: isDarkMode ? '#333333' : 'rgba(0,0,0,0.1)',
    },
    iconBackground: {
      backgroundColor: isDarkMode ? '#333' : '#F0F0F0',
    },
    iconColor: {
      color: isDarkMode ? '#FFF' : '#000',
    },
    chevronColor: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
  };

  return {
    dynamicStyles,
    styles: StyleSheet.create({
      container: {
        flex: 1,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
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
      settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
      },
      settingInfo: {
        flex: 1,
        marginRight: 16,
      },
      settingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
      },
      settingTitle: {
        fontSize: 15,
        fontWeight: '500',
      },
      settingDescription: {
        fontSize: 14,
        opacity: 0.7,
        marginLeft: 44,
      },
      divider: {
        height: 1,
        marginLeft: 16,
      },
      privacyPolicyButton: {
        alignItems: 'center',
        padding: 16,
        marginBottom: 24,
      },
      privacyPolicyText: {
        fontSize: 16,
        fontWeight: '500',
      },
      dangerText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#D32F2F',
      },
      dangerIconContainer: {
        backgroundColor: '#FFEBEE',
      },
      dangerIcon: {
        color: '#D32F2F',
      },
    }),
  };
};
