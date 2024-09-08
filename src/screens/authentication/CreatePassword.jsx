import React, { useState,useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput } from 'react-native-paper';
import CustomButton from '../../components/Buttons/Buttons';
import styles from './Styles';
import globalestyles from '../../../GolbaleStyle';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Brand from '../../components/Brand';

const CreatePasswordsScreen = ({route }) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');
  const [isSecondPasswordDisabled, setIsSecondPasswordDisabled] = useState(true);
  
  // Récupérer les données firstname et lastname depuis les paramètres de navigation
  const { firstname, lastname } = route.params;

  useEffect(() => {
    // Affichage des valeurs de firstname et lastname dans la console
    console.log('1 ================> First Name:', firstname + ' /Last Name:', lastname);
  }, []); //

  const handleNext = () => {
    navigation.navigate('CreateSecurityScreen', { firstname, lastname,password });
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (password !== text) {
      setPasswordError2('Passwords do not match');
    } else {
      setPasswordError2('');
    }
  };

  const validatePassword = (password) => {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
    );
    if (!strongRegex.test(password)) {
      setPasswordError(
        'The password must contain at least 8 characters, a lowercase letter, an uppercase letter and a number, une majuscule et un chiffre',
      );
    } else {
      setPasswordError('');
      setIsSecondPasswordDisabled(false);
    }
  };

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
          globalestyles.marginTopXL,
        ]}>
        <View>
          <Text variant="headlineSmall" style={globalestyles.headlineSmall}>
            CREEZ VOTRE
          </Text>
          <Text
            variant="headlineSmall"
            style={[globalestyles.headlineSmall, globalestyles.colorprimary]}>
            MOTS DE PASSE
          </Text>
          <View style={{ position: 'relative' }}>
            <Text style={[globalestyles.TitleMedium, globalestyles.marginTopM]}>
            votre mot de passe
            </Text>
            <View style={[globalestyles.marginTopS]}>
              <TextInput
                style={{
                  height: hp(7.6),
                  maxWidth: wp(85),
                  backgroundColor: '#FFF',
                }}
                placeholder="mot de passe"
                mode="outlined"
                outlineColor="#E1E1E1"
                activeOutlineColor="#E97400"
                outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
                value={password}
                onChangeText={handlePasswordChange}
                error={!!passwordError}
              />
              <Text style={styles.errorText}>{passwordError}</Text>
            </View>

            <View>
              <Text style={globalestyles.TitleMedium}>
                Confirmer votre mot de passe
              </Text>
              <View style={[globalestyles.marginTopS]}>
                <TextInput
                  style={{
                    height: hp(7.6),
                    maxWidth: wp(85),
                    backgroundColor: '#FFF',
                  }}
                  placeholder="confirmer mot de passe"
                  mode="outlined"
                  outlineColor="#E1E1E1"
                  activeOutlineColor="#E97400"
                  outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  disabled={isSecondPasswordDisabled}
                />
                <Text style={styles.errorText}>{passwordError2}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <CustomButton
        buttonText="Continue"
        onPress={() => {
          if (password === confirmPassword) {
            handleNext()
          }
        }}
        disabled={password !== confirmPassword}
      />
    </View>
  );
};

export default CreatePasswordsScreen;
