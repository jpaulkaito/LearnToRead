import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ColorChangingText from './components/ColorChangingText';
import { baseUrl } from './api/baseURL';
import Loading from './components/Loading';

function App() {
  const [myTextData, setMyTextData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(36);
  const [error, setError] = useState(null);

  const handleFontSizeChange = (newSize) => {
    setFontSize(parseInt(newSize));
  };

  const handleTextUpdate = async (newText) => {
    try {
      const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mytext: newText }),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      // Update the local state with the new text
      setMyTextData([{ mytext: newText }]);
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update data. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMyTextData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header mytext={myTextData[0]?.mytext || ''} onUpdateText={handleTextUpdate} />
      {loading ? (
        <Loading />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ColorChangingText text={myTextData[0]?.mytext || ''} fontSize={fontSize} onFontSizeChange={handleFontSizeChange} />
      )}
    </div>
  );
}

export default App;
