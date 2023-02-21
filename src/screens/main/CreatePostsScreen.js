import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Keyboard,
  ScrollView,
  Pressable,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  FontAwesome5,
  Octicons,
  Feather,
  SimpleLineIcons,
} from '@expo/vector-icons';

import * as Location from 'expo-location';

export default function CreatePostsScreen({ navigation }) {
  const [isLandscape, setIsLandscape] = useState(false);
  const [title, setIsTitle] = useState('');
  const [address, setIsAddress] = useState('');
  const [isFocusInputTitle, setIsFocusInputTitle] = useState(false);
  const [isFocusInputAddress, setIsFocusInputAdress] = useState(false);

  const [type, setType] = useState(CameraType.back);
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState('');

  const [hasPermission, setHasPermission] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onFocus = {
    // backgroundColor: "#FFFFFF",
    color: '#212121',
    borderColor: '#FF6C00',
    stroke: '#FF6C00',
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      console.log(status);
      let location = await Location.getCurrentPositionAsync({});
      console.log('location:', location);
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      // console.log(coords);
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.setOptions({
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
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    width > height ? setIsLandscape(true) : setIsLandscape(false);
  }, []);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      const height = Dimensions.get('window').height;

      width > height ? setIsLandscape(true) : setIsLandscape(false);
    };

    const dimensionsHandler = Dimensions.addEventListener('change', onChange);

    return () => {
      dimensionsHandler.remove();
    };
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const addPhoto = () => {
    console.log('addPhoto');
  };

  const deletePhoto = () => {
    console.log('deletePhoto');
  };

  const toggleCameraType = () => {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
      const photo = await snap.takePictureAsync();
    setPhoto(photo.uri);
  };

  const updatephoto = () => {
   
    setPhoto('');
  };

  const inputHandlerTitle = text => {
    // console.log(text);
    setIsTitle(text);
  };

  const onFocusInputTitle = () => {
    setIsFocusInputTitle(true);
  };

  const onBlurInputTitle = () => {
    setIsFocusInputTitle(false);
  };

  const inputHandlerAddress = text => {
    // console.log(text);
    setIsAddress(text);
  };

  const onFocusInputAddress = () => {
    setIsFocusInputAdress(true);
  };

  const onBlurInputAddress = () => {
    setIsFocusInputAdress(false);
  };

  const onPressPublishBtn = () => {
    console.log('onPressPublishBtn');
    setPhoto('');
    setIsTitle('');
    setIsAddress('');

    navigation.navigate('Posts', { photo, title, address, location });
  };

  const onPressDeleteBtn = () => {
    console.log('onPressDeleteBtn');
    photo && setPhoto('');
    title && setIsTitle('');
    address && setIsAddress('');
   
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.wrraper}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <ScrollView>
            <Pressable
              style={
                isLandscape
                  ? { ...styles.content, alignItems: 'center' }
                  : styles.content
              }
            >
              <View style={styles.public}>
                <View
                  style={
                    isLandscape
                      ? { ...styles.wrraperImage, width: 350 }
                      : styles.wrraperImage
                  }
                >
                  <Camera
                    style={
                      isLandscape
                        ? { ...styles.wrraperImage, width: 350 }
                        : styles.wrraperImage
                    }
                    type={type}
                    ref={setSnap}
                  >
                    {!!photo ? (
                      <Image
                        source={{ uri: photo }}
                        style={
                          isLandscape
                            ? { ...styles.postImage, width: 350 }
                            : styles.postImage
                        }
                      />
                    ) : null}
                    {!photo ? (
                      !location ? null : (
                        <TouchableOpacity
                          style={styles.camera}
                          onPress={takePhoto}
                        >
                          <FontAwesome5
                            name="camera"
                            size={24}
                            color="#BDBDBD"
                            style={styles.cameraIcon}
                          />
                        </TouchableOpacity>
                      )
                    ) : (
                      <TouchableOpacity
                        style={{
                          ...styles.camera,
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        }}
                        onPress={updatephoto}
                      >
                        <FontAwesome5
                          name="camera"
                          size={24}
                          color="#fff"
                          style={styles.cameraIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </Camera>
                </View>
                {!photo ? (
                  <Text
                    style={
                      isLandscape
                        ? { ...styles.info, textAlign: 'left' }
                        : styles.info
                    }
                  >
                    Загрузите фото
                  </Text>
                ) : (
                  <Text
                    style={
                      isLandscape
                        ? { ...styles.info, textAlign: 'left' }
                        : styles.info
                    }
                  >
                    Редактировать фото
                  </Text>
                )}
                <TextInput
                  style={
                    isFocusInputTitle
                      ? { ...styles.input, ...onFocus }
                      : styles.input
                  }
                  onChangeText={inputHandlerTitle}
                  placeholder="Название..."
                  textAlign="left"
                  value={title}
                  placeholderTextColor="#BDBDBD"
                  onFocus={onFocusInputTitle}
                  onBlur={onBlurInputTitle}
                />
                <View style={styles.inputAddress}>
                 
                  <SimpleLineIcons
                    style={
                      isFocusInputAddress
                        ? { ...styles.addressIcon, ...onFocus }
                        : styles.addressIcon
                    }
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                
                  <TextInput
                    style={
                      isFocusInputAddress
                        ? { ...styles.input, ...onFocus, ...styles.address }
                        : { ...styles.input, ...styles.address }
                    }
                    onChangeText={inputHandlerAddress}
                    placeholder="Местность..."
                    textAlign="left"
                    value={address}
                    placeholderTextColor="#BDBDBD"
                    onFocus={onFocusInputAddress}
                    onBlur={onBlurInputAddress}
                  />
                </View>
                <TouchableOpacity
                  style={
                    !!title & !!address
                      ? { ...styles.publishBtn, backgroundColor: '#FF6C00' }
                      : styles.publishBtn
                  }
                  activeOpacity={!!title & !!address ? 0.2 : 1}
                  onPress={!!title & !!address ? onPressPublishBtn : null}
                >
                  <Text
                    style={
                      !!title & !!address
                        ? { ...styles.publishBtnText, color: '#FFFFFF' }
                        : styles.publishBtnText
                    }
                  >
                    Опубликовать
                  </Text>
                </TouchableOpacity>
                <View style={styles.deleteBtnWrraper}>
                  <TouchableOpacity
                    style={
                      !!title || !!address
                        ? { ...styles.deleteBtn, backgroundColor: '#FF6C00' }
                        : styles.deleteBtn
                    }
                    activeOpacity={!!title || !!address ? 0.2 : 1}
                    onPress={!!title || !!address ? onPressDeleteBtn : null}
                  >
                    {!!title || !!address ? (
                      <Feather name="trash-2" size={24} color="#fff" />
                    ) : (
                      <Feather name="trash-2" size={24} color="#BDBDBD" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Roboto-Medium',

    // justifyContent: "center",
    // alignItems: "center"
  },
  wrraper: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    // width: "100%",
  },
  public: {
    flex: 1,
  },
  wrraperImage: {
    position: 'relative',
    height: 240,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',

    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  camera: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fill: '#BDBDBD',
  },
  postImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  info: {
    marginTop: 8,
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  input: {
    // width: "100%",
    marginTop: 32,
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
  },
  inputAddress: {
    // maxWidth: 350,
    position: 'relative',
    // width: "100%",
    marginTop: 16,
  },
  address: {
    // width: "100%",
    marginTop: 0,
    paddingLeft: 28,
  },
  addressIcon: {
    stroke: '#BDBDBD',
    position: 'absolute',
    top: 13,
  },
  publishBtn: {
    marginTop: 32,
    paddingVertical: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
  },
  publishBtnText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#BDBDBD',
  },
  deleteBtnWrraper: {
    // flex: 1,
    // width: "100%",
    // justifyContent: "center",
    alignItems: 'center',
  },
  deleteBtn: {
    marginTop: 120,
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
  },
});
