/**
 * 1. useList (List Strategy)
 * Resolves multiple documents based on a query. In the Agent K architecture,
 * list queries inherently assume Snippet data.
 */
export declare function useList<T>(collectionName: string, queryObj?: any): {
    data: T[];
    loading: boolean;
    error: any;
};
/**
 * 2. useEntity (Entity Strategy)
 * Fetches a single entity. Triggers backend fetching if data is missing or marked as partial.
 */
export declare function useEntity<T extends {
    _isFull?: boolean;
}>(collectionName: string, id: string): {
    data: T | null;
    loading: boolean;
    error: any;
};
export type DispatchAction = 'create' | 'update' | 'delete' | 'link' | string;
/**
 * 3. useDispatch (Write Strategy / Tunnel)
 * Prohibits direct fetches. Applies optimistic updates to local RxDB and
 * queues the uniform Intent Command for the Ruby Backend to process.
 */
export declare function useDispatch(collectionName: string): {
    dispatch: (action: DispatchAction, targetId?: string | null, payload?: any) => Promise<any>;
};
