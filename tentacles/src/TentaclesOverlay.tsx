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
        edgeDraggable={false}
        startDragRotate={0}
        throttleDragRotate={0}
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
           e.target.style.left = `${e.drag.left}px`;
           e.target.style.top = `${e.drag.top}px`;
           
           geometryRef.current = { 
             ...geometryRef.current, 
             width: e.width, 
             height: e.height, 
             x: e.drag.left, 
             y: e.drag.top 
           };
        }}
        onResizeEnd={(e: any) => {
           if (!targetId || !e.isDrag) return;
           const { width, height, x, y } = geometryRef.current;
           onUpdate(targetId, { width, height, x, y });
        }}

        onRotate={(e: any) => {
           if (!targetId) return;
           e.target.style.transform = e.drag.transform;
           
           geometryRef.current = { ...geometryRef.current, rotation: e.rotation };
        }}
        onRotateEnd={(e: any) => {
           if (!targetId || !e.isDrag) return;
           onUpdate(targetId, { rotation: geometryRef.current.rotation });
        }}
      />
  );
};
