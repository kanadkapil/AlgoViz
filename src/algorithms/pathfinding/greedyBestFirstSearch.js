export function* greedyBestFirstSearch(grid, startNode, endNode) {
    const openSet = [];
    const closedSet = new Set();
    
    startNode.distance = 0;
    startNode.heuristic = manhattanDistance(startNode, endNode);
    openSet.push(startNode);

    while (openSet.length > 0) {
        // Sort by heuristic only
        openSet.sort((a, b) => a.heuristic - b.heuristic);
        const currentNode = openSet.shift();

        if (currentNode.isWall) continue;
        if (closedSet.has(`${currentNode.row}-${currentNode.col}`)) continue;

        closedSet.add(`${currentNode.row}-${currentNode.col}`);

        yield {
            type: 'visited',
            node: currentNode
        };

        if (currentNode === endNode) return;

        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (!closedSet.has(`${neighbor.row}-${neighbor.col}`) && !neighbor.isWall) {
                neighbor.previousNode = currentNode;
                neighbor.heuristic = manhattanDistance(neighbor, endNode);
                
                // Check if already in openSet to avoid duplicates (optional but good for performance)
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
}

function manhattanDistance(nodeA, nodeB) {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}
