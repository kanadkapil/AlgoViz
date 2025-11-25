import React from 'react';
import { Bar, Line, Radar } from 'react-chartjs-2';
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
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const MetricsLanding = () => {
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

  const timeComplexityData = {
    labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    datasets: [
      {
        label: 'O(n²) - Bubble/Insertion/Selection',
        data: [100, 400, 900, 1600, 2500, 3600, 4900, 6400, 8100, 10000],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: 'O(n log n) - Merge/Quick/Heap',
        data: [33, 86, 147, 212, 282, 354, 429, 506, 584, 664],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'O(n) - Linear',
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const spaceComplexityData = {
    labels: ['Bubble', 'Insertion', 'Selection', 'Merge', 'Quick', 'Heap', 'Counting', 'Radix'],
    datasets: [
      {
        label: 'Space Complexity (Auxiliary)',
        data: [1, 1, 1, 50, 20, 1, 80, 60], // Abstract relative scale
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  const radarData = {
    labels: ['Speed', 'Memory Efficiency', 'Simplicity', 'Stability', 'Adaptability'],
    datasets: [
      {
        label: 'Quick Sort',
        data: [90, 70, 60, 20, 80],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Merge Sort',
        data: [85, 40, 50, 100, 90],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-base-100 text-base-content p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Algorithm Performance Metrics</h1>
        <p className="text-xl opacity-70">Comprehensive analysis of Time and Space complexities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-base-200 shadow-xl p-6 h-96"
        >
            <Line 
                data={timeComplexityData} 
                options={{
                    ...commonOptions, 
                    plugins: { ...commonOptions.plugins, title: { ...commonOptions.plugins.title, text: 'Time Complexity Growth (Operations vs Input Size)' } }
                }} 
            />
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card bg-base-200 shadow-xl p-6 h-96"
        >
            <Bar 
                data={spaceComplexityData} 
                options={{
                    ...commonOptions, 
                    plugins: { ...commonOptions.plugins, title: { ...commonOptions.plugins.title, text: 'Auxiliary Space Complexity Comparison' } }
                }} 
            />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-base-200 shadow-xl p-6 h-[500px]"
        >
            <Radar 
                data={radarData} 
                options={{
                    ...commonOptions, 
                    scales: { r: { ticks: { display: false }, grid: { color: 'rgba(128, 128, 128, 0.2)' } } },
                    plugins: { ...commonOptions.plugins, title: { ...commonOptions.plugins.title, text: 'Algorithm Characteristics Comparison' } }
                }} 
            />
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card bg-base-200 shadow-xl p-6 flex flex-col justify-center"
        >
            <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
            <ul className="list-disc list-inside space-y-4 text-lg opacity-80">
                <li><span className="font-bold text-error">O(n²)</span> algorithms like Bubble Sort grow quadratically, making them inefficient for large datasets.</li>
                <li><span className="font-bold text-info">O(n log n)</span> algorithms like Merge Sort and Quick Sort are significantly faster for large inputs.</li>
                <li><span className="font-bold text-success">Space Complexity</span> matters: Merge Sort requires O(n) extra space, while Quick Sort and Heap Sort are in-place (O(log n) or O(1)).</li>
                <li><span className="font-bold text-warning">Stability</span> is crucial when sorting objects with multiple keys; Merge Sort is stable, Quick Sort is not.</li>
            </ul>
        </motion.div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default MetricsLanding;
