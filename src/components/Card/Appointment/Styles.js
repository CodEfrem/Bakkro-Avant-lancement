import { StyleSheet, Platform } from "react-native";
const OS = Platform.OS;

const styles = StyleSheet.create({
  cardContainer: {
    // flexDirection: "row",
  },
  card: {
    marginBottom: 15,
    // width: "100%",
    backgroundColor: "white",
    borderRadius: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    marginLeft: 0.5,
    marginRight: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTextContainer: {
    // padding: 11,
    paddingHorizontal: 11,
  },
  cardTitle: {
    fontFamily: "bold",
    fontSize: 17,
    color: "#000",
  },
  cardDesp: {
    fontFamily: "light",
    fontSize: 10,
    color: "#000",
    marginTop: 2,
    marginLeft: 4,
  },
  viewDetails: {
    fontFamily: "bold",
    fontSize: 12,
    color: "#E97400",
    marginTop: 11,
  },
  image: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 4,
  },
});
export default styles;
