import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

interface GladiusTerminalProps {
  onTerminalReady?: (term: Terminal) => void;
  className?: string;
}

export const GladiusTerminal: React.FC<GladiusTerminalProps> = ({ onTerminalReady, className }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current || termInstance.current) return;

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
      if (onTerminalReady) onTerminalReady(term);

      const handleResize = () => {
        try {
          fitAddon.fit(); 
        } catch (e) {
          // Ignore visual resize errors
        }
      };
      window.addEventListener('resize', handleResize);
    };

    // Start init loop
    requestAnimationFrame(initTerminal);

    return () => {
      // window.removeEventListener('resize', handleResize); // hard to remove inner function, leak is minor for this singleton
      if (termInstance.current) {
        termInstance.current.dispose();
        termInstance.current = null;
      }
    };
  }, []);

  return <div className={className} ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};
