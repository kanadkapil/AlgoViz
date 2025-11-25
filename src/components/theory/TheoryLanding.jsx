import React, { useState } from 'react';
import { sortingTheory } from '../../data/sortingTheory';
import { pathfindingTheory } from '../../data/pathfindingTheory';
import { BookOpen, Code, Clock, Database, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TheoryLanding = () => {
    const [selectedCategory, setSelectedCategory] = useState('sorting'); // 'sorting' or 'pathfinding'
    const [selectedAlgo, setSelectedAlgo] = useState('bubbleSort');

    const currentData = selectedCategory === 'sorting' ? sortingTheory : pathfindingTheory;
    const algoData = currentData[selectedAlgo];

    return (
        <div className="h-full w-full flex flex-col md:flex-row bg-base-100 overflow-hidden">
            {/* Mobile Selection Dropdown */}
            <div className="md:hidden p-4 bg-base-200 border-b border-base-300">
                <select 
                    className="select select-bordered w-full"
                    value={`${selectedCategory}-${selectedAlgo}`}
                    onChange={(e) => {
                        const [cat, algo] = e.target.value.split('-');
                        setSelectedCategory(cat);
                        setSelectedAlgo(algo);
                    }}
                >
                    <optgroup label="Sorting">
                        {Object.keys(sortingTheory).map(key => (
                            <option key={key} value={`sorting-${key}`}>{sortingTheory[key].title}</option>
                        ))}
                    </optgroup>
                    <optgroup label="Pathfinding">
                        {Object.keys(pathfindingTheory).map(key => (
                            <option key={key} value={`pathfinding-${key}`}>{pathfindingTheory[key].title}</option>
                        ))}
                    </optgroup>
                </select>
            </div>

            {/* Sidebar */}
            <div className="w-64 bg-base-200 border-r border-base-300 flex-none overflow-y-auto hidden md:block">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" /> Documentation
                    </h2>
                    
                    <div className="mb-6">
                        <h3 className="font-semibold opacity-70 mb-2 uppercase text-xs tracking-wider">Sorting</h3>
                        <ul className="menu bg-base-200 w-full rounded-box p-0">
                            {Object.keys(sortingTheory).map(key => (
                                <li key={key}>
                                    <a 
                                        className={selectedCategory === 'sorting' && selectedAlgo === key ? 'active' : ''}
                                        onClick={() => { setSelectedCategory('sorting'); setSelectedAlgo(key); }}
                                    >
                                        {sortingTheory[key].title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold opacity-70 mb-2 uppercase text-xs tracking-wider">Pathfinding</h3>
                        <ul className="menu bg-base-200 w-full rounded-box p-0">
                            {Object.keys(pathfindingTheory).map(key => (
                                <li key={key}>
                                    <a 
                                        className={selectedCategory === 'pathfinding' && selectedAlgo === key ? 'active' : ''}
                                        onClick={() => { setSelectedCategory('pathfinding'); setSelectedAlgo(key); }}
                                    >
                                        {pathfindingTheory[key].title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                {algoData ? (
                    <motion.div 
                        key={selectedAlgo}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex items-center gap-2 text-sm opacity-50 mb-4">
                            <span className="uppercase">{selectedCategory}</span>
                            <ChevronRight className="w-4 h-4" />
                            <span>{algoData.title}</span>
                        </div>

                        <h1 className="text-5xl font-bold mb-8 text-primary">{algoData.title}</h1>

                        <div className="prose prose-lg max-w-none mb-12">
                            <p className="lead text-xl">{algoData.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="card bg-base-200 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title flex items-center gap-2">
                                        <Clock className="w-6 h-6 text-warning" /> Time Complexity
                                    </h3>
                                    <div className="overflow-x-auto mt-4">
                                        <table className="table w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="font-semibold">Best Case</td>
                                                    <td className="font-mono text-success">{algoData.complexity.time.best}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Average Case</td>
                                                    <td className="font-mono text-warning">{algoData.complexity.time.average}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Worst Case</td>
                                                    <td className="font-mono text-error">{algoData.complexity.time.worst}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-200 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title flex items-center gap-2">
                                        <Database className="w-6 h-6 text-info" /> Space Complexity
                                    </h3>
                                    <div className="flex items-center justify-center h-full">
                                        <span className="text-4xl font-mono font-bold text-info">{algoData.complexity.space}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                                <Code className="w-8 h-8" /> Implementation
                            </h2>
                            <div className="mockup-code bg-slate-900 text-slate-100">
                                <pre data-prefix="1"><code>// JavaScript Implementation</code></pre>
                                <pre><code>{algoData.code.javascript}</code></pre>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex items-center justify-center h-full opacity-50">
                        Select an algorithm to view details
                    </div>
                )}
            </div>
        </div>
    );
};

export default TheoryLanding;
