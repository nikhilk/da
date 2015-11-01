// Type definitions for throttled-request v0.1.1
// Project: https://www.npmjs.com/package/throttled-request

/// <reference path="node.d.ts" />
/// <reference path="request.d.ts" />

declare module 'throttled-request' {
    import request = require('request');

    interface ThrottledRequest {
      (options: request.Options): Promise<any>;
    }

    export = ThrottleAPI;
    function ThrottleAPI(request: request.Request): ThrottledRequest;

    module RequestAPI {
        export function configure(options: any): void;
    }
}

