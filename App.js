import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import useRoute from './src/routing';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const loadFonts = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    );
  }
  const routing = useRoute(true);

  return (
    <>
      <NavigationContainer>{routing}</NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // justifyContent: 'center',
  },
});

// auth
{
  //    <AuthStack.Navigator>
  //   <AuthStack.Screen
  //     options={{ headerShown: false }}
  //     name="Login"
  //     component={LoginScreen}
  //   />
  //   <AuthStack.Screen
  //     options={{ headerShown: false }}
  //     name="Register"
  //     component={RegistrationScreen}
  //   />
  // </AuthStack.Navigator>;
}
