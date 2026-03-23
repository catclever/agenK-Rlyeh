import { RxDatabase } from 'rxdb';
import { SchemaDefinition } from './schema';
import { ZodTypeAny } from 'zod';

export declare class Store {
    db: RxDatabase | null;
    private schemas;
    constructor();
    register<T extends ZodTypeAny>(schema: SchemaDefinition<T>): Promise<void>;
    init(name?: string, storage?: any): Promise<RxDatabase>;
}
export declare const store: Store;
