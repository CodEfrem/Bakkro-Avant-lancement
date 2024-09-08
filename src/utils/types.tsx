//types.tsx :

// Définir les paramètres acceptés par chaque écran dans votre pile de navigation principale
export type RootStackParamList = {
    Search: undefined; // Pas de paramètres requis pour SearchScreen
    FavoritesList: undefined; // Pas de paramètres requis pour SearchScreen
    propertiesDetail: { properties: propertiesData };// Paramètres requis pour propertiesDetailsScreen
  };
  
  // Définir le type de données pour la propriété
  export interface propertiesData {
    id: string;
    images: string[];
    mainimage: string;
    operation_type: string;
    property_name: string;
    city: string;
    neighborhood: string;
    nb_bedrooms: string;
    nb_rooms: string;
    area: number;
    price: number;
    nb_views: number;
    advertiser : string;
    video_type : string;
    property_description : string,
    advertisers_id: string
    // amenities : jsonb
  }
  

  export type Actuality = {
    id: number;
    title: string;
    content: string;
    img: string;
    Web: string;
  };
  
  