import React = require('react');
import {View, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {supabase} from '../../lib/supabase';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, propertiesData} from '../../utils/types';
import globalestyles from '../../../GolbaleStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import {Session} from '@supabase/supabase-js';
import SearchButton from '../../components/Buttons/SearchButton';

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

type Props = {
  navigation: SearchScreenNavigationProp;
  route: {params: {searchQuery: any}}; // Ajoutez le type de paramètre pour les filtres
  session: Session;
};

const FavoritesListScreen: React.FC<Props> = ({navigation, session}) => {
  const [favoriteProperties, setFavoriteProperties] = React.useState<
    propertiesData[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userId, setUserId] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (session) {
      console.log("OK j'ai ma session", session.user.id); // d94526bb-1db7-4fc4-b772-e573329f3559
      getUser(); // Récupère les informations de l'utilisateur
    } else console.log('KO pas de session');
  }, [session]);

  React.useEffect(() => {
    if (userId) {
      fetchFavoriteProperties(); // Récupère les propriétés favorites
      const unsubscribe = setupRealtimeSubscription(); // Configure l'abonnement Realtime
      return () => {
        unsubscribe(); // Clean up the subscription on unmount
      };
    }
  }, [userId]);

  // Fonction pour récupérer les informations de l'utilisateur
  async function getUser() {
    try {
      setLoading(true);
      // if (!session?.user) throw new Error('No user on the session!');
      const {data, error, status} = await supabase
        .from('users')
        .select('*')
        .eq('phone', session?.user.phone)
        .single();
      if (data) {
        setUserId(data.id);
      } else {
        console.error('Error fetching user data:', error);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  // Fonction pour récupérer les propriétés favorites
  async function fetchFavoriteProperties() {
    try {
      const {data, error} = await supabase
        .from('user_favoritestest')
        .select('*')
        .eq('user_id', userId);

      console.log('###', userId);

      if (error) {
        throw error;
      }
      const propertyIds = data.map((item: any) => item.property_id);
      const {data: propertiesData, error: propertiesError} = await supabase
        .from('properties')
        .select('*')
        .in('id', propertyIds);
      if (propertiesError) {
        throw propertiesError;
      }
      setFavoriteProperties(propertiesData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching favorite properties:', error);
    }
  }
  // Fonction pour configurer l'abonnement Realtime
  function setupRealtimeSubscription() {
    const channel = supabase
      .channel('user-favorites-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_favoritestest',
          filter: `user_id=eq.${userId}`,
        },
        payload => {
          console.log('Change received!', payload);
          fetchFavoriteProperties(); // Re-fetch favorites on insert
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'user_favoritestest',
          filter: `user_id=eq.${userId}`,
        },
        payload => {
          console.log('Change received!', payload);
          const deletedPropertyId = payload.old.property_id;
          setFavoriteProperties(prevProperties =>
            prevProperties.filter(
              property => property.id !== deletedPropertyId,
            ),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
  // Fonction pour retirer une propriété des favoris
  const removeFromFavorites = async (propertyId: string) => {
    try {
      const {error} = await supabase
        .from('user_favoritestest')
        .delete()
        .eq('property_id', propertyId)
        .eq('user_id', userId);
      if (error) {
        throw error;
      }
      setFavoriteProperties(prevProperties =>
        prevProperties.filter(property => property.id !== propertyId),
      );
    } catch (error) {
      console.error('Error removing property from favorites:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={globalestyles.body}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (favoriteProperties.length === 0) {
    return (
      <View style={globalestyles.body}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            variant="titleLarge"
            style={[globalestyles.Weight600, globalestyles.headlineSmall]}>
            Aucun favori trouvé.
          </Text>
          <View style={{width: wp(94), marginTop: wp(4)}}>
            <Text variant="titleMedium" style={{textAlign: 'center'}}>
              Lorque vous effectuer une recherches, appuyez sur le coeur pour
              ajouter une annonce aux favoris
            </Text>
          </View>
          <SearchButton />
        </View>
      </View>
    );
  }

  const handlepropertiesPress = (properties: propertiesData) => {
    console.log('test');
    navigation.navigate('propertiesDetail', {properties});
  };

  return (
    <View style={globalestyles.body}>
      <Header title={`Favoris (${favoriteProperties.length})`} />
      {/* <Text variant="titleLarge">Liste des Favoris ({favoriteProperties.length})</Text> */}
      <View style={globalestyles.marginTopL}>
        <FlatList
          data={favoriteProperties}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View>
              <Card
                style={{
                  width: '88%',
                  alignSelf: 'center',
                  position: 'relative',
                  backgroundColor: '#FFF',
                  flexShrink: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderWidth: 0,
                  shadowOpacity: 0,
                  shadowColor: 'white',
                  shadowOffset: {width: 0.1, height: 0.1},
                  shadowRadius: 0,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <TouchableOpacity>
                    <Image source={{uri: item.images[0]}} />
                  </TouchableOpacity>
                  {/* <View style={{flex: 1, flexDirection: 'row', padding: wp(2)}}>
                    <Text
                      variant="titleSmall"
                      style={[
                        globalestyles.Weight600,
                        globalestyles.colorprimary,
                      ]}>
                      Exclusivité chez{' '}
                    </Text>
                    <TouchableOpacity>
                      <Text
                        variant="titleSmall"
                        style={[globalestyles.Weight600]}>
                        #Nom de l'agence
                      </Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
                <TouchableOpacity onPress={() => handlepropertiesPress(item)}>
                  <Card.Cover
                    source={{uri: item.images[0]}}
                    style={{
                      height: 180,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      borderWidth: 0,
                      borderTopRightRadius: 4,
                      borderTopLeftRadius: 4,
                    }}
                  />
                </TouchableOpacity>
              </Card>
              <View
                style={{
                  width: '88%',
                  alignSelf: 'center',
                  flex: 1,
                  paddingLeft: wp(4),
                }}>
                <Text
                  variant="titleLarge"
                  style={[globalestyles.Weight600, globalestyles.marginTopS]}>
                  {item.price.toLocaleString('fr-FR')} XOF
                </Text>
                <Text
                  variant="bodyLarge"
                  style={[
                    globalestyles.bodyLarge,
                    globalestyles.Weight500,
                    globalestyles.marginTopXS,
                  ]}>
                  {item.property_name}
                </Text>
                <Text
                  variant="bodyLarge"
                  style={[globalestyles.bodyLarge, globalestyles.marginTopS]}>
                  {item.area} m²
                  <Text style={{fontSize: 40, lineHeight: 0}}>. </Text>
                  {item.nb_rooms == '1'? `${item.nb_rooms} piéce` : `${item.nb_rooms} piéces`}
                  {item.nb_bedrooms == '0'
                    ? ''
                    : `. ${item.nb_bedrooms} chambre(s)`}
                </Text>
                <Text
                  variant="bodyLarge"
                  style={[globalestyles.bodyLarge, globalestyles.Weight500]}>
                  {item.neighborhood}, {item.city}
                </Text>
              </View>
              <View style={{width: '88%', alignSelf: 'center'}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    left: wp(4),
                    top: wp(-38),
                    width: 180,
                    height: 22,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '100%',
                      width: '45%',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: 6,
                      justifyContent: 'center',
                    }}>
                    <Text variant="bodySmall">{item.video_type}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
                  <View
                    style={{
                      left: wp(65),
                      top: wp(-40),
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      borderRadius: 38,
                      flex: 1,
                      justifyContent: 'center',
                      backgroundColor: '#FFF',
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 4},
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 8,
                    }}>
                    <Image source={require('../../assets/images/Basket.png')} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default FavoritesListScreen;
