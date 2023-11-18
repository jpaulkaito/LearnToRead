import React, { useState, useEffect } from 'react';
import './App.css';

const ColorChangingText = ({ text, fontSize, onFontSizeChange }) => {
  const words = text.split(' ');

  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const changeColor = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const goBackToFirstWord = () => {
    setCurrentColorIndex(0);
  };

  const goBackToPreviousWord = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
  };

  const handleFontSizeChange = (e) => {
    onFontSizeChange(e.target.value);
  };

  const readHighlightedWord = () => {
    const highlightedWord = words[currentColorIndex];
    speakText(highlightedWord);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Clean up speech synthesis on component unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div>
      <div style={{ fontSize: `${fontSize}px`, backgroundColor: 'white' }}>
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
      <button onClick={changeColor}>Next Word</button>
      <button onClick={readHighlightedWord}>Read The Word</button>
      <button onClick={goBackToPreviousWord}>Previous Word</button>
      <button onClick={goBackToFirstWord}>Go Back to First Word</button>
      <br />
      <label htmlFor="fontSizeDropdown">Font Size:</label>
      <select id="fontSizeDropdown" onChange={handleFontSizeChange} value={fontSize}>
        <option value="12">12px</option>
        <option value="16">16px</option>
        <option value="20">20px</option>
        <option value="24">24px</option>
        <option value="36">36px</option>
        <option value="48">48px</option>
        <option value="72">72px</option>
      </select>
    </div>
  );
};

function App() {
  const myText =
    "Once upon a time in a colorful forest, there was a little bunny named Benny. Benny loved to hop around and explore the magical world of the forest. One sunny day, Benny met a friendly squirrel named Sammy. Sammy and Benny decided to go on an exciting adventure together. They hopped over fluffy clouds, danced with butterflies, and even had a chat with a wise old owl. The forest was full of giggles and laughter. As the sun started to set, Benny and Sammy found a cozy spot under a big, sparkling mushroom. They sat down and shared a tasty snack of crunchy carrots and juicy berries. The stars twinkled above them, and the moon smiled down, making the night feel magical. With full tummies and happy hearts, Benny and Sammy said goodnight to their forest friends and snuggled into a soft bed of leaves. As they closed their eyes, they whispered sweet dreams to each other. And so, in the quiet and peaceful forest, Benny and Sammy drifted off to sleep, knowing that tomorrow would bring more adventures and new friends to meet. The end.";
  const [fontSize, setFontSize] = useState(36);

  const handleFontSizeChange = (newSize) => {
    setFontSize(parseInt(newSize, 10));
  };

  return (
    <div className="App">
      <header className="App-header">
        <ColorChangingText text={myText} fontSize={fontSize} onFontSizeChange={handleFontSizeChange} />
      </header>
    </div>
  );
}

export default App;
