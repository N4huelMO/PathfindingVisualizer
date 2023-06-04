import React from "react";

const juj = () => {
  return (
    <div className="references">
      <ul>
        <li>
          <div className="node node-start"></div>Start Node
        </li>
        <li>
          <div className="node node-finish"></div>Finish Node
        </li>
        <li>
          <div className="node node-wall"></div>Wall Node
        </li>
        <li>
          <div className="node node-visited"></div>Visited Node
        </li>
        <li>
          <div className="node node-shortest-path"></div>Shortest Path Node
        </li>
        <li>
          <div className="node"></div> Unvisited Node
        </li>
      </ul>
    </div>
  );
};

export default juj;
