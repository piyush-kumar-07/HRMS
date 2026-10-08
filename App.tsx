import React from 'react';
import { Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <NavigationContainer
      onStateChange={() => {
        Keyboard.dismiss();
      }}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;