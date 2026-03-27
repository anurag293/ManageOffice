import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Image,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Location from './src/components/Location';

function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text>Home Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.center}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppDrawer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,

        drawerStyle: {
          backgroundColor: 'black',
        },

        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: 'gray',

        drawerIcon: ({ size }) => {
          let icon;

          if (route.name === 'Home') {
            icon = require('./src/assets/home-icon.png');
          } else if (route.name === 'Attendance') {
            icon = require('./src/assets/attendance-icon.png');
          } else if (route.name === 'Profile') {
            icon = require('./src/assets/profile-icon.png');
          }

          return (
            <Image
              source={icon}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: 'white',
              }}
            />
          );
        },
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Attendance" component={Location} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default App;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});