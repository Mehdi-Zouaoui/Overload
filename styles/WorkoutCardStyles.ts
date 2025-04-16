import { StyleSheet } from 'react-native';

export const createDynamicStyles = (isDarkMode: boolean) => ({
  container: {
    backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
    borderColor: isDarkMode ? '#2A2A2A' : '#F5F5F5',
    shadowColor: isDarkMode ? '#000000' : 'rgba(0, 0, 0, 0.08)',
  },
  favoriteContainer: {
    borderLeftColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  favoriteIndicator: {
    backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  iconContainer: {
    backgroundColor: isDarkMode ? '#252525' : '#FAFAFA',
    borderColor: isDarkMode ? '#333333' : '#F5F5F5',
  },
  iconInnerShadow: {
    borderColor: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
  },
  iconHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  week: {
    color: isDarkMode ? '#AAAAAA' : '#6B7280',
  },
  exerciseCount: {
    color: isDarkMode ? '#1A1A1A' : '#FFFFFF',
  },
  exerciseCountContainer: {
    backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  completedBadge: {
    backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  completedText: {
    color: isDarkMode ? '#1A1A1A' : '#FFFFFF',
  },
  menuIcon: {
    color: isDarkMode ? '#AAAAAA' : '#6B7280',
  },
  arrowIcon: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  pinIcon: {
    color: isDarkMode ? '#AAAAAA' : '#6B7280',
  },
  pinIconActive: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
});

export const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  favoriteContainer: {
    borderLeftWidth: 4,
  },
  favoriteIndicator: {
    position: 'absolute',
    top: 16,
    left: 0,
    width: 4,
    height: 40,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
  },
  iconInnerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  iconHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  week: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '400',
    letterSpacing: 0.1,
    opacity: 0.9,
  },
  exerciseInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  exerciseCount: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedBadge: {
    marginRight: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  completedText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  pinButton: {
    padding: 8,
    marginRight: 0,
  },
  menuButton: {
    padding: 8,
    marginRight: -6,
  },
});
