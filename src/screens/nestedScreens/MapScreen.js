import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

export default function MapScreen({ navigation, route }) {
  const [location, setLocation] = useState(null);

  console.log(route.params.location.latitude);
  console.log(route.params.location.longitude);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        // tabBarStyle: undefined
        tabBarStyle: {
          height: 58,
          paddingTop: 9,
          paddingBottom: 9,
          // paddingHorizontal: 82,
        },
      });
  }, [navigation]);

  useEffect(() => {
    if (route.params === undefined) {
      return;
    }
    setLocation({ ...route.params.location });
  }, [route.params]);

  return (
    <View style={styles.container}>
      {!location ? null : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
