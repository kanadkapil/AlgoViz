export function* bucketSort(array) {
    let arr = [...array];
    if (arr.length <= 0) return;

    let minValue = Math.min(...arr);
    let maxValue = Math.max(...arr);
    let bucketCount = Math.floor(Math.sqrt(arr.length));
    let buckets = new Array(bucketCount).fill(0).map(() => []);

    // Distribute input array values into buckets
    for (let i = 0; i < arr.length; i++) {
        yield {
            type: 'compare',
            indices: [i],
            array: [...arr]
        };
        // Normalize value to 0-1 range for bucket index calculation if needed, 
        // or just use simple range mapping. Here we map range [min, max] to [0, bucketCount-1]
        let bucketIndex = Math.floor(((arr[i] - minValue) / (maxValue - minValue + 1)) * bucketCount);
        buckets[bucketIndex].push(arr[i]);
    }

    // Sort buckets and place back into array
    let currentIndex = 0;
    for (let i = 0; i < buckets.length; i++) {
        // Insertion sort for each bucket
        for (let j = 1; j < buckets[i].length; j++) {
            let key = buckets[i][j];
            let k = j - 1;
            while (k >= 0 && buckets[i][k] > key) {
                buckets[i][k + 1] = buckets[i][k];
                k--;
            }
            buckets[i][k + 1] = key;
        }

        // Place sorted bucket back into main array
        for (let j = 0; j < buckets[i].length; j++) {
            arr[currentIndex] = buckets[i][j];
            yield {
                type: 'swap',
                indices: [currentIndex],
                array: [...arr]
            };
            currentIndex++;
        }
    }

    yield {
        type: 'sorted',
        indices: Array.from({ length: arr.length }, (_, i) => i),
        array: [...arr]
    };
}
