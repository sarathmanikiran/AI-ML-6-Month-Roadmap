import React, { useState } from 'react';
import { ROADMAP_DATA } from '../constants';
import RoadmapItem from './RoadmapItem';

interface RoadmapProps {
    completed: boolean[];
    toggleCompleted: (index: number) => void;
    completedTopics: { [key: number]: boolean[] };
    toggleTopicCompleted: (monthId: number, topicIndex: number) => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ completed, toggleCompleted, completedTopics, toggleTopicCompleted }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <div className="space-y-6">
            {ROADMAP_DATA.map((month, index) => (
                <RoadmapItem
                    key={month.id}
                    monthData={month}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                    isCompleted={completed[index]}
                    onToggleCompleted={() => toggleCompleted(index)}
                    completedTopics={completedTopics[month.id] || []}
                    onToggleTopicCompleted={(topicIndex: number) => toggleTopicCompleted(month.id, topicIndex)}
                    animationDelay={`${index * 0.1}s`}
                />
            ))}
        </div>
    );
};

export default Roadmap;
