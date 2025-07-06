import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ExaminationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>امتحانات کی ترتیبات</Text>
      <FontAwesome name="pencil" size={80} color="#4CAF50" style={{ marginBottom: 20 }} />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
                  onPress={() => navigation.navigate('ExaminationSearch')} // Modified this line
>
          <Text style={styles.buttonText}>امتحانات کی معلومات  تلاش کریں</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>امتحانات کی معلومات کا اندراج کریں</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>امتحانات کی معلومات میں تبدیلی کریں</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>امتحانات کی معلومات مٹائیں</Text>
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
    fontSize: 18, // Changed from 25 to 18
    fontWeight: 'normal',
  },
});