export function* selectionSort(array) {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
            // Compare
            yield {
                type: 'compare',
                indices: [minIdx, j],
                array: [...arr]
            };

            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            // Swap
            let temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;

            yield {
                type: 'swap',
                indices: [i, minIdx],
                array: [...arr]
            };
        }

        // Mark sorted
        yield {
            type: 'sorted',
            indices: [i],
            array: [...arr]
        };
    }

    // Ensure all marked sorted
    yield {
        type: 'sorted',
        indices: Array.from({ length: n }, (_, i) => i),
        array: [...arr]
    };
}
