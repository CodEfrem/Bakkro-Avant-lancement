import {StyleSheet, Platform, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const OS = Platform.OS;

const colors = {
  primary: '#E97400',
  text: '#3A3A47',
  inputBorder: '#E1E1E1',
  background: '#FFF',
};

const sizes = {
  titleLargeFontSize: hp(2.7),
  bodyLargeFontSize: hp(1.9),
  titleMediumFontSize: hp(2.4),
};

const styles = StyleSheet.create({

  body: {
    height: '100%',
    backgroundColor: '#FFF',
    flex :1,
    alignItems : 'center',
  },
  paddingLeft : {
    paddingLeft :hp(3.8)
  },
  container: {
    
    width:wp(100),
    
  },
  fieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputPassWord: {
    flex: 1,
    padding: wp(3),
    maxWidth:wp(85),
    height:100,
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.background,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    textAlign: 'center',
    fontSize: sizes.bodyLargeFontSize,
  },

  errorText : {
    color: colors.primary
  },

  container2: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  dropdownHeader: {
    backgroundColor: '',
    paddingVertical: 10,
    paddingHorizontal: 20,
   // borderRadius: 5,
  },
  dropdownHeaderText: {
    fontSize: 2,
    fontWeight: 'bold',
  },
  dropdownContent: {
    marginTop: 5,
    width: '100%',
    backgroundColor: 'white',
    //borderWidth: 1,
   // borderColor: 'lightgray',
   // borderRadius: 5,
    padding: 10,
  },
  questionItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    //borderWidth: 1,
   // borderColor: '#ccc',
   // borderRadius: 5,
  },
  selectedQuestion: {
   // backgroundColor: 'lightblue',
  },
  questionText: {
    fontSize: 2,
  },

  
  
});

export default styles;
