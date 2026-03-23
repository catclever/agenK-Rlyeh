import { z } from 'zod';

export declare const BindingSourceSchema: z.ZodUnion<[z.ZodString, z.ZodObject<{
    source: z.ZodEnum<["route", "context", "global", "state"]>;
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    source: "route" | "context" | "global" | "state";
    key: string;
}, {
    source: "route" | "context" | "global" | "state";
    key: string;
}>]>;
export declare const DataBindingSchema: z.ZodObject<{
    collection: z.ZodString;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        source: z.ZodEnum<["route", "context", "global", "state"]>;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        source: "route" | "context" | "global" | "state";
        key: string;
    }, {
        source: "route" | "context" | "global" | "state";
        key: string;
    }>]>>;
    query: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    collection: string;
    id?: string | {
        source: "route" | "context" | "global" | "state";
        key: string;
    } | undefined;
    query?: Record<string, any> | undefined;
}, {
    collection: string;
    id?: string | {
        source: "route" | "context" | "global" | "state";
        key: string;
    } | undefined;
    query?: Record<string, any> | undefined;
}>;
export declare const CanvasPropsSchema: z.ZodObject<{
    x: z.ZodDefault<z.ZodNumber>;
    y: z.ZodDefault<z.ZodNumber>;
    scale: z.ZodDefault<z.ZodNumber>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    zIndex: z.ZodDefault<z.ZodNumber>;
    width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
}, "strip", z.ZodTypeAny, {
    x: number;
    y: number;
    scale: number;
    rotation: number;
    opacity: number;
    zIndex: number;
    width?: string | number | undefined;
    height?: string | number | undefined;
}, {
    x?: number | undefined;
    y?: number | undefined;
    scale?: number | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    zIndex?: number | undefined;
    width?: string | number | undefined;
    height?: string | number | undefined;
}>;
export declare const ComponentInstanceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    canvas: z.ZodObject<{
        x: z.ZodDefault<z.ZodNumber>;
        y: z.ZodDefault<z.ZodNumber>;
        scale: z.ZodDefault<z.ZodNumber>;
        rotation: z.ZodDefault<z.ZodNumber>;
        opacity: z.ZodDefault<z.ZodNumber>;
        zIndex: z.ZodDefault<z.ZodNumber>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
        scale: number;
        rotation: number;
        opacity: number;
        zIndex: number;
        width?: string | number | undefined;
        height?: string | number | undefined;
    }, {
        x?: number | undefined;
        y?: number | undefined;
        scale?: number | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        zIndex?: number | undefined;
        width?: string | number | undefined;
        height?: string | number | undefined;
    }>;
    data: z.ZodOptional<z.ZodObject<{
        collection: z.ZodString;
        id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            source: z.ZodEnum<["route", "context", "global", "state"]>;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            source: "route" | "context" | "global" | "state";
            key: string;
        }, {
            source: "route" | "context" | "global" | "state";
            key: string;
        }>]>>;
        query: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        collection: string;
        id?: string | {
            source: "route" | "context" | "global" | "state";
            key: string;
        } | undefined;
        query?: Record<string, any> | undefined;
    }, {
        collection: string;
        id?: string | {
            source: "route" | "context" | "global" | "state";
            key: string;
        } | undefined;
        query?: Record<string, any> | undefined;
    }>>;
    props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: string;
    canvas: {
        x: number;
        y: number;
        scale: number;
        rotation: number;
        opacity: number;
        zIndex: number;
        width?: string | number | undefined;
        height?: string | number | undefined;
    };
    data?: {
        collection: string;
        id?: string | {
            source: "route" | "context" | "global" | "state";
            key: string;
        } | undefined;
        query?: Record<string, any> | undefined;
    } | undefined;
    props?: Record<string, any> | undefined;
}, {
    id: string;
    type: string;
    canvas: {
        x?: number | undefined;
        y?: number | undefined;
        scale?: number | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        zIndex?: number | undefined;
        width?: string | number | undefined;
        height?: string | number | undefined;
    };
    data?: {
        collection: string;
        id?: string | {
            source: "route" | "context" | "global" | "state";
            key: string;
        } | undefined;
        query?: Record<string, any> | undefined;
    } | undefined;
    props?: Record<string, any> | undefined;
}>;
export declare const PageSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    route: z.ZodString;
    components: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        canvas: z.ZodObject<{
            x: z.ZodDefault<z.ZodNumber>;
            y: z.ZodDefault<z.ZodNumber>;
            scale: z.ZodDefault<z.ZodNumber>;
            rotation: z.ZodDefault<z.ZodNumber>;
            opacity: z.ZodDefault<z.ZodNumber>;
            zIndex: z.ZodDefault<z.ZodNumber>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            scale: number;
            rotation: number;
            opacity: number;
            zIndex: number;
            width?: string | number | undefined;
            height?: string | number | undefined;
        }, {
            x?: number | undefined;
            y?: number | undefined;
            scale?: number | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            zIndex?: number | undefined;
            width?: string | number | undefined;
            height?: string | number | undefined;
        }>;
        data: z.ZodOptional<z.ZodObject<{
            collection: z.ZodString;
            id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
                source: z.ZodEnum<["route", "context", "global", "state"]>;
                key: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                source: "route" | "context" | "global" | "state";
                key: string;
            }, {
                source: "route" | "context" | "global" | "state";
                key: string;
            }>]>>;
            query: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            collection: string;
            id?: string | {
                source: "route" | "context" | "global" | "state";
                key: string;
            } | undefined;
            query?: Record<string, any> | undefined;
        }, {
            collection: string;
            id?: string | {
                source: "route" | "context" | "global" | "state";
                key: string;
            } | undefined;
            query?: Record<string, any> | undefined;
        }>>;
        props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: string;
        canvas: {
            x: number;
            y: number;
            scale: number;
            rotation: number;
            opacity: number;
            zIndex: number;
            width?: string | number | undefined;
            height?: string | number | undefined;
        };
        data?: {
            collection: string;
            id?: string | {
                source: "route" | "context" | "global" | "state";
                key: string;
            } | undefined;
            query?: Record<string, any> | undefined;
        } | undefined;
        props?: Record<string, any> | undefined;
    }, {
        id: string;
        type: string;
        canvas: {
            x?: number | undefined;
            y?: number | undefined;
            scale?: number | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            zIndex?: number | undefined;
            width?: string | number | undefined;
            height?: string | number | undefined;
        };
        data?: {
            collection: string;
            id?: string | {
                source: "route" | "context" | "global" | "state";
                key: string;
            } | undefined;
            query?: Record<string, any> | undefined;
        } | undefined;
        props?: Record<string, any> | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    route: string;
    name: string;
    components: {
        id: string;
        type: string;
        canvas: {
            x: number;
            y: number;
            scale: number;
            rotation: number;
            opacity: number;
            zIndex: number;
            width?: string | number | undefined;
            height?: string | number | undefined;
        };
        data?: {
            collection: string;
            id?: string | {
                source: "route" | "context" | "global" | "state";
                key: string;
            } | undefined;
            query?: Record<string, any> | undefined;
        } | undefined;
        props?: Record<string, any> | undefined;
    }[];
}, {
    id: string;
    route: string;
    name: string;
    components: {
        id: string;
        type: string;
        canvas: {
            x?: number | undefined;
            y?: number | undefined;
            scale?: number | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            zIndex?: number | undefined;
            width?: string | number | undefined;
            height?: string | number | undefined;
        };
        data?: {
            collection: string;
            id?: string | {
                source: "route" | "context" | "global" | "state";
                key: string;
            } | undefined;
            query?: Record<string, any> | undefined;
        } | undefined;
        props?: Record<string, any> | undefined;
    }[];
}>;
export declare const AppSpecSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    pages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        route: z.ZodString;
        components: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodString;
            canvas: z.ZodObject<{
                x: z.ZodDefault<z.ZodNumber>;
                y: z.ZodDefault<z.ZodNumber>;
                scale: z.ZodDefault<z.ZodNumber>;
                rotation: z.ZodDefault<z.ZodNumber>;
                opacity: z.ZodDefault<z.ZodNumber>;
                zIndex: z.ZodDefault<z.ZodNumber>;
                width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
                height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
                scale: number;
                rotation: number;
                opacity: number;
                zIndex: number;
                width?: string | number | undefined;
                height?: string | number | undefined;
            }, {
                x?: number | undefined;
                y?: number | undefined;
                scale?: number | undefined;
                rotation?: number | undefined;
                opacity?: number | undefined;
                zIndex?: number | undefined;
                width?: string | number | undefined;
                height?: string | number | undefined;
            }>;
            data: z.ZodOptional<z.ZodObject<{
                collection: z.ZodString;
                id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
                    source: z.ZodEnum<["route", "context", "global", "state"]>;
                    key: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    source: "route" | "context" | "global" | "state";
                    key: string;
                }, {
                    source: "route" | "context" | "global" | "state";
                    key: string;
                }>]>>;
                query: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            }, "strip", z.ZodTypeAny, {
                collection: string;
                id?: string | {
                    source: "route" | "context" | "global" | "state";
                    key: string;
                } | undefined;
                query?: Record<string, any> | undefined;
            }, {
                collection: string;
                id?: string | {
                    source: "route" | "context" | "global" | "state";
                    key: string;
                } | undefined;
                query?: Record<string, any> | undefined;
            }>>;
            props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: string;
            canvas: {
                x: number;
                y: number;
                scale: number;
                rotation: number;
                opacity: number;
                zIndex: number;
                width?: string | number | undefined;
                height?: string | number | undefined;
            };
            data?: {
                collection: string;
                id?: string | {
                    source: "route" | "context" | "global" | "state";
                    key: string;
                } | undefined;
                query?: Record<string, any> | undefined;
            } | undefined;
            props?: Record<string, any> | undefined;
        }, {
            id: string;
            type: string;
            canvas: {
                x?: number | undefined;
                y?: number | undefined;
                scale?: number | undefined;
                rotation?: number | undefined;
                opacity?: number | undefined;
                zIndex?: number | undefined;
                width?: string | number | undefined;
                height?: string | number | undefined;
            };
            data?: {
                collection: string;
                id?: string | {
                    source: "route" | "context" | "global" | "state";
                    key: string;
                } | undefined;
                query?: Record<string, any> | undefined;
            } | undefined;
            props?: Record<string, any> | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        route: string;
        name: string;
        components: {
            id: string;
            type: string;
            canvas: {
                x: number;
                y: number;
                scale: number;
                rotation: number;
                opacity: number;
                zIndex: number;
                width?: string | number | undefined;
                height?: string | number | undefined;
            };
            data?: {
                collection: string;
                id?: string | {
                    source: "route" | "context" | "global" | "state";
                    key: string;
                } | undefined;
                query?: Record<string, any> | undefined;
            } | undefined;
            props?: Record<string, any> | undefined;
        }[];
    }, {
        id: string;
        route: string;
        name: string;
        components: {
            id: string;
            type: string;
            canvas: {
                x?: number | undefined;
                y?: number | undefined;
                scale?: number | undefined;
                rotation?: number | undefined;
                opacity?: number | undefined;
                zIndex?: number | undefined;
                width?: string | number | undefined;
                height?: string | number | undefined;
            };
            data?: {
                collection: string;
                id?: string | {
                    source: "route" | "context" | "global" | "state";
                    key: string;
                } | undefined;
                query?: Record<string, any> | undefined;
            } | undefined;
            props?: Record<string, any> | undefined;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    version: string;
    name: string;
    pages: {
        id: string;
        route: string;
        name: string;
        components: {
            id: string;
            type: string;
            canvas: {
                x: number;
                y: number;
                scale: number;
                rotation: number;
                opacity: number;
                zIndex: number;
                width?: string | number | undefined;
                height?: string | number | undefined;
            };
            data?: {
                collection: string;
                id?: string | {
                    source: "route" | "context" | "global" | "state";
                    key: string;
                } | undefined;
                query?: Record<string, any> | undefined;
            } | undefined;
            props?: Record<string, any> | undefined;
        }[];
    }[];
}, {
    version: string;
    name: string;
    pages: {
        id: string;
        route: string;
        name: string;
        components: {
            id: string;
            type: string;
            canvas: {
                x?: number | undefined;
                y?: number | undefined;
                scale?: number | undefined;
                rotation?: number | undefined;
                opacity?: number | undefined;
                zIndex?: number | undefined;
                width?: string | number | undefined;
                height?: string | number | undefined;
            };
            data?: {
                collection: string;
                id?: string | {
                    source: "route" | "context" | "global" | "state";
                    key: string;
                } | undefined;
                query?: Record<string, any> | undefined;
            } | undefined;
            props?: Record<string, any> | undefined;
        }[];
    }[];
}>;
export type AppSpec = z.infer<typeof AppSpecSchema>;
export type PageSpec = z.infer<typeof PageSchema>;
export type ComponentInstance = z.infer<typeof ComponentInstanceSchema>;
