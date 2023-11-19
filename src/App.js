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

  const handleFontSizeChange = (newSize) => {
    setFontSize(parseInt(newSize));
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header mytext={myTextData[0]?.mytext || ''} />
      {loading ? (
        <Loading />
        ) : (
        <ColorChangingText text={myTextData[0]?.mytext || ''} fontSize={fontSize} onFontSizeChange={handleFontSizeChange} />
      )}

    </div>
  );
}

export default App;
