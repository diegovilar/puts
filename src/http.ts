import {NetworkError} from './network-error';

export class HttpError extends NetworkError {
    name = 'HttpError';
    statusCode:number;

    constructor(statusCode:number, message?:string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class HttpNotFoundError extends HttpError {
    name = 'HttpNotFoundError';

    constructor(message?:string) {
        super(404, message);
    }//
}

export function createFromStatusCode(statusCode:number, message?:string):HttpError {

    switch (statusCode) {
        case 404:
            return new HttpNotFoundError(message);
        default:
            return new HttpError(statusCode, message);
    }

}
