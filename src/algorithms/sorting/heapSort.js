export function* heapSort(array) {
    let arr = [...array];
    let n = arr.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        yield* heapify(arr, n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        yield {
            type: 'swap',
            indices: [0, i],
            array: [...arr]
        };
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        yield {
            type: 'swap',
            indices: [0, i],
            array: [...arr]
        };

        yield {
            type: 'sorted',
            indices: [i],
            array: [...arr]
        };

        // call max heapify on the reduced heap
        yield* heapify(arr, i, 0);
    }

    yield {
        type: 'sorted',
        indices: [0],
        array: [...arr]
    };
}

function* heapify(arr, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    // If left child is larger than root
    if (l < n) {
        yield {
            type: 'compare',
            indices: [l, largest],
            array: [...arr]
        };
        if (arr[l] > arr[largest]) {
            largest = l;
        }
    }

    // If right child is larger than largest so far
    if (r < n) {
        yield {
            type: 'compare',
            indices: [r, largest],
            array: [...arr]
        };
        if (arr[r] > arr[largest]) {
            largest = r;
        }
    }

    // If largest is not root
    if (largest !== i) {
        yield {
            type: 'swap',
            indices: [i, largest],
            array: [...arr]
        };
        let swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        yield {
            type: 'swap',
            indices: [i, largest],
            array: [...arr]
        };

        // Recursively heapify the affected sub-tree
        yield* heapify(arr, n, largest);
    }
}
