import React from "react";

const NavBar = ({
  visualizePath,
  resetPath,
  randomWalls,
  maze,
  disable,
  resetWalls,
}) => {
  return (
    <nav className="nav-container">
      <button className="btn" onClick={visualizePath} disabled={disable}>
        Visulize aStar
      </button>
      <button className="btn" onClick={randomWalls} disabled={disable}>
        Random Walls
      </button>
      <button
        className="btn"
        onClick={() => {
          maze();
        }}
        disabled={disable}
      >
        Generate Maze
      </button>
      <button
        className="btn"
        onClick={() => {
          resetPath();
        }}
        disabled={disable}
      >
        Clear Path
      </button>
      <button
        className="btn"
        onClick={() => {
          resetWalls(), resetPath();
        }}
        disabled={disable}
      >
        Clear Board
      </button>
    </nav>
  );
};

export default NavBar;
