export function* bidirectionalBFS(grid, startNode, endNode) {
    const startQueue = [startNode];
    const endQueue = [endNode];
    const startVisited = new Set([`${startNode.row}-${startNode.col}`]);
    const endVisited = new Set([`${endNode.row}-${endNode.col}`]);
    
    startNode.previousNode = null;
    endNode.previousNode = null; // We'll handle path reconstruction differently

    while (startQueue.length > 0 && endQueue.length > 0) {
        // Expand from start
        if (startQueue.length > 0) {
            const currStart = startQueue.shift();
            yield { type: 'visited', node: currStart };

            if (endVisited.has(`${currStart.row}-${currStart.col}`)) {
                // Meeting point found!
                // We need to connect the paths. 
                // currStart has a previousNode chain back to start.
                // currStart also needs to connect to the path from end.
                // But wait, the 'previousNode' logic in the store assumes a single chain.
                // For visualization, we might just stop here.
                return;
            }

            const neighbors = getNeighbors(currStart, grid);
            for (const neighbor of neighbors) {
                if (!startVisited.has(`${neighbor.row}-${neighbor.col}`) && !neighbor.isWall) {
                    startVisited.add(`${neighbor.row}-${neighbor.col}`);
                    neighbor.previousNode = currStart; // Standard path pointer
                    startQueue.push(neighbor);
                }
            }
        }

        // Expand from end
        if (endQueue.length > 0) {
            const currEnd = endQueue.shift();
            yield { type: 'visited', node: currEnd };

            if (startVisited.has(`${currEnd.row}-${currEnd.col}`)) {
                // Meeting point found!
                // Connect path: currEnd -> ... -> End
                // And currEnd -> ... -> Start (via previousNode set in start expansion)
                
                // To make the standard 'getNodesInShortestPathOrder' work, we'd need to reverse the pointers from the meeting point to the end.
                // This is complex for the current store structure.
                // For now, we'll just visualize the search meeting.
                return;
            }

            const neighbors = getNeighbors(currEnd, grid);
            for (const neighbor of neighbors) {
                if (!endVisited.has(`${neighbor.row}-${neighbor.col}`) && !neighbor.isWall) {
                    endVisited.add(`${neighbor.row}-${neighbor.col}`);
                    // We can't overwrite previousNode if we want to preserve the start path.
                    // But we need to visualize it.
                    // Let's just mark it visited.
                    // For a proper bidirectional path, we'd need a 'nextNode' or separate 'previousNodeFromEnd'.
                    // Simplification: Just run BFS from both sides.
                    endQueue.push(neighbor);
                }
            }
        }
    }
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
