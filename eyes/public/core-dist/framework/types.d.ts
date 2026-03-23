import { CSSProperties, ReactNode } from 'react';

export interface CanvasProps {
    x?: number;
    y?: number;
    scale?: number;
    rotation?: number;
    opacity?: number;
    zIndex?: number;
    width?: number | string;
    height?: number | string;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
}
export interface BaseComponentProps {
    collection: string;
    id?: string;
    query?: any;
    x?: number;
    y?: number;
    scale?: number;
    rotation?: number;
    opacity?: number;
    zIndex?: number;
    navigate?: (path: string) => void;
    [key: string]: any;
}
