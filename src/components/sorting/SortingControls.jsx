import React from 'react';
import useSortingStore from '../../store/useSortingStore';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';

const SortingControls = () => {
    const {
        arraySize,
        setArraySize,
        speed,
        setSpeed,
        algorithm,
        setAlgorithm,
        isPlaying,
        setIsPlaying,
        resetArray,
        isSorted
    } = useSortingStore();

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Algorithm Selection */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Algorithm</span>
                </label>
                <select
                    className="select select-bordered w-full"
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    disabled={isPlaying}
                >
                    <option value="bubbleSort">Bubble Sort</option>
                    <option value="selectionSort">Selection Sort</option>
                    <option value="insertionSort">Insertion Sort</option>
                    <option value="mergeSort">Merge Sort</option>
                    <option value="quickSort">Quick Sort</option>
                    <option value="heapSort" disabled>Heap Sort (Coming Soon)</option>
                    <option value="radixSort" disabled>Radix Sort (Coming Soon)</option>
                    <option value="countingSort" disabled>Counting Sort (Coming Soon)</option>
                    <option value="bucketSort" disabled>Bucket Sort (Coming Soon)</option>
                    <option value="timSort" disabled>Tim Sort (Coming Soon)</option>
                </select>
            </div>

            {/* Array Size */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Array Size: {arraySize}</span>
                </label>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={arraySize}
                    className="range range-primary range-sm"
                    onChange={(e) => setArraySize(parseInt(e.target.value))}
                    disabled={isPlaying}
                />
            </div>

            {/* Speed */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Speed: {speed}ms</span>
                </label>
                <input
                    type="range"
                    min="1"
                    max="500"
                    value={501 - speed} // Invert so right is faster
                    className="range range-secondary range-sm"
                    onChange={(e) => setSpeed(501 - parseInt(e.target.value))}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
                <button
                    className="btn btn-primary flex-1"
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={isSorted}
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                    className="btn btn-neutral btn-square"
                    onClick={resetArray}
                    title="Reset / Randomize"
                >
                    <Shuffle className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default SortingControls;
