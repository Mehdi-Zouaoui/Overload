import { StyleSheet } from 'react-native';

export const createDynamicStyles = (isDarkMode: boolean) => ({
  container: {
    backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
  },
  emptyText: {
    color: isDarkMode ? '#BBBBBB' : 'rgba(0, 0, 0, 0.6)',
  },
  sectionTitle: {
    color: isDarkMode ? '#FFFFFF' : '#111827',
  },
  divider: {
    backgroundColor: isDarkMode ? '#333333' : 'rgba(0, 0, 0, 0.08)',
  },
  createButton: {
    backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  createButtonText: {
    color: isDarkMode ? '#111827' : '#FFFFFF',
  },
  badgeContainer: {
    backgroundColor: isDarkMode ? '#333333' : '#000000',
    borderColor: isDarkMode ? '#FFFFFF' : '#000000',
  },
  workoutCard: {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
  },
  activityIndicator: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  errorText: {
    color: isDarkMode ? '#FF6B6B' : '#D32F2F',
  },
  refreshButton: {
    backgroundColor: isDarkMode ? '#333333' : '#E0E0E0',
  },
  refreshButtonText: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  lastUpdated: {
    color: isDarkMode ? '#999999' : '#666666',
  },
  scrollIndicator: {
    backgroundColor: isDarkMode ? '#444444' : '#CCCCCC',
  },
  headerTitle: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  workoutCardTitle: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  workoutCardSubtitle: {
    color: isDarkMode ? '#BBBBBB' : '#666666',
  },
  statsContainer: {
    backgroundColor: isDarkMode ? '#252525' : '#F5F5F5',
  },
  statsValue: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  statsLabel: {
    color: isDarkMode ? '#BBBBBB' : '#666666',
  },
  actionButton: {
    backgroundColor: isDarkMode ? '#333333' : '#F0F0F0',
  },
  actionButtonText: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  headerDivider: {
    backgroundColor: isDarkMode ? '#333333' : '#000000',
  },
  workoutCount: {
    color: '#FFFFFF',
  },
  headerBackground: {
    backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  safeArea: {
    flex: 1,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    textTransform: 'uppercase',
    maxWidth: '70%',
  },
  workoutCount: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  emptyScrollContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  createButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 4,
    elevation: 0,
  },
  createButtonText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  workoutsContainer: {
    flex: 1,
    gap: 14,
  },
  workoutCardWrapper: {
    marginBottom: 14,
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  workoutCard: {
    padding: 16,
    borderRadius: 4,
  },
  workoutCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  workoutCardSubtitle: {
    fontSize: 14,
    marginBottom: 12,
    letterSpacing: 0.1,
  },
  workoutCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 4,
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statsValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  statsLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    letterSpacing: 0.2,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.2,
  },
  refreshButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  refreshButtonText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  lastUpdated: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  scrollIndicatorContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  scrollHintText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  arrowContainer: {
    marginBottom: 8,
  },
  badgeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  headerIconButton: {
    padding: 8,
    marginRight: 8,
  },
  workoutCardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  seeAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterChipActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    letterSpacing: 0.2,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  emptyStateImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
    opacity: 0.8,
  },
  fabButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  fabIcon: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});
