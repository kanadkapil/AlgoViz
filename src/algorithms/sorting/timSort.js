const MIN_MERGE = 32;

function minRunLength(n) {
    let r = 0;
    while (n >= MIN_MERGE) {
        r |= n & 1;
        n >>= 1;
    }
    return n + r;
}

export function* timSort(array) {
    let arr = [...array];
    let n = arr.length;
    let minRun = minRunLength(n);

    // Sort individual subarrays of size RUN
    for (let i = 0; i < n; i += minRun) {
        yield* insertionSort(arr, i, Math.min((i + MIN_MERGE - 1), (n - 1)));
    }

    // Start merging from size RUN (or 32). It will merge
    // to form size 64, then 128, 256 and so on ....
    for (let size = minRun; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
            let mid = left + size - 1;
            let right = Math.min((left + 2 * size - 1), (n - 1));

            if (mid < right) {
                yield* merge(arr, left, mid, right);
            }
        }
    }

    yield {
        type: 'sorted',
        indices: Array.from({ length: arr.length }, (_, i) => i),
        array: [...arr]
    };
}

function* insertionSort(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
        let temp = arr[i];
        let j = i - 1;

        yield {
            type: 'compare',
            indices: [i, j],
            array: [...arr]
        };

        while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j];
            yield {
                type: 'swap',
                indices: [j + 1, j],
                array: [...arr]
            };
            j--;
        }
        arr[j + 1] = temp;
        yield {
            type: 'swap',
            indices: [j + 1],
            array: [...arr]
        };
    }
}

function* merge(arr, l, m, r) {
    let len1 = m - l + 1, len2 = r - m;
    let left = new Array(len1);
    let right = new Array(len2);
    for (let x = 0; x < len1; x++) left[x] = arr[l + x];
    for (let x = 0; x < len2; x++) right[x] = arr[m + 1 + x];

    let i = 0;
    let j = 0;
    let k = l;

    while (i < len1 && j < len2) {
        yield {
            type: 'compare',
            indices: [l + i, m + 1 + j],
            array: [...arr]
        };

        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        yield {
            type: 'swap',
            indices: [k],
            array: [...arr]
        };
        k++;
    }

    while (i < len1) {
        arr[k] = left[i];
        k++;
        i++;
        yield {
            type: 'swap',
            indices: [k - 1],
            array: [...arr]
        };
    }

    while (j < len2) {
        arr[k] = right[j];
        k++;
        j++;
        yield {
            type: 'swap',
            indices: [k - 1],
            array: [...arr]
        };
    }
}
