import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const colors = {
  primary: '#E97400',
  text: '#3A3A47',
  inputBorder: '#E1E1E1',
  background: '#FFF',
};

interface GlobalStyles {
  container: ViewStyle;
  advitiserLogoContainer: ViewStyle;
  colorWhite: TextStyle;
  colorprimary: TextStyle;
  Weight500: TextStyle;
  Weight600: TextStyle;
  marginTopXXL: ViewStyle;
  marginTopXL: ViewStyle;
  marginTopL: ViewStyle;
  marginTopM: ViewStyle;
  marginTopS: ViewStyle;
  marginTopXS: ViewStyle;
  paddingLeft: ViewStyle;
  bodyLarge: TextStyle;
  TitleMedium: TextStyle;
  headlineSmall: TextStyle;
  textShadow: TextStyle;
  body: ViewStyle;
  Head: ViewStyle;
  backArrow: ViewStyle;
  backArrowMain: ViewStyle;
  input: ViewStyle;
}

const globalestyles: GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  colorWhite: {
    color: "#FFF",
  },
  colorprimary: {
    color: colors.primary,
  },
  Weight500: {
    fontWeight: '500',
  },
  Weight600: {
    fontWeight: '600',
  },
  marginTopXXL: {
    marginTop: hp(10),
  },
  marginTopXL: {
    marginTop: hp(8),
  },
  marginTopL: {
    marginTop: hp(3.6),
  },
  marginTopM: {
    marginTop: hp(2.4),
  },
  marginTopS: {
    marginTop: hp(1.2),
  },
  marginTopXS: {
    marginTop: hp(0.6),
  },
  paddingLeft: {
    paddingLeft: wp(5),
  },
  bodyLarge: {
    color: "#000",
    maxWidth: wp(80),
    lineHeight: wp(5.2),
    fontSize: wp(4),
  },
  TitleMedium: {
    fontSize: wp(5),
  },
  headlineSmall: {
    fontWeight: '600',
    fontSize: wp(6),
    lineHeight: wp(7),
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.30)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    fontFamily: 'Oxygen',
  },
  body: {
    height: hp(100),
    backgroundColor: colors.background,
  },
  Head: {
    paddingTop: hp(8.5),
    paddingBottom: 10,
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    position: 'relative',
  },
  backArrow: {
    position: 'absolute',
    top: wp(15),
    left: wp(4),
    right: 0,
  },
  backArrowMain: {
    position: 'absolute',
    top: wp(20),
    left: wp(4),
    right: 0,
  },
  input: {
    flex: 1,
    padding: wp(3),
    height: hp(7),
    maxWidth: wp(85),
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.background,
  },

  advitiserLogoContainer : {
    display: 'flex',
    borderWidth:10,
    borderColor:'red',
    width: 88,
    height: 53,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 6,
    backgroundColor: '#FFF',
    shadowOffset : {width:0,height:2},
    shadowOpacity:2
  }
});

export default globalestyles;
