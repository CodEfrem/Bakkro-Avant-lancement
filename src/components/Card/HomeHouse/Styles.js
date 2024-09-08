import { StyleSheet, Platform, Dimensions } from "react-native";
import { heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen';

const OS = Platform.OS;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative', // Permet de positionner les enfants absolus par rapport à ce conteneur
  },
  image: {
    width: wp(92),
    paddingLeft:wp(4), // Utilisez les fonctions de dimensionnement pour garantir l'évolutivité
    height: 300, // Ajustez la hauteur de l'image selon vos besoins
    resizeMode: 'cover', // Ajustez la méthode de redimensionnement selon vos besoins
  },
  textContainer: {
    position: 'absolute',
    paddingVertical:hp(1.5),
    left: 0,
    right: 0,
    top: hp(28), // Place le texte à 20px du bas
    paddingHorizontal: 10, // Ajoute un peu d'espace autour du texte
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond semi-transparent pour le texte
    maxWidth:wp(85)
  },

});

export default styles;
