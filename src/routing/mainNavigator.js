import React from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/main/Home';
import CreatePostsScreen from '../screens/main/CreatePostsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

import { AntDesign, Octicons, Feather, Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const navigation = useNavigation();
  return (
    <MainTab.Navigator style={styles.mainContainer}>
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.button}>
              <AntDesign
                size={24}
                name="appstore-o"
                color={focused ? '#fff' : '#212121'}
              />
            </View>
          ),
        }}
      />

      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          title: 'Создать публикацию',
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={focused && styles.button}>
              <AntDesign
                name="plus"
                size={24}
                color={focused ? '#fff' : '#212121'}
              />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#212121" />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontSize: 17,
            color: '#212121',
          },
        }}
      />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.button}>
              <Octicons
                name="person"
                size={24}
                color={focused ? '#fff' : '#212121'}
              />
            </View>
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    tabBarStyle: {
      height: 58,
      paddingTop: 9,
      paddingBottom: 9,

      // paddingHorizontal: 82,
    },
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 40,
    backgroundColor: '#FF6C00',
    borderRadius: 20,
  },
});

export default MainTabNavigator;
