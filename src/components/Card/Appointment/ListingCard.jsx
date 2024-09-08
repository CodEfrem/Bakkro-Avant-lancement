import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
// import { Liked, NotLiked, Edit } from "../../../assets/svgs/svg";
import styles from "./Styles";

const ListingCard = ({ details, type, customStyles, editIcon }) => {
  const { title, desp, image, index, price, liked, Icon } = details;
  // console.log(image);
  return (
    <View style={[styles.cardContainer]}>
      <View style={[styles.card, customStyles]}>
        <Image style={styles.image} source={image} />

        <View style={styles.cardTextContainer}>
          <View>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={{ flexDirection: "row", marginTop: 6 }}>
              {Icon}
              <Text numberOfLines={2} style={styles.cardDesp}>
                {desp}
              </Text>
            </View>
            <Text style={styles.viewDetails}>View details</Text>
          </View>
        </View>
        {editIcon && (
          <TouchableOpacity>
            <Text>changer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ListingCard;
