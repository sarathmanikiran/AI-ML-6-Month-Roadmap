import type React from 'react';

export interface ResourceLink {
    text: string;
    url: string;
    type: 'video' | 'book' | 'course';
}

export interface RoadmapMonth {
    id: number;
    title: string;
    icon: React.ReactNode;
    color: {
        bg: string;
        text: string;
        border: string;
        hoverBg: string;
    };
    goal: string;
    topics: string[];
    projects: { title: string; items: string[] };
    resources: ResourceLink[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
