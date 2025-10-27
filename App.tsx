import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { ROADMAP_DATA } from './constants';

const App: React.FC = () => {
    const [completed, setCompleted] = useState<boolean[]>(() => {
        try {
            const saved = localStorage.getItem('completedMonths');
            return saved ? JSON.parse(saved) : Array(ROADMAP_DATA.length).fill(false);
        } catch (error) {
            console.error("Failed to parse completed months from localStorage", error);
            return Array(ROADMAP_DATA.length).fill(false);
        }
    });

    const [completedTopics, setCompletedTopics] = useState<{ [key: number]: boolean[] }>(() => {
        try {
            const saved = localStorage.getItem('completedTopics');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error("Failed to parse completed topics from localStorage", error);
        }
        // Initialize state if nothing is saved
        const initialState: { [key: number]: boolean[] } = {};
        ROADMAP_DATA.forEach(month => {
            if (month.topics.length > 0) {
                initialState[month.id] = Array(month.topics.length).fill(false);
            }
        });
        return initialState;
    });


    useEffect(() => {
        try {
            localStorage.setItem('completedMonths', JSON.stringify(completed));
        } catch (error) {
            console.error("Failed to save completed months to localStorage", error);
        }
    }, [completed]);

    useEffect(() => {
        try {
            localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
        } catch (error) {
            console.error("Failed to save completed topics to localStorage", error);
        }
    }, [completedTopics]);

    const toggleCompleted = (index: number) => {
        setCompleted(prev => {
            const newCompleted = [...prev];
            newCompleted[index] = !newCompleted[index];
            return newCompleted;
        });
    };

    const toggleTopicCompleted = (monthId: number, topicIndex: number) => {
        setCompletedTopics(prev => {
            const newTopics = [...(prev[monthId] || [])];
            newTopics[topicIndex] = !newTopics[topicIndex];
            return { ...prev, [monthId]: newTopics };
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 w-full flex-grow">
                <Roadmap
                    completed={completed}
                    toggleCompleted={toggleCompleted}
                    completedTopics={completedTopics}
                    toggleTopicCompleted={toggleTopicCompleted}
                />
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};

export default App;
