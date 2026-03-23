import { useEffect, useRef, useState } from 'react';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import './App.css';
import { todoAppFiles } from './files';
import { AIPanel } from './AIPanel';

function App() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [wc, setWc] = useState<WebContainer | null>(null);
  const [booting, setBooting] = useState(false);

  useEffect(() => {
    if (terminalRef.current && !wc && !booting) {
      setBooting(true);
      
      const term = new Terminal({ convertEol: true });
      (window as any).term = term;
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      // Delay fit to ensure container has dimensions
      setTimeout(() => {
        if (terminalRef.current && terminalRef.current.clientWidth > 0) {
           try {
             fitAddon.fit();
           } catch (e) {
             console.warn('xterm fit failed', e);
           }
        }
      }, 200);

      const run = async () => {
        try {
          let instance: WebContainer;
          
          // 1. Check for existing instance
          if ((window as any).webcontainerInstance) {
             term.write('Reusing existing WebContainer...\n');
             instance = (window as any).webcontainerInstance;
          } 
          // 2. Check for pending boot promise (handling StrictMode/Race conditions)
          else if ((window as any).webcontainerBootPromise) {
             term.write('Waiting for existing boot process...\n');
             instance = await (window as any).webcontainerBootPromise;
             (window as any).webcontainerInstance = instance;
          } 
          // 3. Boot new instance
          else {
             term.write('Booting WebContainer...\n');
             const bootPromise = WebContainer.boot();
             (window as any).webcontainerBootPromise = bootPromise;
             instance = await bootPromise;
             (window as any).webcontainerInstance = instance;
             term.write('WebContainer booted!\n');
          }
          
          setWc(instance);

          // 1. Fetch Core Library
          term.write('Fetching Core Library...\n');
          const coreJs = await fetch('/core-dist/index.js').then(r => r.text());
          
          // 2. Mount Files
          term.write('Mounting files...\n');
          const files = {
            ...todoAppFiles,
            'libs': {
              directory: {
                'core': {
                  directory: {
                    'package.json': {
                      file: {
                        contents: JSON.stringify({
                          name: "@agent-k/core",
                          version: "0.0.1",
                          type: "module",
                          main: "index.js"
                        })
                      }
                    },
                    'index.js': {
                      file: { contents: coreJs }
                    }
                  }
                }
              }
            }
          };
          await instance.mount(files);
          term.write('Files mounted!\n');

          // 3. Start Shell
          term.write('Starting shell...\n');
          const shellProcess = await instance.spawn('jsh', {
            terminal: {
              cols: term.cols,
              rows: term.rows,
            },
          });
          
          // Pipe output to terminal
          shellProcess.output.pipeTo(new WritableStream({
            write(data) { term.write(data); }
          }));

          // Pipe terminal input to shell
          const input = shellProcess.input.getWriter();
          term.onData((data) => {
            input.write(data);
          });

          // 4. Run Commands via Shell
          const hasNodeModules = await instance.fs.readdir('node_modules').then(() => true).catch(() => false);
          
          if (!hasNodeModules) {
             term.write('Installing dependencies (this may take a moment)...\n');
             await input.write('npm install && npm run dev\n');
          } else {
             term.write('Dependencies found. Starting server...\n');
             await input.write('npm run dev\n');
          }

          instance.on('server-ready', (_port, url) => {
            term.write(`Server ready at ${url}\n`);
            const iframe = document.querySelector('iframe');
            if (iframe) iframe.src = url;
          });

        } catch (err: any) {
          term.write(`\r\nError: ${err.message}\n`);
          console.error(err);
        }
      };

      run();

      return () => {
        term.dispose();
        delete (window as any).term;
      };
    }
  }, []);

  const [showTerminal, setShowTerminal] = useState(false);
  const [showAI, setShowAI] = useState(true);
  const [errorCount, setErrorCount] = useState(0);

  // Listen for runtime errors from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'RUNTIME_ERROR') {
        const { error } = event.data;
        
        const term = terminalRef.current && (window as any).term;
        if (term) {
          term.write(`\r\n\x1b[31m[Runtime Error] ${error.message}\x1b[0m\r\n`);
          if (error.stack) {
             const stackLines = error.stack.split('\n').map((line: string) => `  ${line}`).join('\r\n');
             term.write(`\x1b[90m${stackLines}\x1b[0m\r\n`);
          }
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="container">
      <div className="main-area">
        <div className="preview">
          <iframe className="iframe" />
          
          {/* Floating Controls for Terminal */}
          {!showTerminal && (
            <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 10, display: 'flex', gap: 10 }}>
              <button 
                className="terminal-toggle" 
                style={{ position: 'static' }}
                onClick={() => { setShowTerminal(true); setErrorCount(0); }}
              >
                Show Terminal
                {errorCount > 0 && (
                  <span style={{ 
                    marginLeft: 8, 
                    background: '#ff4444', 
                    color: 'white', 
                    padding: '2px 6px', 
                    borderRadius: '10px', 
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    {errorCount}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Floating Toggle for AI Sidebar (when collapsed) */}
        {!showAI && (
          <button className="ai-toggle-floating" onClick={() => setShowAI(true)}>
            🤖
          </button>
        )}

        {/* Right Sidebar: AI Agent */}
        <div className={`ai-sidebar ${showAI ? '' : 'collapsed'}`}>
          <div className="ai-header">
            <span>Agent K 🤖</span>
            <button onClick={() => setShowAI(false)}>→</button>
          </div>
          {showAI && <AIPanel webContainer={wc} />}
        </div>
      </div>

      {/* Bottom Panel: Terminal */}
      <div className={`terminal-container ${showTerminal ? '' : 'hidden'}`}>
        <div className="terminal-header" onClick={() => setShowTerminal(!showTerminal)}>
          <span>Terminal (Output & Build Logs)</span>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); // Prevent header click
              setShowTerminal(false); 
            }}
            style={{ background: 'transparent', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: 16 }}
          >
            x
          </button>
        </div>
        <div className="terminal" ref={terminalRef}></div>
      </div>
    </div>
  );
}

export default App;
