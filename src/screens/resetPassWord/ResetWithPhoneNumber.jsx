import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../authentication/Styles';
import CustomButton from '../../components/Buttons/Buttons';
import { Text, TextInput } from 'react-native-paper';
import Brand from '../../components/Brand';
import globalestyles from '../../../GolbaleStyle';
import CountryPicker from 'react-native-country-picker-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { supabase } from '../../lib/supabase';

const ResetScreen = () => {
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('CI');
  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const onSelect = (selectedCountry) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
  };

  const handlePhoneChange = (value) => {
    const result = value.replace(/[a-zA-Z]/g, '');
    setPhone(result);
  };

  const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);

  const handleNext = async () => {
    if (!validatePhoneNumber(phone)) {
      Alert.alert('Veuillez entrer un numéro de téléphone valide');
      return;
    }

    setLoading(true);
    const formattedPhone = country?.callingCode ? `${country.callingCode}${phone}` : `225${phone}`;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone', formattedPhone)
        .single();

      if (error) {
        Alert.alert('Erreur lors de la récupération des données utilisateur');
        console.error('Error fetching user:', error.message);
      } else if (data) {
        navigation.navigate('ResetWithSecurityQuestionScreen', { phone: formattedPhone });
      } else {
        Alert.alert('Utilisateur non trouvé. Veuillez entrer un numéro de téléphone valide.');
      }
    } catch (err) {
      Alert.alert('Une erreur inattendue est survenue');
      console.error('Unexpected Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.body}>
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
          <Text variant="headlineMedium" style={globalestyles.headlineSmall}>
            MOTS DE PASSE OUBLIÉ
          </Text>
          <Text
            variant="headlineMedium"
            style={[globalestyles.headlineSmall, globalestyles.colorprimary]}>
            OUBLIÉ
          </Text>
          <Text
            variant="bodyLarge"
            style={[globalestyles.bodyLarge, globalestyles.marginTopS]}>
            Entrez votre numéro de téléphone
          </Text>
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
                placeholder="numéro de téléphone"
                outlineColor="#E1E1E1"
                keyboardType="phone-pad"
                activeOutlineColor="#E97400"
                outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
                onChangeText={handlePhoneChange}
              />
              <View style={{ left: wp(-80) }}>
                <CountryPicker
                  {...{
                    countryCode,
                    withFilter: true,
                    withFlag: true,
                    withCountryNameButton: false,
                    withAlphaFilter: false,
                    withCallingCode: false,
                    withEmoji: true,
                    onSelect,
                    translation: 'fra',
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <CustomButton
        buttonText="Continue"
        disabled={loading}
        onPress={handleNext}
      />
    </View>
  );
};

export default ResetScreen;
