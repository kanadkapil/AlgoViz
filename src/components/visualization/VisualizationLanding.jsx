import React from 'react';
import useAppStore from '../../store/useAppStore';
import { ArrowRight, Activity, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const VisualizationLanding = () => {
    const { setMode } = useAppStore();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-base-100">
            <h1 className="text-4xl font-bold mb-12 text-center">Choose Visualization Mode</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="card bg-base-200 shadow-xl cursor-pointer hover:bg-base-300 transition-colors"
                    onClick={() => setMode('sorting')}
                >
                    <div className="card-body items-center text-center">
                        <BarChart2 className="w-24 h-24 text-primary mb-4" />
                        <h2 className="card-title text-3xl">Sorting Algorithms</h2>
                        <p className="text-base-content/70">Visualize Bubble, Merge, Quick Sort and more with dynamic bars.</p>
                        <button className="btn btn-primary mt-4">Start Sorting</button>
                    </div>
                </motion.div>

                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="card bg-base-200 shadow-xl cursor-pointer hover:bg-base-300 transition-colors"
                    onClick={() => setMode('pathfinding')}
                >
                    <div className="card-body items-center text-center">
                        <Activity className="w-24 h-24 text-secondary mb-4" />
                        <h2 className="card-title text-3xl">Pathfinding Algorithms</h2>
                        <p className="text-base-content/70">Explore Dijkstra, A*, BFS, DFS and more on an interactive grid.</p>
                        <button className="btn btn-secondary mt-4">Start Pathfinding</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default VisualizationLanding;
