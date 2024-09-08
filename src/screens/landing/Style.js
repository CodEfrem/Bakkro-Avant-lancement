import {StyleSheet, Platform, Dimensions} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const OS = Platform.OS;

const styles = StyleSheet.create({

  headlineSmall: {
    textAlign: 'center',
    color: '#FFF',
    maxWidth: '90%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  content: {
    width: "96%",
    height: hp(25),
    backgroundColor: 'rgba(233, 116, 0, 0.76)',
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 12, // Ajustez cette valeur pour augmenter la taille des points
    height: 12, // Ajustez cette valeur pour augmenter la taille des points
    borderRadius: 6, // Assurez-vous que la bordure est la moitié de la taille pour obtenir un cercle
    marginHorizontal: 2, // Ajustez cet espace entre les points si nécessaire
  },
  activePaginationDot: {
    width: 35, // Ajustez cette valeur pour la longueur de la dot active
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },

  btnContainer: {
    position: 'absolute',
    bottom: 0,
  }
});

export default styles;
