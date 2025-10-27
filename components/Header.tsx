import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center animate-fade-in-up" style={{ animationDelay: '0s' }}>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
                    🧠 6-Month AI & ML Developer Roadmap
                </h1>
                <p className="mt-4 text-lg text-gray-700">
                    Your guide to becoming an AI/ML Engineer capable of building and deploying intelligent systems.
                </p>
                <div className="mt-6 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-gray-700">
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">Duration: 6 Months</span>
                    <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Style: Practical + Theory</span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Goal: Job Ready</span>
                </div>
            </div>
        </header>
    );
};

export default Header;