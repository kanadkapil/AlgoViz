export function* bubbleSort(array) {
    const arr = [...array];
    const n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            // Yield comparison state
            yield {
                type: 'compare',
                indices: [j, j + 1],
                array: [...arr]
            };

            if (arr[j] > arr[j + 1]) {
                // Swap
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;

                // Yield swap state
                yield {
                    type: 'swap',
                    indices: [j, j + 1],
                    array: [...arr]
                };
            }
        }

        // Mark last element as sorted
        yield {
            type: 'sorted',
            indices: [n - i - 1],
            array: [...arr]
        };

        if (!swapped) {
            // If no swaps, remaining are sorted
            const remaining = [];
            for (let k = 0; k < n - i - 1; k++) remaining.push(k);
            yield {
                type: 'sorted',
                indices: remaining,
                array: [...arr]
            }
            break;
        }
    }

    // Ensure all are marked sorted at the end
    const allIndices = Array.from({ length: n }, (_, i) => i);
    yield {
        type: 'sorted',
        indices: allIndices,
        array: [...arr]
    };
}
