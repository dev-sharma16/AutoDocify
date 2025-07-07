import { GoogleGenerativeAI  } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

async function askGemini(data) {
    try {
        const importantFiles = [
            // Root-level metadata
            "README.md",
            "package.json",
            "package-lock.json",
            "pnpm-lock.yaml",

            // Configs
            ".gitignore",
            "vite.config.js",
            "next.config.js",
            "webpack.config.js",
            "babel.config.js",
            "tsconfig.json",
            ".eslintrc.js",
            ".env",

            // React
            "App.js",
            "App.jsx",
            "App.tsx",
            "index.js",
            "index.jsx",
            "main.js",
            "main.jsx",

            // Next.js
            "app/page.js",
            "app/layout.js",
            "pages/index.js",
            "pages/api/hello.js",
            "_app.js",
            "_document.js",

            // HTML/CSS/JS
            "index.html",
            "style.css",
            "script.js",

            // Optional
            "server.js",
            "routes.js",
            "api.js",
            "db.js",

            // Markdown/Docs
            "CONTRIBUTING.md",
            "LICENSE",
            "CHANGELOG.md"
        ];

        const formattedFiles = data
            .filter(file => importantFiles.includes(file.name))
            .map(file => `### ${file.name}\n\`\`\`\n${file.content}\n\`\`\`\n`)
            .join("\n");


        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `
            Generate a clean, professional GitHub README.md file using the following repository files. 
            You may use emojis to enhance readability, but keep them subtle and minimal. Do not overuse the
            Use clear section headings, bullet points where needed, and explain:
            - What the project does
            - How to install dependencies
            - How to run the project (development or production)
            - Any dependencies or frameworks (e.g., React, Next.js, Vite)
            - Optional sections like Features, Screenshots, or License if relevant.
            
            Here are the files:\n\n${formattedFiles}
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}

export default askGemini;