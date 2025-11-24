function* quickSortHelper(arr, low, high) {
    if (low < high) {
        const pi = yield* partition(arr, low, high);

        yield* quickSortHelper(arr, low, pi - 1);
        yield* quickSortHelper(arr, pi + 1, high);
    } else if (low === high) {
        yield {
            type: 'sorted',
            indices: [low],
            array: [...arr]
        };
    }
}

function* partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    // Highlight pivot
    yield {
        type: 'compare',
        indices: [high],
        array: [...arr]
    };

    for (let j = low; j < high; j++) {
        // Compare with pivot
        yield {
            type: 'compare',
            indices: [j, high],
            array: [...arr]
        };

        if (arr[j] < pivot) {
            i++;
            // Swap
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            yield {
                type: 'swap',
                indices: [i, j],
                array: [...arr]
            };
        }
    }

    // Swap pivot to correct position
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    yield {
        type: 'swap',
        indices: [i + 1, high],
        array: [...arr]
    };

    // Mark pivot as sorted
    yield {
        type: 'sorted',
        indices: [i + 1],
        array: [...arr]
    };

    return i + 1;
}

export function* quickSort(array) {
    const arr = [...array];
    yield* quickSortHelper(arr, 0, arr.length - 1);

    yield {
        type: 'sorted',
        indices: Array.from({ length: arr.length }, (_, i) => i),
        array: [...arr]
    };
}
