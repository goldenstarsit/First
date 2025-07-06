import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const GOOGLE_SHEET_ID = '1djZfyQyVb7m8dyr0bjmbGx6LsXUCKrvymdZL3bI8MSM';
const GOOGLE_SHEET_RANGE = 'Sheet3'; // Change if your sheet/tab name is different
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';
const MISTRAL_API_KEY = '5LM8n0jKnhnFqItRk44U5lCOqjxZkkiY';

export default function AttendanceSearch() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [sheetData, setSheetData] = useState([]);

  // Fetch Google Sheet data as array of rows
  const fetchSheetData = async () => {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${GOOGLE_SHEET_RANGE}?alt=json&key=AIzaSyBOYMV8lHHxKNxiucbQpL4_JgPWs2UXCA4`;
      const res = await axios.get(url);
      return res.data.values || [];
    } catch (error) {
      return [];
    }
  };

  // Send prompt and sheet data to Codestral-2501 (Mistral)
  const handleSend = async () => {
    setLoading(true);
    setResponse('');
    try {
      // 1. Fetch sheet data
      const data = await fetchSheetData();
      setSheetData(data);
      // 2. Prepare context for LLM
      const context = data.map(row => row.join(' | ')).join('\n');
      // 3. Call Codestral-2501 (Mistral) API
      const mistralRes = await axios.post(
        MISTRAL_API_URL,
        {
          model: 'codestral-2501',
          messages: [
            { role: 'system', content: `You are an AI agent. Here is the Google Sheet data:\n${context}` },
            { role: 'user', content: prompt }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${MISTRAL_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const aiMessage = mistralRes.data.choices?.[0]?.message?.content || 'No answer.';
      setResponse(aiMessage);
    } catch (err) {
      setResponse('Error: ' + (err.response?.data?.error?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Agent (Google Sheets + Codestral-2501)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ask your question..."
        value={prompt}
        onChangeText={setPrompt}
        editable={!loading}
      />
      <TouchableOpacity style={styles.button} onPress={handleSend} disabled={loading || !prompt}>
        <Text style={styles.buttonText}>{loading ? 'Thinking...' : 'Send'}</Text>
      </TouchableOpacity>
      <ScrollView style={styles.responseBox}>
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
