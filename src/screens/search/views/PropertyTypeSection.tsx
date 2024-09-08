import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import { Text } from 'react-native-paper';
import styles from '../Styles'; // Importation des styles spécifiques à ce composant
import globalestyles from '../../../../GolbaleStyle';

const PropertyTypeSection = ({ propertyTypes, handlePropertyTypeClick }) => {
  return (
    <View>
      <Text variant="titleMedium" style={globalestyles.marginTopL}>
        Type de propriété ?
      </Text>
      <View style={globalestyles.marginTopM}>
        <View style={{ flexDirection: 'row' }}>
          {propertyTypes.map((propertyType: { status: boolean; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal; }, index: React.Key) => (
            <TouchableOpacity
              key={index}
              style={[
                propertyType.status === false ? styles.inactiveTag : styles.activeTag,
              ]}
              onPress={() => handlePropertyTypeClick(index)}>
              <Text
                style={propertyType.status === false ? styles.tagText : styles.activeTagText}>
                {propertyType.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PropertyTypeSection;
