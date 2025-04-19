import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
  const dynamicStyles = {
    background: { backgroundColor: isDarkMode ? '#121212' : '#FFFFFF' },
    text: { color: isDarkMode ? '#ffffff' : '#000000' },
    weekBadge: {
      backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
      color: isDarkMode ? '#ffffff' : '#000000',
      borderWidth: 1,
      borderColor: isDarkMode ? '#444444' : '#000000',
    },
    statCard: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#ffffff',
      borderColor: isDarkMode ? '#333333' : '#000000',
    },
    divider: {
      backgroundColor: isDarkMode ? '#333333' : '#000000',
      height: 1,
    },
    countBadge: {
      backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
      color: isDarkMode ? '#ffffff' : '#000000',
      borderWidth: 1,
      borderColor: isDarkMode ? '#444444' : '#000000',
    },
    subText: {
      color: isDarkMode ? '#AAAAAA' : '#555555',
    },
    iconColor: isDarkMode ? '#ffffff' : '#000000',
    saveButton: {
      backgroundColor: (isAllExercisesDone: boolean) =>
        isAllExercisesDone
          ? isDarkMode
            ? '#ffffff'
            : '#000000'
          : isDarkMode
            ? '#333333'
            : '#E0E0E0',
      color: (isAllExercisesDone: boolean) =>
        isAllExercisesDone
          ? isDarkMode
            ? '#000000'
            : '#ffffff'
          : isDarkMode
            ? '#AAAAAA'
            : '#555555',
    },
    backButton: {
      backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
      borderColor: isDarkMode ? '#444444' : '#000000',
    },
    progressBar: {
      backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
      filledColor: (isAllExercisesDone: boolean) =>
        isAllExercisesDone ? '#000000' : isDarkMode ? '#ffffff' : '#000000',
    },
    highlight: {
      color: isDarkMode ? '#ffffff' : '#000000',
      fontWeight: '700' as const,
    },
    cardShadow: {
      shadowColor: '#000000',
      shadowOpacity: isDarkMode ? 0.15 : 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
    },
    dateCard: {
      backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
      borderColor: isDarkMode ? '#444444' : '#000000',
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
        paddingBottom: 20,
      },
      headerSection: {
        paddingHorizontal: 16,
        paddingTop: 16,
        marginBottom: 12,
      },
      backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 0,
        borderWidth: 1,
        alignSelf: 'flex-start',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      backButtonText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
      },
      titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 12,
      },
      title: {
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: -0.3,
        lineHeight: 32,
        marginBottom: 4,
        maxWidth: '80%',
      },
      weekBadge: {
        borderRadius: 0,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 1,
        marginTop: 4,
      },
      weekText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.3,
      },
      dateCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 0,
        marginBottom: 16,
        borderWidth: 1,
      },
      dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      dateText: {
        fontSize: 12,
        marginLeft: 4,
        fontWeight: '500',
        letterSpacing: 0.2,
      },
      progressSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 16,
      },
      statCard: {
        width: '48%',
        borderRadius: 0,
        borderWidth: 1,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
      },
      statLabel: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.2,
      },
      statContent: {
        width: '100%',
      },
      statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 4,
      },
      statValue: {
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: -0.2,
      },
      statSubtext: {
        fontSize: 10,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.2,
      },
      statChange: {
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
      },
      statDetail: {
        fontSize: 10,
        marginTop: 4,
        letterSpacing: 0.1,
      },
      unitText: {
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 2,
      },
      progressBar: {
        height: 3,
        width: '100%',
        borderRadius: 0,
        overflow: 'hidden',
        marginTop: 4,
      },
      progressBarFilled: {
        height: '100%',
        borderRadius: 0,
      },
      trendUp: {
        color: '#000000',
        fontWeight: '700',
      },
      trendDown: {
        color: '#555555',
        fontWeight: '700',
      },
      trendSame: {
        color: '#777777',
        fontWeight: '700',
      },
      divider: {
        height: 1,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 16,
        marginTop: 4,
      },
      sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 12,
        marginTop: 4,
      },
      sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: -0.2,
        textTransform: 'uppercase',
      },
      countBadge: {
        marginLeft: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 0,
        borderWidth: 1,
      },
      countText: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.2,
      },
      exercisesContainer: {
        paddingHorizontal: 12,
        paddingBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      exerciseItem: {
        width: '50%',
        marginBottom: 12,
      },
      exerciseItemLeft: {
        paddingRight: 4,
      },
      exerciseItemRight: {
        paddingLeft: 4,
      },
      saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#000000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      saveButtonText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
        letterSpacing: 0.3,
        textTransform: 'uppercase',
      },
    }),
  };
};
