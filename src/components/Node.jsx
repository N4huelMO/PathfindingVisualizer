import React, { useEffect, useRef } from "react";

const Node = ({ isFinish, isStart, row, col, isWall, onMouseDown }) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      className={`node ${extraClassName}`}
      id={`node-${col}-${row}`}
      onMouseDown={() => {
        onMouseDown(col, row);
      }}
    ></div>
  );
};

export default Node;
