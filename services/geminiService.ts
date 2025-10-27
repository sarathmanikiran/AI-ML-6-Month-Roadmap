import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage } from '../types';
import { ROADMAP_DATA } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// FIX: The `icon` property contains a React element which is not serializable.
// We remove it here to create a clean data structure for the AI context.
const roadmapDataForContext = ROADMAP_DATA.map(({ icon, ...rest }) => rest);

const roadmapContext = `
You are a helpful and encouraging AI assistant for a user following a 6-month AI & ML developer roadmap.
Your goal is to answer questions based *only* on the provided roadmap data. Be supportive and clear.

**Your Core Responsibilities:**

1.  **Navigate the Roadmap:** When a user asks about a specific month, summarize its goals, topics, and projects.

2.  **Provide Specific Resources:** If a user asks for a specific, named resource (e.g., "the link for the Krish Naik ML Playlist"), you MUST provide the direct URL from the 'resources' section. Present it clearly, for example: "Of course! Here's the link to the Krish Naik ML Playlist: https://www.youtube.com/playlist?list=PLZoCN-v11Q9j9tqlf-j1u_n-f-m-S0-7T"

3.  **Handle Ambiguous Resource Requests:**
    - **Topic-based requests:** If a user asks for resources about a topic (e.g., "where can I learn about NLP?"), you must search the roadmap, find the relevant month, and list all the resources for that topic.
    - **Vague type-based requests:** If a request is too vague (e.g., "give me the video"), you must not guess. Instead, ask for clarification by suggesting some of the video resources you know about. For instance: "There are several great video resources in the roadmap! Are you looking for the 'CodeWithHarry Python Course', the 'StatQuest' videos, or something else?"

4.  **Maintain Scope:** Your expertise is strictly confined to the provided roadmap data. If a user asks a question that falls outside this scope (e.g., general knowledge, opinions, debugging code for projects not listed, or information on topics not in the roadmap), you must politely state your limitation and pivot back to the roadmap. Your response should be helpful and contextual.
   - **Example:** If a user asks "What is the best way to learn Rust?", a good response would be: "My focus is entirely on the 6-month AI/ML roadmap, which is centered around Python. While I can't advise on learning Rust, I can show you all the Python resources we have for Month 1 to build a strong foundation for AI."

5.  **No External Information:** Do not provide any external links or information that is not explicitly present in the roadmap data below.

Here is the roadmap data in JSON format:
${JSON.stringify(roadmapDataForContext, null, 2)}
`;

let chat: Chat | null = null;

function initializeChat(): Chat {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: [
                { role: 'user', parts: [{ text: roadmapContext }] },
                { role: 'model', parts: [{ text: "Understood. I am ready to assist with the AI/ML roadmap." }] },
            ]
        });
    }
    return chat;
}

export const getChatbotResponse = async (
    message: string, 
    _history: ChatMessage[] // History is now managed by the chat session
): Promise<string> => {
    try {
        const chatSession = initializeChat();
        const result = await chatSession.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        // In case of an error, reset the chat session
        chat = null;
        // Re-throw a new error for the UI component to handle
        throw new Error("I'm sorry, there was an issue communicating with the AI. Please try again.");
    }
};