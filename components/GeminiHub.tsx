import React, { useState, useCallback, useRef, useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { BoltIcon } from './icons/BoltIcon';
import { BrainIcon } from './icons/BrainIcon';
import { SearchIcon } from './icons/SearchIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { askFlashLite, askProThinking, askWithSearch, askWithMaps, analyzeJobMatch } from '../services/geminiService';
import type { GenerateContentResponse } from '@google/genai';

interface GeminiHubProps {
  fullResumeText: string;
}

type Mode = 'lite' | 'pro' | 'search' | 'maps';

const modeConfig = {
    lite: { name: 'Quick Chat', Icon: BoltIcon, model: 'gemini-2.5-flash-lite' },
    pro: { name: 'Deep Dive', Icon: BrainIcon, model: 'gemini-2.5-pro' },
    search: { name: 'Web Search', Icon: SearchIcon, model: 'gemini-2.5-flash' },
    maps: { name: 'Local Info', Icon: MapPinIcon, model: 'gemini-2.5-flash' },
};

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    sources?: { uri: string; title: string }[];
}


export const GeminiHub: React.FC<GeminiHubProps> = ({ fullResumeText }) => {
    const [activeTab, setActiveTab] = useState<'chat' | 'analyzer'>('chat');
    const [mode, setMode] = useState<Mode>('search');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [jobDescription, setJobDescription] = useState('');
    const [analysisResult, setAnalysisResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleSendMessage = useCallback(async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setChatHistory(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            let response: GenerateContentResponse | string;
            if (mode === 'lite') {
                response = await askFlashLite(`Context: This is Randeer Lalanga's resume: ${fullResumeText}\n\nQuestion: ${input}`);
            } else if (mode === 'pro') {
                response = await askProThinking(`Based on this resume: ${fullResumeText}\n\n Address the following complex query: ${input}`);
            } else if (mode === 'search') {
                response = await askWithSearch(input);
            } else if (mode === 'maps') {
                response = await askWithMaps(input);
            } else {
                throw new Error('Invalid mode selected');
            }

            const text = typeof response === 'string' ? response : response.text;
            const groundingChunks = typeof response !== 'string' ? response.candidates?.[0]?.groundingMetadata?.groundingChunks : [];
            
            let sources: { uri: string, title: string }[] = [];
            if (groundingChunks && groundingChunks.length > 0) {
                 sources = groundingChunks
                    .map((chunk: any) => chunk.web || chunk.maps)
                    .filter((source: any) => source && source.uri)
                    .map((source: any) => ({ uri: source.uri, title: source.title || 'Source' }));
            }

            setChatHistory(prev => [...prev, { role: 'model', text, sources }]);
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Failed to get response. ${errorMessage}`);
            setChatHistory(prev => [...prev, { role: 'model', text: `Sorry, I encountered an error. ${errorMessage}` }]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, mode, fullResumeText]);

    const handleAnalyze = useCallback(async () => {
        if (!jobDescription.trim() || isLoading) return;
        setIsLoading(true);
        setError(null);
        setAnalysisResult('');

        try {
            const result = await analyzeJobMatch(fullResumeText, jobDescription);
            setAnalysisResult(result);
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Analysis failed. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [jobDescription, isLoading, fullResumeText]);

    const ChatPanel = () => (
        <>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center text-lg font-semibold text-white">
                    <SparklesIcon className="w-6 h-6 mr-2 text-sky-400" />
                    AI Assistant
                </div>
                <div className="relative">
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value as Mode)}
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full pl-3 pr-8 py-1.5 appearance-none"
                        aria-label="Select AI mode"
                    >
                        {Object.entries(modeConfig).map(([key, { name }]) => (
                            <option key={key} value={key}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex-grow p-4 overflow-y-auto h-96 bg-gray-900">
                <div className="space-y-4">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} chat-message`}>
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-sky-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-2 border-t border-gray-600 pt-2">
                                        <h4 className="text-xs font-semibold text-gray-400 mb-1">Sources:</h4>
                                        <ul className="text-xs space-y-1">
                                            {msg.sources.map((source, i) => (
                                                <li key={i}><a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline break-all">{source.title}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start chat-message">
                             <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg bg-gray-700 text-gray-200">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
	                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
	                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center bg-gray-700 rounded-lg">
                    <input
                        type="text"
                        className="w-full bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none"
                        placeholder={`Ask me anything...`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isLoading}
                    />
                    <button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="p-3 text-white disabled:text-gray-500 enabled:hover:text-sky-400 transition-colors">
                        <PaperAirplaneIcon className="w-6 h-6" />
                    </button>
                </div>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
        </>
    );

    const AnalyzerPanel = () => (
        <div className="p-4">
             <div className="flex items-center text-lg font-semibold text-white mb-4">
                <SparklesIcon className="w-6 h-6 mr-2 text-sky-400" />
                Job Match Analyzer
            </div>
            <p className="text-sm text-gray-400 mb-4">Paste a job description below to see how well my skills and experience align with the role.</p>
            <textarea
                className="w-full h-40 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={isLoading}
            />
            <button
                onClick={handleAnalyze}
                disabled={isLoading || !jobDescription.trim()}
                className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Analyze Match'}
            </button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            {analysisResult && (
                <div className="mt-4 p-4 bg-gray-900 rounded-lg max-h-96 overflow-y-auto chat-message">
                    <h4 className="font-semibold text-white mb-2">Analysis Result:</h4>
                    <p className="text-gray-300 whitespace-pre-wrap">{analysisResult}</p>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <div className="flex border-b border-gray-700">
                <button
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'chat' ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:bg-gray-700/30'}`}
                >
                    AI Chat
                </button>
                <button
                    onClick={() => setActiveTab('analyzer')}
                    className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'analyzer' ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:bg-gray-700/30'}`}
                >
                    Job Analyzer
                </button>
            </div>
            {activeTab === 'chat' ? <ChatPanel /> : <AnalyzerPanel />}
        </div>
    );
};