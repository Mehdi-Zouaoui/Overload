import { StyleSheet, Platform } from 'react-native';

export const createDynamicStyles = (isDarkMode: boolean) => ({
  card: {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    borderColor: isDarkMode ? '#333333' : '#000000',
    shadowColor: '#000000',
  },
  text: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  subtext: {
    color: isDarkMode ? '#AAAAAA' : '#555555',
  },
  divider: {
    backgroundColor: isDarkMode ? '#333333' : '#000000',
    borderWidth: 0.5,
    marginHorizontal: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
    borderColor: isDarkMode ? '#444444' : '#000000',
  },
  badgeText: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  iconColor: isDarkMode ? '#FFFFFF' : '#000000',
  iconButtonColor: isDarkMode ? '#000000' : '#FFFFFF',
  progressBar: {
    backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
  },
  progressBarFilled: {
    backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  cardShadow: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: isDarkMode ? 0.15 : 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '100%',
  },
  card: {
    borderWidth: 1,
    borderRadius: 0,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
    transform: [{ translateY: -1 }],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 26,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 0,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 3,
    width: '100%',
    borderRadius: 0,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 0,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'right',
    textTransform: 'uppercase',
    letterSpacing: 0.1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#000000',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#000000',
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
});
