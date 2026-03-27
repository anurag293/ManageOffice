import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

const App = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  const cameraRef = useRef(null);
  const device = useCameraDevice('front');

  useEffect(() => {
    getLocation();
  }, []);

  // 📸 CAMERA PERMISSION (FIXED)
  const requestCameraPermission = async () => {
    const status = await Camera.requestCameraPermission();
    console.log('Camera permission:', status);

    if (status === 'denied') {
      alert('Camera permission denied. Please enable from settings.');
      Linking.openSettings();
      return false;
    }

    return status === 'authorized';
  };

  // 📍 LOCATION PERMISSION
  const requestLocationPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  // 🌍 GET ADDRESS FROM COORDS
  const getAddressFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {headers: {'User-Agent': 'ReactNativeApp'}},
      );

      const data = await res.json();
      setAddress(data?.display_name || 'Address not found');
    } catch {
      setAddress('Error fetching address');
    }
  };

  // 📍 GET LOCATION
  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      async pos => {
        const {latitude, longitude} = pos.coords;
        setLocation({latitude, longitude});
        await getAddressFromCoords(latitude, longitude);
      },
      err => setErrorMsg(err.message),
      {enableHighAccuracy: true},
    );
  };

  // 📸 OPEN CAMERA (FIXED)
  const openCamera = async () => {
    const granted = await requestCameraPermission();

    if (granted){
    setShowCamera(true);
    }

  };

  // 📷 TAKE PHOTO
  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePhoto();
      setPhoto('file://' + photo.path);
      setShowCamera(false);
    } catch (e) {
      console.log(e);
    }
  };

  // ✅ SAVE ATTENDANCE
  const markAttendance = async () => {
    if (!photo || !location) {
      alert('Capture photo & location first');
      return;
    }

    const record = {
      date: new Date().toISOString(),
      location,
      address,
      photo,
    };

    let data = await AsyncStorage.getItem('attendance');
    let arr = data ? JSON.parse(data) : [];

    arr.push(record);
    await AsyncStorage.setItem('attendance', JSON.stringify(arr));

    alert('✅ Attendance marked!');
  };

  // 📸 CAMERA SCREEN
  if (showCamera) {
    if (!device) {
      return (
        <View style={styles.center}>
          <Text>Loading camera...</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />

        <TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
          <Text style={{color: '#fff'}}>CAPTURE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 📱 MAIN UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Attendance App</Text>

      {address ? <Text style={styles.address}>📌 {address}</Text> : null}

      <TouchableOpacity onPress={openCamera} style={styles.btn}>
        <Text style={styles.btnText}>📸 Open Camera</Text>
      </TouchableOpacity>

      {photo && <Image source={{uri: photo}} style={styles.image} />}

      <TouchableOpacity onPress={markAttendance} style={styles.btn}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 20, marginBottom: 20},
  address: {textAlign: 'center'},
  image: {width: 200, height: 200, marginVertical: 10},

  btn: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  btnText: {color: '#fff'},

  captureBtn: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
  },

  error: {color: 'red'},
});