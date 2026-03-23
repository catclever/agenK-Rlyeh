import React, { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import { X, Minus, Maximize2, GripHorizontal } from 'lucide-react';
import clsx from 'clsx';

interface DraggableWindowProps {
  title: string;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  onClose?: () => void;
  className?: string;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = ({
  title,
  children,
  initialX = 100,
  initialY = 100,
  initialWidth = 600,
  initialHeight = 400,
  onClose,
  className
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const bind = useDrag(({ offset: [dx, dy] }) => {
    setPosition({ x: dx, y: dy });
  }, {
    from: () => [position.x, position.y],
    bounds: { left: 0, top: 0, right: window.innerWidth - 100, bottom: window.innerHeight - 50 }
  });

  // Simple resize handler (bottom-right corner)
  const bindResize = useDrag(({ offset: [dx, dy] }) => {
    setSize({ width: Math.max(300, dx), height: Math.max(200, dy) });
  }, {
    from: () => [size.width, size.height]
  });

  if (isMinimized) {
    return (
      <div 
        className="fixed z-50 bg-gray-800 border border-gray-700 rounded-t-lg shadow-lg flex items-center px-3 h-10 cursor-pointer hover:bg-gray-700 transition-colors"
        style={{ left: position.x, top: window.innerHeight - 40, width: 200 }}
        onClick={() => setIsMinimized(false)}
      >
        <span className="text-xs font-mono text-gray-300 truncate flex-1">{title}</span>
        <Maximize2 size={14} className="text-gray-400" />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "fixed z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl flex flex-col overflow-hidden",
        className
      )}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? '100vh' : size.height,
      }}
    >
      {/* Header / Drag Handle */}
      <div 
        {...bind()} 
        className="h-9 bg-gray-800 border-b border-gray-700 flex items-center px-3 cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'none' }}
      >
        <GripHorizontal size={16} className="text-gray-500 mr-2" />
        <span className="text-xs font-mono text-gray-300 flex-1 font-bold">{title}</span>
        
        <div className="flex items-center gap-2" onPointerDown={e => e.stopPropagation()}>
          <button onClick={() => setIsMinimized(true)} className="text-gray-400 hover:text-white">
            <Minus size={14} />
          </button>
          <button onClick={() => setIsMaximized(!isMaximized)} className="text-gray-400 hover:text-white">
            <Maximize2 size={14} />
          </button>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-red-400">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div 
          {...bindResize()}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-center justify-center z-10"
        >
          <div className="w-2 h-2 border-r-2 border-b-2 border-gray-600" />
        </div>
      )}
    </div>
  );
};
