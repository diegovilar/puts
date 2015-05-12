declare module 'puts/native' {
    
    class Error {
        name: string;
        message: string;
        constructor(message?: string);
    }

    class TypeError extends Error {
    }

    class RangeError extends Error {
    }

    class ReferenceError extends Error {
    }

    class SyntaxError extends Error {
    }

    class EvalError extends Error {
    }

    class URIError extends Error {
    }
    
}

declare module 'puts/json-parse-error' {
    
    import {TypeError} from 'puts/native';

    export class JSONParseError extends TypeError {    
    }
    
}

declare module 'puts/io-error' {
    
    import {Error} from 'puts/native';

    export class IOError extends Error {
    }
    
}

declare module 'puts/network-error' {
    
    import {IOError} from 'puts/io-error';

    export class NetworkError extends IOError {        
    }
    
}

declare module 'puts/http' {
    
    import {NetworkError} from 'puts/network-error';

    class HttpError extends NetworkError {
        statusCode: number;
        constructor(statusCode: number, message?: string);
    }

    class HttpNotFoundError extends HttpError {
        constructor(message?: string);
    }

    function createFromStatusCode(statusCode: number, message?: string): HttpError;
    
}

declare module 'puts' {
    
    export * from 'puts/native';
    export * from 'puts/io-error';
    export * from 'puts/network-error';
    export * from 'puts/json-parse-error';
    
    import * as http from 'puts/http'
    export {http};
    
    /*class Error {
        name: string;
        message: string;
        constructor(message?: string);
    }

    class TypeError extends Error {
    }

    class RangeError extends Error {
    }

    class ReferenceError extends Error {
    }

    class SyntaxError extends Error {
    }

    class EvalError extends Error {
    }

    class URIError extends Error {
    }

    // json-error-error
    class JSONParseError extends TypeError {
    }

    // io-error
    class IOError extends Error {
    }

    // network-error
    class NetworkError extends IOError {
    }*/
    
}
