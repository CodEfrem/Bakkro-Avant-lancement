import React, {useEffect, useState, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Text} from 'react-native-paper';
import globalestyles from '../../../../GolbaleStyle';
import {supabase} from '../../../lib/supabase';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const AgentProfileScreen = ({navigation, route}) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(2);
  const [advertiserDetails, setAdvertiserDetails] = useState({
    logo: '',
    type: '',
    name: '',
    city: '',
    description: '',
  });
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const advertiserId = route.params.advertiserId;
  const [isTruncated, setIsTruncated] = useState(true);
  const maxLength = 173;

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const displayedText = isTruncated
    ? `${advertiserDetails.description.substring(0, maxLength)}...`
    : advertiserDetails.description;

  useEffect(() => {
    const fetchAdvertiserDetails = async () => {
      try {
        const {data: advertiserData, error: advertiserError} = await supabase
          .from('advertiserpremium')
          .select('*')
          .eq('id', advertiserId)
          .single();

        if (advertiserError) throw advertiserError;
        setAdvertiserDetails(advertiserData);
      } catch (error) {
        setError('Error fetching advertiser details');
        console.error('Error fetching advertiser details:', error);
      }
    };

    const fetchListings = async () => {
      try {
        const {data: listingsData, error: listingsError} = await supabase
          .from('properties')
          .select('*')
          .eq('advertisers_id', advertiserId);

        if (listingsError) throw listingsError;
        setListings(listingsData);
      } catch (error) {
        setError('Error fetching listings');
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertiserDetails();
    fetchListings();
  }, [advertiserId]);

  const filterListings = useCallback(
    type => {
      return listings.filter(item => item.operation_type === type);
    },
    [listings],
  );

  const renderListings = useCallback(
    listings => {
      return listings.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate('PropertyDetails', {propertyId: item.id})
          }>
          <View style={styles.listingContainer}>
            <View style={styles.listingContent}>
              <View style={styles.listingImageContainer}>
                <Image
                  source={{uri: item.images[0]}}
                  style={styles.listingImage}
                />
              </View>
              <View>
                <Text variant="titleSmall">
                  {item.property_name} . {item.nb_rooms} pièces
                </Text>
                <Text variant="bodySmall">
                  {item.city}, {item.neighborhood}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ));
    },
    [navigation],
  );

  const Tabs = React.memo(() => (
    <View style={globalestyles.marginTopM}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setCurrentActiveTab(1)}
          style={
            currentActiveTab === 1 ? styles.activeTab : styles.inactiveTab
          }>
          <Text
            style={
              currentActiveTab === 1
                ? styles.activeTabText
                : styles.inactiveTabText
            }>
            Biens en vente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentActiveTab(2)}
          style={
            currentActiveTab === 2 ? styles.activeTab : styles.inactiveTab
          }>
          <Text
            style={
              currentActiveTab === 2
                ? styles.activeTabText
                : styles.inactiveTabText
            }>
            Biens en location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ));

  return (
    <View style={globalestyles.body}>
      <View style={globalestyles.marginTopL}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={globalestyles.backArrow}
          onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Image source={require('../../../assets/images/backArrow.png')} />
          </View>
        </TouchableOpacity>
        <View style={{alignSelf: 'center', width: '90%'}}>
          <View style={styles.profileInfoContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={{
                  uri: advertiserDetails.logo,
                }}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={globalestyles.marginTopL}>
            <Text variant="titleLarge" style={[globalestyles.Weight600]}>
              {advertiserDetails.type}
            </Text>
            <Text
              variant="bodyLarge"
              style={[globalestyles.Weight600, globalestyles.colorprimary]}>
              {advertiserDetails.name}
            </Text>
            <Text variant="bodyMedium">
              16 place de Ruel {advertiserDetails.city}
            </Text>
            <Text
              variant="titleMedium"
              style={[globalestyles.Weight600, globalestyles.marginTopM]}>
              A propos
            </Text>
            <Text style={styles.description}>{displayedText}</Text>
            {advertiserDetails.description.length > maxLength && (
              <TouchableOpacity onPress={toggleTruncate}>
                <Text style={{color:'#808080',fontWeight:'600'}}>
                  {isTruncated ? '+ Lire plus' : '- Voir moins'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={globalestyles.paddingLeft}>
          <Text
            variant="titleMedium"
            style={[globalestyles.Weight600, globalestyles.marginTopM]}>
            Biens disponibles de l'agence immobiliére
          </Text>
          <Tabs />
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#E97400"
              style={{marginTop: 20}}
            />
          ) : error ? (
            <View style={{marginTop: 20}}>
              <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
            </View>
          ) : (
            <View style={{marginTop: 20}}>
              <View style={{width: '100%', flex: 1}}>
                {currentActiveTab === 1
                  ? renderListings(filterListings('Achat'))
                  : renderListings(filterListings('Location'))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileInfoContainer: {
    marginTop: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  inactiveTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9E4E4',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inactiveTabText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#808080',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#E97400',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  activeTabText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E97400',
  },
  backButton: {
    padding: 10,
  },
  listingContainer: {
    width: wp(90),
    height: wp(28),
    marginTop: 20,
  },
  listingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  listingImageContainer: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  listingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    marginTop: 2,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    minWidth: wp(60),
    minHeight: wp(25),
  },
});

export default AgentProfileScreen;
