// BASE_URL
export const BASE_URL = "https://typically-wheylike-magen.ngrok-free.dev/api/v3";

// Axios isn't good at streaming, fetch gives us ReadableStream.

// Content Explainer
export const explainContent = async (title, content, onChunk) => {
    const token = localStorage.getItem("access");

    const response = await fetch(`${BASE_URL}/ai/explain-content/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title,
            content,
        }),
    });

    if (!response.ok) {
        throw new Error("Explain API failed");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        onChunk(chunk);
    }
};

// GET chat history
export const getLessonChatHistory = async (slug) => {
    const token = localStorage.getItem("access");

    const res = await fetch(`${BASE_URL}/student/lesson/${slug}/ai-chat/`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
        },
    });

    if (!res.ok) throw new Error("Failed to load chat");

    return res.json();
};

// POST new message
export const sendChatMessage = async (slug, message, onChunk) => {
    const token = localStorage.getItem("access");

    const res = await fetch(`${BASE_URL}/student/lesson/${slug}/ai-chat/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
    });

    if (!res.ok) throw new Error("Chat failed");

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        onChunk(chunk);
    }
};

// TTS
export const textToSpeech = async (text) => {
    const token = localStorage.getItem("access");

    const res = await fetch(`${BASE_URL}/ai/tts/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ text }),
    });

    if (!res.ok) {
        throw new Error("TTS failed");
    }

    return res.blob(); // MP3 file
};


