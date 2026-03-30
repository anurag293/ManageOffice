import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider, } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaProvider style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
      </View>

      {/* Content */}
      

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 MyApp</Text>
      </View>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04642ff9',
  },

  header: {
    padding: width * 0.05,
    alignItems: 'center',
  },

  title: {
    fontSize: width * 0.06, // responsive font
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },

  subtitle: {
    fontSize: width * 0.05,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#007bff',
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
  },

  footer: {
    padding: width * 0.04,
    alignItems: 'center',
  },

  footerText: {
    fontSize: width * 0.035,
    color: '#777',
  },
});