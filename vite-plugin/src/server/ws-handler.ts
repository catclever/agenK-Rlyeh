import type { ViteDevServer } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';

export function setupWebSocket(server: ViteDevServer) {
  server.ws.on('agent-k:read-file', async ({ path: filePath, id }: { path: string; id: string }, client) => {
    try {
      const fullPath = path.resolve(server.config.root, filePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      client.send('agent-k:read-file-result', { id, content });
    } catch (error: any) {
      client.send('agent-k:error', { id, message: error.message });
    }
  });

  server.ws.on('agent-k:write-file', async ({ path: filePath, content, id }: { path: string; content: string; id: string }, client) => {
    try {
      const fullPath = path.resolve(server.config.root, filePath);
      await fs.writeFile(fullPath, content, 'utf-8');
      client.send('agent-k:write-file-result', { id, success: true });
    } catch (error: any) {
      client.send('agent-k:error', { id, message: error.message });
    }
  });

  console.log('[Agent K] WebSocket Server Ready');
}
