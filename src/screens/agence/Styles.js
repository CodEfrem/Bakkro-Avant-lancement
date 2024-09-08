import { StyleSheet, Platform } from "react-native";
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
    flex: 1,
  },
  profileInfoContainer: {
    marginTop: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  agentName: {
    fontFamily: "bold",
    fontSize: 18,
    color: "#000",
  },
  designation: {
    fontFamily: "regular",
    fontSize: 10,
    color: "#000",
    marginLeft: 2,
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratings: {
    fontFamily: "regular",
    fontSize: 10,
    color: "#000",
    marginLeft: 2,
  },
  tabsContainer: {
    marginTop: 33,
    flexDirection: "row",
  },
  inactiveTab: {
    borderBottomWidth: 1,
    borderBottomColor: "#E9E4E4",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inactiveTabText: {
    fontFamily: "bold",
    fontSize: 16,
    color: "#808080",
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "#E97400",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  activeTabText: {
    fontFamily: "bold",
    fontSize: 16,
    color: "#E97400",
  },
  agentInfo: {
    flexDirection: "row",
  },
  agentNameContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    marginLeft: 8,
  },
  agentName: {
    fontFamily: "bold",
    fontSize: 13,
    color: "#000",
  },
  designation: {
    fontFamily: "regular",
    fontSize: 10,
    color: "#000",
    marginLeft: 2,
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratings: {
    fontFamily: "regular",
    fontSize: 10,
    color: "#000",
    marginLeft: 2,
  },
  comentTextContainer: {
    marginTop: 10,
  },
  aboutText: {
    fontFamily: "light",
    fontSize: 16,
    maxWidth: "90%",
  },

});
export default styles;
