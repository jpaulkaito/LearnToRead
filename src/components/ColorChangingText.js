import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';

const ColorChangingText = ({ text, fontSize, onFontSizeChange }) => {
  const words = text.split(' ');

  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [lastSpokenIndex, setLastSpokenIndex] = useState(-1);
  const [isReadingAll, setIsReadingAll] = useState(false);
  const [readingTimeouts, setReadingTimeouts] = useState([]);

  const changeColor = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const goBackToFirstWord = () => {
    setCurrentColorIndex(0);
    setLastSpokenIndex(-1);
  };

  const goBackToPreviousWord = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
    setLastSpokenIndex(-1);
  };

  const handleFontSizeChange = (e) => {
    onFontSizeChange(e.target.value);
  };

  const readHighlightedWord = () => {
    const highlightedWord = words[currentColorIndex];
    speakText(highlightedWord);
  };

  const stopReading = () => {
    setIsReadingAll(false);
    readingTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    setReadingTimeouts([]);
  };

  const readAllText = () => {
    setIsReadingAll(true);

    const startReadingIndex = lastSpokenIndex >= 0 ? lastSpokenIndex + 1 : 0;

    const timeouts = words.slice(startReadingIndex).map((word, index) => {
      return setTimeout(() => {
        setCurrentColorIndex(startReadingIndex + index);
        setLastSpokenIndex(startReadingIndex + index);
        const highlightedWord = words[startReadingIndex + index];
        speakText(highlightedWord);
        console.log('Highlighted Word:', highlightedWord);
      }, index * 2000); // Delay each iteration by 2000ms (2 seconds)
    });

    setReadingTimeouts(timeouts);

    // After reading all words, reset the state
    setTimeout(() => {
      setIsReadingAll(false);
      setLastSpokenIndex(-1);
    }, words.length * 2000);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Clean up speech synthesis and timeouts on component unmount
    return () => {
      window.speechSynthesis.cancel();
      readingTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [readingTimeouts]);

  return (
    <div className="color-changing-text-container">
      <div style={{ fontSize: `${fontSize}px`, backgroundColor: 'white', marginTop: '80px' }}>
        {words.map((word, index) => (
          <span
            key={index}
            style={{
              color: index === currentColorIndex ? 'red' : 'black',
              backgroundColor: index === currentColorIndex ? 'yellow' : 'transparent',
            }}
          >
            {word}{' '}
          </span>
        ))}
      </div>
      <br />
      <br />
      <div className="floating-controls">
        <Card style={{ backgroundColor: 'lightblue' }}>
          <Card.Body>
            <Button className="btn btn-primary" onClick={changeColor}>
              Next Word
            </Button>
            <Button className="btn btn-info" onClick={readHighlightedWord}>
              Read The Word
            </Button>
            <Button className="btn btn-primary" onClick={goBackToPreviousWord}>
              Previous Word
            </Button>
            <br />
            {isReadingAll ? (
              <Button className="btn btn-danger" onClick={stopReading}>
                Stop
              </Button>
            ) : (
              <Button className="btn btn-success" onClick={readAllText}>
                Read All
              </Button>
            )}
            <Button className="btn btn-warning" onClick={goBackToFirstWord}>
              Go Back to First Word
            </Button>
            <br />
            <label htmlFor="fontSizeDropdown">Font Size:</label>
            <select
              className="form-select"
              id="fontSizeDropdown"
              onChange={handleFontSizeChange}
              value={fontSize}
              style={{ width: '20%', margin: 'auto' }}
            >
              {Array.from({ length: 25 }, (_, index) => index * 3 + 12).map((value) => (
                <option key={value} value={value.toString()}>
                  {value}px
                </option>
              ))}
            </select>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ColorChangingText;
