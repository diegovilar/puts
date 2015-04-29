///<reference path="../_references.ts"/>
///<reference path="../network-error.ts"/>

module puts.http {

    export class HttpError extends NetworkError {
        name = 'HttpError';
        statusCode:number;

        constructor(statusCode:number, message?:string) {
            super(message);
            this.statusCode = statusCode;
        }
    }

}
