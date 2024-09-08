// AgentProfileScreen
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet
} from "react-native";
import Header from "../../../components/Header";
import ListingCard from "../../../components/Card/AgenceHouse/ListingCard";
import globalestyles from "../../../../GolbaleStyle";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const AgentProfileScreen = ({ navigation }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(2);
  let searchData = [
    {
      id: 1,
      // image: require("../../../assets/Cottage.png"),
      title: "Willowcroft Cottage",
      desp: "4517 Washington Ave. Manchester 39495",
      liked: true,
      price: "$750.90",
      // Icon: <Location />,
    },
    {
      id: 2,
      // image: require("../../../assets/Diamonds.png"),
      title: "Kpsum dolor",
      desp: "Lorem ipsum dolor sit amet cons ectetur....",
      price: "$952.90",
      liked: false,
      // Icon: <Location />,
    },
    {
      id: 3,
      // image: require("../../../assets/Cottage.png"),
      title: "Kpsum dolor",
      desp: "Lorem ipsum dolor sit amet cons ectetur....",
      liked: false,
      price: "$750.90",
      // Icon: <Location />,
    },
  ];
  return (
    <View style={globalestyles.body}>
      <Header title={"Agent Profile"}  />
      <View style={{alignSelf:'center', width:wp(90)}}>

      <View style={styles.profileInfoContainer}>
        {/* <MainProfileImage /> */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text style={styles.agentName}>Louisa Simon</Text>
          <Text style={styles.designation}>(Agent)</Text>
        </View>
        <View style={styles.ratingsContainer}>
          {/* <Stars /> */}
          <Text style={styles.ratings}>(2)</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setCurrentActiveTab(1)}
          style={currentActiveTab == 1 ? styles.activeTab : styles.inactiveTab}
        >
          <Text
            style={
              currentActiveTab == 1
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            À propos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentActiveTab(2)}
          style={currentActiveTab == 2 ? styles.activeTab : styles.inactiveTab}
        >
          <Text
            style={
              currentActiveTab == 2
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            Annonces
          </Text>
        </TouchableOpacity>
      </View>
      {currentActiveTab == 1 && (
        <View style={{ marginTop: 20 }}>
          <View style={styles.comentTextContainer}>
            <Text style={styles.aboutText}>
              Fort de trois années d'expérience passionnée dans l'immobilier,
              Je m'engage à offrir à mes clients une expérience exceptionnelle et sans stress.
              Ayant déjà conclu de nombreuses transactions réussies,
              mon engagement envers l’excellence et ma connaissance approfondie du
              le marché local me permet de guider mes clients à chaque étape de leur
              parcours immobilier. Que vous cherchiez à vendre votre maison actuelle
              ou trouver le bien idéal, je suis là pour vous proposer un service personnalisé et professionnel
              service.
            </Text>
          </View>
        </View>
      )}
      {currentActiveTab == 2 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20 }}>
            {searchData.map((item, index) => (
              <ListingCard
                key={item.id}
                details={{ ...item, index }}
                customStyles={{
                  marginBottom: 20,
                  justifyContent: "flex-start",
                }}
              />
            ))}
          </View>
        </ScrollView>
      )}
      </View>
    </View>
  );
}

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

export default AgentProfileScreen;
