import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Scanner = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

  const handleScan = async (data) => {
    if (data) {
      setResult(data.text);
      console.log('Scanned data:', data.text);

      try {
        // Fetch the data from the server based on scanned result
        const response = await axios.get(`http://localhost:5000/api/data/${data.text}`);
        console.log('Data retrieved from server:', response.data);

        // นำทางไปยังหน้า ResultPage พร้อมกับข้อมูลที่ดึงมา
        navigate('/result', { state: { data: response.data } });
        setError('');
      } catch (error) {
        console.error('Error retrieving data:', error);
        setError('Error retrieving data');
      }
    }
  };

  const handleError = (err) => {
    console.error('QR Scan Error:', err);
  };

  return (
    <div>
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        facingMode="environment"
        style={{ width: '100%', height: '500px' }}
      />
      {result && <div>Scanned Result: {result}</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Scanner;
