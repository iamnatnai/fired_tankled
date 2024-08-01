import React from 'react';
import { QrReader } from 'react-qr-reader';

const QrCodeReader = () => {
  const handleScan = data => {
    if (data) {
      console.log('QR Code Data:', data);
      // คุณสามารถทำอะไรบางอย่างกับข้อมูลที่ได้ที่นี่
    }
  };

  const handleError = err => {
    console.error('QR Code Error:', err);
  };

  return (
    <div>
      <h1>QR Code Reader</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default QrCodeReader;
