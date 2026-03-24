import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generatePayload(tools: string[]): Promise<string> {
  const needsEyes = tools.includes('eyes');
  const needsGladius = tools.includes('gladius');
  const needsTentacles = tools.includes('tentacles');

  // Generate a virtual entry point containing only the user-requested tools.
  // We strictly use DraggableWindow from tentacles for floating UI containment regardless of tentacles plugin.
  const entryCode = `
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import { DraggableWindow } from '@agent-k/tentacles';
    
    ${needsEyes ? "import { AIPanel } from '@agent-k/eyes';" : ""}
    ${needsGladius ? "import { GladiusTerminal } from '@agent-k/gladius';" : ""}
    ${needsTentacles ? "import { TentaclesOverlay } from '@agent-k/tentacles';" : ""}

    function AgentRoot() {
      // Return a container with pointerEvents:auto so we don't block the underlying page.
      // But wrapping floating windows can have their own event layers.
      return React.createElement('div', { style: { pointerEvents: 'auto', width: '100vw', height: '100vh', position: 'absolute' } },
        ${needsTentacles ? `React.createElement(TentaclesOverlay, { components: [], scale: 1, onUpdate: ()=>{}, onSelect: ()=>{} }),` : ""}
        
        ${needsEyes ? `
          React.createElement(DraggableWindow, { title: 'AI 大脑 (Eye)', initialX: window.innerWidth - 350, initialY: 50, initialWidth: 300, initialHeight: 400 },
            React.createElement(AIPanel)
          ),
        ` : ""}
        
        ${needsGladius ? `
          React.createElement(DraggableWindow, { title: '终端 (Gladius)', initialX: window.innerWidth - 650, initialY: window.innerHeight - 350, initialWidth: 600, initialHeight: 300 },
            React.createElement('div', { style: { background: 'black', height: '100%'} },
              React.createElement(GladiusTerminal)
            )
          ),
        ` : ""}
        null // JSX trailing array fallback
      );
    }

    const container = document.getElementById('agent-k-root');
    if (container) {
      // 动态注入基础 Tailwind Reset 规避目标网页无 CSS 骨架导致错位
      const style = document.createElement('style');
      style.innerHTML = "@tailwind base; @tailwind components; @tailwind utilities;";
      document.head.appendChild(style);

      const root = createRoot(container);
      root.render(React.createElement(AgentRoot));
    }
  `;

  // Bundle this pure React component chain into a browser-executable module string.
  const result = await esbuild.build({
    stdin: {
      contents: entryCode,
      resolveDir: __dirname,
      loader: 'tsx',
    },
    bundle: true,
    write: false,
    format: 'esm', // Standard output for script type="module"
    sourcemap: 'inline',
    define: {
      'process.env.NODE_ENV': '"development"',
      global: 'window'
    },
  });

  return result.outputFiles[0].text;
}
