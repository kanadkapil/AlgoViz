export const sortingMetrics = {
  bubbleSort: {
    name: 'Bubble Sort',
    color: 'rgba(255, 99, 132, 1)',
    bg: 'rgba(255, 99, 132, 0.2)',
    timeComplexity: [100, 400, 900, 1600, 2500, 3600, 4900, 6400, 8100, 10000], // O(n^2)
    spaceComplexity: 1, // O(1)
    radar: [20, 100, 100, 100, 30], // Speed, Memory, Simplicity, Stability, Adaptability
    isStable: true,
    type: 'Comparison',
    polar: [20, 100, 10, 30], // Random, Sorted, Reverse, Few Unique
    bubble: { x: 95, y: 5, r: 5 }, // High Time, Low Space, Low Complexity
    scatter: { x: 4950, y: 2450 } // High Comparisons, High Swaps
  },
  selectionSort: {
    name: 'Selection Sort',
    color: 'rgba(54, 162, 235, 1)',
    bg: 'rgba(54, 162, 235, 0.2)',
    timeComplexity: [100, 400, 900, 1600, 2500, 3600, 4900, 6400, 8100, 10000], // O(n^2)
    spaceComplexity: 1,
    radar: [20, 100, 90, 40, 20],
    isStable: false,
    type: 'Comparison',
    polar: [20, 20, 20, 20], // Consistent bad performance
    bubble: { x: 95, y: 5, r: 6 },
    scatter: { x: 4950, y: 99 } // High Comparisons, Low Swaps (O(n))
  },
  insertionSort: {
    name: 'Insertion Sort',
    color: 'rgba(255, 206, 86, 1)',
    bg: 'rgba(255, 206, 86, 0.2)',
    timeComplexity: [55, 220, 495, 880, 1375, 1980, 2695, 3520, 4455, 5500], // O(n^2) but usually faster
    spaceComplexity: 1,
    radar: [40, 100, 95, 100, 90], // High adaptability
    isStable: true,
    type: 'Comparison',
    polar: [40, 100, 10, 50],
    bubble: { x: 60, y: 5, r: 7 },
    scatter: { x: 2500, y: 2500 }
  },
  mergeSort: {
    name: 'Merge Sort',
    color: 'rgba(75, 192, 192, 1)',
    bg: 'rgba(75, 192, 192, 0.2)',
    timeComplexity: [33, 86, 147, 212, 282, 354, 429, 506, 584, 664], // O(n log n)
    spaceComplexity: 50, // O(n)
    radar: [80, 40, 60, 100, 80],
    isStable: true,
    type: 'Comparison',
    polar: [80, 80, 80, 80], // Consistent
    bubble: { x: 20, y: 50, r: 15 },
    scatter: { x: 600, y: 600 }
  },
  quickSort: {
    name: 'Quick Sort',
    color: 'rgba(153, 102, 255, 1)',
    bg: 'rgba(153, 102, 255, 0.2)',
    timeComplexity: [30, 80, 130, 190, 250, 310, 380, 450, 520, 600], // O(n log n)
    spaceComplexity: 20, // O(log n)
    radar: [95, 70, 50, 20, 70],
    isStable: false,
    type: 'Comparison',
    polar: [95, 60, 60, 90],
    bubble: { x: 15, y: 20, r: 15 },
    scatter: { x: 700, y: 400 }
  },
  heapSort: {
    name: 'Heap Sort',
    color: 'rgba(255, 159, 64, 1)',
    bg: 'rgba(255, 159, 64, 0.2)',
    timeComplexity: [35, 90, 150, 220, 290, 360, 440, 520, 600, 690], // O(n log n)
    spaceComplexity: 1,
    radar: [85, 100, 40, 20, 85],
    isStable: false,
    type: 'Comparison',
    polar: [85, 85, 85, 85],
    bubble: { x: 25, y: 5, r: 20 }, // Complex implementation
    scatter: { x: 800, y: 800 }
  },
  radixSort: {
    name: 'Radix Sort',
    color: 'rgba(199, 199, 199, 1)',
    bg: 'rgba(199, 199, 199, 0.2)',
    timeComplexity: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200], // O(nk) -> Linear-ish
    spaceComplexity: 60, // O(n+k)
    radar: [90, 30, 40, 100, 40],
    isStable: true,
    type: 'Non-Comparison',
    polar: [90, 90, 90, 90],
    bubble: { x: 10, y: 60, r: 12 },
    scatter: { x: 0, y: 0 } // No comparisons
  },
  countingSort: {
    name: 'Counting Sort',
    color: 'rgba(83, 102, 255, 1)',
    bg: 'rgba(83, 102, 255, 0.2)',
    timeComplexity: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150], // O(n+k)
    spaceComplexity: 80, // High space for large range
    radar: [100, 10, 70, 100, 10], // Poor adaptability to large ranges
    isStable: true,
    type: 'Non-Comparison',
    polar: [100, 100, 100, 100],
    bubble: { x: 5, y: 80, r: 10 },
    scatter: { x: 0, y: 0 }
  },
  bucketSort: {
    name: 'Bucket Sort',
    color: 'rgba(255, 99, 255, 1)',
    bg: 'rgba(255, 99, 255, 0.2)',
    timeComplexity: [25, 50, 75, 100, 125, 150, 175, 200, 225, 250], // O(n+k) avg
    spaceComplexity: 50,
    radar: [85, 50, 50, 100, 60],
    isStable: true,
    type: 'Non-Comparison',
    polar: [90, 40, 40, 90], // Depends on distribution
    bubble: { x: 12, y: 50, r: 12 },
    scatter: { x: 100, y: 100 } // Some comparisons within buckets
  },
  timSort: {
    name: 'Tim Sort',
    color: 'rgba(0, 255, 127, 1)',
    bg: 'rgba(0, 255, 127, 0.2)',
    timeComplexity: [30, 80, 140, 200, 270, 340, 410, 490, 570, 650], // O(n log n)
    spaceComplexity: 50,
    radar: [90, 40, 30, 100, 100], // Very adaptable (used in Python/Java)
    isStable: true,
    type: 'Comparison',
    polar: [90, 100, 90, 95],
    bubble: { x: 18, y: 50, r: 25 }, // Very complex
    scatter: { x: 650, y: 650 }
  }
};

export const pathfindingMetrics = {
  dijkstra: {
    name: 'Dijkstra',
    color: 'rgba(255, 99, 132, 1)',
    bg: 'rgba(255, 99, 132, 0.2)',
    timeComplexity: [20, 50, 90, 140, 200, 270, 350, 440, 540, 650], // O(V+E log V)
    spaceComplexity: 60, // O(V)
    radar: [60, 50, 70, 100, 100], // Speed, Memory, Simplicity, Optimality, Completeness
    isStable: true, // "Optimal"
    type: 'Weighted',
    polar: [100, 100, 60, 80], // Guaranteed shortest path
    bubble: { x: 40, y: 60, r: 10 },
    scatter: { x: 500, y: 0 } // Visited nodes
  },
  astar: {
    name: 'A* Search',
    color: 'rgba(54, 162, 235, 1)',
    bg: 'rgba(54, 162, 235, 0.2)',
    timeComplexity: [10, 25, 45, 70, 100, 135, 175, 220, 270, 325], // O(E) best case
    spaceComplexity: 70, // O(V) - keeps all nodes in memory
    radar: [95, 40, 60, 100, 100],
    isStable: true, // Optimal
    type: 'Weighted',
    polar: [100, 100, 90, 90],
    bubble: { x: 20, y: 70, r: 15 },
    scatter: { x: 200, y: 0 }
  },
  bfs: {
    name: 'BFS',
    color: 'rgba(255, 206, 86, 1)',
    bg: 'rgba(255, 206, 86, 0.2)',
    timeComplexity: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200], // O(V+E)
    spaceComplexity: 80, // O(V) - wide frontier
    radar: [70, 30, 90, 100, 100],
    isStable: true, // Optimal for unweighted
    type: 'Unweighted',
    polar: [100, 50, 100, 100],
    bubble: { x: 30, y: 80, r: 5 },
    scatter: { x: 400, y: 0 }
  },
  dfs: {
    name: 'DFS',
    color: 'rgba(75, 192, 192, 1)',
    bg: 'rgba(75, 192, 192, 0.2)',
    timeComplexity: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150], // O(V+E)
    spaceComplexity: 20, // O(h) - recursion stack
    radar: [80, 90, 95, 10, 100], // Not optimal
    isStable: false, // Not optimal
    type: 'Unweighted',
    polar: [10, 10, 10, 10], // Can get lost
    bubble: { x: 25, y: 20, r: 5 },
    scatter: { x: 300, y: 0 }
  },
  greedyBestFirst: {
    name: 'Greedy Best-First',
    color: 'rgba(153, 102, 255, 1)',
    bg: 'rgba(153, 102, 255, 0.2)',
    timeComplexity: [5, 12, 22, 35, 50, 67, 87, 110, 135, 162], // Very fast
    spaceComplexity: 60,
    radar: [100, 50, 70, 10, 80], // Fast but not optimal
    isStable: false,
    type: 'Weighted',
    polar: [20, 20, 20, 20],
    bubble: { x: 10, y: 60, r: 10 },
    scatter: { x: 100, y: 0 }
  },
  bidirectionalBFS: {
    name: 'Bidirectional BFS',
    color: 'rgba(255, 159, 64, 1)',
    bg: 'rgba(255, 159, 64, 0.2)',
    timeComplexity: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // O(b^(d/2))
    spaceComplexity: 90, // High space (two frontiers)
    radar: [90, 20, 60, 100, 100],
    isStable: true,
    type: 'Unweighted',
    polar: [100, 50, 100, 100],
    bubble: { x: 20, y: 90, r: 15 },
    scatter: { x: 200, y: 0 }
  }
};
