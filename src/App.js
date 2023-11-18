import React, { useState } from 'react';
import './App.css';
import Header from './components/header';
import ColorChangingText from './components/ColorChangingText';


function App() {
  const myText =
    "Once upon a time in a colorful forest, there was a little bunny named Benny. Benny loved to hop around and explore the magical world of the forest. One sunny day, Benny met a friendly squirrel named Sammy. Sammy and Benny decided to go on an exciting adventure together. They hopped over fluffy clouds, danced with butterflies, and even had a chat with a wise old owl. The forest was full of giggles and laughter. As the sun started to set, Benny and Sammy found a cozy spot under a big, sparkling mushroom. They sat down and shared a tasty snack of crunchy carrots and juicy berries. The stars twinkled above them, and the moon smiled down, making the night feel magical. With full tummies and happy hearts, Benny and Sammy said goodnight to their forest friends and snuggled into a soft bed of leaves. As they closed their eyes, they whispered sweet dreams to each other. And so, in the quiet and peaceful forest, Benny and Sammy drifted off to sleep, knowing that tomorrow would bring more adventures and new friends to meet. The end.";
  const [fontSize, setFontSize] = useState(36);

  const handleFontSizeChange = (newSize) => {
    setFontSize(parseInt(newSize));
  };

  return (
    <div className="App">
      <Header />
      <ColorChangingText text={myText} fontSize={fontSize} onFontSizeChange={handleFontSizeChange} />
    </div>
  );
}

export default App;
