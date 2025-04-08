import { StyleSheet } from 'react-native';

export const createDynamicStyles = (isDarkMode: boolean) => ({
  card: {
    backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
    borderColor: isDarkMode ? '#333333' : '#E0E0E0',
  },
  text: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  subtext: {
    color: isDarkMode ? '#BBBBBB' : '#666666',
  },
  divider: {
    backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
  },
  badge: {
    backgroundColor: isDarkMode ? '#333333' : '#000000',
    borderColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  badgeText: {
    color: '#FFFFFF',
  },
  iconBg: {
    backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  plusIcon: {
    color: isDarkMode ? '#000000' : '#FFFFFF',
  },
});

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderLeftWidth: 6,
    borderLeftColor: '#000000',
  },
  contentSection: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.3,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 12,
    letterSpacing: -0.1,
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 10,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 2,
    marginVertical: 10,
    width: '100%',
  },
});
