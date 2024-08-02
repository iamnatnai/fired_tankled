import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Scanner = () => {
  const [result, setResult] = useState("");
  const webcamRef = useRef(null);
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

  const fetchData = useCallback(async (data) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/data/${data}`);
      console.log("Data retrieved from server:", response.data);

      // นำทางไปยังหน้า ResultPage พร้อมกับข้อมูลที่ดึงมา
      navigate("/result", { state: { data: response.data } });
    } catch (error) {
      console.error("Error retrieving data:", error);
      // จัดการข้อผิดพลาดถ้าต้องการ
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const image = new Image();
          image.src = imageSrc;
          image.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);
            const imageData = context.getImageData(0, 0, image.width, image.height);
            const code = jsQR(imageData.data, image.width, image.height);
            if (code) {
              setResult(code.data);
              fetchData(code.data); // Call fetchData with the scanned result
            }
          };
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [fetchData]); // Include fetchData in the dependency array

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'environment' }}
        style={{ width: "100%", height: "100%" }}
      />
      {result && <div>Scanned Result: {result}</div>}
    </div>
  );
};

export default Scanner;
