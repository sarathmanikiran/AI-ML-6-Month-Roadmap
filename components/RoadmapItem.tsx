import React from 'react';
import type { RoadmapMonth } from '../types';
import { VideoIcon, BookIcon, CourseIcon } from './icons';

interface RoadmapItemProps {
    monthData: RoadmapMonth;
    isOpen: boolean;
    onClick: () => void;
    isCompleted: boolean;
    onToggleCompleted: () => void;
    completedTopics: boolean[];
    onToggleTopicCompleted: (topicIndex: number) => void;
    animationDelay: string;
}

const resourceIcons: { [key: string]: React.ReactNode } = {
    video: <VideoIcon className="w-5 h-5" />,
    book: <BookIcon className="w-5 h-5" />,
    course: <CourseIcon className="w-5 h-5" />,
};

const RoadmapItem: React.FC<RoadmapItemProps> = ({ monthData, isOpen, onClick, isCompleted, onToggleCompleted, completedTopics, onToggleTopicCompleted, animationDelay }) => {
    const { id, title, icon, color, goal, topics, projects, resources } = monthData;

    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleCompleted();
    };

    const completedCount = completedTopics.filter(Boolean).length;
    const totalTopics = topics.length;

    return (
        <div
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl animate-fade-in-up border-l-4 ${isCompleted ? 'border-green-500' : 'border-transparent'}`}
            style={{ animationDelay }}
        >
            <button
                className={`w-full flex justify-between items-center text-left p-4 sm:p-5 bg-white ${color.hoverBg} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-colors duration-200`}
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3 sm:gap-4">
                     <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 flex-shrink-0 ${isCompleted ? 'bg-green-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                        onClick={handleCheckboxClick}
                        title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                    >
                        {isCompleted && (
                             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        )}
                    </div>
                    <span className={`text-lg sm:text-xl font-semibold ${color.text} flex items-center gap-2 sm:gap-3 transition-opacity duration-300 ${isCompleted ? 'opacity-70' : 'opacity-100'}`}>
                        {icon}
                        {title}
                    </span>
                </div>
                <svg className={`w-6 h-6 ${color.text} transition-transform duration-300 ml-2 flex-shrink-0 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}
            >
                <div className="p-4 sm:p-6 border-t border-gray-200">
                    {goal && <p className="text-lg font-medium text-gray-700 mb-6 italic"><strong>Goal:</strong> {goal}</p>}
                    
                    {totalTopics > 0 && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Topics & Progress</h3>
                             <div className="flex items-center gap-4 mb-4">
                                <div className="w-full bg-slate-200 rounded-full h-2.5">
                                    <div className={`h-2.5 rounded-full transition-all duration-500 ${color.bg.replace('50', '500')}`} style={{ width: `${totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0}%` }}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{completedCount} / {totalTopics}</span>
                            </div>
                            <ul className="space-y-2 text-gray-700 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                                {topics.map((topic, i) => (
                                    <li key={i} className="flex items-start p-1.5 rounded-md">
                                        <input
                                            type="checkbox"
                                            id={`topic-${id}-${i}`}
                                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 cursor-pointer flex-shrink-0 mt-0.5"
                                            checked={!!completedTopics[i]}
                                            onChange={() => onToggleTopicCompleted(i)}
                                        />
                                        <label
                                            htmlFor={`topic-${id}-${i}`}
                                            className={`ml-3 transition-colors duration-300 cursor-pointer ${!!completedTopics[i] ? 'line-through text-gray-400' : ''}`}
                                        >
                                            {topic}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {projects.items.length > 0 && (
                         <div className="mt-8 pt-6 border-t">
                             <div className={`${color.bg} border-l-4 ${color.border} p-4 rounded-r-lg`}>
                                <h4 className={`font-semibold text-lg ${color.text}`}>{projects.title}</h4>
                                <ul className={`list-disc list-inside ${color.text} space-y-1 mt-2`}>
                                    {projects.items.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-8 pt-6 border-t">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Resources:</h3>
                        <ul className="space-y-3">
                            {resources.map((resource, i) => (
                                <li key={i} className="flex items-center p-2 rounded-md transition-colors hover:bg-gray-100">
                                    <span className={`flex-shrink-0 mr-4 ${color.text}`}>
                                        {React.cloneElement(resourceIcons[resource.type] as React.ReactElement, { className: "w-6 h-6" })}
                                    </span>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className={`font-medium text-gray-800 hover:underline hover:${color.text} break-words`}>
                                        {resource.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapItem;