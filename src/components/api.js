// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://crime-report-backend.vercel.app/api';

export const fetchTest = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/test`, {
      credentials: 'include' // Needed for cookies/JWT
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};