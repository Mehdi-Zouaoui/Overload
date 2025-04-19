import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const createStyles = (isDarkMode: boolean) => {
  // Monochromatic color palette with subtle accents
  const colors = {
    primary: isDarkMode ? '#FFFFFF' : '#000000',
    secondary: isDarkMode ? '#BBBBBB' : '#666666',
    accent: isDarkMode ? '#E0E0E0' : '#333333',
    background: isDarkMode ? '#121212' : '#F8F9FA',
    cardBg: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    textSecondary: isDarkMode ? '#BBBBBB' : '#666666',
    border: isDarkMode ? '#333333' : '#000000',
    divider: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    danger: isDarkMode ? '#FF5555' : '#FF0000',
  };

  const dynamicStyles = {
    container: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.cardBg,
      shadowColor: isDarkMode ? '#000000' : '#CCCCCC',
    },
    title: {
      color: colors.text,
    },
    card: {
      backgroundColor: colors.cardBg,
      borderColor: colors.border,
      shadowColor: isDarkMode ? '#000000' : '#AAAAAA',
    },
    sectionTitle: {
      color: colors.text,
    },
    userName: {
      color: colors.text,
    },
    userEmail: {
      color: colors.textSecondary,
    },
    menuItemText: {
      color: colors.text,
    },
    valueText: {
      color: colors.textSecondary,
    },
    divider: {
      backgroundColor: colors.divider,
    },
    dateText: {
      color: colors.textSecondary,
    },
    versionText: {
      color: colors.textSecondary,
    },
    iconBackground: {
      backgroundColor: isDarkMode ? '#2A2A2A' : '#F5F5F5',
    },
    iconColor: {
      color: colors.primary,
    },
    chevronColor: {
      color: colors.primary,
    },
    editProfileButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    editProfileText: {
      color: isDarkMode ? '#000000' : '#FFFFFF',
    },
    editProfileIconColor: {
      color: isDarkMode ? '#000000' : '#FFFFFF',
    },
    signOutButton: {
      backgroundColor: 'transparent',
      borderColor: colors.danger,
    },
    signOutText: {
      color: colors.danger,
    },
    statValue: {
      color: colors.text,
    },
    statLabel: {
      color: colors.text,
    },
    statDetail: {
      color: colors.textSecondary,
    },
    metaText: {
      color: colors.textSecondary,
    },
    badge: {
      backgroundColor: colors.primary,
      color: isDarkMode ? '#000000' : '#FFFFFF',
    },
    tabActive: {
      color: colors.primary,
      borderColor: colors.primary,
    },
    tabInactive: {
      color: colors.textSecondary,
      borderColor: 'transparent',
    },
    // New accent colors for stats
    workoutStatAccent: {
      color: colors.primary,
    },
    daysActiveAccent: {
      color: colors.primary,
    },
    exerciseStatAccent: {
      color: colors.primary,
    },
    statHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    // Exercise-specific styles
    exerciseCard: {
      backgroundColor: colors.cardBg,
      borderColor: colors.border,
      shadowColor: isDarkMode ? '#000000' : '#AAAAAA',
    },
    exerciseTitle: {
      color: colors.text,
    },
    exerciseSubtitle: {
      color: colors.textSecondary,
    },
    exerciseIconBackground: {
      backgroundColor: isDarkMode ? '#2A2A2A' : '#F5F5F5',
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
      padding: 24,
      borderRadius: 0,
      borderWidth: 1,
      borderColor: colors.border,
      marginHorizontal: 16,
      marginBottom: 20,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 0,
      marginRight: 18,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    profileInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 20,
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
      borderRadius: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
      shadowColor: isDarkMode ? '#FFFFFF' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      width: 48,
      height: 48,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    editProfileText: {
      fontSize: 14,
      fontWeight: '700',
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    statCard: {
      flex: 1,
      borderRadius: 0,
      padding: 14,
      marginHorizontal: 6,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
      position: 'relative',
      overflow: 'hidden',
    },
    statCardBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    },
    statCardPattern: {
      position: 'absolute',
      top: -10,
      right: -10,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
      transform: [{ scale: 1.3 }],
    },
    statIconContainer: {
      width: 32,
      height: 32,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    statContent: {
      position: 'relative',
      zIndex: 1,
    },
    statValue: {
      fontSize: 24,
      fontWeight: '800',
      marginBottom: 2,
      textAlign: 'left',
    },
    statLabel: {
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 6,
      textTransform: 'uppercase',
      letterSpacing: -0.3,
      textAlign: 'left',
    },
    statDetailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 3,
      marginBottom: 8,
    },
    statBadge: {
      paddingHorizontal: 5,
      paddingVertical: 1,
      borderRadius: 3,
      backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
      marginRight: 5,
    },
    statBadgeText: {
      fontSize: 9,
      fontWeight: '700',
    },
    statDetail: {
      fontSize: 10,
      lineHeight: 12,
    },
    statIndicator: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statProgressBar: {
      height: 2,
      width: '100%',
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      borderRadius: 1,
      overflow: 'hidden',
      marginTop: 2,
    },
    statProgressFill: {
      height: '100%',
      backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
      borderRadius: 1,
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
      borderRadius: 0,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      marginBottom: 8,
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
      padding: 20,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    },
    menuItemText: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    signOutButton: {
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 28,
      padding: 18,
      borderRadius: 0,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.danger,
      backgroundColor: isDarkMode ? 'rgba(255, 85, 85, 0.1)' : 'rgba(255, 0, 0, 0.05)',
      shadowColor: isDarkMode ? 'rgba(255,85,85,0.3)' : 'rgba(255,0,0,0.3)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 3,
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
      opacity: 0.7,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 0,
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
    statHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    // Exercise-specific styles
    exerciseCard: {
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 0,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      marginBottom: 12,
      padding: 16,
    },
    exerciseHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    exerciseIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    },
    exerciseInfo: {
      flex: 1,
    },
    exerciseTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 4,
      letterSpacing: -0.2,
    },
    exerciseSubtitle: {
      fontSize: 14,
      fontWeight: '500',
    },
    exerciseStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    },
    exerciseStatItem: {
      alignItems: 'center',
      flex: 1,
    },
    exerciseStatValue: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 2,
    },
    exerciseStatLabel: {
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: -0.3,
    },
    exerciseProgressBar: {
      height: 4,
      width: '100%',
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      borderRadius: 2,
      overflow: 'hidden',
      marginTop: 12,
    },
    exerciseProgressFill: {
      height: '100%',
      backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
      borderRadius: 2,
    },
  });

  return { styles, dynamicStyles };
};
