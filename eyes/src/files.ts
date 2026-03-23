import { FileSystemTree } from '@webcontainer/api';

export const todoAppFiles: FileSystemTree = {
  "index.html": {
    "file": {
      "contents": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Demo App (The Dream)</title>\n  </head>\n  <body>\n    <div id=\"root\" style=\"width: 100vw; height: 100vh; overflow: hidden;\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>\n"
    }
  },
  "package.json": {
    "file": {
      "contents": "{\n  \"name\": \"demo-app\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"tsc && vite build\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"@agent-k/core\": \"file:./libs/core\",\n    \"react\": \"^18.3.1\",\n    \"react-dom\": \"^18.3.1\"\n  },\n  \"devDependencies\": {\n    \"@types/react\": \"^18.3.3\",\n    \"@types/react-dom\": \"^18.3.0\",\n    \"@vitejs/plugin-react\": \"^4.3.1\",\n    \"typescript\": \"~5.5.3\",\n    \"vite\": \"^5.4.1\"\n  }\n}"
    }
  },
  "src": {
    "directory": {
      "components": {
        "directory": {
          "UserCard.tsx": {
            "file": {
              "contents": "import React from 'react';\n\nexport const UserCard = ({ data, actions, style }: any) => {\n  if (!data) return <div className=\"p-4 bg-gray-100 rounded\">Loading User...</div>;\n\n  return (\n    <div \n      className=\"bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 border border-gray-200\"\n      style={{ ...style, width: '100%', height: '100%' }}\n    >\n      <div className=\"w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold\">\n        {data.name?.charAt(0) || '?'}\n      </div>\n      <div className=\"text-center\">\n        <h3 className=\"font-bold text-lg text-gray-800\">{data.name}</h3>\n        <p className=\"text-sm text-gray-500\">{data.role}</p>\n        <p className=\"text-xs text-gray-400 mt-1\">{data.email}</p>\n      </div>\n      <button \n        className=\"mt-auto px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium\"\n        onClick={() => actions.update({ role: 'Promoted ' + data.role })}\n      >\n        Promote\n      </button>\n    </div>\n  );\n};\n"
            }
          }
        }
      },
      "main.tsx": {
        "file": {
          "contents": "import React, { useEffect, useState } from 'react';\nimport ReactDOM from 'react-dom/client';\nimport { Renderer } from '@agent-k/core';\nimport { UserCard } from './components/UserCard';\nimport { initMockData } from './mockData';\nimport homePageSpec from './pages/home.json';\n\n// Initialize App\nasync function bootstrap() {\n  await initMockData();\n  \n  const root = ReactDOM.createRoot(document.getElementById('root')!);\n  \n  const App = () => {\n    // In a real app, page spec might verify dynamic, but here it's static\n    const [page] = useState(homePageSpec);\n\n    // Context for navigation/global state\n    const context = {\n      routeParams: {},\n      global: {},\n      state: {},\n      navigate: (path: string) => console.log('Navigate to', path)\n    };\n\n    return (\n      <Renderer \n        page={page} \n        components={{ UserCard }} \n        context={context} \n      />\n    );\n  };\n\n  root.render(\n    <React.StrictMode>\n      <App />\n    </React.StrictMode>\n  );\n}\n\nbootstrap();\n"
        }
      },
      "mockData.ts": {
        "file": {
          "contents": "import { store } from '@agent-k/core';\nimport { z } from 'zod';\n\n// Define Schema\nexport const UserSchema = {\n  version: 0,\n  primaryKey: 'id',\n  type: 'object',\n  properties: {\n    id: { type: 'string', maxLength: 100 },\n    name: { type: 'string' },\n    role: { type: 'string' },\n    email: { type: 'string' }\n  },\n  required: ['id', 'name', 'role']\n} as const;\n\nexport const UserZodSchema = z.object({\n  id: z.string(),\n  name: z.string(),\n  role: z.string(),\n  email: z.string().email().optional()\n});\n\nexport async function initMockData() {\n  const db = await store.init();\n  \n  // Register Schema\n  if (!db.collections.users) {\n    await db.addCollections({\n      users: {\n        schema: UserSchema\n      }\n    });\n\n    // Populate Data\n    await db.users.bulkInsert([\n      { id: 'u1', name: 'Alice Chen', role: 'Engineer', email: 'alice@agent-k.com' },\n      { id: 'u2', name: 'Bob Smith', role: 'Designer', email: 'bob@agent-k.com' }\n    ]);\n  }\n}\n"
        }
      },
      "pages": {
        "directory": {
          "home.json": {
            "file": {
              "contents": "{\n  \"id\": \"page-home\",\n  \"name\": \"Home Page\",\n  \"components\": [\n    {\n      \"id\": \"card-1\",\n      \"type\": \"UserCard\",\n      \"canvas\": {\n        \"x\": 100,\n        \"y\": 100,\n        \"width\": 300,\n        \"height\": 400\n      },\n      \"data\": {\n        \"collection\": \"users\",\n        \"id\": \"u1\"\n      }\n    },\n    {\n      \"id\": \"card-2\",\n      \"type\": \"UserCard\",\n      \"canvas\": {\n        \"x\": 450,\n        \"y\": 100,\n        \"width\": 300,\n        \"height\": 400\n      },\n      \"data\": {\n        \"collection\": \"users\",\n        \"id\": \"u2\"\n      }\n    }\n  ]\n}\n"
            }
          }
        }
      }
    }
  },
  "vite.config.ts": {
    "file": {
      "contents": "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nimport { resolve } from 'path'\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  resolve: {\n    alias: {\n      '@agent-k/core': resolve(__dirname, '../../core/src')\n    }\n  },\n  define: {\n    global: 'window', // Polyfill for RxDB/PouchDB in browser\n  }\n})\n"
    }
  },
  ".npmrc": {
    "file": {
      "contents": "registry=https://registry.npmmirror.com/"
    }
  }
};
