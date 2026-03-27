import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const Accordion = ({title, children}) => {
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setOpen(!open)}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.arrow}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Curriculum Vitae</Text>

      {/* BASIC DETAILS */}
      <Accordion title="Basic Details">
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>Abhishek Bisht</Text>

            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>9870126466</Text>

            <Text style={styles.label}>Email ID:</Text>
            <Text style={styles.value}>
              abhishek.bisht@vensysco.in
            </Text>

            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
              80-B, B-9, Udaygiri-2, Sector-34, Noida
            </Text>

            <Text style={styles.label}>Aadhaar Number:</Text>
            <Text style={styles.value}>729008052183</Text>

            <Text style={styles.label}>Pan Number:</Text>
            <Text style={styles.value}>CLYPB9026N</Text>

            <Text style={styles.label}>Skill Set:</Text>
            <Text style={styles.value}>
              React Native, JavaScript, TypeScript, Redux, Python
            </Text>
          </View>

          {/* <Image
            source={require('../assets/profile.png')} // add your image
            style={styles.profileImage}
          /> */}
        </View>
      </Accordion>

      {/* EDUCATION */}
      <Accordion title="Education Information">
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Examination</Text>
          <Text style={styles.tableHeader}>Institute</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableText}>B.Tech</Text>
          <Text style={styles.tableText}>XYZ University</Text>
        </View>
      </Accordion>

      {/* BANK */}
      <Accordion title="Bank Details">
        <Text style={styles.label}>Bank Name:</Text>
        <Text style={styles.value}>HDFC Bank</Text>

        <Text style={styles.label}>Account No:</Text>
        <Text style={styles.value}>50100690654351</Text>

        <Text style={styles.label}>IFSC Code:</Text>
        <Text style={styles.value}>HDFC0000027</Text>
      </Accordion>

      {/* PREVIOUS EMPLOYER */}
      <Accordion title="Previous Employer">
        <Text style={styles.label}>Company Name:</Text>
        <Text style={styles.value}>Cms Computers Pvt. Ltd.</Text>
      </Accordion>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },

  title: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },

  header: {
    backgroundColor: '#f7931e',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  arrow: {
    fontSize: 16,
  },

  content: {
    padding: 12,
  },

  row: {
    flexDirection: 'row',
  },

  label: {
    fontWeight: 'bold',
    marginTop: 8,
  },

  value: {
    marginBottom: 4,
  },

  profileImage: {
    width: 100,
    height: 120,
    marginLeft: 10,
    borderRadius: 6,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
  },

  tableText: {
    flex: 1,
  },
});