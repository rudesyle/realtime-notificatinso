import { StyleSheet, Platform } from 'react-native';
import Fonts from 'App/Theme/Fonts';
import ApplicationStyles from 'App/Theme/ApplicationStyles';

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  title: {
    ...Fonts.style.h2,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
  },
  instructions: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  loading: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
  },
  result: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
  },
  error: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
    color: 'red',
  },
  logoContainer: {
    width: '100%',
    height: 300,
    marginBottom: 25,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  keywordRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "98%",
    padding: 10
  },
  keyword: {
    ...Fonts.style.smaller,
    color: '#FF5733',
    fontWeight: 'bold'
  },
  keywordDetail: {
    ...Fonts.style.smaller,
    color: '#FF5733',
  },
  keywordNotedBy: {
    ...Fonts.style.smaller,
    fontSize: 12,
    color: '#808080',
    marginTop: 2,
  },
  keywordInitialsAndDate: {
    ...Fonts.style.smaller,
  },
});
