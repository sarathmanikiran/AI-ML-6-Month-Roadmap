import React from 'react';
import { CheckCircleIcon, PortfolioIcon, DeployIcon, BriefcaseIcon } from './icons';

const OutcomeItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center">
        <div className="text-indigo-500 mb-4">{icon}</div>
        <p className="text-lg font-semibold text-gray-800">{text}</p>
    </div>
);

const Footer: React.FC = () => {
    const outcomes = [
        { icon: <CheckCircleIcon className="w-12 h-12" />, text: "Skilled in Python, ML, DL, and NLP" },
        { icon: <PortfolioIcon className="w-12 h-12" />, text: "Portfolio with 6+ High-Quality Projects" },
        { icon: <DeployIcon className="w-12 h-12" />, text: "Ability to Deploy AI Models to the Web" },
        { icon: <BriefcaseIcon className="w-12 h-12" />, text: "Ready for Internships & AI Developer Roles" },
    ];

    return (
        <footer className="bg-white mt-12 sm:mt-16">
            <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
                    🏆 Your Outcome After 6 Months
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {outcomes.map((item, index) => (
                        <OutcomeItem key={index} icon={item.icon} text={item.text} />
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;