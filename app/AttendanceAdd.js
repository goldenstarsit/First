import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

// --- Replace with your Google Apps Script Web App URL ---
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwDDLruaxFjm5P8Ojis1AmQdRIuIeURAo4g7DSzcH0LLAxsospxHAVI3H2LywTCeoTdNg/exec'; // <-- IMPORTANT: Paste your deployed web app URL here

const EXPECTED_COLUMNS = ["Name", "Phone"]

export default function StudentAdd() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddData = async () => {
    if (!jsonInput.trim()) {
      Alert.alert('Input Required', 'Please enter JSON data.');
      return;
    }

    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        Alert.alert('Configuration Error', 'Please set the GOOGLE_SCRIPT_URL in the code.');
        return;
    }

    setLoading(true);
    setResponse('');

    try {
      // No need to parse here, the script will do it.
      const inputData = JSON.parse(jsonInput);

      const apiResponse = await axios.post(GOOGLE_SCRIPT_URL, JSON.stringify(inputData), {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Required by Google Apps Script
        },
      });

      if (apiResponse.data.status === 'success') {
        setResponse(`Successfully added row: ${JSON.stringify(apiResponse.data.data)}`);
        Alert.alert('Success', 'Data has been added to the sheet.');
        setJsonInput(''); // Clear input on success
      } else {
        throw new Error(apiResponse.data.message || 'An unknown error occurred in the script.');
      }

    } catch (error) {
      let errorMessage = 'Error: ';
      if (error instanceof SyntaxError) {
        errorMessage += 'Invalid JSON format. Please check your input.';
      } else {
        errorMessage += error.message || 'Failed to process request';
      }
      setResponse(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student Data via Google Script</Text>
      <Text style={styles.subtitle}>Enter data in JSON format. Keys must match: {EXPECTED_COLUMNS.join(', ')}</Text>
      
      <TextInput
        style={styles.input}
        placeholder='e.g., { "نام": "احمد", "عمر": "20" }'
        value={jsonInput}
        onChangeText={setJsonInput}
        multiline
        numberOfLines={4}
        editable={!loading}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleAddData} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Adding...' : 'Add Data'}</Text>
      </TouchableOpacity>

      {response ? (
        <ScrollView style={styles.responseBox}>
          <Text style={styles.responseText}>{response}</Text>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    backgroundColor: '#fff', 
    justifyContent: 'flex-start' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    color: '#2a2a2a' 
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666'
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 12, 
    marginBottom: 12, 
    fontSize: 16,
    textAlignVertical: 'top'
  },
  button: { 
    backgroundColor: '#007AFF', 
    padding: 14, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 16 
  },
  buttonDisabled: {
    backgroundColor: '#cccccc'
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  responseBox: { 
    flex: 1, 
    backgroundColor: '#f6f6f6', 
    borderRadius: 8, 
    padding: 12 
  },
  responseText: { 
    fontSize: 16, 
    color: '#333' 
  }
});