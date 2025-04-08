import { StyleSheet } from 'react-native';

export const createDynamicStyles = (isDarkMode: boolean) => ({
  container: {
    backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
    borderColor: isDarkMode ? '#333333' : '#E8E8E8',
    shadowColor: isDarkMode ? '#000' : 'rgba(0, 0, 0, 0.08)',
  },
  favoriteContainer: {
    borderLeftColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  favoriteIndicator: {
    backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  iconContainer: {
    backgroundColor: isDarkMode ? '#444444' : '#222222',
  },
  title: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  week: {
    color: isDarkMode ? '#CCCCCC' : '#666666',
  },
  exerciseCount: {
    color: isDarkMode ? '#AAAAAA' : '#888888',
  },
  completedBadge: {
    backgroundColor: isDarkMode ? '#444444' : '#222222',
    borderColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  completedText: {
    color: '#FFFFFF',
  },
  menuIcon: {
    color: isDarkMode ? '#CCCCCC' : '#666666',
  },
  arrowIcon: {
    color: '#FFFFFF',
  },
  pinIcon: {
    color: isDarkMode ? '#CCCCCC' : '#666666',
  },
  pinIconActive: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
});

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 5,
    borderLeftColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    position: 'relative',
  },
  favoriteContainer: {
    borderLeftWidth: 5,
  },
  favoriteIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
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
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
    textTransform: 'uppercase',
  },
  week: {
    fontSize: 14,
    marginBottom: 3,
    letterSpacing: -0.2,
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
    borderRadius: 4,
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
