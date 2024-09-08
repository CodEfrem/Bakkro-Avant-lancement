import React, {useState} from 'react';
import {View, TouchableOpacity, Alert, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../authentication/Styles';
import CustomButton from '../../components/Buttons/Buttons';
import {Text, TextInput} from 'react-native-paper';
import Brand from '../../components/Brand';
import globalestyles from '../../../GolbaleStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ResetWithActualScreen = ({route}) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [inputPassWord, setInputPassWord] = useState('');
  const {password, phone} = route.params;

  const handleNext = async () => {
    setLoading(true);
    console.log('Phone:', phone);

    // If user exists, navigate to ResetCreatePasswordsScreen
    if (password === inputPassWord) {
      navigation.navigate('ResetCreatePasswordsScreen', {phone: phone});
    } else {
      Alert.alert('Erreur', 'Mot de passe actuel incorrect.');
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
          <View>
            <Text
              variant="headlineMedium"
              style={globalestyles.headlineSmall}>
              MODIFIER DE VOTRE
            </Text>
            <Text
              variant="headlineMedium"
              style={[
                globalestyles.headlineSmall,
                globalestyles.colorprimary,
              ]}>
              MOT DE PASSE
            </Text>
          </View>
          <View>
            <Text
              variant="bodyLarge"
              style={[globalestyles.bodyLarge, globalestyles.marginTopS]}>
              Entrez votre mot de passe actuel
            </Text>
            <View>
              <View style={[globalestyles.marginTopS]}>
                <TextInput
                  style={{
                    height: hp(7.6),
                    maxWidth: wp(85),
                    backgroundColor: '#FFF',
                  }}
                  placeholder="Mot de passe"
                  mode="outlined"
                  secureTextEntry={true}
                  outlineStyle={{borderWidth: 1, borderRadius: 10}}
                  outlineColor="#E1E1E1"
                  activeOutlineColor="#E97400"
                  value={inputPassWord}
                  onChangeText={text => setInputPassWord(text)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <CustomButton
        buttonText="Continuer"
        disabled={loading}
        onPress={handleNext}
      />
    </View>
  );
};

export default ResetWithActualScreen;
