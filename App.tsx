import React from 'react';
import { Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer
        onStateChange={() => {
          Keyboard.dismiss();
        }}>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;