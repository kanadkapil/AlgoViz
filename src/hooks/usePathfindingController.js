import { useEffect, useRef } from 'react';
import usePathfindingStore from '../store/usePathfindingStore';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/pathfinding/dijkstra';
import { astar } from '../algorithms/pathfinding/astar';
import { bfs } from '../algorithms/pathfinding/bfs';
import { dfs } from '../algorithms/pathfinding/dfs';

const algorithms = {
    dijkstra,
    astar,
    bfs,
    dfs,
    // Add others here
};

const usePathfindingController = () => {
    const {
        grid,
        algorithm,
        isPlaying,
        speed,
        startNode,
        endNode,
        markVisited,
        markPath,
        setIsPlaying,
        isFinished
    } = usePathfindingStore();

    const generatorRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isPlaying && !isFinished) {
            if (!generatorRef.current) {
                // Start new generator
                const algoFunc = algorithms[algorithm];
                if (algoFunc) {
                    // We need to pass the actual node objects from the grid
                    const start = grid[startNode.row][startNode.col];
                    const end = grid[endNode.row][endNode.col];
                    generatorRef.current = algoFunc(grid, start, end);
                }
            }

            intervalRef.current = setInterval(() => {
                const { value, done } = generatorRef.current.next();

                if (done) {
                    // Animate path
                    const end = grid[endNode.row][endNode.col];
                    const path = getNodesInShortestPathOrder(end);
                    animatePath(path);

                    clearInterval(intervalRef.current);
                    generatorRef.current = null;
                    usePathfindingStore.setState({ isFinished: true, isPlaying: false });
                } else {
                    if (value.type === 'visited') {
                        markVisited(value.node.row, value.node.col);
                    }
                }
            }, speed);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying, speed, algorithm, isFinished]);

    const animatePath = (path) => {
        let i = 0;
        const pathInterval = setInterval(() => {
            if (i >= path.length) {
                clearInterval(pathInterval);
                return;
            }
            const node = path[i];
            markPath(node.row, node.col);
            i++;
        }, 50);
    };

    // Reset generator when grid changes or algorithm changes (if not playing)
    useEffect(() => {
        if (!isPlaying) {
            generatorRef.current = null;
        }
    }, [grid, algorithm, isPlaying]);
};

export default usePathfindingController;
