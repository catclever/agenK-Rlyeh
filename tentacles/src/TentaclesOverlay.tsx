import React from 'react';
import type { ComponentInstance } from './types';
// @ts-ignore
import MoveableOriginal from 'react-moveable';

const Moveable = MoveableOriginal as any;

interface TentaclesOverlayProps {
  targetId: string | null;
  scale?: number;
  onUpdate: (id: string, updates: Partial<ComponentInstance>) => void;
}

export const TentaclesOverlay: React.FC<TentaclesOverlayProps> = ({ targetId, scale = 1, onUpdate }) => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  
  // Track geometry continuously during Moveable interactions to perfectly commit onEnd
  const geometryRef = React.useRef({ x: 0, y: 0, width: 0, height: 0, rotation: 0 });

  React.useEffect(() => {
    if (targetId) {
      // Find the element generated natively by IDE
      setTimeout(() => setTarget(document.getElementById(`overlay-${targetId}`)), 0);
    } else {
      setTarget(null);
    }
  }, [targetId]);

  return (
      <Moveable
        target={target}
        zoom={scale}
        draggable={true}
        throttleDrag={1}
        resizable={true}
        keepRatio={false}
        throttleResize={1}
        renderDirections={["nw","n","ne","w","e","sw","s","se"]}
        rotatable={true}
        throttleRotate={0}
        rotationPosition={"top"}

        // --- EVENTS ---
        
        onDrag={(e: any) => {
          if (!targetId) return;
          e.target.style.left = `${e.left}px`;
          e.target.style.top = `${e.top}px`;
          
          geometryRef.current = { ...geometryRef.current, x: e.left, y: e.top };
        }}
        onDragEnd={(e: any) => {
          if (!targetId || !e.isDrag) return;
          const { x, y } = geometryRef.current;
          onUpdate(targetId, { x, y });
        }}
        
        onResize={(e: any) => {
           if (!targetId) return;
           e.target.style.width = `${e.width}px`;
           e.target.style.height = `${e.height}px`;
           
           // Moveable 0.54+ exposes e.drag.left, but if missing (NaN/undefined during matrix rotations)
           // we securely compute absolute screen drift via the mathematical beforeTranslate delta matrix.
           const newX = e.drag.left !== undefined ? e.drag.left : (geometryRef.current.x + e.drag.beforeTranslate[0]);
           const newY = e.drag.top !== undefined ? e.drag.top : (geometryRef.current.y + e.drag.beforeTranslate[1]);
           
           e.target.style.left = `${newX}px`;
           e.target.style.top = `${newY}px`;
           
           geometryRef.current = { 
             ...geometryRef.current, 
             width: e.width, 
             height: e.height, 
             x: newX, 
             y: newY 
           };
        }}
        onResizeEnd={(e: any) => {
           if (!targetId || !e.isDrag) return;
           const { width, height, x, y } = geometryRef.current;
           onUpdate(targetId, { width, height, x, y });
        }}

        onRotate={(e: any) => {
           if (!targetId) return;
           
           // Extract the definitive absolute angle Moveable mathematically tracked
           const newRotation = e.absoluteRotation ?? 0;
           
           // STRCITLY ISOLATE THE DOM MUTATION TO ONLY ROTATE - NO TRANSLATE POISONING
           e.target.style.transform = `rotate(${newRotation}deg)`;
           
           geometryRef.current = { ...geometryRef.current, rotation: newRotation };
        }}
        onRotateEnd={(e: any) => {
           if (!targetId || !e.isDrag) return;
           onUpdate(targetId, { rotation: geometryRef.current.rotation });
        }}
      />
  );
};
