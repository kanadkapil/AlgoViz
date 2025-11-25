import React from 'react';
import { motion } from 'framer-motion';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
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
  ArcElement,
} from 'chart.js';
import useAppStore from '../../store/useAppStore';
import { ArrowRight, BarChart2, Activity, Zap, Code } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Home = () => {
  const { setMode } = useAppStore();

  const barData = {
    labels: ['Bubble', 'Insertion', 'Selection', 'Merge', 'Quick', 'Heap'],
    datasets: [
      {
        label: 'Average Time Complexity (O)',
        data: [100, 80, 80, 20, 15, 20], // Abstract representation
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    datasets: [
      {
        label: 'O(n²)',
        data: [10, 40, 90, 160, 250, 360, 490, 640, 810, 1000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
      {
        label: 'O(n log n)',
        data: [10, 26, 44, 64, 85, 107, 129, 152, 176, 200],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const doughnutData = {
    labels: ['Sorting', 'Pathfinding', 'Graph', 'Search'],
    datasets: [
      {
        label: '# of Algorithms',
        data: [10, 10, 5, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
            color: 'currentColor'
        }
      },
      title: {
        display: true,
        text: 'Algorithm Efficiency Comparison',
        color: 'currentColor'
      },
    },
    scales: {
        y: {
            ticks: { color: 'currentColor' },
            grid: { color: 'rgba(128, 128, 128, 0.2)' }
        },
        x: {
            ticks: { color: 'currentColor' },
            grid: { color: 'rgba(128, 128, 128, 0.2)' }
        }
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-base-100 text-base-content p-6">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero min-h-[60vh] rounded-3xl overflow-hidden relative mb-12"
        style={{
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-5 text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
            >
                Master Algorithms
            </motion.h1>
            <p className="mb-8 text-xl md:text-2xl text-white/90 drop-shadow-md">
              Visualize, Compare, and Understand the core logic behind Sorting and Pathfinding.
              An interactive educational platform designed for developers and students.
            </p>
            <div className="flex gap-4 justify-center">
                <button 
                    className="btn btn-primary btn-lg border-none bg-white text-indigo-600 hover:bg-gray-100 shadow-xl"
                    onClick={() => setMode('sorting')}
                >
                    Start Sorting <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button 
                    className="btn btn-secondary btn-lg border-none bg-indigo-500 text-white hover:bg-indigo-600 shadow-xl"
                    onClick={() => setMode('pathfinding')}
                >
                    Explore Paths <Activity className="w-5 h-5 ml-2" />
                </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
            { title: 'Interactive Visualization', icon: <Zap className="w-8 h-8 text-yellow-500" />, desc: 'Watch algorithms execute step-by-step with real-time visual feedback.' },
            { title: 'Comprehensive Theory', icon: <Code className="w-8 h-8 text-blue-500" />, desc: 'Deep dive into complexities, pseudocode, and implementation details.' },
            { title: 'Performance Metrics', icon: <BarChart2 className="w-8 h-8 text-green-500" />, desc: 'Compare efficiency with detailed statistical analysis and graphs.' }
        ].map((feature, idx) => (
            <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
                <div className="card-body items-center text-center">
                    <div className="p-4 rounded-full bg-base-300 mb-2">
                        {feature.icon}
                    </div>
                    <h2 className="card-title text-2xl">{feature.title}</h2>
                    <p className="text-base-content/70">{feature.desc}</p>
                </div>
            </motion.div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="flex flex-col gap-12">
        <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Analytical Insights</h2>
            <p className="text-xl text-base-content/60">Understand the mathematical foundations through visual data.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="card bg-base-200 shadow-xl p-6"
            >
                <h3 className="text-xl font-bold mb-4 text-center">Time Complexity Growth</h3>
                <div className="h-64 md:h-80 w-full flex justify-center">
                    <Line data={lineData} options={{...options, maintainAspectRatio: false}} />
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="card bg-base-200 shadow-xl p-6"
            >
                <h3 className="text-xl font-bold mb-4 text-center">Algorithm Efficiency Score</h3>
                <div className="h-64 md:h-80 w-full flex justify-center">
                    <Bar data={barData} options={{...options, maintainAspectRatio: false}} />
                </div>
            </motion.div>
        </div>
      </div>
      
      <div className="h-20"></div> {/* Spacer */}
    </div>
  );
};

export default Home;
