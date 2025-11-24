export function* insertionSort(array) {
    const arr = [...array];
    const n = arr.length;

    // First element is implicitly sorted
    yield {
        type: 'sorted',
        indices: [0],
        array: [...arr]
    };

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        // Highlight key
        yield {
            type: 'compare',
            indices: [i],
            array: [...arr]
        };

        while (j >= 0 && arr[j] > key) {
            // Compare
            yield {
                type: 'compare',
                indices: [j, j + 1],
                array: [...arr]
            };

            arr[j + 1] = arr[j];

            // Show shift (swap visualization for shift)
            yield {
                type: 'swap',
                indices: [j, j + 1],
                array: [...arr]
            };

            j = j - 1;
        }
        arr[j + 1] = key;

        // Update array after insertion
        yield {
            type: 'swap',
            indices: [j + 1], // Just highlight insertion point
            array: [...arr]
        };

        // Mark 0 to i as sorted
        const sortedIndices = [];
        for (let k = 0; k <= i; k++) sortedIndices.push(k);

        yield {
            type: 'sorted',
            indices: sortedIndices,
            array: [...arr]
        };
    }

    yield {
        type: 'sorted',
        indices: Array.from({ length: n }, (_, i) => i),
        array: [...arr]
    };
}
