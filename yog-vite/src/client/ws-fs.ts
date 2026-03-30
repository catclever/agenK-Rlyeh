/// <reference types="vite/client" />
import { IFileSystem } from '@agent-k/eyes/dist/fs/FileSystem';

export class WebSocketFileSystem implements IFileSystem {
  private pendingRequests = new Map<string, { resolve: (val: any) => void; reject: (err: any) => void }>();

  constructor() {
    if (import.meta.hot) {
      import.meta.hot.on('agent-k:read-file-result', ({ id, content }) => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.get(id)!.resolve(content);
          this.pendingRequests.delete(id);
        }
      });

      import.meta.hot.on('agent-k:write-file-result', ({ id, success }) => {
         if (this.pendingRequests.has(id)) {
          this.pendingRequests.get(id)!.resolve(success);
          this.pendingRequests.delete(id);
        }
      });

      import.meta.hot.on('agent-k:error', ({ id, message }) => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.get(id)!.reject(new Error(message));
          this.pendingRequests.delete(id);
        }
      });
    }
  }

  async readFile(path: string, encoding: 'utf-8' = 'utf-8'): Promise<string> {
    if (!import.meta.hot) throw new Error('Hot Module Replacement not active');
    
    const id = Math.random().toString(36).substring(7);
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      import.meta.hot!.send('agent-k:read-file', { path, id });
    });
  }

  async writeFile(path: string, data: string): Promise<void> {
    if (!import.meta.hot) throw new Error('Hot Module Replacement not active');

    const id = Math.random().toString(36).substring(7);
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      import.meta.hot!.send('agent-k:write-file', { path, content: data, id });
    });
  }
}
