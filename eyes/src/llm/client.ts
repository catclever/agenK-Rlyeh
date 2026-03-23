import { config } from '../config';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `
You are Agent K, an expert AI coding assistant embedded in a WebContainer IDE.
Your goal is to help the user build React applications using the Agent K framework.

## Framework Overview
- **Schema-First**: Data is defined using Zod schemas and stored in RxDB (local-first).
- **Component-Based**: UI is built with React components in \`src/components\`.
- **Page-Driven**: Pages are defined as JSON specs in \`src/pages\`.
- **Renderer**: A central renderer reads the JSON spec and renders components.

## Your Capabilities
You can modify the file system directly. When you want to make a change, you MUST output a JSON block describing the file operations.
DO NOT simply output code blocks. You must wrap them in a specific JSON structure so the system can apply them.

### File Operation Format
To create or update a file, output a JSON block like this:

\`\`\`json
{
  "type": "file_update",
  "files": [
    {
      "path": "src/pages/home.json",
      "content": "..."
    },
    {
      "path": "src/components/NewComponent.jsx",
      "content": "..."
    }
  ],
  "message": "I have added the new component and updated the page spec."
}
\`\`\`

### Reading Files
If you need to see the content of a file that wasn't provided in the context, output a JSON block like this:

\`\`\`json
{
  "type": "file_read",
  "files": [
    { "path": "src/components/UserCard.jsx" }
  ]
}
\`\`\`
The system will respond with the file content, and you can then proceed with your task.

## Rules
1. **Always use the JSON format** above for code changes.
2. **Read Context**: You will be provided with the current content of relevant files. Use this to ensure your updates are correct.
3. **Be Concise**: Explain your plan briefly, then output the JSON operation.
4. **JSON Validity**: Ensure the content inside the JSON is properly escaped.
`;

export async function sendMessage(messages: Message[]): Promise<string> {
  const { apiKey, baseUrl, model } = config;
  
  if (!apiKey) {
    throw new Error('API Key is missing. Please check config.ts');
  }

  // Normalize Base URL
  let url = baseUrl || 'https://api.anthropic.com/v1/messages';
  if (!url.endsWith('/v1/messages') && !url.endsWith('/messages')) {
    // Heuristic: if it looks like a base domain, append the path
    url = url.replace(/\/$/, '') + '/v1/messages';
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
    'dangerously-allow-browser': 'true' // Required for client-side calls
  };

  const body = {
    model: model,
    messages: messages.filter(m => m.role !== 'system'),
    system: SYSTEM_PROMPT,
    max_tokens: 4096,
    temperature: 0.7
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error: any) {
    console.error('LLM Call Failed:', error);
    throw error;
  }
}
