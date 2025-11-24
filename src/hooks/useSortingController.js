import { useEffect, useRef } from 'react';
import useSortingStore from '../store/useSortingStore';
import { bubbleSort } from '../algorithms/sorting/bubbleSort';
import { selectionSort } from '../algorithms/sorting/selectionSort';
import { insertionSort } from '../algorithms/sorting/insertionSort';
import { mergeSort } from '../algorithms/sorting/mergeSort';
import { quickSort } from '../algorithms/sorting/quickSort';

const algorithms = {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    // Add others here
};

const useSortingController = () => {
    const {
        array,
        algorithm,
        isPlaying,
        speed,
        setArray,
        setComparisonIndices,
        setSwapIndices,
        setSortedIndices,
        markSorted,
        setIsPlaying
    } = useSortingStore();

    const generatorRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            if (!generatorRef.current) {
                // Start new generator
                const algoFunc = algorithms[algorithm];
                if (algoFunc) {
                    generatorRef.current = algoFunc(array);
                }
            }

            intervalRef.current = setInterval(() => {
                if (!generatorRef.current) {
                    clearInterval(intervalRef.current);
                    return;
                }

                try {
                    const { value, done } = generatorRef.current.next();

                    if (done) {
                        markSorted();
                        clearInterval(intervalRef.current);
                        generatorRef.current = null;
                    } else {
                        if (value.type === 'compare') {
                            setComparisonIndices(value.indices);
                            setSwapIndices([]);
                        } else if (value.type === 'swap') {
                            setSwapIndices(value.indices);
                            setArray(value.array);
                        } else if (value.type === 'sorted') {
                            setSortedIndices((prev) => [...new Set([...prev, ...value.indices])]);
                            setComparisonIndices([]);
                            setSwapIndices([]);
                        }
                    }
                } catch (error) {
                    console.error("Sorting Generator Error:", error);
                    clearInterval(intervalRef.current);
                    setIsPlaying(false);
                }
            }, speed);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying, speed, algorithm]);

    // Reset generator when array changes or algorithm changes (if not playing)
    useEffect(() => {
        if (!isPlaying) {
            generatorRef.current = null;
        }
    }, [array, algorithm, isPlaying]);
};

export default useSortingController;
