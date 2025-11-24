import React from 'react';
import usePathfindingStore from '../../store/usePathfindingStore';
import { Play, Pause, RotateCcw, Trash2 } from 'lucide-react';

const PathfindingControls = () => {
    const {
        algorithm,
        setAlgorithm,
        isPlaying,
        setIsPlaying,
        resetGrid,
        clearPath,
        isFinished
    } = usePathfindingStore();

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Algorithm Selection */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Algorithm</span>
                </label>
                <select
                    className="select select-bordered w-full"
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    disabled={isPlaying}
                >
                    <option value="dijkstra">Dijkstra's Algorithm</option>
                    <option value="astar">A* Search</option>
                    <option value="bfs">Breadth-First Search (BFS)</option>
                    <option value="dfs">Depth-First Search (DFS)</option>
                    {/* Add more options */}
                </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
                <button
                    className="btn btn-primary flex-1"
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={isFinished}
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                    className="btn btn-neutral btn-square"
                    onClick={clearPath}
                    title="Clear Path"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
                <button
                    className="btn btn-neutral btn-square"
                    onClick={resetGrid}
                    title="Reset Grid"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default PathfindingControls;
