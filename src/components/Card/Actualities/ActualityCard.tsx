// Import the Actuality type
import { Actuality } from '../../../utils/types';

// Define the ActualityCard component
import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Text, Card } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import globalestyles from '../../../../GolbaleStyle';

// Define the ActualityCard component
const ActualityCard = ({ data }: { data: Actuality[] }) => {
  const handleCardPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        flex: 1,
        flexDirection: 'row',
        height: 200,
        overflow: 'hidden',
      }}>
      {data.map(actu => (
        <TouchableOpacity
          key={actu.id}
          onPress={() => handleCardPress(actu.Web)}
          style={globalestyles.marginTopM}>
          <Card
            style={{
              width: wp(50),
              marginRight: 20,
              flexShrink: 0,
              borderRadius: 6,
              backgroundColor: '#FFF',
            }}>
            <Card.Cover
              source={{ uri: actu.img }}
              style={{
                height: 95,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <Card.Content style={{ marginTop: 10 }}>
              <Text variant="titleSmall" style={globalestyles.Weight600}>
                {actu.title}
              </Text>
              <Text variant="bodySmall">
                {actu.content.length > 20
                  ? `${actu.content.substring(0, 20)} ...`
                  : actu.content}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ActualityCard;
