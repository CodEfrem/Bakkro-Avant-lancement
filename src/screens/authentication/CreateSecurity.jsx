import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, Text,Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import globalestyles from '../../../GolbaleStyle';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Brand from '../../components/Brand';
import CustomButton from '../../components/Buttons/Buttons';

const CreateSecurityScreen = ({route}) => {
  const {firstname, lastname, password} = route.params;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const securityQuestions = [
    'Quelle est votre couleur préférée ?',
    'Quel est le nom de jeune fille de votre mère ?',
    'Quel est votre plat préféré ?',
    'Quel est votre lieu de naissance ?',
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleQuestionSelect = selectedQuestion => {
    setQuestion(selectedQuestion.replace(/undefined|NaN/g, ''));
    setSelectedValue(selectedQuestion);
    setIsOpen(false); // Fermer la liste déroulante après la sélection
  };

  const navigation = useNavigation();

  const handleNext = () => {
    if (!(question.trim() !== '')) {
      Alert.alert('Error', 'Veuillez sélectionner une question de sécurité');
    } else if (validateInputs()) {
      navigation.navigate('OTPSenderScreen', {
        firstname,
        lastname,
        password,
        question,
        answer,
      });
    }
  };

  useEffect(() => {
    // Affichage des valeurs de firstname et lastname dans la console
    console.log(
      '2 ========================> First Name:',
      firstname + ' /Last Name:',
      lastname + ' /password:',
      password,
    );
  }, []);

  const validateInputs = () => {
    if (
      answer.length > 0 &&
      answer.length <= 50 &&
      /^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ'-]+)?$/.test(answer)
    ) {
      return true;
    } else {
      Alert.alert('Error', 'Format de réponse incorrect');
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
              QUESTION ET
            </Text>
            <Text
              variant="headlineMedium"
              style={[globalestyles.headlineSmall, globalestyles.colorprimary]}>
              RÉPONSE DE SÉCURITÉ
            </Text>
            <Text
              variant="bodyLarge"
              style={[globalestyles.bodyLarge, globalestyles.marginTopS]}>
              Donnez-vous un autre moyen de récupérer votre compte en cas
              d'oubli mots de passe
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[globalestyles.TitleMedium, globalestyles.marginTopM]}>
                Une question
              </Text>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={{paddingTop: wp(5.5)}}>
                {isOpen ? (
                  <Image source={require('../../assets/images/TopArrow.png')} />
                ) : (
                  <Image
                    source={require('../../assets/images/DownArrow.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text
              variant="bodyLarge"
              style={[
                globalestyles.marginTopS,
                globalestyles.Weight600,
                globalestyles.bodyLarge,
              ]}>
              Votre question:{' '}
              <Text style={globalestyles.colorprimary}>{selectedValue}</Text>
            </Text>
            <View>
              {isOpen && (
                <View>
                  {securityQuestions.map((question, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleQuestionSelect(question)}>
                      <Text>{question}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <Text style={[globalestyles.TitleMedium, globalestyles.marginTopM]}>
              Une réponse
            </Text>
            <View style={[globalestyles.marginTopS]}>
              <TextInput
                style={{
                  height: hp(7.6),
                  maxWidth: wp(85),
                  backgroundColor: '#FFF',
                }}
                placeholder="réponse"
                mode="outlined"
                outlineColor="#E1E1E1"
                activeOutlineColor="#E97400"
                outlineStyle={{borderRadius: 10}}
                onChangeText={text => setAnswer(text)}
                value={answer}
              />
            </View>
          </View>
        </View>
      </View>
      <CustomButton
  buttonText="Continue"
  onPress={handleNext} // Passer une référence à la fonction handleNext
/>
    </View>
  );
};

export default CreateSecurityScreen;

