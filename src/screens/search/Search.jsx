import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import globalestyles from '../../../GolbaleStyle';
import Header from '../../components/Header';
import SearchButton from '../../components/Buttons/SearchButton';
import {supabase} from '../../lib/supabase';
import {useNavigation} from '@react-navigation/native';
import SessionContext from '../../utils/SessionContext';

const PropertyItem = ({item, onPress}) => (
  <TouchableOpacity
    onPress={() => onPress(item)}
    style={globalestyles.marginTopM}>
    <Card style={styles.card}>
      <Card.Cover source={{uri: item.images[0]}} style={styles.cardCover} />
    </Card>
    <View style={styles.cardContent}>
      <Text variant="titleMedium" style={globalestyles.Weight600}>
        {item.property_name}
        <Text style={styles.dot}> . </Text>
        {item.nb_rooms} piéces
      </Text>
      <Text variant="bodyLarge" style={styles.bodyLarge}>
        {item.neighborhood}
        <Text style={styles.dot}> . </Text>
        {item.city}
      </Text>
      <Text variant="titleMedium" style={globalestyles.Weight600}>
        {item.price.toLocaleString('fr-FR')} XOF
      </Text>
      <View style={styles.viewsContainer}>
        <Image
          source={require('../../assets/images/Eye2.png')}
          style={styles.eyeIcon}
        />
        <Text>{item.nb_views}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SearchScreen = () => {
  const [popularProperties, setPopularProperties] = useState([]);
  const [newProperties, setNewProperties] = useState([]);
  const navigation = useNavigation()

  useEffect(() => {
    const fetchPopularProperties = async () => {
      try {
        const {data, error} = await supabase
          .from('properties')
          .select('*')
          .order('nb_views', {ascending: false})
          .limit(12);
        if (error) throw error;
        setPopularProperties(data);
      } catch (error) {
        console.error('Error fetching popular properties:', error);
      }
    };

    const fetchNewProperties = async () => {
      try {
        const {data, error} = await supabase
          .from('properties')
          .select('*')
          .order('created_at', {ascending: false})
          .limit(12);
        if (error) throw error;
        setNewProperties(data);
      } catch (error) {
        console.error('Error fetching new properties:', error);
      }
    };

    fetchPopularProperties();
    fetchNewProperties();
  }, []);

  const handlePropertiesPress = (properties) => {
    navigation.navigate('propertiesDetail', {properties});
  };

  const renderItem = ({item}) => (
    <PropertyItem key={item.id} item={item} onPress={handlePropertiesPress} />
  );

  return (
    <View style={globalestyles.body}>
      <Header title="Recherche" />
      <View style={globalestyles.paddingLeft}>
        <ScrollView>
          <View>
            <SearchButton />
          </View>
          <View style={globalestyles.marginTopM}>
            <Text variant="titleLarge" style={globalestyles.Weight500}>
              Les plus populaires
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={popularProperties}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          <View style={globalestyles.marginTopM}>
            <Text variant="titleLarge" style={globalestyles.Weight500}>
              Les nouveautés
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={newProperties}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(51),
    marginRight: 20,
    flexShrink: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 0,
    backgroundColor: 'white',
    shadowOpacity: 0,
    shadowColor: 'white',
    shadowOffset: {width: 0.1, height: 0.1},
    shadowRadius: 0,
  },
  cardCover: {
    height: 123.53,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 0,
  },
  cardContent: {
    flex: 1,
    paddingLeft: 10,
    marginTop: 10,
    paddingBottom: 10,
  },
  dot: {
    color: '#E97400',
    fontSize: 40,
    lineHeight: 0,
  },
  bodyLarge: {
    marginVertical: wp(1),
  },
  viewsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp(1.2),
  },
  eyeIcon: {
    marginRight: 10,
    marginTop: 1,
  },
});

export default SearchScreen;
