import React from 'react';
import {Button, Text, View} from 'react-native';

const PayScannerScreen = ({navigation: {goBack}}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>This is Pay Scanner Screen!</Text>
      <Button onPress={() => goBack()} title="GO BACK"></Button>
    </View>
  );
};

export default PayScannerScreen