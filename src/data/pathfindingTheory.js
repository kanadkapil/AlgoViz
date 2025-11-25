export const pathfindingTheory = {
  dijkstra: {
    title: "Dijkstra's Algorithm",
    description: "Dijkstra's algorithm finds the shortest path between nodes in a graph. It is a greedy algorithm that picks the unvisited node with the smallest tentative distance, calculates the distance to its neighbors, and updates their distances if a shorter path is found. It guarantees the shortest path for non-negative edge weights.",
    complexity: {
      time: {
        best: "O(E + V log V)",
        average: "O(E + V log V)",
        worst: "O(E + V log V)"
      },
      space: "O(V)"
    },
    code: {
      javascript: `function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === endNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}`,
      python: `def dijkstra(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        if current_distance > distances[current_node]:
            continue
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    return distances`,
      cpp: `void dijkstra(int start) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    dist[start] = 0;
    pq.push({0, start});
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        for (auto &edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (dist[v] > dist[u] + weight) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
}`
    }
  },
  astar: {
    title: "A* Search",
    description: "A* (A-Star) is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency. It uses a heuristic function to estimate the cost from the current node to the goal, prioritizing nodes that are likely to lead to the goal quickly.",
    complexity: {
      time: {
        best: "O(E)",
        average: "O(E)",
        worst: "O(b^d)"
      },
      space: "O(V)"
    },
    code: {
      javascript: `function astar(grid, startNode, endNode) {
  // ... setup openSet and closedSet
  startNode.g = 0;
  startNode.f = heuristic(startNode, endNode);
  openSet.push(startNode);
  
  while (openSet.length > 0) {
    // Get node with lowest f score
    let current = getLowestF(openSet);
    if (current === endNode) return reconstructPath(current);
    
    openSet = openSet.filter(n => n !== current);
    closedSet.push(current);
    
    for (let neighbor of getNeighbors(current, grid)) {
      if (closedSet.includes(neighbor) || neighbor.isWall) continue;
      
      let tentativeG = current.g + 1;
      if (tentativeG < neighbor.g) {
        neighbor.previous = current;
        neighbor.g = tentativeG;
        neighbor.f = neighbor.g + heuristic(neighbor, endNode);
        if (!openSet.includes(neighbor)) openSet.push(neighbor);
      }
    }
  }
}`,
      python: `def a_star(start, goal):
    open_set = {start}
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}
    
    while open_set:
        current = min(open_set, key=lambda x: f_score.get(x, float('inf')))
        if current == goal:
            return reconstruct_path(came_from, current)
            
        open_set.remove(current)
        for neighbor in get_neighbors(current):
            tentative_g = g_score[current] + d(current, neighbor)
            if tentative_g < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score[neighbor] = g_score[neighbor] + heuristic(neighbor, goal)
                open_set.add(neighbor)`,
      cpp: `// A* implementation structure
struct Node {
    int x, y;
    double f, g, h;
    Node* parent;
};
// ... priority queue and heuristic logic ...`
    }
  },
  bfs: {
    title: "Breadth-First Search (BFS)",
    description: "BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. It guarantees the shortest path in an unweighted graph.",
    complexity: {
      time: {
        best: "O(V + E)",
        average: "O(V + E)",
        worst: "O(V + E)"
      },
      space: "O(V)"
    },
    code: {
      javascript: `function bfs(grid, startNode, endNode) {
  const queue = [startNode];
  startNode.isVisited = true;
  while (queue.length) {
    const currentNode = queue.shift();
    if (currentNode === endNode) return true;
    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }
}`,
      python: `def bfs(graph, start):
    visited, queue = set(), [start]
    visited.add(start)
    while queue:
        vertex = queue.pop(0)
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
      cpp: `void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`
    }
  },
  dfs: {
    title: "Depth-First Search (DFS)",
    description: "DFS is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root in the case of a graph) and explores as far as possible along each branch before backtracking. It does NOT guarantee the shortest path.",
    complexity: {
      time: {
        best: "O(V + E)",
        average: "O(V + E)",
        worst: "O(V + E)"
      },
      space: "O(V)"
    },
    code: {
      javascript: `function dfs(grid, startNode, endNode) {
  const stack = [startNode];
  while (stack.length) {
    const currentNode = stack.pop();
    if (currentNode === endNode) return true;
    if (!currentNode.isVisited) {
      currentNode.isVisited = true;
      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.previousNode = currentNode;
          stack.push(neighbor);
        }
      }
    }
  }
}`,
      python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    for next in graph[start] - visited:
        dfs(graph, next, visited)
    return visited`,
      cpp: `void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v])
            dfs(v);
    }
}`
    }
  },
  greedyBestFirstSearch: {
    title: "Greedy Best-First Search",
    description: "Greedy Best-First Search is an AI search algorithm that attempts to find the most promising path from a given starting node to a target node. It prioritizes nodes that are estimated to be closest to the goal using a heuristic function. It is not guaranteed to find the shortest path.",
    complexity: {
      time: {
        best: "O(1)",
        average: "O(b^m)",
        worst: "O(b^m)"
      },
      space: "O(b^m)"
    },
    code: {
      javascript: `function greedyBestFirst(grid, start, end) {
  const pq = new PriorityQueue();
  pq.enqueue(start, heuristic(start, end));
  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    if (current === end) return reconstructPath(current);
    for (const neighbor of getNeighbors(current)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        neighbor.previous = current;
        pq.enqueue(neighbor, heuristic(neighbor, end));
      }
    }
  }
}`,
      python: `def greedy_best_first(start, goal):
    pq = [(heuristic(start, goal), start)]
    visited = {start}
    while pq:
        _, current = heapq.heappop(pq)
        if current == goal: return True
        for neighbor in get_neighbors(current):
            if neighbor not in visited:
                visited.add(neighbor)
                heapq.heappush(pq, (heuristic(neighbor, goal), neighbor))`,
      cpp: `// Similar to A* but f(n) = h(n) instead of g(n) + h(n)`
    }
  },
  bellmanFord: {
    title: "Bellman-Ford Algorithm",
    description: "The Bellman-Ford algorithm computes shortest paths from a single source vertex to all of the other vertices in a weighted digraph. It is slower than Dijkstra's algorithm for the same problem, but more versatile, as it is capable of handling graphs in which some of the edge weights are negative numbers.",
    complexity: {
      time: {
        best: "O(E)",
        average: "O(VE)",
        worst: "O(VE)"
      },
      space: "O(V)"
    },
    code: {
      javascript: `function bellmanFord(nodes, edges, start) {
  const distances = {};
  nodes.forEach(n => distances[n] = Infinity);
  distances[start] = 0;
  
  for (let i = 0; i < nodes.length - 1; i++) {
    for (const edge of edges) {
      if (distances[edge.source] + edge.weight < distances[edge.target]) {
        distances[edge.target] = distances[edge.source] + edge.weight;
      }
    }
  }
  return distances;
}`,
      python: `def bellman_ford(graph, start):
    distance = {node: float('inf') for node in graph}
    distance[start] = 0
    for _ in range(len(graph) - 1):
        for u, v, w in graph.edges:
            if distance[u] + w < distance[v]:
                distance[v] = distance[u] + w
    return distance`,
      cpp: `void bellmanFord(int src) {
    dist[src] = 0;
    for (int i = 1; i <= V - 1; i++) {
        for (auto edge : edges) {
            int u = edge.src;
            int v = edge.dest;
            int weight = edge.weight;
            if (dist[u] != INT_MAX && dist[u] + weight < dist[v])
                dist[v] = dist[u] + weight;
        }
    }
}`
    }
  },
  iddfs: {
    title: "Iterative Deepening DFS (IDDFS)",
    description: "IDDFS is a state space/graph search strategy in which a depth-limited version of depth-first search is run repeatedly with increasing depth limits until the goal is found. IDDFS is optimal like breadth-first search, but uses much less memory; at each step the it visits the nodes in the search tree in the same order as depth-first search.",
    complexity: {
      time: {
        best: "O(b^d)",
        average: "O(b^d)",
        worst: "O(b^d)"
      },
      space: "O(d)"
    },
    code: {
      javascript: `function iddfs(start, target) {
  let depth = 0;
  while (true) {
    if (dls(start, target, depth)) return true;
    depth++;
  }
}
function dls(node, target, limit) {
  if (node === target) return true;
  if (limit <= 0) return false;
  for (const neighbor of getNeighbors(node)) {
    if (dls(neighbor, target, limit - 1)) return true;
  }
  return false;
}`,
      python: `def iddfs(start, target):
    depth = 0
    while True:
        if dls(start, target, depth): return True
        depth += 1`,
      cpp: `bool dls(int node, int target, int limit) {
    if (node == target) return true;
    if (limit <= 0) return false;
    for (int neighbor : adj[node])
        if (dls(neighbor, target, limit - 1)) return true;
    return false;
}`
    }
  },
  uniformCostSearch: {
    title: "Uniform Cost Search",
    description: "Uniform Cost Search is a tree search algorithm used for traversing or searching a weighted tree, tree structure, or graph. The search begins at the root node. The search continues by visiting the next node which has the least total cost from the root. It is equivalent to Dijkstra's algorithm if all edge weights are non-negative.",
    complexity: {
      time: {
        best: "O(b^(C*/e))",
        average: "O(b^(C*/e))",
        worst: "O(b^(C*/e))"
      },
      space: "O(b^(C*/e))"
    },
    code: {
      javascript: `// Same as Dijkstra for general graphs
function ucs(graph, start, goal) {
  const pq = new PriorityQueue();
  pq.enqueue(start, 0);
  const cost = { [start]: 0 };
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    if (current === goal) return cost[goal];
    
    for (const neighbor of graph[current]) {
      const newCost = cost[current] + neighbor.weight;
      if (!cost[neighbor] || newCost < cost[neighbor]) {
        cost[neighbor] = newCost;
        pq.enqueue(neighbor, newCost);
      }
    }
  }
}`,
      python: `def ucs(graph, start, goal):
    pq = [(0, start)]
    visited = set()
    while pq:
        cost, node = heapq.heappop(pq)
        if node == goal: return cost
        if node not in visited:
            visited.add(node)
            for neighbor, weight in graph[node].items():
                heapq.heappush(pq, (cost + weight, neighbor))`,
      cpp: `// Implementation uses priority_queue similar to Dijkstra`
    }
  },
  bidirectionalBFS: {
    title: "Bidirectional BFS",
    description: "Bidirectional search is a graph search algorithm that finds a shortest path from an initial vertex to a goal vertex in a directed graph. It runs two simultaneous searches: one forward from the initial state, and one backward from the goal, stopping when the two meet.",
    complexity: {
      time: {
        best: "O(b^(d/2))",
        average: "O(b^(d/2))",
        worst: "O(b^(d/2))"
      },
      space: "O(b^(d/2))"
    },
    code: {
      javascript: `function bidirectionalBFS(start, end) {
  const q1 = [start], q2 = [end];
  const visited1 = new Set([start]), visited2 = new Set([end]);
  
  while (q1.length && q2.length) {
    if (bfsStep(q1, visited1, visited2)) return true;
    if (bfsStep(q2, visited2, visited1)) return true;
  }
  return false;
}`,
      python: `def bidirectional_bfs(start, end):
    q1, q2 = {start}, {end}
    visited1, visited2 = {start}, {end}
    while q1 and q2:
        if step(q1, visited1, visited2): return True
        if step(q2, visited2, visited1): return True
    return False`,
      cpp: `// Uses two queues and two visited arrays`
    }
  }
};
