import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    flexDirection: "column",
  },
  Right: {
    flex: 0.7,
  },
  Left: {
    flex: 0.3,
    alignItems: 'center',
  },
  carouselSection: {
    borderRightWidth: wp(4),
    borderLeftWidth: wp(4),
    borderColor: '#FFF',
  },
  GoodSection: {
    flex: 1,
    width: wp(92),
    flexShrink: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E3E3E3",
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative', // Permet de positionner les enfants absolus par rapport à ce conteneur
  },
  image: {
    width: wp(92),
    paddingLeft: wp(4), // Utilisez les fonctions de dimensionnement pour garantir l'évolutivité
    height: 350, // Ajustez la hauteur de l'image selon vos besoins
    resizeMode: 'cover', // Ajustez la méthode de redimensionnement selon vos besoins
  },
  textContainer: {
    position: 'absolute',
    paddingVertical: hp(1.5),
    left: 0,
    right: 0,
    top: hp(28), // Place le texte à 20px du bas
    paddingHorizontal: 10, // Ajoute un peu d'espace autour du texte
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond semi-transparent pour le texte
    maxWidth: wp(85),
  },
});

export default styles;
