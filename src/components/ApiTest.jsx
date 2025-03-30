// src/components/ApiTest.jsx
import { fetchTest } from '../config/api';
import { useEffect } from 'react';

export default function ApiTest() {
  useEffect(() => {
    fetchTest()
      .then(data => console.log('Backend response:', data))
      .catch(err => console.error('Connection error:', err));
  }, []);

  return <div>Checking backend connection...</div>;
}