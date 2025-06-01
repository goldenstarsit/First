import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import StudentScreen from './app/Student'; // Changed this line
import StaffScreen from './app/Staff';
import AttendanceScreen from './app/Attendance';
import ExaminationScreen from './app/Examination';
import FinanceScreen from './app/Finance';
import PerformanceScreen from './app/Performance';
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    JameelNooriNastaleeq: require('./assets/fonts/JameelNooriNastaleeq.ttf'),
  });
  
  if (!fontsLoaded) {
    return null; // or a loading indicator
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>مدرسه قاسم العلوم</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Student')}>
          <Text style={styles.buttonText}>طلباء کی ترتیبات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Staff')}>
          <Text style={styles.buttonText}>عملے کی ترتیبات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Attendance')}>
          <Text style={styles.buttonText}>حاضری کی ترتیبات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Examination')}>
          <Text style={styles.buttonText}>امتحانات کی ترتیبات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Performance')}>
          <Text style={styles.buttonText}>کارکردگی کی ترتیبات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Finance')}>
          <Text style={styles.buttonText}>مالیاتی ترتیبات</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Student" component={StudentScreen} />
        <Stack.Screen name="Staff" component={StaffScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="Examination" component={ExaminationScreen} />
        <Stack.Screen name="Finance" component={FinanceScreen} />
        <Stack.Screen name="Performance" component={PerformanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 50,
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
    fontSize: 15, // Changed from 25 to 18
    fontWeight: 'normal',
  },
});
