import React from 'react';

export interface AtomDefinition {
  name: string;
  component: React.ComponentType<any>;
  schema?: any; // To hold configuration schema for the builder
  defaultProps?: any;
}

export class AzathothRegistry {
  private static atoms: Map<string, AtomDefinition> = new Map();

  // Register an atom (with all its builder wrappers/schema)
  static register(definition: AtomDefinition) {
    this.atoms.set(definition.name, definition);
  }

  static get(name: string) {
    return this.atoms.get(name);
  }

  // Returns all registered atoms, optionally filtering or preparing them for 
  // builder enumeration, editor mapping, or runtime rendering.
  static getComponentMap(): Record<string, React.ComponentType<any>> {
    const rawComponents: Record<string, React.ComponentType<any>> = {};
    for (const [name, def] of this.atoms.entries()) {
      rawComponents[name] = def.component;
    }
    return rawComponents;
  }
}
