// Type definitions for request-promise v0.4.2
// Project: https://www.npmjs.com/package/request-promise
// Definitions by: Christopher Glantschnig <https://github.com/cglantschnig/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Change [0]: 2015/08/20 - Aya Morisawa <https://github.com/AyaMorisawa>

/// <reference path="node.d.ts" />
/// <reference path="request.d.ts" />

declare module 'request-promise' {
    import request = require('request');
    import stream = require('stream');
    import http = require('http');

    export = RequestPromiseAPI;

    function RequestPromiseAPI(options: RequestPromiseAPI.Options): Promise<any>;
    function RequestPromiseAPI(uri: string): Promise<request.Request>;

    module RequestPromiseAPI {
        export interface Options extends request.Options {
            simple?: boolean;
            transform?: (body: any, response: http.IncomingMessage) => any;
            resolveWithFullResponse?: boolean;
        }
    }
}

