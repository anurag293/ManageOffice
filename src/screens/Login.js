import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LoginScreen({navigation }) {
  const [email, setEmail] = useState('');
  const [email_error, setemail_errors] = useState('');
  const [password, setPassword] = useState('');
  const [password_error, setpassword_errors] = useState('');


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.logoCircle}>
              <Image source={require('../assets/logo.png')} style={styles.image} />
          </View>

          <Text style={styles.title}>VENSYSCO</Text>
          <Text style={styles.subtitle}>Welcome Back</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Email */}
          <Text style={styles.label}>USERNAME OR EMAIL</Text>
          <View style={styles.inputBox}>
            <Text style={styles.icon}>👤</Text>
            <TextInput
              placeholder="e.g. alex.vensysco"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          {/* Password */}
          <View style={styles.passwordRow}>
            <Text style={styles.label}>PASSWORD</Text>
            <Text style={styles.forgot}>FORGOT?</Text>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.icon}>🔒</Text>
            <TextInput
              placeholder="******"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <Text style={styles.icon}>👁️</Text>
          </View>

          {/* Remember */}
          <View style={styles.rememberRow}>
            <View style={styles.checkbox} />
            <Text style={styles.rememberText}>Keep me signed in</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Attendance')}>
            <Text style={styles.buttonText}>Sign In →</Text>
          </TouchableOpacity>

          {/* <Text style={styles.divider}>OR ACCESS VIA</Text> */}

          {/* <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.google}>GOOGLE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn}>
              <Text>BIOMETRIC</Text>
            </TouchableOpacity>
          </View> */}

          {/* <Text style={styles.footer}>
            Don't have an account?{' '}
            <Text style={styles.link}>Create Account</Text>
          </Text> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#e7cfc4',
  },

  container: {
    flex: 1,
  },

  top: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
  },

  logoCircle: {
    backgroundColor: '#d83b01',
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  logoIcon: {
    color: '#fff',
    fontSize: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#a02800',
  },

  subtitle: {
    color: '#7a5c4d',
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  label: {
    fontSize: 12,
    color: '#7a5c4d',
    marginBottom: 5,
    letterSpacing: 1,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e4dc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
  },

  icon: {
    marginHorizontal: 5,
  },

  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  forgot: {
    color: '#6b4f45',
    fontSize: 12,
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    marginRight: 8,
  },

  rememberText: {
    color: '#6b4f45',
  },

  button: {
    backgroundColor: '#d83b01',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  divider: {
    textAlign: 'center',
    color: '#7a5c4d',
    marginBottom: 15,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  socialBtn: {
    flex: 1,
    backgroundColor: '#f3e4dc',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  google: {
    color: '#4285F4',
    fontWeight: 'bold',
  },

  footer: {
    textAlign: 'center',
    color: '#6b4f45',
  },

  link: {
    color: '#d83b01',
    fontWeight: '600',
  },
});