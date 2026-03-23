import type { PluginOption } from 'vite';
import { setupWebSocket } from './server/ws-handler';

export default function AgentF(): PluginOption {
  return {
    name: 'vite-plugin-agent-k',
    configureServer(server) {
      setupWebSocket(server);
    },
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'div',
            attrs: { id: 'agent-k-root' },
            injectTo: 'body',
          },
          {
            tag: 'script',
            attrs: { type: 'module', src: '/@agent-k/client.js' },
            injectTo: 'body',
          }
        ]
      };
    },
    resolveId(id) {
      if (id === '/@agent-k/client.js') {
        return '\0agent-k-client.js';
      }
    },
    load(id) {
      if (id === '\0agent-k-client.js') {
        // This is a dynamic module that boots the Agent K tools
        return `
          import React from 'react';
          import { createRoot } from 'react-dom/client';
          import { TentaclesOverlay, Artboard, DraggableWindow } from '@agent-k/tentacles';
          import { EyeTerminal, AIPanel } from '@agent-k/eyes';
          import { WebSocketFileSystem } from '${process.cwd()}/libs/vite-plugin/src/client/ws-fs.ts'; // Direct import for dev
          
          console.log('[Agent K] Client Booting...');
          
          const fs = new WebSocketFileSystem();

          function AgentRoot() {
             // Mock state for now
             const [components, setComponents] = React.useState([]); 
             
             return React.createElement('div', { className: 'agent-k-overlay' },
               // 1. Interaction Layer
               React.createElement(TentaclesOverlay, { 
                 components: components, 
                 scale: 1, 
                 onUpdate: () => {}, 
                 onSelect: () => {} 
               }),
               
               // 2. AI Panel Window
               React.createElement(DraggableWindow, { title: 'AGENT F (EYE)', initialX: window.innerWidth - 320, initialY: 60 },
                 React.createElement(AIPanel, { fileSystem: fs })
               ),

               // 3. Terminal Window
               React.createElement(DraggableWindow, { title: 'TERMINAL', initialX: window.innerWidth - 620, initialY: window.innerHeight - 320 },
                 React.createElement('div', { style: { background: 'black', height: '100%'} },
                    React.createElement(EyeTerminal)
                 )
               )
             );
          }

          const rootEl = document.getElementById('agent-k-root');
          if (rootEl) {
            const root = createRoot(rootEl);
            root.render(React.createElement(AgentRoot));
          }
        `;
      }
    }
  };
}
