///<reference path="../_references.ts"/>
///<reference path="http-error.ts"/>
///<reference path="http-not-found-error.ts"/>

module puts.http {

    export function createFromStatusCode(statusCode:number, message?:string) {

        switch (statusCode) {
            case 404:
                return new HttpNotFoundError(message);
            default:
                return new HttpError(statusCode, message);
        }

    }

}
