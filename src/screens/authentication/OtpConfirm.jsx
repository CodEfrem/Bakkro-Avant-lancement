import React, {useState,useEffect} from 'react';
import {View, TouchableOpacity, Image, Alert} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './Styles';
import globalestyles from '../../../GolbaleStyle';
import Brand from '../../components/Brand';
import {Text, TextInput} from 'react-native-paper';
import CustomButton from '../../components/Buttons/Buttons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { supabase } from '../../lib/supabase';


const  OTPConfirmScreen = ({ route }) => {
  const { firstname, lastname, password,question,answer, phone} = route.params;

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // Affichage des valeurs de firstname et lastname dans la console
    console.log(
      '4 =================================> First Name:',
      firstname + ' /Last Name:',
      lastname + ' /password:',
      password,
      ' /question:',
      question + ' /answer:',
      answer + ' /phone:',
      phone
    );

  }, []); //

    async function verifyOTP() {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms'
    })

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      registerUser();
      setLoading(false);
      navigation.navigate('Main')
    }
  }

  async function registerUser() {
    setLoading(true);
    console.log(route.params.firstname, route.params.lastname, route.params.password,)
    try {
      // Enregistrez les informations de l'utilisateur dans votre base de données
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            phone,
            firstname:route.params.firstname,
            lastname:route.params.lastname,
            password:route.params.password,
            question:route.params.question,
            answer:route.params.answer
          }
        ]);

      if (error) {
        throw error;
      } else {
        // Affichez un message de succès ou redirigez l'utilisateur vers une autre page
        console.log('Utilisateur enregistré avec succès !');
      }
    } catch (error) {
      console.log(error)
      Alert.alert("problème pour l'enregistrement utilisateur"); // Cast error.message en string
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.body}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={false}>
      <Brand />
      <TouchableOpacity
        style={globalestyles.backArrow}
        onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/images/backArrow.png')} />
      </TouchableOpacity>
      <View
        style={[
          styles.container,
          styles.paddingLeft,
          globalestyles.marginTopXXL,
        ]}>
        <View>
          <View>
            <View>
              <Text variant="headlineSmall" style={globalestyles.headlineSmall}>
              ENTER THE
              </Text>
              <Text
                variant="headlineSmall"
                style={[
                  globalestyles.headlineSmall,
                  globalestyles.colorprimary,
                ]}>
                VERIFICATION CODE
              </Text>
            </View>
            <View>
              <Text
                variant="bodyLarge"
                style={[globalestyles.bodyLarge, globalestyles.marginTopXS]}>
               We have sent you an SMS code. To complete the process
                validation, please enter the 6-digit code below.{' '}
              </Text>

              <View style={[globalestyles.marginTopM]}>
                <TextInput
                  style={{
                    height: hp(7.6),
                    maxWidth: wp(85),
                    backgroundColor: '#FFF',
                  }}
                  onChangeText={(text) => setOtp(text)}
                  mode="outlined"
                  placeholder="Enter 6-digit code"
                  outlineColor="#E1E1E1"
                  activeOutlineColor="#E97400"
                  outlineStyle={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
            </View>
            <Text
            variant="bodyLarge"
            style={[
              globalestyles.bodyLarge,
              globalestyles.marginTopXS,
            ]}>
            No receipt? To receive a new code
          </Text>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('OTPComfirm')}>
            <Text
              variant="bodyLarge"
              style={[globalestyles.bodyLarge,globalestyles.Weight500,globalestyles.colorprimary]}>
              Click here
            </Text>
          </TouchableOpacity> */}
          </View>
        </View>
      </View>
      <View>
      </View>
        <CustomButton
          buttonText="Continue"
          disabled={loading}
          onPress={verifyOTP}
        />
    </KeyboardAwareScrollView>
  );

 
}


export default OTPConfirmScreen;