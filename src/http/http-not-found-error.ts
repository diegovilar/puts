///<reference path="../_references.ts"/>
///<reference path="http-error.ts"/>

module puts.http {

    export class HttpNotFoundError extends HttpError {
        name = 'HttpNotFoundError';

        constructor(message?:string) {
            super(404, message);
        }
    }

}
