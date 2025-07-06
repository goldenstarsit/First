import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome

const StudentScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>طلباء کی ترتیبات</Text>
      <FontAwesome name="graduation-cap" size={80} color="#4CAF50" style={styles.icon} /> {/* Student Icon */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('StudentSearch')} // Modified this line
        >
          <Text style={styles.buttonText}>طلباء کی معلومات تلاش کریں</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('StudentAdd')} // Added this line
        >
          <Text style={styles.buttonText}>نئے طالبعلم کا اندراج کریں</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>طالبعلم کی معلومات میں تبدیلی کریں</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>طالبعلم کی معلومات کو مٹا دیں</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  icon: {
    marginTop: 10, // Adjust spacing as needed (changed from marginBottom)
    marginBottom: 10,
  },
  heading: {
    fontSize: 60,
    // fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'JameelNooriNastaleeq',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'JameelNooriNastaleeq',
    fontSize: 18, // Changed from 25 to 18
    fontWeight: 'normal',
  },
});

export default StudentScreen;