import { StyleSheet, Platform, Dimensions } from 'react-native';

const OS = Platform.OS;
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: height * 0.05, // Ajustez l'espacement en fonction de la hauteur de l'écran
    textAlign: 'center',
    fontFamily: 'Oxygen',
    fontWeight: '300',
    fontSize: width * 0.05, // Ajustez la taille de la police en fonction de la largeur de l'écran
    width: width * 0.7, // Ajustez la largeur en fonction de la largeur de l'écran
  },
});

export default styles;
