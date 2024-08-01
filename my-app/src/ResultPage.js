import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || { data: [] };

  const handleViewStatus = (item) => {
    navigate('/fire-extinguisher-status', { state: { item } });
  };

  return (
    <div>
      <h2>รหัสถังที่ท่านแสกน</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <div>
                <img 
                  src={`http://localhost:5000${item.image_path}`} 
                  alt={item.FCODE} 
                  style={{ maxWidth: '200px', maxHeight: '200px' }} 
                />
              </div>
              <div>
                <strong>รหัสถังดับเพลิง: </strong> {item.FCODE}<br />
                <strong>รหัสตู้สายน้ำดับเพลิง: </strong> {item.F_water}<br />
                <strong>สถานที่ติดตั้ง: </strong> {item.F_located}
              </div>
              <button onClick={() => handleViewStatus(item)}>ดูสถานะถัง</button>
              <p>{item.image_path}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found for the scanned result.</p>
      )}
    </div>
  );
};

export default ResultPage;
