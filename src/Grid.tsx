import React from 'react';
import './Grid.css';

import { coordinates } from './types';

type GridProps = {
    size?: number;
    playerCoordinates?: coordinates;
    candyCoordinates?: coordinates;
};

const Grid = ({ size = 5, playerCoordinates = { x: 0, y: 0 }, candyCoordinates = { x: 0, y: 0 } }: GridProps) => {
    const gridArray = Array.from({ length: size }, () => Array.from({ length: size }, () => ''));

    const playerOrCandy = (cellIndex: number, rowIndex: number) => {
        if (playerCoordinates && playerCoordinates.x === cellIndex && playerCoordinates.y === rowIndex) {
            return '🦿';
        }

        if (candyCoordinates && candyCoordinates.x === cellIndex && candyCoordinates.y === rowIndex) {
            return '🍫';
        }

        return '.' // A dot to make the grid look a little nicer
    };

    return (
      <div className="grid-container">
        <div className="grid-wrapper">
          {gridArray.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid-row">
              {row.map((cell, cellIndex) => (
                <div key={`cell-${cellIndex}`} className="grid-cell" data-testid="cell">
                  {playerOrCandy(cellIndex, rowIndex)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          Player coordinates: x: {playerCoordinates.x} y: {playerCoordinates.y} <br />
          Candy coordinates: x: {candyCoordinates.x} y: {candyCoordinates.y}
        </div>
      </div>
    );
};

export default Grid;
