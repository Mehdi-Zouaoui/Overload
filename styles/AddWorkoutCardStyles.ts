import { StyleSheet, Platform } from 'react-native';

export const createDynamicStyles = (isDarkMode: boolean) => ({
  card: {
    backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
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
    backgroundColor: isDarkMode ? '#444444' : '#000000',
  },
  badge: {
    backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
  },
  badgeText: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  iconBg: {
    backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
  },
  plusIcon: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
});

export const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    overflow: 'visible',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    transform: [{ translateY: -1 }],
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  contentSection: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 0,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#000000',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
  },
  rightSection: {
    marginLeft: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
});
