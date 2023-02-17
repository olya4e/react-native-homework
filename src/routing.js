import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegistrationScreen from './screens/auth/RegistrationScreen';

import LoginScreen from './screens/auth/LoginScreen';
import ProfileScreen from './screens/main/ProfileScreen';
import PostsScreen from './screens/main/PostsScreen';
import CreatePostsScreen from './screens/main/CreatePostsScreen';
import { AntDesign, Octicons, Feather, Ionicons } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
export default function useRoute(isLogin) {
  if (!isLogin) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        borderTopWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      }}
      //   tabBarOptions={{
      //     tabStyle: { borderTopWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)' },
      //   }}
    >
      <MainTab.Screen
        name="Post"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.6} style={{ marginRight: 16 }}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={24} color="#212121CC" />
          ),
          headerTitleAlign: 'center',
          headerTitle: 'Публикации',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontSize: 17,
            color: '#212121',
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="plus" size={24} color="#212121CC" />
          ),
          //   headerLeft: () => (
          //     <TouchableOpacity activeOpacity={0.6} style={{ marginLeft: 16 }}>
          //       <Ionicons name="arrow-back" size={24} color="#212121CC" />
          //     </TouchableOpacity>
          //   ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Octicons name="person" size={24} color="#212121CC" />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: '#FF6C00',
  },
});
