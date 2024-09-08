import React from 'react';
import { View, TextInput} from 'react-native';
import { Text } from 'react-native-paper';
import globalestyles from '../../../../GolbaleStyle';

const BudgetSection = ({ maxBudget, handleBudgetChange }) => {
  return (
    <View>
      <Text variant="titleMedium" style={globalestyles.marginTopL}>
        Budget Maximum (en Franc CFA)
      </Text>
      <View style={globalestyles.marginTopS}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[globalestyles.input]}
            placeholder="ex 500 000"
            placeholderTextColor="rgba(58, 58, 71, 0.77)"
            onChangeText={value => handleBudgetChange(value, false)}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

export default BudgetSection;
