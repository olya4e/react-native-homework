import React from 'react';
import { StyleSheet } from 'react-native';

import AuthStackNavigator from './authNavigator';
import MainTabNavigator from './mainNavigator';

export default function useRoute(isLogin) {
  if (!isLogin) {
    return <AuthStackNavigator />;
  }
  return <MainTabNavigator />;
}
