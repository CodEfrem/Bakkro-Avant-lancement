import { StyleSheet, Platform, Dimensions } from "react-native";
import { heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen';

const OS = Platform.OS;


const styles = StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingLeft: 25,
    paddingRight: 25,

    paddingTop: "20%",
  },
  bodyContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#FFF",
  },
  inactiveTag: {
    height: wp(12),
    minWidth:wp(25),
    backgroundColor: "rgba(238, 238, 238, 0.38)",
    borderRadius: 36,
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginRight: 10,
    // backgroundColor: "red",
  },
  tagText: {
    fontFamily: "bold",
    paddingHorizontal:wp(1),
    fontSize: 15,
    color: "rgba(58, 58, 71, 0.77)",
  },

  activeTag: {
    height: wp(12),
    minWidth:wp(25),
    backgroundColor: "#E97400",
    borderRadius: 36,
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginRight: 10,
  },
  activeTagText: {
    fontFamily: "bold",
    paddingHorizontal:wp(1),
    fontSize: 15,
    color: "#FFF",
    paddingHorizontal:wp(1)
  },
  cityTag : {
    marginBottom:20
  },
  inactiveWorkshopTag: {
    height: 51,
    width: wp(16),
    backgroundColor: "rgba(238, 238, 238, 0.38)",
    borderRadius: 30,
    paddingHorizontal:10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginRight: 8,
  },
  activeWorkshopTag: {
    height: 51,
    width: wp(16),
    backgroundColor: "#E97400",
    borderRadius: 30,
    paddingHorizontal:10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginRight: 8,
  },
  activeWorkshopTagText: {
    fontFamily: "bold",
    fontSize: 14,
    color: "#FFF",
  },

  disableWorkshopsButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  disableWorkshopsButtonDisabled: {
    opacity: 0.5, // Opacité réduite lorsque le bouton est désactivé
  },
  disableWorkshopsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  }

});

export default styles;
