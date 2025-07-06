import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

// Replace with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxesqdtyUX3qCTf9cuC0Dn7AD5ElUy9bZ4Ju1qPtdKy-Kb_vmKeeSWhcu-UuTAwBchNDA/exec';

// Your sheet columns for reference (not used directly, but for clarity)
const SHEET_COLUMNS = [
  "داخلہ نمبر", "تاریخ داخلہ", "نام", "شناختی نمبر", "ولدیت",
  "والد کا شناختی نمبر", "شعبہ", "ذات", "پیشہ", "پتہ",
  "موبائل نمبر", "تکمیل قرآن", "وفاق کا امتحان", "دستاربندی"
];

export default function StudentAdd() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setResponse('');

    try {
      // Parse JSON from input
      const parsedData = JSON.parse(jsonInput);

      if (typeof parsedData !== 'object' || Array.isArray(parsedData)) {
        throw new Error('Please enter a valid JSON object.');
      }

      // Send data to Google Apps Script
      const res = await axios.post(
        GOOGLE_SCRIPT_URL,
        JSON.stringify(parsedData), // Send as JSON string
        {
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        }
      );

      if (res.data?.status === 'success') {
        setResponse('✔️ Student added successfully!');
        Alert.alert('Success', 'Student added to Google Sheet.');
      } else {
        throw new Error(res.data?.message || 'Unknown error from script.');
      }
    } catch (error) {
      console.error(error);
      setResponse('❌ Error: ' + (error.message || 'Failed to add student.'));
      Alert.alert('Error', error.message || 'Invalid JSON or request failed.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student (Google Sheets)</Text>

      <TextInput
        style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
        placeholder='Enter student data in JSON format'
        value={jsonInput}
        onChangeText={setJsonInput}
        editable={!loading}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSend} disabled={loading || !jsonInput}>
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Add Student'}</Text>
      </TouchableOpacity>

      <ScrollView style={styles.responseBox}>
        {loading && <ActivityIndicator size="small" color="#007AFF" />}
        <Text style={styles.responseText}>{response}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'flex-start' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#2a2a2a' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  responseBox: { flex: 1, backgroundColor: '#f6f6f6', borderRadius: 8, padding: 12 },
  responseText: { fontSize: 16, color: '#333' }
});
