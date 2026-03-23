import { z } from 'zod';
import { RxJsonSchema } from 'rxdb';

export interface SchemaDefinition<T extends z.ZodTypeAny> {
    name: string;
    schema: T;
    key?: string;
}
export declare function defineSchema<T extends z.ZodTypeAny>(name: string, zodSchema: T, primaryKey?: string): SchemaDefinition<T>;
export declare function toRxSchema(definition: SchemaDefinition<any>): RxJsonSchema<any>;
