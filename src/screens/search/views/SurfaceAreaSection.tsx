import React from 'react';
import { View, TextInput} from 'react-native';
import { Text } from 'react-native-paper';
import globalestyles from '../../../../GolbaleStyle';
const SurfaceAreaSection = ({ minSurfaceAreaVal, handleSurfaceAreaChange }) => {
  return (
    <View>
      <Text variant="titleMedium" style={globalestyles.marginTopL}>
        Superficie minimale (en m²)
      </Text>
      <View style={globalestyles.marginTopS}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[globalestyles.input]}
            placeholder="ex 60m²"
            placeholderTextColor="rgba(58, 58, 71, 0.77)"
            onChangeText={value => handleSurfaceAreaChange(value, true)}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

export default SurfaceAreaSection;
