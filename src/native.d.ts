declare module puts {

    class Error {
        name: string;
        message: string;
        constructor(message?: string);
    }

    class TypeError extends Error {}

    class RangeError extends Error {}

    class ReferenceError extends Error {}

    class SyntaxError extends Error {}

    class ParseError extends Error {}

    class EvalError extends Error {}

    class URIError extends Error {}

}
