import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View ,useWindowDimensions} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface ButtonProps extends TouchableOpacityProps {
  buttonText: string;
}

export const CustomButton: React.FC<ButtonProps> = ({ onPress, buttonText, ...rest }) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress} {...rest}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CustomButtonText: React.FC<ButtonProps> = ({ onPress, buttonText, ...rest }) => {
  return (
    <View style={styles.TextBtnContainer}>
      <TouchableOpacity onPress={onPress} {...rest}>
        <Text style={styles.TextButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({

  btnContainer: {
    position: 'absolute',
    bottom:  wp(10),
    left: 0,
    right: 0,
    alignItems: "center", // Centrer horizontalement
  },

  TextBtnContainer: {
    bottom:   wp(30),
  },

  button: {
    height: wp(15),
    width: wp(80),
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
  },
  TextButtonText: {
    color: '#E97400',
    textAlign: 'center',
    fontFamily: 'Oxygen',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16, // Vous pouvez ajuster cela selon vos besoins
    textDecorationLine: 'underline',
  },
});

export default CustomButton; // Exporter CustomButton comme un composant par défaut
