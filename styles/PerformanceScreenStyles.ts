import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
  const dynamicStyles = {
    background: { backgroundColor: isDarkMode ? '#121212' : '#FAFAFA' },
    contentBackground: { backgroundColor: isDarkMode ? '#1E1E1E' : 'white' },
    text: { color: isDarkMode ? '#FFFFFF' : '#111827' },
    subText: { color: isDarkMode ? '#BBBBBB' : '#6b7280' },
    border: { borderColor: isDarkMode ? '#333333' : '#F0F0F0' },
    metaBackground: { backgroundColor: isDarkMode ? '#2A2A2A' : '#f9fafb' },
    divider: { backgroundColor: isDarkMode ? '#333333' : '#e5e7eb' },
    saveButton: { backgroundColor: isDarkMode ? '#FFFFFF' : '#111827' },
    saveButtonText: { color: isDarkMode ? '#111827' : '#FFFFFF' },
    closeButton: { backgroundColor: isDarkMode ? '#2A2A2A' : '#f3f4f6' },
    closeButtonText: { color: isDarkMode ? '#BBBBBB' : '#4b5563' },
    successBackground: { backgroundColor: isDarkMode ? '#065f46' : '#111827' },
    handleIndicator: { backgroundColor: isDarkMode ? '#555555' : '#CCCCCC' },
    switchTrackColor: {
      false: isDarkMode ? '#4b5563' : '#d1d5db',
      true: '#10b981',
    },
    switchThumbColor: '#ffffff',
    improvementText: { color: '#10B981' }, // green
    decreaseText: { color: '#EF4444' }, // red
    sameText: { color: isDarkMode ? '#BBBBBB' : '#6B7280' },
  };

  return {
    dynamicStyles,
    styles: StyleSheet.create({
      contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 4,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        width: '100%',
        borderBottomWidth: 1,
        paddingBottom: 8,
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.3,
      },
      headerButtonsContainer: {
        flexDirection: 'row',
        gap: 8,
      },
      headerButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
      },
      saveButton: {},
      disabledButton: {
        opacity: 0.5,
      },
      saveButtonText: {
        fontWeight: '600',
        fontSize: 14,
      },
      closeButton: {},
      closeButtonText: {
        fontWeight: '600',
        fontSize: 14,
      },
      successMessage: {
        padding: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 24,
        alignSelf: 'center',
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      },
      successInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      },
      checkmarkCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      checkmark: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: -1,
      },
      successText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: 0.3,
      },
      mainContainer: {
        flex: 1,
        width: '100%',
      },
      exerciseInfoContainer: {
        width: '100%',
        marginBottom: 12,
        padding: 12,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      },
      exerciseNameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      },
      exerciseName: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.2,
        flex: 1,
      },
      exerciseTypeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
      },
      exerciseTypeText: {
        fontSize: 12,
        fontWeight: '600',
      },
      exerciseMetaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 8,
      },
      metaItem: {
        alignItems: 'center',
        flex: 1,
      },
      metaLabel: {
        fontSize: 12,
        marginBottom: 4,
        fontWeight: '500',
      },
      metaValue: {
        fontSize: 15,
        fontWeight: '600',
      },
      metaDivider: {
        width: 1,
        height: 24,
      },
      completionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
      },
      completionLabel: {
        fontSize: 14,
        fontWeight: '500',
      },
      repsContainer: {
        width: '100%',
        marginTop: 12,
        padding: 12,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      },
      repsTitle: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      },
      previousPerformance: {
        width: '100%',
        marginTop: 12,
        marginBottom: 12,
        padding: 12,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      },
      previousHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
      previousTitle: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      },
      previousBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
      },
      previousBadgeText: {
        fontSize: 12,
        fontWeight: '500',
      },
      previousDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      previousWeightContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      previousWeight: {
        fontSize: 48,
        fontWeight: '700',
        letterSpacing: -0.5,
      },
      previousWeightUnit: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        marginLeft: 4,
      },
      previousRepsContainer: {
        alignItems: 'flex-end',
      },
      previousRepsLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 4,
      },
      previousRepsValues: {
        fontSize: 16,
        fontWeight: '600',
      },
      comparisonContainer: {
        marginTop: 12,
        paddingTop: 8,
        borderTopWidth: 1,
      },
      comparisonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      comparisonLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginRight: 8,
        width: 60,
      },
      improvementText: {
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
      },
      decreaseText: {
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
      },
      sameText: {
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
      },
      noPreviousDataContainer: {
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      noPreviousDataText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        textAlign: 'center',
      },
      noPreviousDataSubtext: {
        fontSize: 14,
        textAlign: 'center',
      },
    }),
  };
};
