import React from 'react';
import { View, TouchableOpacity,TouchableOpacityProps, Text, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface ButtonProps extends TouchableOpacityProps {
    buttonText: string;
  }
  
const SearchPropertyButton : React.FC<ButtonProps> = ({ onPress, ...rest }) => {

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress} {...rest}>
        <Text style={styles.buttonText}>Recherher</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

    btnContainer: {
        alignSelf:'center',
        paddingVertical:hp(3.6)
      },
      button: {
        height: 63,
        width: 323,
        backgroundColor: "#E97400",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
      },
      buttonText: {
        fontFamily: 'Oxygen',
        fontWeight: '600',
        fontSize: 16,
        color: "#FFF",
      }
});

export default SearchPropertyButton;
