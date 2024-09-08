import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput } from 'react-native-paper';
import CustomButton from '../../components/Buttons/Buttons';
import styles from '../authentication/Styles';
import globalestyles from '../../../GolbaleStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Brand from '../../components/Brand';
import { supabase } from '../../lib/supabase';

const ResetCreatePasswordsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { phone } = route.params;
  console.log('Phone:', phone);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');
  const [isSecondPasswordDisabled, setIsSecondPasswordDisabled] = useState(true);

  const handlePasswordChange = (text: React.SetStateAction<string>) => {
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
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
    );
    if (!strongRegex.test(password)) {
      setPasswordError(
        'The password must contain at least 8 characters, a lowercase letter, an uppercase letter and a number.'
      );
    } else {
      setPasswordError('');
      setIsSecondPasswordDisabled(false);
    }
  };

  const handleNext2 = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Les mots de passe ne correspondent pas');
      return;
    }
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone)
      .single();

    if (error) {
      console.error('Error fetching user:', error.message);
      return;
    }

    if (data) {
      console.log('User ID:', data.id);

      try {
        // Directly update the password using Supabase's auth updateUser method
        const { error: updateError } = await supabase.auth.updateUser({
          password: password,
        });

        if (updateError) {
          console.error("Erreur de mise à jour de l'utilisateur:", updateError);
          throw updateError;
        } else {
          console.log('Mot de passe mis à jour avec succès !');
          navigation.navigate('Auth');
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        Alert.alert("Problème lors de la mise à jour de l'utilisateur");
      }
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
          globalestyles.marginTopXL,
        ]}>
        <View>
          <Text variant="headlineSmall" style={globalestyles.headlineSmall}>
            CRÉEZ VOTRE NOUVEAU{' '}
          </Text>
          <Text
            variant="headlineSmall"
            style={[globalestyles.headlineSmall, globalestyles.colorprimary]}>
            MOTS DE PASSE{' '}
          </Text>
          <View style={{position: 'relative'}}>
            <Text style={[globalestyles.TitleMedium, globalestyles.marginTopM]}>
              Créez votre nouveau mot de passe
            </Text>
            <View style={[globalestyles.marginTopS]}>
              <TextInput
                style={{
                  height: hp(7.6),
                  maxWidth: wp(85),
                  backgroundColor: '#FFF',
                }}
                placeholder="Password"
                mode="outlined"
                outlineColor="#E1E1E1"
                activeOutlineColor="#E97400"
                outlineStyle={{borderWidth: 1, borderRadius: 10}}
                value={password}
                onChangeText={handlePasswordChange}
                error={!!passwordError}
              />
              <Text style={styles.errorText}>{passwordError}</Text>
            </View>

            <View>
              <Text style={globalestyles.TitleMedium}>
                Confirmez votre mot de passe{' '}
              </Text>
              <View style={[globalestyles.marginTopS]}>
                <TextInput
                  style={{
                    height: hp(7.6),
                    maxWidth: wp(85),
                    backgroundColor: '#FFF',
                  }}
                  placeholder="Confirm your password"
                  mode="outlined"
                  outlineColor="#E1E1E1"
                  activeOutlineColor="#E97400"
                  outlineStyle={{borderWidth: 1, borderRadius: 10}}
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
        onPress={handleNext2}
        disabled={password !== confirmPassword}
      />
    </View>
  );
};

export default ResetCreatePasswordsScreen;
