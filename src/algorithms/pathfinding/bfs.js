import { getNodesInShortestPathOrder } from './dijkstra';

export function* bfs(grid, startNode, endNode) {
    const queue = [startNode];
    startNode.isVisited = true;
    startNode.distance = 0;

    while (queue.length > 0) {
        const currentNode = queue.shift();

        if (currentNode === endNode) return getNodesInShortestPathOrder(endNode);

        yield {
            type: 'visited',
            node: currentNode
        };

        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                neighbor.isVisited = true;
                neighbor.previousNode = currentNode;
                neighbor.distance = currentNode.distance + 1;
                queue.push(neighbor);
            }
        }
    }
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}
