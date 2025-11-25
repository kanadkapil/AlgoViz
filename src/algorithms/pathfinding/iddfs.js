export function* iddfs(grid, startNode, endNode) {
    let depth = 0;
    while (true) {
        const visited = new Set();
        const found = yield* dls(grid, startNode, endNode, depth, visited);
        if (found) return;
        depth++;
        // Safety break for infinite loops if unreachable
        if (depth > grid.length * grid[0].length) return; 
    }
}

function* dls(grid, currentNode, endNode, limit, visited) {
    if (currentNode.isWall) return false;
    
    yield {
        type: 'visited',
        node: currentNode
    };

    if (currentNode === endNode) return true;
    if (limit <= 0) return false;

    visited.add(`${currentNode.row}-${currentNode.col}`);

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
        if (!visited.has(`${neighbor.row}-${neighbor.col}`) && !neighbor.isWall) {
            neighbor.previousNode = currentNode;
            const found = yield* dls(grid, neighbor, endNode, limit - 1, new Set(visited)); // Pass copy of visited for path-specific visited
            if (found) return true;
        }
    }
    return false;
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
