function* mergeSortHelper(arr, start, end, fullArray) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    yield* mergeSortHelper(arr, start, mid, fullArray);
    yield* mergeSortHelper(arr, mid + 1, end, fullArray);
    yield* merge(arr, start, mid, end, fullArray);
}

function* merge(arr, start, mid, end, fullArray) {
    let i = start;
    let j = mid + 1;
    const temp = [];

    while (i <= mid && j <= end) {
        // Compare
        yield {
            type: 'compare',
            indices: [i, j],
            array: [...fullArray]
        };

        if (arr[i] <= arr[j]) {
            temp.push(arr[i]);
            i++;
        } else {
            temp.push(arr[j]);
            j++;
        }
    }

    while (i <= mid) {
        temp.push(arr[i]);
        i++;
    }

    while (j <= end) {
        temp.push(arr[j]);
        j++;
    }

    // Copy back to original array and visualize
    for (let k = 0; k < temp.length; k++) {
        arr[start + k] = temp[k];
        fullArray[start + k] = temp[k]; // Update the main array reference

        yield {
            type: 'swap', // Using swap to show update
            indices: [start + k],
            array: [...fullArray]
        };

        // Mark as temporarily sorted/merged
        yield {
            type: 'sorted',
            indices: [start + k],
            array: [...fullArray]
        };
    }
}

export function* mergeSort(array) {
    const arr = [...array];
    yield* mergeSortHelper(arr, 0, arr.length - 1, arr);

    yield {
        type: 'sorted',
        indices: Array.from({ length: arr.length }, (_, i) => i),
        array: [...arr]
    };
}
