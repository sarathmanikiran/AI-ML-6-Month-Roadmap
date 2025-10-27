import React from 'react';
import type { RoadmapMonth } from './types';
import { PythonIcon, MathIcon, MlCoreIcon, DeepLearningIcon, NlpIcon, AdvancedAiIcon, BonusIcon } from './components/icons';

export const ROADMAP_DATA: RoadmapMonth[] = [
    {
        id: 1,
        title: "Month 1 – Python for AI (Foundation)",
        icon: React.createElement(PythonIcon, { className: "h-6 w-6" }),
        color: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-500", hoverBg: "hover:bg-blue-100" },
        goal: "Build strong Python skills for ML & AI.",
        topics: [
            "Python basics (variables, datatypes, loops, conditionals)",
            "Functions & modules",
            "OOP (Classes, Inheritance, Polymorphism)",
            "File handling & Exception handling",
            "NumPy (arrays, broadcasting, math ops)",
            "Pandas (dataframes, cleaning, merging, grouping)",
            "Matplotlib & Seaborn (data visualization)",
        ],
        projects: { title: "Mini Projects:", items: ["Calculator using OOP", "Data analysis on Netflix dataset", "Weather data visualizer"] },
        resources: [
            { text: "CodeWithHarry Python Course", url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agwh1XjfnA8e0L0YCAg-2-G", type: 'video' },
            { text: "Telusko Python Tutorial", url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7poL9JTVyndHsrV0kbbkvhZ", type: 'video' },
            { text: "NumPy & Pandas – Krish Naik", url: "https://www.youtube.com/playlist?list=PLZoCN-v11Q9j-f-3f-s-8a-D9T-0-Sg-y", type: 'video' },
        ]
    },
    {
        id: 2,
        title: "Month 2 – Math & Statistics for ML",
        icon: React.createElement(MathIcon, { className: "h-6 w-6" }),
        color: { bg: "bg-green-50", text: "text-green-700", border: "border-green-500", hoverBg: "hover:bg-green-100" },
        goal: "Learn the math powering AI models.",
        topics: ["Linear Algebra (vectors, matrices, dot product)", "Probability & Statistics (mean, median, std, distributions)", "Calculus (derivatives, gradients, partial derivatives)", "Matrix transformations", "Normalization, standardization", "Hypothesis testing & p-values"],
        projects: { title: "Mini Projects:", items: ["Implement gradient descent manually", "Create a statistics dashboard with Python"] },
        resources: [
            { text: "Khan Academy – Linear Algebra", url: "https://www.khanacademy.org/math/linear-algebra", type: 'book' },
            { text: "StatQuest – Statistics for ML", url: "https://www.youtube.com/c/statquest", type: 'video' },
            { text: "3Blue1Brown – Calculus Essentials", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", type: 'video' },
        ]
    },
    {
        id: 3,
        title: "Month 3 – Machine Learning Core",
        icon: React.createElement(MlCoreIcon, { className: "h-6 w-6" }),
        color: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-500", hoverBg: "hover:bg-amber-100" },
        goal: "Master ML algorithms and workflows.",
        topics: ["Supervised Learning (Regression, Classification)", "Unsupervised Learning (Clustering, PCA)", "Model Evaluation (Confusion matrix, accuracy, F1-score)", "Scikit-learn hands-on", "Feature Engineering", "Bias-Variance Tradeoff & Cross-validation"],
        projects: { title: "Projects:", items: ["House Price Prediction", "Customer Segmentation", "Spam Mail Classifier"] },
        resources: [
            { text: "Krish Naik ML Playlist", url: "https://www.youtube.com/playlist?list=PLZoCN-v11Q9j9tqlf-j1u_n-f-m-S0-7T", type: 'video' },
            { text: "freeCodeCamp ML Course (10 hrs)", url: "https://www.youtube.com/watch?v=i_LwzRVP7bg", type: 'video' },
            { text: "Andrew Ng – Machine Learning (Coursera)", url: "https://www.coursera.org/learn/machine-learning", type: 'course' },
        ]
    },
    {
        id: 4,
        title: "Month 4 – Deep Learning (Neural Networks)",
        icon: React.createElement(DeepLearningIcon, { className: "h-6 w-6" }),
        color: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-500", hoverBg: "hover:bg-purple-100" },
        goal: "Build neural networks using TensorFlow & PyTorch.",
        topics: ["Neural network basics", "Forward & backward propagation", "Activation functions & Optimizers (SGD, Adam)", "CNN (Convolutional Neural Networks)", "RNN, LSTM (for sequential data)", "Autoencoders"],
        projects: { title: "Projects:", items: ["Handwritten digit recognition (MNIST)", "Emotion detection using CNN", "Stock price prediction (RNN)"] },
        resources: [
            { text: "Deep Learning by freeCodeCamp (TensorFlow)", url: "https://www.youtube.com/watch?v=WvoLTXIjBYU", type: 'video' },
            { text: "PyTorch Beginner Guide", url: "https://pytorch.org/tutorials/beginner/basics/intro.html", type: 'book' },
            { text: "3Blue1Brown Neural Networks Series", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", type: 'video' },
        ]
    },
    {
        id: 5,
        title: "Month 5 – Data Science, NLP & Deployment",
        icon: React.createElement(NlpIcon, { className: "h-6 w-6" }),
        color: { bg: "bg-red-50", text: "text-red-700", border: "border-red-500", hoverBg: "hover:bg-red-100" },
        goal: "Learn NLP, data pipelines, and deploy AI apps.",
        topics: ["NLP (Text preprocessing, TF-IDF, Word2Vec)", "Sentiment analysis", "Data cleaning & feature extraction", "Model Deployment (Flask, FastAPI, Streamlit)", "ML Model monitoring", "Cloud deployment (AWS / Render / Hugging Face Spaces)"],
        projects: { title: "Projects:", items: ["Movie review sentiment analysis", "Chatbot with NLP", "AI web app deployment on Render"] },
        resources: [
            { text: "NLP by Krish Naik", url: "https://www.youtube.com/playlist?list=PLZoCN-v11Q9j-f-3f-s-8a-D9T-0-Sg-y", type: 'video' },
            { text: "Streamlit Deployment Guide", url: "https://docs.streamlit.io/library/get-started/main-concepts", type: 'book' },
            { text: "Flask ML Deployment", url: "https://www.youtube.com/watch?v=Z1RJmh_OqeA", type: 'video' },
        ]
    },
    {
        id: 6,
        title: "Month 6 – Advanced AI & Final Projects",
        icon: React.createElement(AdvancedAiIcon, { className: "h-6 w-6" }),
        color: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-500", hoverBg: "hover:bg-indigo-100" },
        goal: "Apply everything to build real-world AI projects and portfolio.",
        topics: ["Reinforcement Learning (Q-Learning, Deep Q-Learning)", "Generative AI (GANs, LLM intro, transformers)", "MLOps (version control, CI/CD)", "Resume + Portfolio building", "Interview prep (AI + ML questions)"],
        projects: { title: "Final Projects:", items: ["AI-powered voice assistant", "Image caption generator using CNN+LSTM", "Resume screening ML app"] },
        resources: [
            { text: "Deep Reinforcement Learning by freeCodeCamp", url: "https://www.youtube.com/watch?v=iK_Xv7c103I", type: 'video' },
            { text: "Hugging Face Transformers Crash Course", url: "https://huggingface.co/learn/nlp-course/chapter1/1", type: 'course' },
            { text: "MLOps by Krish Naik", url: "https://www.youtube.com/playlist?list=PLZoCN-v11Q9j-f-3f-s-8a-D9T-0-Sg-y", type: 'video' },
        ]
    },
    {
        id: 7,
        title: "Bonus Resources",
        icon: React.createElement(BonusIcon, { className: "h-6 w-6" }),
        color: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-500", hoverBg: "hover:bg-teal-100" },
        goal: "Continue your learning journey with these excellent resources.",
        topics: [],
        projects: { title: "", items: [] },
        resources: [
            { text: "Kaggle Competitions & Datasets", url: "https://www.kaggle.com/", type: 'course' },
            { text: "GitHub Practice Projects", url: "https://github.com/topics/machine-learning-projects", type: 'book' },
            { text: "Practice ML Interview Questions Playlist", url: "https://www.youtube.com/playlist?list=PLZoCN-v11Q9j-f-3f-s-8a-D9T-0-Sg-y", type: 'video' },
        ]
    }
];
