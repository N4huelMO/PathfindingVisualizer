function aStar(start, end) {
  let openList = [];
  let closedList = [];
  let path = [];
  let visitedNodes = [];

  openList.push(start);

  while (openList.length > 0) {
    let minIndex = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[minIndex].f) {
        minIndex = i;
      }
    }

    let current = openList[minIndex];

    visitedNodes.push(current);

    if (current === end) {
      let temp = current;

      path.push(temp);
      while (temp.prev) {
        path.push(temp.prev);
        temp = temp.prev;
      }

      return { path, visitedNodes };
    }

    openList = openList.filter((element) => element !== current);
    closedList.push(current);

    let neighbors = current.neighbors;

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedList.includes(neighbor) && !neighbor.isWall) {
        let tempG = current.g + 1;
        let newPath = false;

        if (openList.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openList.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.h + neighbor.g;
          neighbor.prev = current;
        }
      }
    }
  }
  return { path, visitedNodes, error: "No path found!" };
}

function heuristic(a, b) {
  let d = Math.abs(b.row - a.row) + Math.abs(b.col - a.col);

  return d;
}

export default aStar;
