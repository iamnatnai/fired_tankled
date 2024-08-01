// src/Home.js
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTasks, setDisplayTasks] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลทั้งหมดเมื่อเริ่มต้น
    fetch('http://localhost:5000/api/fire-extinguishers')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
        setDisplayTasks(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // ดึงข้อมูลค้นหาเมื่อมีการเปลี่ยนแปลงคำค้นหา
    if (searchTerm) {
      fetch(`http://localhost:5000/api/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => setDisplayTasks(data))
        .catch(error => console.error('Error fetching search data:', error));
    } else {
      // ถ้าไม่มีคำค้นหา ให้แสดงข้อมูลทั้งหมด
      setDisplayTasks(tasks);
    }
  }, [searchTerm, tasks]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>หน้าหลัก</h1>
      <p>ยินดีต้อนรับสู่ระบบเช็คถังดับเพลิง</p>
      <h2>Fire Extinguishers</h2>

      {/* แถบค้นหา */}
      <input
        type="text"
        placeholder="กรอกรหัสถัง"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      {displayTasks.length > 0 ? (
        <ul>
          {displayTasks.map((task, index) => (
            <li key={index}>
              <strong>รหัสถังดับเพลิง:</strong> {task.FCODE}<br />
              <strong>สถานที่ติดตั้ง:</strong> {task.F_located}<br />
              <strong>รายละเอียด:</strong> {task.description}<br />
              <img
                src={`http://localhost:5000/uploads/${task.imagePath}`}
                alt={task.imagePath}
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default Home;
