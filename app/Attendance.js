import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function AttendanceScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>حاضری کی ترتیبات</Text>
      <FontAwesome name="calendar-check-o" size={80} color="#4CAF50" style={{ marginBottom: 20 }} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
                  onPress={() => navigation.navigate('AttendanceSearch')} // Modified this line
>
          <Text style={styles.buttonText}>حاضری دیکھیں</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('AttendanceAdd')}
        >
          <Text style={styles.buttonText}>حاضری لگائیں</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 60,
    fontFamily: 'JameelNooriNastaleeq',
    // fontWeight: 'bold', // Added this line
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
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
    fontSize: 25,
    fontWeight: 'normal',
  },
});