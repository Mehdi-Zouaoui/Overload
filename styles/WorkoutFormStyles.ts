import { StyleSheet } from 'react-native';

export const createDynamicStyles = (isDarkMode: boolean) => ({
  background: {
    backgroundColor: isDarkMode ? '#121212' : '#f8f9fa',
  },
  text: {
    color: isDarkMode ? '#ffffff' : '#000000',
  },
  subText: {
    color: isDarkMode ? '#aaaaaa' : '#6B7280',
  },
  card: {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    borderColor: isDarkMode ? '#333333' : '#F0F0F0',
  },
  input: {
    backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
    borderColor: isDarkMode ? '#333333' : '#F0F0F0',
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  iconColor: isDarkMode ? '#ffffff' : '#000000',
  backButton: {
    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
  },
  accent: isDarkMode ? '#6200EE' : '#3700B3',
  buttonText: isDarkMode ? '#FFFFFF' : '#FFFFFF',
  buttonBackground: isDarkMode ? '#6200EE' : '#3700B3',
  danger: isDarkMode ? '#CF6679' : '#B00020',
  success: isDarkMode ? '#03DAC6' : '#018786',
  border: {
    borderColor: isDarkMode ? '#333333' : '#E0E0E0',
    borderWidth: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 16,
    marginLeft: 16,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  formContainer: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  exercisesSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  exerciseInfo: {
    fontSize: 14,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#B00020',
    fontSize: 14,
    marginTop: 4,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 16,
  },
});
