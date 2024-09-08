import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Alert, Image, AppState} from 'react-native'; // Importer TouchableOpacity
import {RouteProp, useNavigation} from '@react-navigation/native';
import styles from './Styles';
import CustomButton from '../../components/Buttons/Buttons';
import {Text, TextInput} from 'react-native-paper';
import Brand from '../../components/Brand';
import globalestyles from '../../../GolbaleStyle';
import CountryPicker from 'react-native-country-picker-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {supabase} from '../../lib/supabase';

const OTPSenderScreen = ({route}) => {
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('CI');
  const [country, setCountry] = useState('');
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);
  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const {firstname, lastname, password, question, answer} = route.params;
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Affichage des valeurs de firstname et lastname dans la console
    console.log(
      '3 =================================> First Name:',
      firstname + ' /Last Name:',
      lastname + ' /password:',
      password,
      ' /question:',
      question + ' /answer:',
      answer,
    );
  }, []); //

  AppState.addEventListener('change', state => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  const getFormattedPhoneNumber = () => {
    if (country) {
      return `${phoneNumber}`;
    }
    return phoneNumber;
  };

  async function sendOTPAndNavigate() {
    setLoading(true);
    // Vérifiez d'abord si le numéro de téléphone est valide
    if (phone.trim() === '') {
      Alert.alert('Veuillez entrer un numéro de téléphone valide');
      setLoading(false);
      return;
    }

    // const {data, error} = await supabase.auth.signInWithOtp({
    //   phone,
    //   options: {channel: 'whatsapp'},
    // });
    // console.log({data});

    const { data, error } = await supabase.auth.signUp({
      phone: phone,
      password: password
    })


    if (error) { 
    Alert.alert(error.message) 
    setLoading(false);
    }
    else {
    console.log('routes.params : ' + route.params);
    console.log('OTP envoyé au : ' + phone);
    navigation.navigate('OTPConfirmScreen', {
      firstname,
      lastname,
      password,
      question,
      answer,
      phone,
    });
  }
  }

  async function sendOTPWithSMSAndNavigate() {
    // otp sender SMS logic

    navigation.navigate('OTPConfirmScreen', {firstname, lastname, password});
  }

  return (
    <View style={styles.body}>
      <TouchableOpacity
        style={globalestyles.backArrow}
        onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/images/backArrow.png')} />
      </TouchableOpacity>
      <Brand />
      <View
        style={[
          styles.container,
          styles.paddingLeft,
          globalestyles.marginTopXXL,
        ]}>
        <View>
          <View>
            <Text variant="headlineMedium" style={globalestyles.headlineSmall}>
              ENTREZ VOTRE
            </Text>
            <Text
              variant="headlineMedium"
              style={[globalestyles.headlineSmall, globalestyles.colorprimary]}>
              NUMÉRO DE TÉLÉPHONE{' '}
            </Text>
          </View>
          <View>
            <Text
              variant="bodyLarge"
              style={[globalestyles.bodyLarge, globalestyles.marginTopS]}>
              Nous vous enverrons un code de confirmation via{' '}
              <Text
                variant="bodyLarge"
                style={[globalestyles.bodyLarge, globalestyles.colorprimary]}>
                WhatsApp
              </Text>
            </Text>
            <Text style={[globalestyles.TitleMedium, globalestyles.marginTopM]}>
              Entrez votre numéro de téléphone:{' '}
            </Text>
            <View>
              <View style={globalestyles.marginTopS}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    style={{
                      flex: 1,
                      height: hp(7.6),
                      maxWidth: wp(85),
                      backgroundColor: '#FFF',
                      paddingLeft: wp(10),
                    }}
                    mode="outlined"
                    placeholder="XXX XXX XXXX"
                    outlineColor="#E1E1E1"
                    id="telVerification"
                    keyboardType="phone-pad"
                    activeOutlineColor="#E97400"
                    outlineStyle={{borderWidth: 1, borderRadius: 10}}
                    onChangeText={setPhoneNumber}
                  />
                  <View style={{left: wp(-80)}}>
                    <CountryPicker
                      {...{
                        countryCode,
                        withFilter,
                        withFlag,
                        withCountryNameButton,
                        withAlphaFilter,
                        withCallingCode,
                        withEmoji,
                        onSelect,
                        translation: 'fra',
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Text
              variant="bodyLarge"
              style={[globalestyles.bodyLarge, globalestyles.marginTopM]}>
              Pas de WhatsApp ? Pour recevoir un sms{' '}
            </Text>
            <TouchableOpacity onPress={sendOTPWithSMSAndNavigate}>
              <Text
                variant="bodyLarge"
                style={[
                  globalestyles.bodyLarge,
                  globalestyles.Weight500,
                  globalestyles.colorprimary,
                ]}>
                Cliquez ici{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomButton
        buttonText="Commencer"
        disabled={loading}
        onPress={() => {
          const formattedPhone = getFormattedPhoneNumber();
          const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);
          if (!isValidPhoneNumber) {
            Alert.alert('numéro de téléphonne invalid');
            console.log('invaid car : ' + phoneNumber);
          } else if (country?.callingCode.values.toString == undefined) {
            console.log('numéro de tél valid avec undinited !!!');
            console.log('phone tél valid: ' + 225 + formattedPhone);
            setPhone(225 + formattedPhone);
            sendOTPAndNavigate();
          } else {
            console.log('numéro de tél valid !!!');
            console.log(isValidPhoneNumber);
            console.log(
              'phone tél valid: ' + country?.callingCode + formattedPhone,
            );
            setPhone(country?.callingCode + formattedPhone);
            sendOTPAndNavigate();
          }
        }}
      />
    </View>
  );
};

export default OTPSenderScreen;
