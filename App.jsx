import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  Image,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeScreen from './src/screens/HomeScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
import LocationScreen from './src/screens/LocationScreen';
import Login from './src/screens/Login'

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,

        headerStyle: {
          backgroundColor: '#f5e3da',
        },
        headerTintColor: '#8b3a2b',

        // headerRight: () => (
        //   <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        //     <Image
        //       source={require('./src/assets/UserImage.png')}
        //       style={{
        //         width: 35,
        //         height: 35,
        //         borderRadius: 20,
        //         marginRight: 15,
        //       }}
        //     />
        //   </TouchableOpacity>
        // ),
      })}
    >
      {/* <Stack.Screen name="Dashboard" component={HomeScreen} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Attendance" component={LocationScreen} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
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