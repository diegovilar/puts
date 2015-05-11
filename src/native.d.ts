/**
 * This module is a workaround to allow native Error constructors
 * to be treated as classes.
 * 
 * The actual implementation in JavaScript just points to the native
 * constructors.  
 */

export declare class Error {
    name: string;
    message: string;
    constructor(message?: string);
}

export declare class TypeError extends Error {
}

export declare class RangeError extends Error {
}

export declare class ReferenceError extends Error {
}

export declare class SyntaxError extends Error {
}

export declare class EvalError extends Error {
}

export declare class URIError extends Error {
}