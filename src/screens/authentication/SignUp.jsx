import React, {useState} from 'react';
import {View, Alert, TouchableOpacity, Image} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import styles from './Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

import Brand from '../../components/Brand';
import globalestyles from '../../../GolbaleStyle';
import CustomButton from '../../components/Buttons/Buttons';

const SignUpScreen = ({route}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const navigation = useNavigation();

  const handleNext = () => {
    if (validateInputs()) {
      navigation.navigate('CreatePasswordsScreen', {firstname, lastname});
    }
  };
  const validateInputs = () => {
    // Vérification du nombre de caractères et de la présence de caractères dans chaque champ
    if (
      firstname.length > 0 &&
      firstname.length <= 50 &&
      /^[a-zA-Z]+$/.test(firstname) &&
      lastname.length > 0 &&
      lastname.length <= 50 &&
      /^[a-zA-Z]+$/.test(lastname)
    ) {
      // Toutes les conditions sont respectées, le bouton peut être activé
      return true;
    } else {
      // Affichage d'une alerte pour informer l'utilisateur des conditions non respectées
      Alert.alert(
        'Error',
        'Please check that your first and last name are between 1 and 50 characters long and only contain letters',
      );
      return false;
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
          <View>
            <Text variant="headlineMedium" style={globalestyles.headlineSmall}>
              ENTREZ VOTRE
            </Text>
            <Text
              variant="headlineMedium"
              style={[globalestyles.headlineSmall, globalestyles.colorprimary]}>
              PRÉNOM ET NOM{' '}
            </Text>
          </View>
          <View>
            <Text style={[globalestyles.TitleMedium, globalestyles.marginTopM]}>
              Votre nom de famille
            </Text>
            <View style={[globalestyles.marginTopS]}>
              <TextInput
                style={{
                  height: hp(7.6),
                  maxWidth: wp(85),
                  backgroundColor: '#FFF',
                }}
                placeholder="Nom"
                mode="outlined"
                outlineColor="#E1E1E1"
                activeOutlineColor="#E97400"
                outlineStyle={{borderWidth: 1, borderRadius: 10}}
                onChangeText={text => setLastname(text)}
                value={lastname}
              />
            </View>
            <Text style={[globalestyles.TitleMedium, globalestyles.marginTopM]}>
              Votre prénom{' '}
            </Text>
            <View style={[globalestyles.marginTopS]}>
              <TextInput
                style={{
                  height: hp(7.6),
                  maxWidth: wp(85),
                  backgroundColor: '#FFF',
                }}
                placeholder="prénom"
                mode="outlined"
                outlineColor="#E1E1E1"
                activeOutlineColor="#E97400"
                outlineStyle={{borderWidth: 1, borderRadius: 10}}
                onChangeText={text => setFirstname(text)}
                value={firstname}
              />
            </View>
          </View>
        </View>
      </View>
      <CustomButton buttonText="Continuer" onPress={handleNext} />
    </View>
  );
};

export default SignUpScreen;
