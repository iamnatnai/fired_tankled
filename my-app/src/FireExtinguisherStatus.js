// FireExtinguisherStatus.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const FireExtinguisherStatus = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [seal, setSeal] = useState('yes');
  const [pressure, setPressure] = useState('yes');
  const [hose, setHose] = useState('yes');
  const [body, setBody] = useState('yes');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ date, seal, pressure, hose, body });
  };

  return (
    <div>
      <h2>สถานะของถังดับเพลิง: {item?.FCODE}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>วันที่:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>ซีล:</label>
          <label>
            <input
              type="radio"
              name="seal"
              value="yes"
              checked={seal === 'yes'}
              onChange={(e) => setSeal(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="seal"
              value="no"
              checked={seal === 'no'}
              onChange={(e) => setSeal(e.target.value)}
            />
            No
          </label>
        </div>
        <div>
          <label>แรงดัน:</label>
          <label>
            <input
              type="radio"
              name="pressure"
              value="yes"
              checked={pressure === 'yes'}
              onChange={(e) => setPressure(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="pressure"
              value="no"
              checked={pressure === 'no'}
              onChange={(e) => setPressure(e.target.value)}
            />
            No
          </label>
        </div>
        <div>
          <label>สายวัด:</label>
          <label>
            <input
              type="radio"
              name="hose"
              value="yes"
              checked={hose === 'yes'}
              onChange={(e) => setHose(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hose"
              value="no"
              checked={hose === 'no'}
              onChange={(e) => setHose(e.target.value)}
            />
            No
          </label>
        </div>
        <div>
          <label>ตัวถัง:</label>
          <label>
            <input
              type="radio"
              name="body"
              value="yes"
              checked={body === 'yes'}
              onChange={(e) => setBody(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="body"
              value="no"
              checked={body === 'no'}
              onChange={(e) => setBody(e.target.value)}
            />
            No
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FireExtinguisherStatus;
