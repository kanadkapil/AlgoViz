import React from 'react';
import Layout from './components/common/Layout';
import useAppStore from './store/useAppStore';
import SortingVisualizer from './components/sorting/SortingVisualizer';
import PathfindingGrid from './components/pathfinding/PathfindingGrid';
import useSortingController from './hooks/useSortingController';
import usePathfindingController from './hooks/usePathfindingController';

function App() {
  const { mode } = useAppStore();

  // Initialize controllers
  useSortingController();
  usePathfindingController();

  return (
    <Layout>
      <div className="h-full w-full flex items-center justify-center">
        {mode === 'sorting' ? (
          <SortingVisualizer />
        ) : (
          <PathfindingGrid />
        )}
      </div>
    </Layout>
  );
}

export default App;
