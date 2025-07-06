import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native'; // Added Image
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
import StudentSearchScreen from './app/StudentSearch'; // Add this line
import StaffSearchScreen from './app/StaffSearch'; // Add this line
import AttendanceSearchScreen from './app/AttendanceSearch'; // Add this line
import ExaminationSearchScreen from './app/ExaminationSearch'; // Add this line
import FinanceSearchScreen from './app/FinanceSearch'; // Add this line
import PerformanceSearchScreen from './app/PerformanceSearch'; // Add this line
import StudentAddScreen from './app/StudentAdd';
import AttendanceAddScreen from './app/AttendanceAdd';


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
      {/* <Text style={styles.heading}>مدرسه قاسم العلوم</Text> */}
      <Image 
        source={require('./assets/images/logo.jpg.jpg')} 
        style={styles.logo} 
      />
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
        <Stack.Screen name="StudentSearch" component={StudentSearchScreen} />
        <Stack.Screen name="AttendanceSearch" component={AttendanceSearchScreen} />
        <Stack.Screen name="ExaminationSearch" component={ExaminationSearchScreen} />
        <Stack.Screen name="FinanceSearch" component={FinanceSearchScreen} />
        <Stack.Screen name="PerformanceSearch" component={PerformanceSearchScreen} />
        <Stack.Screen name="StaffSearch" component={StaffSearchScreen} />
        <Stack.Screen name="Staff" component={StaffScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="Examination" component={ExaminationScreen} />
        <Stack.Screen name="Finance" component={FinanceScreen} />
        <Stack.Screen name="Performance" component={PerformanceScreen} />
        <Stack.Screen name="StudentAdd" component={StudentAddScreen} />
        <Stack.Screen name="AttendanceAdd" component={AttendanceAddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 250, // You can adjust the width as needed
    height: 250, // You can adjust the height as needed
    resizeMode: 'contain', // Or 'cover', 'stretch', etc.
    marginBottom: 10,
    marginTop:-5, // Spacing below the logo
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
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
