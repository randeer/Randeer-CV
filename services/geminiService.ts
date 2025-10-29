import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available. In a real-world scenario, handle this securely.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Low-latency responses
export async function askFlashLite(prompt: string) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: prompt,
    });
    return response.text;
}

// Complex queries with thinking mode
export async function askProThinking(prompt: string) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 32768 },
        }
    });
    return response.text;
}

// Search Grounding for up-to-date info
export async function askWithSearch(prompt: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });
    return response;
}

// Maps Grounding for location-based info
export async function askWithMaps(prompt: string) {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser."));
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                    config: {
                        tools: [{ googleMaps: {} }],
                        toolConfig: {
                            retrievalConfig: {
                                latLng: {
                                    latitude: latitude,
                                    longitude: longitude
                                }
                            }
                        }
                    },
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        }, (error) => {
            // Default location if user denies permission
            console.warn("Geolocation permission denied. Using default location.");
            const defaultLocation = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles
            ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    tools: [{ googleMaps: {} }],
                    toolConfig: {
                        retrievalConfig: {
                            latLng: {
                                latitude: defaultLocation.latitude,
                                longitude: defaultLocation.longitude
                            }
                        }
                    }
                },
            }).then(resolve).catch(reject);
        });
    });
}


// General purpose analysis: Job Match
export async function analyzeJobMatch(resumeText: string, jobDescription: string) {
    const prompt = `
        You are a helpful career assistant. Analyze the provided resume against the job description.
        Provide a concise, point-by-point analysis of how well the resume aligns with the job requirements.
        Highlight key strengths and potential gaps.
        Format the output clearly.

        --- RESUME ---
        ${resumeText}
        --- END RESUME ---

        --- JOB DESCRIPTION ---
        ${jobDescription}
        --- END JOB DESCRIPTION ---

        ANALYSIS:
    `;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro', // Use Pro for more in-depth analysis
        contents: prompt,
    });
    return response.text;
}
