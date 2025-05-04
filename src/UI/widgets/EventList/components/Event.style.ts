import {StyleSheet } from 'react-native';
 
 export const EventStyle = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});