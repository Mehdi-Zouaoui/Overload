import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 40,
    marginBottom: 30,
  },
  logoContainer: {
    marginBottom: 16,
    borderRadius: 4,
  },
  logo: {
    width: 90,
    height: 90,
    padding: 0,
    borderRadius: 4,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  darkLogo: {
    backgroundColor: '#000',
  },
  logoImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
    letterSpacing: 4,
    color: '#000000',
    marginBottom: 24,
    textTransform: 'uppercase',
  },
  darkText: {
    color: '#ffffff',
  },
  title: {
    fontSize: 34,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    color: '#000000',
    marginBottom: 12,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#444444',
    letterSpacing: 0.1,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: '90%',
  },
  darkSubtitleText: {
    color: '#cccccc',
  },
  authContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginBottom: 0,
    borderRadius: 8,
    padding: 0,
  },
  darkAuthContainer: {
    backgroundColor: '#1e1e1e',
  },
  footerContainer: {
    alignItems: 'center',
  },
  forgotPasswordButton: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  lockIcon: {
    marginRight: 6,
  },
  forgotPasswordText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  motivationContainer: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  motivationText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#444444',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 22,
    maxWidth: '85%',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  darkMotivationText: {
    color: '#bbbbbb',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '40%',
    alignSelf: 'center',
    marginVertical: 30,
  },
  darkDivider: {
    backgroundColor: '#333333',
  },
  accountSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  accountText: {
    fontSize: 15,
    color: '#666666',
  },
  darkAccountText: {
    color: '#aaaaaa',
  },
  signupText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 4,
  },
  darkSignupText: {
    color: '#ffffff',
  },
  debugButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  darkDebugButton: {
    backgroundColor: '#333333',
  },
  debugButtonText: {
    color: '#000000',
    fontWeight: '500',
  },
  darkDebugButtonText: {
    color: '#ffffff',
  },
  inputFocused: {
    borderColor: '#000000',
    borderWidth: 2,
  },
  darkInputFocused: {
    borderColor: '#ffffff',
  },
});
