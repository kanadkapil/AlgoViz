export function* radixSort(array) {
    let arr = [...array];
    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        yield* countSort(arr, exp);
    }

    yield {
        type: 'sorted',
        indices: Array.from({ length: arr.length }, (_, i) => i),
        array: [...arr]
    };
}

function* countSort(arr, exp) {
    let output = new Array(arr.length).fill(0);
    let count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
        yield {
            type: 'compare',
            indices: [i],
            array: [...arr]
        };
        count[Math.floor(arr[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        yield {
            type: 'compare',
            indices: [i],
            array: [...arr]
        };
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        yield {
            type: 'swap', // Using swap to visualize update, though it's overwrite
            indices: [i],
            array: [...arr]
        };
    }
}
