import React, { useState } from 'react';
import Chatbot from './Chatbot';
import Modal from './Modal';
import axios from 'axios';

function ReportCrime() {
  const [crimeType, setCrimeType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Backend URL from environment variable
  const API_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/+$/, '');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      setModalMessage('Please log in first to submit a report');
      setIsModalOpen(true);
      return;
    }
  
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('crimeType', crimeType);
      formData.append('location', location);
      formData.append('description', description);
      formData.append('isAnonymous', isAnonymous);
      
      // Add files if they exist
      if (files && files.length > 0) {
        files.forEach((file) => formData.append('files', file));
      }
  
      const response = await axios.post(`${API_URL}/api/reports`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout
      });
  
      if (response.data.success) {
        setModalMessage(`Report submitted! Reference #: ${response.data.referenceNumber}`);
        // Reset form
        setCrimeType('');
        setLocation('');
        setDescription('');
        setIsAnonymous(false);
        setFiles([]);
      } else {
        setModalMessage(response.data.error || 'Report submission failed');
      }
      
      setIsModalOpen(true);
  
    } catch (error) {
      let errorMessage = 'Error submitting report';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.error || 
                      error.response.data?.message || 
                      errorMessage;
        
        if (error.response.data?.details) {
          errorMessage += `: ${JSON.stringify(error.response.data.details)}`;
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message || errorMessage;
      }
  
      setModalMessage(errorMessage);
      setIsModalOpen(true);
      console.error('Full error details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gray-50 top">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 repo-h1">Report a Crime</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {/* Crime Type */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Crime Type</label>
            <select
              value={crimeType}
              onChange={(e) => setCrimeType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a crime type</option>
              <option value="Theft">Theft</option>
              <option value="Assault">Assault</option>
              <option value="Corruption">Corruption</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the location of the crime"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Provide a detailed description of the crime"
              required
            ></textarea>
          </div>

          {/* Upload Supporting Documents */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Upload Supporting Documents</label>
            <input
              type="file"
              onChange={(e) => setFiles([...e.target.files])}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              multiple
            />
          </div>

          {/* Anonymous Reporting */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700">Report Anonymously</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Submit Report
          </button>
        </form>
      </div>
      <Chatbot />

      {/* Success/Error Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <span className="text-green-500 text-6xl">✔️</span>
          <p className="mt-4 text-xl font-semibold">{modalMessage}</p>
        </div>
      </Modal>
    </section>
  );
}

export default ReportCrime;