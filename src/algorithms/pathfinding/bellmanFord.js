export function* bellmanFord(grid, startNode, endNode) {
    const nodes = getAllNodes(grid);
    startNode.distance = 0;

    // V-1 iterations
    // Since we want to visualize the spread, we can yield visited nodes as we update them
    // However, Bellman-Ford updates all edges repeatedly. 
    // For visualization, we can show the "wave" of updates.
    
    // Optimization: If no distance changes in an iteration, stop.
    
    // Flatten grid to edge list or just iterate grid
    // Grid edges are implicit (up, down, left, right)
    
    const rows = grid.length;
    const cols = grid[0].length;
    const numNodes = rows * cols;

    for (let i = 0; i < numNodes - 1; i++) {
        let changes = false;
        
        // We will iterate through all nodes and their neighbors (edges)
        for (const node of nodes) {
            if (node.distance === Infinity || node.isWall) continue;

            const neighbors = getNeighbors(node, grid);
            for (const neighbor of neighbors) {
                if (neighbor.isWall) continue;
                
                const newDist = node.distance + 1; // Weight is 1
                if (newDist < neighbor.distance) {
                    neighbor.distance = newDist;
                    neighbor.previousNode = node;
                    changes = true;
                    
                    yield {
                        type: 'visited',
                        node: neighbor
                    };
                    
                    if (neighbor === endNode) {
                        // We found a path, but Bellman-Ford continues to find shortest.
                        // For visualization, we usually want to see it reach the end.
                    }
                }
            }
        }
        
        if (!changes) break;
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
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
