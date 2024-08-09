import React, { useEffect, useState } from 'react';
import './App.css';
import Grid from './Grid';
import sound from './assets/collect.wav';

import { coordinates } from './types';

function App() {
  const size: number = 5;

  const [playerCoordinates, setPlayerCoordinates] = useState<coordinates>({ x: 0, y: 0 });
  const [candyCoordinates, setCandyCoordinates] = useState<coordinates>({ x: 4, y: 4 });
  const [collectedCandies, setCollectedCandies] = useState<number>(0);

  const clampToBounds = (position: number): number => {
    return Math.min(Math.max(position, 0), size - 1);
  };

  function playSound(): void {
    const audio = new Audio(sound);
    audio.play();
  }

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      switch (event.key) {
        case 'ArrowUp':
          setPlayerCoordinates((prev) => ({ x: prev.x, y: clampToBounds(prev.y - 1) }));
          break;
        case 'ArrowDown':
          setPlayerCoordinates((prev) => ({ x: prev.x, y: clampToBounds(prev.y + 1) }));
          break;
        case 'ArrowLeft':
          setPlayerCoordinates((prev) => ({ x: clampToBounds(prev.x - 1), y: prev.y }));
          break;
        case 'ArrowRight':
          setPlayerCoordinates((prev) => ({ x: clampToBounds(prev.x + 1), y: prev.y }));
          break;
      }
    };

    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const handleCollectCandy = (): void => {
      if (playerCoordinates.x === candyCoordinates.x && playerCoordinates.y === candyCoordinates.y) {
        playSound();
        setCollectedCandies((prev) => prev + 1);
        setCandyCoordinates({
          x: Math.floor(Math.random() * size),
          y: Math.floor(Math.random() * size),
        });
      }
    };

    handleCollectCandy();
  }, [playerCoordinates, candyCoordinates]);

  // adds random location to the candy on first render
  useEffect(() => {
    setCandyCoordinates({
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    });
  }, []);

  return (
    <div className="App">
      <h1>Collected candies: {collectedCandies}</h1>
      <Grid size={size} playerCoordinates={playerCoordinates} candyCoordinates={candyCoordinates} />
    </div>
  );
}

export default App;
