import { default as React } from 'react';
import { BaseComponentProps } from './types';

export declare function BaseComponent<T = any>({ collection, id, query, children, ...canvasProps }: BaseComponentProps & {
    children: (props: {
        data: any;
        actions: any;
    }) => React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
