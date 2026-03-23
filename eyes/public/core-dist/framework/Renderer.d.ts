import { default as React } from 'react';
import { PageSpec } from '../schema/app_spec';

export interface RendererContext {
    routeParams: Record<string, string>;
    global: Record<string, any>;
    state: Record<string, any>;
    navigate: (path: string) => void;
}
export interface RendererProps {
    page: PageSpec;
    components: Record<string, React.ComponentType<any>>;
    context: RendererContext;
}
export declare const Renderer: React.FC<RendererProps>;
