import { useState, useEffect } from "react";
import aStar from "../algorithm/aStar";
import NavBar from "./NavBar";
import References from "./References";
import Node from "./Node";

const Pathfind = () => {
  const [rows, setRow] = useState(29);
  const [cols, setCol] = useState(49);
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [startNodeRow, setStartNodeRow] = useState(7);
  const [startNodeCol, setStartNodeCol] = useState(10);
  const [finishNodeRow, setfinishNodeRow] = useState(24);
  const [finishNodeCol, setfinishNodeCol] = useState(40);

  const [board, setBoard] = useState(
    Array(cols)
      .fill(0)
      .map((_, col) =>
        Array(rows)
          .fill(0)
          .map((_, row) => {
            return {
              row,
              col,
              isStart: row === startNodeRow && col === startNodeCol,
              isFinish: row === finishNodeRow && col === finishNodeCol,
              g: 0,
              f: 0,
              h: 0,
              neighbors: [],
              isWall: false,
              prev: null,
            };
          })
      )
  );

  const [start, setStart] = useState(board[startNodeCol][startNodeRow]);
  const [end, setEnd] = useState(board[finishNodeCol][finishNodeRow]);
  const [disable, setDisable] = useState(false);

  const addNeighbors = (i, j, board) => {
    const neighbors = [];
    if (i > 0) neighbors.push(board[i - 1][j]);
    if (i < cols - 1) neighbors.push(board[i + 1][j]);
    if (j > 0) neighbors.push(board[i][j - 1]);
    if (j < rows - 1) neighbors.push(board[i][j + 1]);
    return neighbors;
  };

  useEffect(() => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const tempBoard = board;
        tempBoard[i][j].neighbors = addNeighbors(i, j, board);
        setBoard(tempBoard);
      }
    }

    start.isWall = false;
    end.isWall = false;

    let pathFound = aStar(start, end, board);

    setPath(pathFound.path);
    setVisitedNodes(pathFound.visitedNodes);
  }, [board, start, end]);

  const shortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const rev = [...shortestPathNodes].reverse();
        const node = rev[i];

        document.getElementById(`node-${node.col}-${node.row}`).className =
          "node node-shortest-path";
      }, 25 * i);
    }

    setTimeout(() => {
      setDisable(false);
    }, 2000);
  };

  const visualizePath = () => {
    resetPath();
    setDisable(true);

    for (let i = 1; i < visitedNodes.length; i++) {
      if (i + 1 === visitedNodes.length) {
        setTimeout(() => {
          shortestPath(path);
        }, 10 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          document.getElementById(`node-${node.col}-${node.row}`).className =
            "node node-visited";
        }, 10 * i);
      }
    }
  };

  const HandleMouseDown = (col, row) => {
    const newBoard = getNewGridWithWall(board, col, row);

    setBoard(newBoard);
  };

  const getNewGridWithWall = (board, col, row) => {
    const newBoard = board.slice();
    const node = newBoard[col][row];
    const newNode = { ...node, isWall: !node.isWall };

    newBoard[col][row] = newNode;
    return newBoard;
  };

  const randomWalls = () => {
    resetPath();

    const newBoard = board.slice();
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        if (
          (row === start.row && col === start.col) ||
          (row === end.row && col === end.col)
        )
          continue;
        const node = newBoard[col][row];

        const newNode = {
          ...node,
          isWall: Math.random(1) < 0.34 ? true : false,
        };

        newBoard[col][row] = newNode;
      }
    }
    setBoard(newBoard);
  };

  const resetPath = () => {
    const newBoard = board.slice();

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        if (col === startNodeCol && row === startNodeRow) {
          document.getElementById(`node-${col}-${row}`).className =
            "node node-start";
        }
        if (col === finishNodeCol && row === finishNodeRow) {
          document.getElementById(`node-${col}-${row}`).className =
            "node node-finish";
        }
        const node = newBoard[col][row];

        const nodeVisited = document.getElementById(
          `node-${node.col}-${node.row}`
        ).classList;

        nodeVisited.remove("node-visited", "node-shortest-path");
      }
    }
  };

  const resetWalls = () => {
    const newBoard = board.slice();

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const node = newBoard[col][row];

        if (node.isWall) {
          node.isWall = false;
        }
      }
    }

    setBoard(newBoard);
  };

  const maze = () => {
    resetPath();
    resetWalls();

    const newBoard = board.slice();

    for (let col = 0; col < cols; col++) {
      if (col == 0 || col == cols - 1) {
        for (let row = 0; row < rows; row++) {
          newBoard[col][row].isWall = true;
        }
      } else {
        newBoard[col][0].isWall = true;
        newBoard[col][rows - 1].isWall = true;
      }
    }

    addInnerWalls(true, 1, rows - 2, 1, cols - 2);
  };

  const addInnerWalls = (h, minX, maxX, minY, maxY) => {
    if (h) {
      if (maxX - minX < 2) {
        return;
      }

      let y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
      addHWall(minX, maxX, y);

      addInnerWalls(!h, minX, maxX, minY, y - 1);
      addInnerWalls(!h, minX, maxX, y + 1, maxY);
    } else {
      if (maxY - minY < 2) {
        return;
      }

      let x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
      addVWall(minY, maxY, x);

      addInnerWalls(!h, minX, x - 1, minY, maxY);
      addInnerWalls(!h, x + 1, maxX, minY, maxY);
    }
  };

  const addHWall = (minX, maxX, y) => {
    let hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;

    for (let i = minX; i <= maxX; i++) {
      if (i == hole) board[y][i].isWall = false;
      else board[y][i].isWall = true;
    }
  };

  const addVWall = (minY, maxY, x) => {
    let hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;

    for (let i = minY; i <= maxY; i++) {
      if (i == hole) board[i][x].isWall = false;
      else board[i][x].isWall = true;
    }
  };

  const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <>
      <div className="container">
        <NavBar
          visualizePath={visualizePath}
          resetPath={resetPath}
          randomWalls={randomWalls}
          resetWalls={resetWalls}
          maze={maze}
          disable={disable}
        />

        <References />

        <div className="container-grid">
          {board.map((grid, colIndex) => (
            <div key={colIndex}>
              {grid.map((cell, rowIndex) => {
                const { isFinish, isStart, isWall } = cell;

                return (
                  <Node
                    onMouseDown={HandleMouseDown}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    key={rowIndex}
                    row={rowIndex}
                    col={colIndex}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pathfind;
