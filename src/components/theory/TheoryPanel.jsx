import React, { useState } from 'react';
import useAppStore from '../../store/useAppStore';
import useSortingStore from '../../store/useSortingStore';
import usePathfindingStore from '../../store/usePathfindingStore';
import { sortingTheory } from '../../data/sortingTheory';
import { pathfindingTheory } from '../../data/pathfindingTheory';
import { X, BookOpen, Code, Clock, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TheoryPanel = () => {
  const { isTheoryOpen, toggleTheory, mode } = useAppStore();
  const { algorithm: sortingAlgo } = useSortingStore();
  const { algorithm: pathfindingAlgo } = usePathfindingStore();
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' or 'code'
  const [codeLang, setCodeLang] = useState('javascript');

  if (!isTheoryOpen) return null;

  const data = mode === 'sorting' 
    ? sortingTheory[sortingAlgo] 
    : pathfindingTheory[pathfindingAlgo];

  if (!data) {
    return (
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="fixed right-0 top-16 bottom-0 w-96 bg-base-100 border-l border-base-300 shadow-xl z-20 p-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Theory</h2>
          <button onClick={toggleTheory} className="btn btn-ghost btn-sm btn-square">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-base-content/70">No theory data available for this algorithm yet.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-16 bottom-0 w-[500px] bg-base-100 border-l border-base-300 shadow-xl z-20 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-base-300 flex justify-between items-center bg-base-200/50">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {data.title}
        </h2>
        <button onClick={toggleTheory} className="btn btn-ghost btn-sm btn-square">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed m-4 bg-base-200">
        <a 
          className={`tab flex-1 ${activeTab === 'theory' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          Theory
        </a>
        <a 
          className={`tab flex-1 ${activeTab === 'code' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </a>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pt-0">
        {activeTab === 'theory' ? (
          <div className="space-y-6">
            <div className="prose prose-sm">
              <p>{data.description}</p>
            </div>

            <div className="card bg-base-200 p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Time Complexity
              </h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-base-content/60 text-xs">Best</span>
                  <span className="font-mono text-success">{data.complexity.time.best}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base-content/60 text-xs">Average</span>
                  <span className="font-mono text-warning">{data.complexity.time.average}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base-content/60 text-xs">Worst</span>
                  <span className="font-mono text-error">{data.complexity.time.worst}</span>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" /> Space Complexity
              </h3>
              <span className="font-mono">{data.complexity.space}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2 mb-2">
              {['javascript', 'python', 'cpp'].map(lang => (
                <button
                  key={lang}
                  className={`btn btn-xs ${codeLang === lang ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setCodeLang(lang)}
                >
                  {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
            <div className="mockup-code bg-slate-900 text-slate-100 text-sm">
              <pre><code>{data.code[codeLang]}</code></pre>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TheoryPanel;
