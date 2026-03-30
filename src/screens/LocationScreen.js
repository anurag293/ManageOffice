import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Dimensions
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

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
        { headers: { 'User-Agent': 'ReactNativeApp' } },
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
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        await getAddressFromCoords(latitude, longitude);
      },
      err => setErrorMsg(err.message),
      { enableHighAccuracy: true },
    );
  };

  // 📸 OPEN CAMERA (FIXED)
  const openCamera = async () => {
    // const granted = await requestCameraPermission();
    // if (granted){
    setShowCamera(true);
    // }
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
      <View style={{ flex: 1 }}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />

        <TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
          <Text style={{ color: '#fff' }}>CAPTURE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 📱 MAIN UI
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6efea' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View style={styles.container}>
          {' '}
          {/* Camera Card */}
          <TouchableOpacity onPress={openCamera}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.image} />
            ) : (
              <View style={styles.cameraCard}>
                <Image
                  source={require('../assets/UserPicture.png')}
                  style={styles.avatar}
                />

                <View style={styles.captureBox}>
                  <Text style={styles.captureText}>Open Camera</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
          {/* Location Card */}
          <View style={styles.locationCard}>
            <View style={styles.locationIcon}>
              <Text>📍</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.locationLabel}>CURRENT LOCATION</Text>
              <Text style={styles.locationText}>
                {address ? <Text style={styles.address}>{address}</Text> : null}
              </Text>
            </View>

            <View style={styles.greenDot} />
          </View>
          {/* Time */}
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.date}>{date}</Text>
          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={markAttendance}>
            <Text style={styles.buttonText}>Check In/Check Out</Text>
          </TouchableOpacity>
      
         <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6efea',
    padding: 16,
  },


  cameraCard: {
  backgroundColor: '#5c8a8a',
  width: '100%',
  height: width * 0.6, 
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
},

  avatar: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },

  overlayBox: {
    position: 'absolute',
    top: 30,
    left: 30,
    right: 30,
    bottom: 80,
    borderWidth: 2,
    borderColor: '#ff5a1f',
    borderRadius: 16,
  },

  captureBox: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  captureText: {
    color: '#b23a00',
    fontWeight: '600',
    textAlign: 'center',
  },

  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1e1d8',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    marginTop: 40,
  },

  locationIcon: {
    backgroundColor: '#f5c97a',
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
  },

  locationLabel: {
    fontSize: 12,
    letterSpacing: 1,
    color: '#7a5c4d',
  },

  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b2a23',
  },

  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },

  time: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2b1b14',
  },

  date: {
    textAlign: 'center',
    color: '#6b4f45',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#c43c00',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 20,
  },

  tabActive: {
    backgroundColor: '#c43c00',
    padding: 12,
    borderRadius: 12,
  },

  tab: {
    padding: 12,
  },

  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  tabText: {
    color: '#7a5c4d',
  },
  captureBtn: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
  },
  image: {
  width: '100%',
  height: width * 0.6,
  borderRadius: 20,
},
});
