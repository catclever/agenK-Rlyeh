import React from 'react';
import clsx from 'clsx';
import type { ComponentInstance } from '../types';

interface SelectableProps {
  component: ComponentInstance;
  isSelected: boolean;
  onSelect: (id: string) => void;
  scale: number;
  children: React.ReactNode;
}

export const Selectable: React.FC<SelectableProps> = ({
  component,
  isSelected,
  onSelect,
  children
}) => {
  return (
    <div
      id={`overlay-${component.id}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(component.id);
      }}
      className={clsx(
        "absolute transition-shadow duration-200 select-none touch-none",
        isSelected ? "z-50 border-2 border-blue-500" : "hover:ring-1 hover:ring-blue-300 z-10 border border-orange-500/50"
      )}
      style={{
        left: component.x,
        top: component.y,
        width: component.width,
        height: component.height,
        position: 'absolute'
      }}
    >
      {/* Label only on Hover or Selection? Moveable handles selection UI now. Keeping simple hover label for debug. */}
      {/* 
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-t">
          {component.type}
        </div>
      )} 
      */}
      
      {children}
    </div>
  );
};
