import React from 'react';
import type { ComponentInstance } from './types';
// @ts-ignore
import MoveableOriginal from 'react-moveable';

const Moveable = MoveableOriginal as any;

interface TentaclesOverlayProps {
  targetId: string | null;
  onUpdate: (id: string, updates: Partial<ComponentInstance>) => void;
}

export const TentaclesOverlay: React.FC<TentaclesOverlayProps> = ({ targetId, onUpdate }) => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (targetId) {
      // Find the element generated natively by IDE
      setTimeout(() => setTarget(document.getElementById(`overlay-${targetId}`)), 0);
    } else {
      setTarget(null);
    }
  }, [targetId]);

  return (
    <div className="tentacles-plugin-overlay absolute inset-0 pointer-events-none" style={{ zIndex: 9999 }}>

      <Moveable
        target={target}
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
        }}
        onDragEnd={(e: any) => {
          if (!targetId || !e.lastEvent) return;
          onUpdate(targetId, { x: e.lastEvent.left, y: e.lastEvent.top });
        }}
        
        onResize={(e: any) => {
           if (!targetId) return;
           e.target.style.width = `${e.width}px`;
           e.target.style.height = `${e.height}px`;
           e.target.style.transform = e.drag.transform;
        }}
        onResizeEnd={(e: any) => {
           if (!targetId || !e.lastEvent) return;
           onUpdate(targetId, { 
             width: e.lastEvent.width, 
             height: e.lastEvent.height,
             x: e.lastEvent.drag.left,
             y: e.lastEvent.drag.top 
           });
        }}

        onRotate={(e: any) => {
           if (!targetId) return;
           e.target.style.transform = e.drag.transform;
        }}
        onRotateEnd={(e: any) => {
           if (!targetId || !e.lastEvent) return;
           onUpdate(targetId, { rotation: e.lastEvent.rotation });
        }}
      />
    </div>
  );
};
