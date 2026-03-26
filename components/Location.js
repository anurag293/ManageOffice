import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Permission
  const requestLocationPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  // 🔥 OpenStreetMap reverse geocoding
  const getAddressFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
          headers: {
            'User-Agent': 'ReactNativeApp', // required by Nominatim
          },
        },
      );

      const data = await response.json();

      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.log(error);
      setAddress('Error fetching address');
    }
  };

  // Get location
  const getLocation = async () => {
    setErrorMsg('');
    setAddress('');
    setLocation(null);

    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      setErrorMsg('Permission denied');
      return;
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        const {latitude, longitude} = position.coords;

        setLocation({latitude, longitude});

        // 🔥 Convert to address
        await getAddressFromCoords(latitude, longitude);
      },
      (error) => {
        setErrorMsg(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 OSM Location → Address</Text>

      <Button title="Get Location" onPress={getLocation} />

      {location && (
        <View style={styles.result}>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
        </View>
      )}

      {address ? (
        <Text style={styles.address}>📌 {address}</Text>
      ) : null}

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
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
  },
  address: {
    marginTop: 20,
    textAlign: 'center',
  },
  error: {
    marginTop: 20,
    color: 'red',
  },
});