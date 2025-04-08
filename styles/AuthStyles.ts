import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    marginTop: 12,
    letterSpacing: 0.3,
    opacity: 0.9,
    textTransform: 'capitalize',
  },
  darkInputLabel: {
    color: '#ffffff',
    opacity: 0.9,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 54,
    backgroundColor: '#fff',
  },
  darkInputContainer: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444444',
  },
  inputIcon: {
    marginRight: 12,
    opacity: 0.75,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#000',
    letterSpacing: 0.2,
    paddingVertical: 0,
  },
  darkInput: {
    color: '#ffffff',
  },
  eyeButton: {
    padding: 8,
    opacity: 0.7,
  },
  signInButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    overflow: 'hidden',
  },
  darkSignInButton: {
    backgroundColor: '#ffffff',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  darkSignInButtonText: {
    color: '#000000',
  },
  switchModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  switchModeText: {
    color: '#666',
    fontSize: 15,
  },
  darkSwitchModeText: {
    color: '#aaaaaa',
  },
  switchModeButton: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  darkSwitchModeButton: {
    color: '#ffffff',
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  signUpHeader: {
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 15,
    color: '#000',
    marginLeft: 4,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  darkBackButtonText: {
    color: '#ffffff',
  },
  signUpTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  darkSignUpTitle: {
    color: '#ffffff',
  },
  termsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  termsText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: 0.1,
  },
  darkTermsText: {
    color: '#aaaaaa',
  },
  termsLink: {
    color: '#000',
    fontWeight: '700',
  },
  darkTermsLink: {
    color: '#ffffff',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  darkDisabledButton: {
    backgroundColor: '#444444',
  },
  arrowIcon: {
    marginLeft: 8,
    fontSize: 18,
  },
  inputFocused: {
    borderColor: '#000000',
    borderWidth: 1.5,
  },
  darkInputFocused: {
    borderColor: '#ffffff',
  },
  inputError: {
    borderColor: '#ff3b30',
    borderWidth: 1,
  },
  buttonActive: {
    backgroundColor: '#333333',
  },
  darkButtonActive: {
    backgroundColor: '#e0e0e0',
  },
  passwordStrengthContainer: {
    flexDirection: 'row',
    marginTop: 6,
    height: 4,
  },
  passwordStrengthSegment: {
    height: '100%',
    flex: 1,
    marginRight: 3,
    backgroundColor: '#e0e0e0',
  },
  passwordStrengthWeak: {
    backgroundColor: '#ff3b30',
  },
  passwordStrengthMedium: {
    backgroundColor: '#ff9500',
  },
  passwordStrengthStrong: {
    backgroundColor: '#34c759',
  },
  validationIcon: {
    marginLeft: 8,
    fontSize: 16,
  },
  validIcon: {
    color: '#34c759',
  },
  invalidIcon: {
    color: '#ff3b30',
  },
});
