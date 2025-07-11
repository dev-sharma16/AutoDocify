import { GoogleGenerativeAI  } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

async function askGemini(data,username,reponame) {
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

            And Replace the user name with ${username} and repo name with ${reponame} in any link you need them.

            Do NOT wrap the output in triple backticks or a \`\`\`markdown block. Output only the raw markdown content.
            
            **HEADER REQUIREMENTS:**
            - Start with a centered, bold project title using large heading (# PROJECT_NAME)
            - Add a centered, italicized tagline/description below the title
            - Show repository info badges immediately below the tagline (e.g., last commit, top language, language count)
            - Then include a "Built with the tools and technologies" heading (centered)
            - Followed by technology badges like React, Tailwind, TypeScript, etc.
            - All elements should be center-aligned using HTML <div align="center"> and badges should be spaced using flex   styles
            
            **CONTENT REQUIREMENTS:**
            You may use emojis to enhance readability, but keep them subtle and minimal. Do not overuse them.
            Use clear section headings, bullet points where needed, and explain: 
            - What the project does 
            - How to install dependencies 
            - How to run the project (development or production) 
            - Any dependencies or frameworks (e.g., React, Next.js, Vite) 
            - Optional sections like Features, Screenshots, or License if relevant
            
            **BADGE EXAMPLES:**
            Use shields.io format for badges like:
            - ![Last Commit](https://img.shields.io/github/last-commit/username/repo)
            - ![Language](https://img.shields.io/github/languages/top/username/repo)
            - ![Languages Count](https://img.shields.io/github/languages/count/username/repo)
            - Technology badges for frameworks/languages used

            **BADGE FORMAT INSTRUCTIONS:**
            For all badges, do NOT use markdown image syntax Instead, use HTML:
            <p align="center" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;">
                <img src="https://img.shields.io/github/last-commit/${username}/${reponame}" />
                <img src="https://img.shields.io/github/languages/top/${username}/${reponame}" />
                <img src="https://img.shields.io/github/languages/count/${username}/${reponame}" />
                <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
                <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
            </p>

            **HEADER FORMAT INSTRUCTIONS:**
            for the headers,
                <div align="center"><strong>titel</strong></div>
                <div align="center"><em>project description</em></div>
                **and then rest rest header section

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