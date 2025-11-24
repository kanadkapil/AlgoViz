export function* countingSort(array) {
    let arr = [...array];
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let count = new Array(range).fill(0);
    let output = new Array(arr.length).fill(0);

    for (let i = 0; i < arr.length; i++) {
        yield {
            type: 'compare',
            indices: [i],
            array: [...arr]
        };
        count[arr[i] - min]++;
    }

    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        yield {
            type: 'compare',
            indices: [i],
            array: [...arr]
        };
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        yield {
            type: 'swap',
            indices: [i],
            array: [...arr]
        };
    }

    yield {
        type: 'sorted',
        indices: Array.from({ length: arr.length }, (_, i) => i),
        array: [...arr]
    };
}
