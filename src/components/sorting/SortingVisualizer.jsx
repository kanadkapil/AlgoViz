import React, { useEffect, useRef } from 'react';
import useSortingStore from '../../store/useSortingStore';
import { motion } from 'framer-motion';

const SortingVisualizer = () => {
    const { array, comparisonIndices, swapIndices, sortedIndices } = useSortingStore();

    // Calculate bar width based on array size
    const barWidth = Math.max(2, Math.floor(800 / array.length) - 2);

    return (
        <div className="flex-1 flex items-end justify-center h-full w-full p-4 gap-[2px]">
            {array.map((value, idx) => {
                let color = 'bg-primary'; // Default

                if (comparisonIndices.includes(idx)) color = 'bg-warning';
                if (swapIndices.includes(idx)) color = 'bg-error';
                if (sortedIndices.includes(idx)) color = 'bg-success';

                return (
                    <motion.div
                        key={idx}
                        layout
                        className={`rounded-t-sm ${color}`}
                        style={{
                            height: `${value}%`,
                            width: `${barWidth}px`,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                );
            })}
        </div>
    );
};

export default SortingVisualizer;
