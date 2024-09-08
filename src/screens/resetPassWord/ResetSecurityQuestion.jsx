import React, {useState,useEffect} from 'react';
import {View, TouchableOpacity,Image} from 'react-native';
import {supabase} from '../../lib/supabase';
import {useNavigation, useRoute} from '@react-navigation/native';
import globalestyles from '../../../GolbaleStyle';
import styles from '../authentication/Styles';
import CustomButton from '../../components/Buttons/Buttons';
import {Text, TextInput} from 'react-native-paper';
import Brand from '../../components/Brand';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ResetWithSecurityQuestionScreen = ({route}) => {
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const navigation = useNavigation();
  const {phone} = route.params;

  useEffect(() => {
    console.log("BBBB",phone);

    async function fetchData() {
      const { data, error } = await supabase
        .from('users')
        .select('answer,question')
        .eq('phone', phone)
        .single();

      if (data) {
        setQuestion(data.question);
      } else if (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [phone]);

  const handleCheckAnswer = async () => {
    // Fetch the answer from Supabase for comparison
    const {data, error} = await supabase
      .from('users')
      .select('answer,question')
      .eq('phone', phone)
      .single();

    if (error) {
      console.error('Error fetching answer:', error.message);
      return;
    }

    // Check if the provided answer matches the stored answer
    if (answer === data.answer) {
      // If answer is correct, navigate to ResetPasswordScreen
      navigation.navigate('ResetCreatePasswordsScreen', {phone});
    } else {
      // Handle incorrect answer
      alert('Incorrect answer. Please try again.');
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
            <Text variant="headlineMedium" style={globalestyles.headlineSmall}>
             QUESTION ET{' '}
            </Text>
            <Text
              variant="headlineMedium"
              style={[globalestyles.headlineSmall, globalestyles.colorprimary]}>
              RÉPONSE DE SÉCURITÉ
            </Text>
          </View>
          <View>
            <Text
              variant="bodyLarge"
              style={[globalestyles.bodyLarge, globalestyles.marginTopS]}>
              Répondez à la question de sécurité pour réinitialiser votre mot de passe :
            </Text>
             {/* <Text>Security Question: {question}</Text> */}

          </View>
          <Text style={[globalestyles.TitleMedium, globalestyles.marginTopM,globalestyles.Weight500]}>
         {question}
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
       <CustomButton
        buttonText="Continue"
        onPress={handleCheckAnswer} 
      />
    </View>
  );
};

export default ResetWithSecurityQuestionScreen;
