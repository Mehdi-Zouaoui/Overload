import { StyleSheet } from 'react-native';

export const createDynamicStyles = (isDarkMode: boolean) => ({
  container: {
    backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
    borderColor: isDarkMode ? '#2A2A2A' : '#EEEEEE',
    shadowColor: isDarkMode ? '#000' : 'rgba(0, 0, 0, 0.05)',
  },
  favoriteContainer: {
    borderLeftColor: isDarkMode ? '#FFFFFF' : '#1A1A1A',
  },
  favoriteIndicator: {
    backgroundColor: isDarkMode ? '#FFFFFF' : '#1A1A1A',
  },
  iconContainer: {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#F5F5F5',
    borderColor: isDarkMode ? '#333333' : '#E0E0E0',
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
    color: isDarkMode ? '#FFFFFF' : '#1A1A1A',
  },
  week: {
    color: isDarkMode ? '#B8B8B8' : '#666666',
  },
  exerciseCount: {
    color: isDarkMode ? '#A0A0A0' : '#888888',
  },
  completedBadge: {
    backgroundColor: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    borderColor: isDarkMode ? '#FFFFFF' : '#1A1A1A',
  },
  completedText: {
    color: isDarkMode ? '#1A1A1A' : '#FFFFFF',
  },
  menuIcon: {
    color: isDarkMode ? '#FFFFFF' : '#1A1A1A',
  },
  arrowIcon: {
    color: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    opacity: 0.9,
    fontSize: 20,
  },
  pinIcon: {
    color: isDarkMode ? '#FFFFFF' : '#1A1A1A',
  },
  pinIconActive: {
    color: isDarkMode ? '#FFFFFF' : '#1A1A1A',
  },
});

export const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
  },
  favoriteContainer: {
    borderLeftWidth: 4,
  },
  favoriteIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    margin: 12,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  week: {
    fontSize: 14,
    marginBottom: 4,
    letterSpacing: -0.1,
    fontWeight: '500',
  },
  exerciseInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  exerciseCount: {
    fontSize: 13,
    letterSpacing: -0.1,
    fontWeight: '400',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedBadge: {
    marginRight: 10,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
  },
  completedText: {
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pinButton: {
    padding: 8,
    marginRight: 4,
  },
  menuButton: {
    padding: 8,
    marginRight: -8,
  },
});
