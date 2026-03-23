import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from './llm/client';
import type { Message } from './llm/client';
import type { IFileSystem } from './fs/FileSystem';

interface AIPanelProps {
  fileSystem?: IFileSystem | null;
  webContainer?: any;
}

export const AIPanel: React.FC<AIPanelProps> = ({ fileSystem }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am Agent K. I am connected to the brain. What would you like to build?' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input };
    
    // Initial Context Injection
    let contextMsg = input;
    if (fileSystem) {
      try {
        const pageSpec = await fileSystem.readFile('src/pages/home.json', 'utf-8');
        contextMsg = `Current src/pages/home.json:\n\`\`\`json\n${pageSpec}\n\`\`\`\n\nUser Request: ${input}`;
      } catch (e) {
        console.warn('Failed to read context:', e);
      }
    }

    let currentMessages = [...messages, { role: 'user' as const, content: contextMsg }];
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    let turnCount = 0;
    const MAX_TURNS = 5;

    try {
      while (turnCount < MAX_TURNS) {
        turnCount++;
        const responseText = await sendMessage(currentMessages);
        
        // Parse for JSON Tools
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
        
        if (jsonMatch && fileSystem) {
          try {
            const operation = JSON.parse(jsonMatch[1]);
            
            // 1. Handle File Read
            if (operation.type === 'file_read' && Array.isArray(operation.files)) {
              let readResults = '';
              for (const file of operation.files) {
                try {
                  const content = await fileSystem.readFile(file.path, 'utf-8');
                  readResults += `\nContent of ${file.path}:\n\`\`\`\n${content}\n\`\`\`\n`;
                } catch (err: any) {
                  readResults += `\nError reading ${file.path}: ${err.message}\n`;
                }
              }
              
              // Add Assistant's request and System's response to history
              currentMessages.push({ role: 'assistant', content: responseText });
              currentMessages.push({ role: 'user', content: `System: Here are the files you requested:\n${readResults}` });
              
              // Continue loop to let AI process the file content
              continue; 
            }

            // 2. Handle File Update
            if (operation.type === 'file_update' && Array.isArray(operation.files)) {
              for (const file of operation.files) {
                await fileSystem.writeFile(file.path, file.content);
                console.log(`Updated ${file.path}`);
              }
              
              let displayContent = responseText;
              if (operation.message) {
                 displayContent = operation.message + "\n\n(Changes applied successfully ✅)";
              }
              setMessages(prev => [...prev, { role: 'assistant', content: displayContent }]);
              break; // Stop after update
            }
          } catch (e) {
            console.error('Failed to execute tool:', e);
            // If JSON parse fails, just show the text
          }
        }

        // If no tool or unknown tool, just show response and stop
        setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
        break;
      }
    } catch (e: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${e.message}` }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-panel">
      <div className="ai-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`ai-message ${msg.role}`}>
            <div className="ai-avatar">{msg.role === 'assistant' ? '🤖' : '👤'}</div>
            <div className="ai-content">{msg.content}</div>
          </div>
        ))}
        {isThinking && <div className="ai-thinking" style={{ padding: '0 20px', color: '#999', fontSize: 12 }}>Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="ai-input-area">
        <div className="ai-input-wrapper">
          <textarea 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Agent K..."
          />
          <div className="ai-footer-actions">
            <span style={{ fontSize: 12, color: '#999' }}>⏎ to send</span>
            <button className="ai-send-btn" onClick={handleSend} disabled={isThinking}>
              {isThinking ? '...' : '➤'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

