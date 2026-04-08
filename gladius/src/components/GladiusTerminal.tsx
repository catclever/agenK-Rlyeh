import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useKernelRegister } from '@agent-k/core';
import type { TerminalApi } from '@agent-k/core';
import 'xterm/css/xterm.css';

interface GladiusTerminalProps {
  onTerminalReady?: (term: Terminal) => void;
  className?: string;
}

export const GladiusTerminal: React.FC<GladiusTerminalProps> = ({ onTerminalReady, className }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);
  const [terminalApi, setTerminalApi] = useState<TerminalApi | undefined>(undefined);

  // Register this component's capabilities natively to the IDE Kernel Bus
  useKernelRegister('gladius', terminalApi as any);

  useEffect(() => {
    if (!terminalRef.current || termInstance.current) return;
    let ro: ResizeObserver | null = null;
    let handleResizeGlobal: (() => void) | null = null;

    const initTerminal = () => {
      if (!terminalRef.current) return;
      // Safety check for dimensions
      if (terminalRef.current.clientWidth === 0 || terminalRef.current.clientHeight === 0) {
        // Retry shortly
        setTimeout(initTerminal, 100);
        return;
      }

      const term = new Terminal({ 
        convertEol: true,
        theme: {
          background: '#1e1e1e',
          foreground: '#ffffff'
        }
      });
      
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      
      try {
        term.open(terminalRef.current);
        fitAddon.fit();
      } catch (e) {
        console.warn('XTerm init failed, retrying...', e);
        term.dispose();
        setTimeout(initTerminal, 200);
        return;
      }
      
      termInstance.current = term;
      
      // Expose capabilities to other decoupled modules
      setTerminalApi({
        executeCommand: (cmd: string) => {
          // For now, write to terminal UI. Real execution relies on the Shoggoth Orchestrator bindings.
          // The Orchestrator intercepts this later, but for UI feedback:
          term.write(`\r\n\x1b[33m$ ${cmd}\x1b[0m\r\n`);
          // Dispatch DOM custom event so IDE catches actual backend runner 
          window.dispatchEvent(new CustomEvent('GLADIUS_EVAL', { detail: cmd }));
        },
        write: (text: string) => term.write(text)
      });

      if (onTerminalReady) onTerminalReady(term);

      const handleResize = () => {
        try {
          if (terminalRef.current && terminalRef.current.clientWidth > 0) {
             fitAddon.fit(); 
          }
        } catch (e) {
          // Ignore visual resize errors
        }
      };
      
      window.addEventListener('resize', handleResize);
      handleResizeGlobal = handleResize;
      
      if (typeof ResizeObserver !== 'undefined' && terminalRef.current) {
         ro = new ResizeObserver(() => {
            handleResize();
         });
         ro.observe(terminalRef.current);
      }
    };

    // Start init loop
    requestAnimationFrame(initTerminal);

    return () => {
      if (handleResizeGlobal) window.removeEventListener('resize', handleResizeGlobal);
      if (ro) {
        ro.disconnect();
        ro = null;
      }
      if (termInstance.current) {
        termInstance.current.dispose();
        termInstance.current = null;
      }
    };
  }, []);

  return <div className={className} ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};
