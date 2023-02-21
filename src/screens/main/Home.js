import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import PostsScreen from '../nestedScreens/PostsScreen';
import CommentsScreen from '../nestedScreens/CommentsScreens';
import MapScreen from '../nestedScreens/MapScreen';

import { AntDesign, Feather } from '@expo/vector-icons';

const NestedScreensStack = createStackNavigator();

export default function HomeScreen(props) {
  const logOut = () => {
    console.log('logout');
  };
  return (
    <NestedScreensStack.Navigator>
      <NestedScreensStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarVisible: false,
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ marginRight: 16 }}
              onPress={() => logOut()}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
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
      <NestedScreensStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: 'Комментарии',
          tabBarVisible: false,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <AntDesign name="arrowleft" size={24} color="#212121" />
          ),
        }}
      />
      <NestedScreensStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Карта',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <AntDesign name="arrowleft" size={24} color="#212121" />
          ),
        }}
      />
    </NestedScreensStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Roboto-Medium',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
