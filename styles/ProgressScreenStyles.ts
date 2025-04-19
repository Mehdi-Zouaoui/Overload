import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const createStyles = (isDarkMode: boolean) => {
  // Theme-based colors
  const colors = {
    background: isDarkMode ? '#121212' : '#FAFAFA',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    subText: isDarkMode ? '#AAAAAA' : '#6B7280',
    border: isDarkMode ? '#333333' : '#F5F5F5',
    accent: isDarkMode ? '#FFFFFF' : '#000000',
    metricBackground: isDarkMode ? '#252525' : '#FAFAFA',
    success: isDarkMode ? '#FFFFFF' : '#000000', // Changed from green to white/black
    negativeChange: isDarkMode ? '#AAAAAA' : '#6B7280', // Muted gray for negative changes
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '900',
      marginBottom: 4,
      lineHeight: 28,
      textTransform: 'uppercase',
      color: colors.text,
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.subText,
      marginBottom: 8,
    },
    sectionContainer: {
      marginTop: 16,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
      color: colors.text,
    },
    workoutCarouselContainer: {
      marginVertical: 10,
    },
    workoutCarouselContent: {
      paddingHorizontal: 0,
      paddingBottom: 0,
    },
    workoutCard: {
      width: width * 0.85,
      height: 180,
      marginRight: 16,
      borderWidth: 1,

      borderRadius: 0,
    },
    workoutCardGrid: {
      flexDirection: 'row',
      height: '100%',
      borderLeftWidth: 1,
      borderWidth: 1,
    },
    workoutCardLeftColumn: {
      width: '30%',
      height: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 16,
    },
    workoutCardRightColumn: {
      width: '70%',
      height: '100%',
      padding: 16,
      justifyContent: 'space-between',
      borderLeftWidth: 1,
    },
    workoutCardIndex: {
      fontSize: 36,
      fontWeight: '900',
      lineHeight: 36,
    },
    workoutCardTitle: {
      fontSize: 26,
      fontWeight: '900',
      lineHeight: 26,
    },
    workoutCardStats: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    workoutCardStat: {
      marginRight: 24,
    },
    workoutCardStatValue: {
      fontSize: 14,
      fontWeight: '700',
    },
    workoutCardStatLabel: {
      fontSize: 12,
      fontWeight: '500',
    },
    workoutCardStatus: {
      fontSize: 10,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    selectButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      borderWidth: 1,
    },
    selectButtonText: {
      fontSize: 12,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    progressContainer: {
      marginTop: 16,
      padding: 16,
      marginBottom: 24,
    },
    progressCard: {
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    progressCardTitle: {
      fontSize: 24,
      fontWeight: '800',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 4,
    },
    progressCardSubtitle: {
      fontSize: 14,
      paddingHorizontal: 16,
      paddingBottom: 16,
      opacity: 0.7,
    },
    exerciseContainer: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.text,
      overflow: 'hidden',
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: '700',
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
      backgroundColor: isDarkMode ? '#1A1A1A' : '#F8F8F8',
      letterSpacing: -0.3,
    },
    exerciseDivider: {
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
      marginVertical: 0,
    },
    progressMetricContainer: {
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
      backgroundColor: colors.card,
      borderLeftWidth: 3,
    },
    progressMetricRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    progressMetricTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 10,
      color: colors.text,
      letterSpacing: -0.2,
    },
    progressMetricValue: {
      fontSize: 15,
      color: colors.text,
      fontWeight: '500',
    },
    progressMetricChange: {
      fontSize: 15,
      fontWeight: '700',
      letterSpacing: -0.2,
    },
    progressBarContainer: {
      height: 6,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      marginTop: 10,
      overflow: 'hidden',
      borderRadius: 0,
      borderWidth: 0,
    },
    progressBarFill: {
      height: '100%',
    },
    exerciseCardGrid: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
    },
    exerciseCardLeftColumn: {
      width: '30%',
      padding: 14,
      borderRightWidth: 1,
      borderRightColor: colors.text,
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#1A1A1A' : '#F8F8F8',
    },
    exerciseCardRightColumn: {
      width: '70%',
      padding: 14,
    },
    exerciseCardTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.3,
      marginBottom: 4,
    },
    exerciseCardStats: {
      flexDirection: 'row',
      marginTop: 10,
    },
    exerciseCardStat: {
      marginRight: 20,
    },
    exerciseCardStatValue: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    exerciseCardStatLabel: {
      fontSize: 12,
      color: colors.subText,
      letterSpacing: -0.2,
    },
    exerciseMetricLabel: {
      fontSize: 12,
      color: colors.subText,
      marginTop: 4,
    },
    exerciseMetricHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
    },
    exerciseMetricHeaderText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
      letterSpacing: -0.2,
    },
    chartSummaryContainer: {
      padding: 16,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 16,
      textAlign: 'center',
    },
    metricIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    comparisonToggleContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.text,
      overflow: 'hidden',
    },
    comparisonToggleButton: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    comparisonToggleText: {
      fontSize: 14,
      letterSpacing: -0.2,
    },
    selectedComparisonToggleButton: {
      backgroundColor: colors.accent,
    },
    unselectedComparisonToggleButton: {
      backgroundColor: colors.card,
    },
    selectedComparisonToggleText: {
      color: isDarkMode ? '#000000' : '#FFFFFF',
    },
    unselectedComparisonToggleText: {
      color: colors.text,
    },
    viewModeSection: {
      marginTop: 16,
      paddingHorizontal: 16,
    },
    viewToggleContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.text,
      overflow: 'hidden',
    },
    viewToggleButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 8,
    },
    activeViewToggleButton: {
      backgroundColor: isDarkMode ? '#333' : '#FFFFFF',
    },
    viewToggleIcon: {
      marginRight: 8,
    },
    viewToggleText: {
      fontSize: 14,
      letterSpacing: -0.2,
    },
    emptyProgressCard: {
      marginHorizontal: 16,
      marginTop: 16,
      padding: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    emptyText: {
      fontSize: 16,
      textAlign: 'center',
    },
    chartLegendContainer: {
      marginTop: 16,
      padding: 12,
      borderRadius: 8,
      backgroundColor: colors.metricBackground,
    },
    chartLegendText: {
      fontSize: 14,
      textAlign: 'center',
      color: colors.subText,
    },
    chartContainer: {
      marginTop: 16,
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    metricCardsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
      marginBottom: 8,
    },
    metricCard: {
      width: '31%',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      alignItems: 'center',
    },
    metricCardTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 4,
    },
    metricCardValue: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 2,
    },
    metricCardDetail: {
      fontSize: 12,
    },
    chartPlaceholder: {
      height: 220,
      borderRadius: 12,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 16,
    },
    placeholderText: {
      fontSize: 16,
      fontWeight: '500',
    },
  });

  return { styles, colors };
};

// Export a default styles object for simpler imports
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
});
