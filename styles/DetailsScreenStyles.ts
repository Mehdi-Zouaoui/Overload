import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
  const dynamicStyles = {
    background: { backgroundColor: isDarkMode ? '#121212' : '#f8f9fa' },
    text: { color: isDarkMode ? '#ffffff' : '#000000' },
    weekBadge: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    statCard: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#ffffff',
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    },
    divider: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
    },
    countBadge: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    subText: {
      color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
    },
    iconColor: isDarkMode ? '#ffffff' : '#000000',
    saveButton: {
      backgroundColor: (isAllExercisesDone: boolean) =>
        isAllExercisesDone
          ? isDarkMode
            ? '#ffffff'
            : '#000000'
          : isDarkMode
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)',
      color: (isAllExercisesDone: boolean) =>
        isAllExercisesDone
          ? isDarkMode
            ? '#000000'
            : '#ffffff'
          : isDarkMode
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(0, 0, 0, 0.5)',
    },
    backButton: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
    },
    progressBar: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
      filledColor: (isAllExercisesDone: boolean) =>
        isAllExercisesDone ? '#10b981' : isDarkMode ? '#ffffff' : '#000000',
    },
    highlight: {
      color: isDarkMode ? '#ffffff' : '#000000',
      fontWeight: '700' as const,
    },
    cardShadow: {
      shadowColor: isDarkMode ? '#000000' : '#000000',
      shadowOpacity: isDarkMode ? 0.4 : 0.1,
    },
    dateCard: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    },
    statIcon: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    statHighlight: {
      color: isDarkMode ? '#ffffff' : '#000000',
      fontWeight: '700' as const,
    },
  };

  return {
    dynamicStyles,
    styles: StyleSheet.create({
      container: {
        flex: 1,
      },
      scrollView: {
        flex: 1,
      },
      scrollViewContent: {
        paddingBottom: 40,
      },
      headerSection: {
        paddingHorizontal: 20,
        paddingTop: 24,
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
      titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: -0.5,
      },
      weekBadge: {
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
      },
      weekText: {
        fontSize: 14,
        fontWeight: '600',
      },
      dateCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
      },
      dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      dateText: {
        fontSize: 13,
        marginLeft: 6,
        fontWeight: '500',
      },
      progressSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 24,
      },
      statCard: {
        width: '47%',
        borderRadius: 14,
        borderWidth: 1,
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
      },
      statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      statLabel: {
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 6,
      },
      statContent: {
        width: '100%',
      },
      statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 6,
      },
      statValue: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      statSubtext: {
        fontSize: 12,
        fontWeight: '600',
      },
      statChange: {
        fontSize: 12,
        fontWeight: '600',
      },
      statDetail: {
        fontSize: 11,
        marginTop: 6,
      },
      unitText: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 2,
      },
      progressBar: {
        height: 4,
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
      },
      progressBarFilled: {
        height: '100%',
        borderRadius: 2,
      },
      trendUp: {
        color: '#000000',
        fontWeight: 'bold',
      },
      trendDown: {
        color: '#000000',
        fontWeight: 'bold',
      },
      trendSame: {
        color: '#000000',
        fontWeight: 'bold',
      },
      divider: {
        height: 1,
        width: '92%',
        alignSelf: 'center',
        marginBottom: 24,
      },
      sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 18,
      },
      sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: -0.5,
      },
      countBadge: {
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
      },
      countText: {
        fontSize: 14,
        fontWeight: '600',
      },
      exercisesContainer: {
        paddingHorizontal: 16,
        paddingBottom: 32,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      exerciseItem: {
        width: '50%',
        marginBottom: 16,
      },
      exerciseItemLeft: {
        paddingRight: 6,
      },
      exerciseItemRight: {
        paddingLeft: 6,
      },
      saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
      saveButtonText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
        letterSpacing: 0.2,
      },
    }),
  };
};
