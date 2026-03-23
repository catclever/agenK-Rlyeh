import { z } from 'zod';

export declare const LogSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodNumber;
    type: z.ZodEnum<["RUNTIME_ERROR", "BUILD_ERROR", "INFO"]>;
    message: z.ZodString;
    stack: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "RUNTIME_ERROR" | "BUILD_ERROR" | "INFO";
    message: string;
    timestamp: number;
    stack?: string | undefined;
    metadata?: Record<string, any> | undefined;
}, {
    id: string;
    type: "RUNTIME_ERROR" | "BUILD_ERROR" | "INFO";
    message: string;
    timestamp: number;
    stack?: string | undefined;
    metadata?: Record<string, any> | undefined;
}>;
export type LogEntry = z.infer<typeof LogSchema>;
