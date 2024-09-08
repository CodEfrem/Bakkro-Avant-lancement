import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';
import CustomButton from '../../components/Buttons/Buttons';
import { Text, TextInput } from 'react-native-paper';
import Brand from '../../components/Brand';
import globalestyles from '../../../GolbaleStyle';
import CountryPicker from 'react-native-country-picker-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { supabase } from '../../lib/supabase';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('CI');
  const [country, setCountry] = useState();
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(true); // Mettez à jour cette ligne pour inclure l'indicatif
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const handlePhoneChange = value => {
    const result = value.replace(/[a-zA-Z]/g, '');
    setPhone(result);
  };

  const formatPhoneNumber = (phone, country) => {
    if (!phone.startsWith('+')) {
      return `+${country.callingCode[0]}${phone}`;
    }
    return phone;
  };

  async function signInWithPhone() {
    setLoading(true);

    const formattedPhone = formatPhoneNumber(phone, country);

    const { user, error } = await supabase.auth.signInWithPassword({
      phone: formattedPhone,
      password: password
    });

    if (error) {
      Alert.alert('Numéro de téléphone et/ou mot de passe incorrect');
    } else {
      console.log('Connexion réussie !');
    }
    setLoading(false);
  }

  return (
    <View style={styles.body}>
      <Brand />
      <View
        style={[
          styles.container,
          styles.paddingLeft,
          globalestyles.marginTopXXL,
        ]}
      >
        <View>
          <View>
            <Text variant="headlineMedium" style={globalestyles.headlineSmall}>
              CONTENT DE VOUS REVOIR{' '}
            </Text>
            <Text
              variant="headlineMedium"
              style={[globalestyles.headlineSmall, globalestyles.colorprimary]}
            >
              PARMIS NOUS
            </Text>
          </View>
          <View>
            <Text
              variant="bodyLarge"
              style={[globalestyles.bodyLarge, globalestyles.marginTopS]}
            >
              Saisissez votre numéro de téléphone et le mot de passe associé{' '}
            </Text>
            <View>
              <View style={globalestyles.marginTopS}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    style={{
                      flex: 1,
                      height: hp(7.6),
                      maxWidth: wp(85),
                      backgroundColor: '#FFF',
                      paddingLeft: wp(10),
                    }}
                    mode="outlined"
                    placeholder="numéro de télephonne"
                    outlineColor="#E1E1E1"
                    id="telVerification"
                    keyboardType="phone-pad"
                    activeOutlineColor="#E97400"
                    outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
                    onChangeText={handlePhoneChange}
                  />
                  <View style={{ left: wp(-80) }}>
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
            <View style={[globalestyles.marginTopS]}>
              <TextInput
                style={{
                  height: hp(7.6),
                  maxWidth: wp(85),
                  backgroundColor: '#FFF',
                }}
                placeholder="mot de passe"
                mode="outlined"
                // secureTextEntry={true}
                outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
                outlineColor="#E1E1E1"
                activeOutlineColor="#E97400"
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetScreen')}
            >
              <Text
                variant="bodyLarge"
                style={[globalestyles.bodyLarge, globalestyles.marginTopXS]}
              >
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>
            <Text
              variant="bodyLarge"
              style={[
                globalestyles.bodyLarge,
                globalestyles.marginTopXL,
                globalestyles.Weight500,
              ]}
            >
              Pas de compte? Pour vous inscrire{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text
                variant="bodyLarge"
                style={[
                  globalestyles.bodyLarge,
                  globalestyles.Weight500,
                  globalestyles.colorprimary,
                ]}
              >
                Cliquez ici
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomButton
        buttonText="Connexion"
        disabled={loading}
        onPress={signInWithPhone}
      />
    </View>
  );
};

export default SignInScreen;
