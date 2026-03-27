import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>

      {/* ATTENDANCE CARD */}
      <View style={[styles.card, styles.attendanceCard]}>
        <View style={styles.row}>
          <Image
            source={require('../assets/attendance-icon.png')}
            style={styles.cardIcon}
          />

          <View>
            <Text style={styles.cardTitle}>MANAGE ATTENDANCE</Text>

            <TouchableOpacity style={styles.cardBtn}>
              <Text style={styles.cardBtnText}>My Attendance</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardBtn}>
              <Text style={styles.cardBtnText}>Holiday Calendar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardBtn}>
              <Text style={styles.cardBtnText}>Regularize Attendance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* EXPENSE CARD */}
      <View style={[styles.card, styles.expenseCard]}>
        <View style={styles.row}>
          <Image
            source={require('../assets/expences-icon.png')}
            style={styles.cardIcon}
          />

          <View>
            <Text style={styles.cardTitle}>EXPENSE</Text>

            <TouchableOpacity style={styles.cardBtn}>
              <Text style={styles.cardBtnText}>Expense Form</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardBtn}>
              <Text style={styles.cardBtnText}>Expense Records</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd3c1',
    padding: 15,
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  attendanceCard: {
    backgroundColor: '#ff5e00',
  },

  expenseCard: {
    backgroundColor: '#ffb300',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardIcon: {
    width: 60,
    height: 60,
    marginRight: 15,
    resizeMode: 'contain',
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  cardBtn: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
    borderRadius: 5,
    marginBottom: 8,
  },

  cardBtnText: {
    color: '#fff',
  },
});