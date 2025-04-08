import { StyleSheet, Platform } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
  // Color palette - matching AppSettingsScreenStyles
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
    userName: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    userEmail: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
    menuItemText: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    valueText: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
    divider: {
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    },
    dateText: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
    versionText: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
    iconBackground: {
      backgroundColor: isDarkMode ? '#2A2A2A' : '#F5F5F5',
    },
    iconColor: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    chevronColor: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
    editProfileButton: {
      backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
      borderColor: isDarkMode ? '#FFFFFF' : '#000000',
    },
    editProfileText: {
      color: isDarkMode ? '#000000' : '#FFFFFF',
    },
    editProfileIconColor: {
      color: isDarkMode ? '#000000' : '#FFFFFF',
    },
    signOutButton: {
      backgroundColor: 'transparent',
      borderColor: isDarkMode ? '#FF5555' : '#FF0000',
    },
    signOutText: {
      color: isDarkMode ? '#FF5555' : '#FF0000',
    },
    statValue: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    statLabel: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    statDetail: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
    metaText: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
    badge: {
      backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
      color: isDarkMode ? '#000000' : '#FFFFFF',
    },
    tabActive: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
      borderColor: isDarkMode ? '#FFFFFF' : '#000000',
    },
    tabInactive: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
      borderColor: 'transparent',
    },
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? 50 : 30,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      flexGrow: 1,
      paddingBottom: 30,
    },
    dateContainer: {
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 8,
    },
    dateText: {
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.1,
      textTransform: 'uppercase',
    },
    header: {
      padding: 20,
      borderBottomWidth: 2,
      borderBottomColor: 'rgba(0,0,0,0.1)',
      marginBottom: 16,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 16,
      marginRight: 16,
    },
    profileInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: '800',
      marginBottom: 4,
      letterSpacing: -0.3,
      textTransform: 'uppercase',
    },
    userEmail: {
      fontSize: 14,
      marginBottom: 8,
    },
    userMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
      marginBottom: 4,
    },
    metaIcon: {
      marginRight: 4,
    },
    metaText: {
      fontSize: 12,
    },
    editProfileButton: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      width: 48,
      height: 48,
      borderWidth: 2,
    },
    editProfileText: {
      fontSize: 14,
      fontWeight: '700',
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    statCard: {
      flex: 1,
      borderRadius: 8,
      padding: 16,
      marginHorizontal: 8,
      borderWidth: 2,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    statHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    statValue: {
      fontSize: 24,
      fontWeight: '800',
    },
    statContent: {},
    statLabel: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: -0.3,
    },
    statDetail: {
      fontSize: 12,
      lineHeight: 16,
    },
    sectionsContainer: {
      paddingHorizontal: 20,
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontSize: 17,
      fontWeight: '800',
      marginBottom: 14,
      marginLeft: 4,
      textTransform: 'uppercase',
      letterSpacing: -0.3,
    },
    card: {
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 2,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    divider: {
      height: 1,
      width: '100%',
      marginLeft: 16,
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
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
    menuItemText: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    signOutButton: {
      marginHorizontal: 20,
      marginTop: 16,
      marginBottom: 24,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      backgroundColor: 'transparent',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonIcon: {
      marginRight: 10,
    },
    signOutText: {
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    footer: {
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    versionText: {
      fontSize: 12,
      textAlign: 'center',
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
      fontSize: 12,
      fontWeight: '600',
      overflow: 'hidden',
      marginLeft: 8,
    },
    tabsContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 18,
      marginRight: 10,
      borderBottomWidth: 2,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    emptyStateText: {
      fontSize: 15,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  return { styles, dynamicStyles };
};
