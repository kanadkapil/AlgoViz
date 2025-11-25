import React, { useState, useMemo } from 'react';
import { Bar, Line, Radar, Doughnut, Pie, PolarArea, Bubble, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  Filler
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { sortingMetrics, pathfindingMetrics } from '../../data/algorithmMetrics';
import { Check } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  Filler
);

const MetricsLanding = () => {
  const [category, setCategory] = useState('sorting'); // 'sorting' or 'pathfinding'
  const [selectedAlgos, setSelectedAlgos] = useState(['bubbleSort', 'mergeSort', 'quickSort']);

  const metricsData = category === 'sorting' ? sortingMetrics : pathfindingMetrics;
  const availableAlgos = Object.keys(metricsData);

  // Filter selectedAlgos to ensure they exist in the current metricsData (prevents crash during category switch)
  const safeSelectedAlgos = selectedAlgos.filter(key => metricsData[key]);

  // Ensure selection is valid when switching categories
  React.useEffect(() => {
    if (category === 'pathfinding' && !selectedAlgos.some(algo => pathfindingMetrics[algo])) {
        setSelectedAlgos(['dijkstra', 'astar', 'bfs']);
    } else if (category === 'sorting' && !selectedAlgos.some(algo => sortingMetrics[algo])) {
        setSelectedAlgos(['bubbleSort', 'mergeSort', 'quickSort']);
    }
  }, [category]);

  const toggleAlgo = (key) => {
    if (selectedAlgos.includes(key)) {
        if (selectedAlgos.length > 1) {
            setSelectedAlgos(selectedAlgos.filter(k => k !== key));
        }
    } else {
        if (selectedAlgos.length < 5) { // Limit to 5 for readability
            setSelectedAlgos([...selectedAlgos, key]);
        }
    }
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: 'currentColor' } },
      title: { display: true, color: 'currentColor', font: { size: 16 } },
    },
    scales: {
        y: { ticks: { color: 'currentColor' }, grid: { color: 'rgba(128, 128, 128, 0.2)' } },
        x: { ticks: { color: 'currentColor' }, grid: { color: 'rgba(128, 128, 128, 0.2)' } }
    }
  };

  const noGridOptions = {
    ...commonOptions,
    scales: {
        y: { display: false },
        x: { display: false }
    }
  };

  // --- Dynamic Data Generation ---

  const timeComplexityData = useMemo(() => ({
    labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    datasets: safeSelectedAlgos.map(key => ({
        label: metricsData[key].name,
        data: metricsData[key].timeComplexity,
        borderColor: metricsData[key].color,
        backgroundColor: metricsData[key].bg,
        fill: false,
        tension: 0.4,
    }))
  }), [safeSelectedAlgos, metricsData]);

  const spaceComplexityData = useMemo(() => ({
    labels: safeSelectedAlgos.map(key => metricsData[key].name),
    datasets: [{
        label: 'Auxiliary Space (Units)',
        data: safeSelectedAlgos.map(key => metricsData[key].spaceComplexity),
        backgroundColor: safeSelectedAlgos.map(key => metricsData[key].color),
    }]
  }), [safeSelectedAlgos, metricsData]);

  const radarData = useMemo(() => ({
    labels: category === 'sorting' 
        ? ['Speed (Small)', 'Speed (Large)', 'Memory', 'Simplicity', 'Stability']
        : ['Speed', 'Memory', 'Simplicity', 'Optimality', 'Completeness'],
    datasets: safeSelectedAlgos.map(key => ({
        label: metricsData[key].name,
        data: metricsData[key].radar,
        backgroundColor: metricsData[key].bg,
        borderColor: metricsData[key].color,
        borderWidth: 2,
    }))
  }), [safeSelectedAlgos, metricsData, category]);

  const stabilityData = useMemo(() => {
    const stableCount = safeSelectedAlgos.filter(key => metricsData[key].isStable).length;
    const unstableCount = safeSelectedAlgos.length - stableCount;
    return {
        labels: [category === 'sorting' ? 'Stable' : 'Optimal', category === 'sorting' ? 'Unstable' : 'Sub-optimal'],
        datasets: [{
            data: [stableCount, unstableCount],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        }]
    };
  }, [safeSelectedAlgos, metricsData, category]);

  const typeData = useMemo(() => {
    const types = {};
    safeSelectedAlgos.forEach(key => {
        const t = metricsData[key].type;
        types[t] = (types[t] || 0) + 1;
    });
    return {
        labels: Object.keys(types),
        datasets: [{
            data: Object.values(types),
            backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 159, 64, 0.6)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1,
        }]
    };
  }, [safeSelectedAlgos, metricsData]);

  const polarData = useMemo(() => ({
    labels: category === 'sorting' 
        ? ['Random', 'Sorted', 'Reverse', 'Few Unique']
        : ['Open Maze', 'Maze with Walls', 'Weighted', 'Negative Edges'],
    datasets: safeSelectedAlgos.map(key => ({
        label: metricsData[key].name,
        data: metricsData[key].polar,
        backgroundColor: metricsData[key].bg.replace('0.2', '0.5'), // More opaque
        borderWidth: 1,
    }))
  }), [safeSelectedAlgos, metricsData, category]);

  const bubbleData = useMemo(() => ({
    datasets: safeSelectedAlgos.map(key => ({
        label: metricsData[key].name,
        data: [metricsData[key].bubble],
        backgroundColor: metricsData[key].color,
    }))
  }), [safeSelectedAlgos, metricsData]);

  const scatterData = useMemo(() => ({
    datasets: safeSelectedAlgos.map(key => ({
        label: metricsData[key].name,
        data: [metricsData[key].scatter],
        backgroundColor: metricsData[key].color,
        pointRadius: 8
    }))
  }), [safeSelectedAlgos, metricsData]);


  return (
    <div className="h-full w-full overflow-y-auto bg-base-100 text-base-content p-6 flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Algorithm Analytics</h1>
        <p className="text-xl opacity-70 max-w-3xl mx-auto mb-6">
          Compare algorithms side-by-side. Select up to 5 algorithms to visualize their performance metrics.
        </p>
        
        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
            <div className="join">
                <button 
                    className={`btn join-item ${category === 'sorting' ? 'btn-primary' : 'btn-neutral'}`}
                    onClick={() => setCategory('sorting')}
                >
                    Sorting
                </button>
                <button 
                    className={`btn join-item ${category === 'pathfinding' ? 'btn-secondary' : 'btn-neutral'}`}
                    onClick={() => setCategory('pathfinding')}
                >
                    Pathfinding
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
                {availableAlgos.map(key => (
                    <button
                        key={key}
                        className={`btn btn-sm ${selectedAlgos.includes(key) ? (category === 'sorting' ? 'btn-outline btn-primary' : 'btn-outline btn-secondary') : 'btn-ghost'}`}
                        onClick={() => toggleAlgo(key)}
                    >
                        {selectedAlgos.includes(key) && <Check className="w-4 h-4 mr-1" />}
                        {metricsData[key].name}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="space-y-12">
          
        {/* Row 1: The Big Picture (Line & Bar) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div layout className="card bg-base-200 shadow-xl p-6 h-[450px]">
                <h3 className="text-xl font-bold mb-2">Time Complexity Growth</h3>
                <p className="text-sm opacity-70 mb-4">Execution time vs Input size (n).</p>
                <div className="flex-1 min-h-0">
                    <Line data={timeComplexityData} options={{...commonOptions, plugins: {...commonOptions.plugins, title: {display:false}}}} />
                </div>
            </motion.div>

            <motion.div layout className="card bg-base-200 shadow-xl p-6 h-[450px]">
                <h3 className="text-xl font-bold mb-2">Space Complexity</h3>
                <p className="text-sm opacity-70 mb-4">Auxiliary memory usage.</p>
                <div className="flex-1 min-h-0">
                    <Bar data={spaceComplexityData} options={{...commonOptions, plugins: {...commonOptions.plugins, title: {display:false}}}} />
                </div>
            </motion.div>
        </div>

        {/* Row 2: Characteristics & Trade-offs (Radar & Bubble) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div layout className="card bg-base-200 shadow-xl p-6 h-[500px]">
                <h3 className="text-xl font-bold mb-2">Algorithm Profile</h3>
                <p className="text-sm opacity-70 mb-4">Multi-dimensional attribute comparison.</p>
                <div className="flex-1 min-h-0">
                    <Radar data={radarData} options={{...commonOptions, scales: { r: { ticks: { display: false }, grid: { color: 'rgba(128, 128, 128, 0.2)' } } }, plugins: { ...commonOptions.plugins, title: { display: false } }}} />
                </div>
            </motion.div>

            <motion.div layout className="card bg-base-200 shadow-xl p-6 h-[500px]">
                <h3 className="text-xl font-bold mb-2">Trade-off Analysis</h3>
                <p className="text-sm opacity-70 mb-4">X: Time, Y: Space, Size: Complexity.</p>
                <div className="flex-1 min-h-0">
                    <Bubble 
                        data={bubbleData} 
                        options={{
                            ...commonOptions,
                            plugins: { ...commonOptions.plugins, title: { display: false } },
                            scales: {
                                y: { ...commonOptions.scales.y, title: { display: true, text: 'Memory Usage' } },
                                x: { ...commonOptions.scales.x, title: { display: true, text: 'Execution Time' } }
                            }
                        }} 
                    />
                </div>
            </motion.div>
        </div>

        {/* Row 3: Distributions (Doughnut, Pie, Polar) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div layout className="card bg-base-200 shadow-xl p-6 h-[400px]">
                <h3 className="text-lg font-bold mb-2 text-center">{category === 'sorting' ? 'Stability' : 'Optimality'}</h3>
                <div className="flex-1 min-h-0">
                    <Doughnut data={stabilityData} options={noGridOptions} />
                </div>
            </motion.div>

            <motion.div layout className="card bg-base-200 shadow-xl p-6 h-[400px]">
                <h3 className="text-lg font-bold mb-2 text-center">Algorithm Type</h3>
                <div className="flex-1 min-h-0">
                    <Pie data={typeData} options={noGridOptions} />
                </div>
            </motion.div>

            <motion.div layout className="card bg-base-200 shadow-xl p-6 h-[400px]">
                <h3 className="text-lg font-bold mb-2 text-center">Adaptability</h3>
                <div className="flex-1 min-h-0">
                    <PolarArea 
                        data={polarData} 
                        options={{
                            ...noGridOptions,
                            scales: { r: { ticks: { display: false }, grid: { color: 'rgba(128, 128, 128, 0.2)' } } }
                        }} 
                    />
                </div>
            </motion.div>
        </div>

        {/* Row 4: Detailed Operations (Scatter) & Literature */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div layout className="card bg-base-200 shadow-xl p-6 lg:col-span-2 h-[400px]">
                <h3 className="text-xl font-bold mb-2">{category === 'sorting' ? 'Comparisons vs Swaps' : 'Visited Nodes vs Path Length'}</h3>
                <p className="text-sm opacity-70 mb-4">
                    {category === 'sorting' 
                        ? 'Swaps are often more expensive than comparisons in memory operations.' 
                        : 'Efficiency is measured by how few nodes are visited to find the shortest path.'}
                </p>
                <div className="flex-1 min-h-0">
                    <Scatter 
                        data={scatterData} 
                        options={{
                            ...commonOptions,
                            scales: {
                                y: { ...commonOptions.scales.y, title: { display: true, text: category === 'sorting' ? 'Swaps' : 'Path Length' } },
                                x: { ...commonOptions.scales.x, title: { display: true, text: category === 'sorting' ? 'Comparisons' : 'Visited Nodes' } }
                            }
                        }} 
                    />
                </div>
            </motion.div>

            <motion.div layout className="card bg-base-200 shadow-xl p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Metric Definitions</h2>
                <div className="space-y-4 overflow-y-auto pr-2">
                    <div>
                        <h4 className="font-bold text-primary">Time Complexity</h4>
                        <p className="text-sm opacity-70">
                            {category === 'sorting'
                                ? 'How the execution time grows as the list size increases.'
                                : 'How execution time grows with the number of vertices (V) and edges (E).'}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-secondary">Space Complexity</h4>
                        <p className="text-sm opacity-70">
                            {category === 'sorting'
                                ? 'Extra memory needed. O(1) is ideal (in-place).'
                                : 'Memory needed to store the frontier and visited set.'}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-accent">{category === 'sorting' ? 'Stability' : 'Optimality'}</h4>
                        <p className="text-sm opacity-70">
                            {category === 'sorting'
                                ? 'Preserves the relative order of equal elements. Crucial for multi-key sorting.'
                                : 'Guarantees finding the shortest possible path (e.g., Dijkstra, A*).'}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default MetricsLanding;
