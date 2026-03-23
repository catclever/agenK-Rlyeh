import React, { useRef, useEffect, useState } from 'react';

import { useGesture } from '@use-gesture/react';
import clsx from 'clsx';

interface ArtboardProps {
  children?: React.ReactNode;
  designWidth?: number;
  designHeight?: number;
  className?: string;
  scale: number;
  onScaleChange: (scale: number) => void;
  panning?: boolean;
  autoResize?: boolean;
}

export const Artboard: React.FC<ArtboardProps> = ({
  children,
  designWidth: initialDesignWidth = 1440,
  designHeight: initialDesignHeight = 900,
  className,
  scale,
  onScaleChange,
  panning = true,
  autoResize = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [designSize, setDesignSize] = useState({ width: initialDesignWidth, height: initialDesignHeight });

  // Auto-resize logic
  useEffect(() => {
    if (!autoResize || !containerRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setDesignSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoResize]);

  // Initial Center / Reset
  useEffect(() => {
    if (autoResize) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    
    // Calculate scale to fit with some padding
    const scaleX = (clientWidth - 100) / designSize.width;
    const scaleY = (clientHeight - 100) / designSize.height;
    const initialScale = Math.min(scaleX, scaleY, 1); // Don't scale up initially
    
    onScaleChange(initialScale);
    
    // Center initially
    // Start at top-left without padding
    setPosition({
      x: 0,
      y: 0
    });
  }, [designSize.width, designSize.height, autoResize]); // Removed onScaleChange from deps to avoid loop if not stable

  // 2. Pan & Zoom Logic (The "Hand" Interaction)
  useGesture({
    onDrag: ({ offset: [dx, dy] }) => {
      if (panning) {
        setPosition({ x: dx, y: dy });
      }
    },
    onWheel: ({ delta: [_, dy], ctrlKey }) => {
      if (ctrlKey && panning) {
        // Zoom
        const newScale = Math.max(0.1, Math.min(5, scale - dy * 0.001));
        onScaleChange(newScale);
      }
    }
  }, {
    target: containerRef,
    eventOptions: { passive: false },
    enabled: panning
  });

  return (
    <div 
      ref={containerRef} 
      className={clsx("w-full h-full relative overflow-hidden bg-gray-900", className)}
    >
      {/* The "Rubber Sheet" */}
      <div 
        className="absolute bg-white shadow-2xl transition-transform duration-75 ease-out origin-top-left"
        style={{
          width: designSize.width,
          height: designSize.height,
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
        }}
      >
        {/* Grid Background (Optional) */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        {children}
      </div>
      
      {/* HUD: Scale Indicator */}
      <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-mono">
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
};
