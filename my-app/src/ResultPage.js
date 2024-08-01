// ResultPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { data } = location.state || { data: [] };

  return (
    <div>
      <h2>Scanned Data Results</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <strong>รหัสถังดับเพลิง: </strong> {item.FCODE}<br />
              <strong>รหัสตู้สายน้ำดับเพลิง: </strong> {item.F_water}<br />
              <strong>สถานที่ติดตั้ง: </strong> {item.F_located}
              <div>
                  <img 
                    src={`http://localhost:5000${item.imagePath}`} 
                    alt={item.image_path} 
                    style={{ maxWidth: '200px', maxHeight: '200px' }} 
                  />
                  </div>
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