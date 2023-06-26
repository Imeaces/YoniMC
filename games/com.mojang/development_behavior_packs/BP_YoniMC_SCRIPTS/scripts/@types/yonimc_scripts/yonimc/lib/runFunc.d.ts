export function runFunc(func: any, ...args: any[]): any;
export function runFuncAsync(func: any, ...args: any[]): Promise<any>;
export function makeFunc(func: any, ...args: any[]): () => any;
export function makeAsyncFunc(func: any, ...args: any[]): () => Promise<any>;
