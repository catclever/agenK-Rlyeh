import React, { useState } from 'react';
import { Selectable } from './components/Selectable';
import type { ComponentInstance } from './types';
// @ts-ignore
import MoveableOriginal from 'react-moveable';

const Moveable = MoveableOriginal as any;

interface TentaclesOverlayProps {
  components: ComponentInstance[];
  scale: number;
  onUpdate: (id: string, updates: Partial<ComponentInstance>) => void;
  onSelect: (id: string | null) => void;
}

export const TentaclesOverlay: React.FC<TentaclesOverlayProps> = ({ components, scale, onUpdate, onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
    onSelect(id);
    if (id) {
       // Wait a tick for render? Or just Find it directly.
       // Since the element exists (we clicked it), it should be findable.
       setTimeout(() => {
          setTarget(document.getElementById(`overlay-${id}`));
       }, 0);
    } else {
      setTarget(null);
    }
  };
  
  // Also update target if components re-render/move and we lose the ref? 
  // Moveable handles target ref stability fairly well.
  
  return (
    <div 
      className="hand-overlay absolute inset-0 pointer-events-none" 
      style={{ zIndex: 9999 }}
    >
      {components.map((component) => (
        <div key={component.id} className="pointer-events-auto">
          <Selectable
            component={component}
            isSelected={selectedId === component.id}
            onSelect={handleSelect}
            scale={scale}
          >
            <div style={{ width: '100%', height: '100%' }} />
          </Selectable>
        </div>
      ))}

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
          if (!selectedId) return;
          e.target.style.left = `${e.left}px`;
          e.target.style.top = `${e.top}px`;
          onUpdate(selectedId, { x: e.left, y: e.top });
        }}
        
        onResize={(e: any) => {
           if (!selectedId) return;
           e.target.style.width = `${e.width}px`;
           e.target.style.height = `${e.height}px`;
           e.target.style.transform = e.drag.transform;
           
           onUpdate(selectedId, { 
             width: e.width, 
             height: e.height,
             x: e.drag.left,
             y: e.drag.top 
           });
        }}

        onRotate={(e: any) => {
           if (!selectedId) return;
           e.target.style.transform = e.drag.transform;
           onUpdate(selectedId, { rotation: e.rotation });
        }}
        
        // Ensure Visuals scale correctly?
        // Moveable usually handles 'transform: scale()' on parent if properly set up?
        // Artboard scales the parent container. Moveable might need rootContainer prop.
      />
    </div>
  );
};
