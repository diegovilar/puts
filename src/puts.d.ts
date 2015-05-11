declare module "puts" {
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

    // json-error-error
    class JSONParseError extends TypeError {
    }

    // io-error
    class IOError extends Error {
    }

    // network-error
    class NetworkError extends IOError {
    }
}

declare module "puts/http" {
    import {NetworkError} from "puts";

    class HttpError extends NetworkError {
        statusCode: number;
        constructor(statusCode: number, message?: string);
    }

    class HttpNotFoundError extends HttpError {
        constructor(message?: string);
    }

    function createFromStatusCode(statusCode: number, message?: string): HttpError;
}
