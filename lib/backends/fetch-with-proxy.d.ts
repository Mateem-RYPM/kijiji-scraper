declare module 'fetch-with-proxy' {
    import { Agent } from "http";

    export class Body {
        constructor(body?: any, opts?: { size?: number; timeout?: number });
        arrayBuffer(): Promise<ArrayBuffer>;
        blob(): Promise<Blob>;
        body: NodeJS.ReadableStream;
        bodyUsed: boolean;
        buffer(): Promise<Buffer>;
        json(): Promise<any>;
        size: number;
        text(): Promise<string>;
        textConverted(): Promise<string>;
        timeout: number;
    }

    interface RequestInit {
        // whatwg/fetch standard options
        body?: BodyInit;
        headers?: HeadersInit;
        method?: string;
        redirect?: RequestRedirect;
        signal?: AbortSignal | null;

        // node-fetch extensions
        agent?: Agent | ((parsedUrl: URL) => Agent); // =null http.Agent instance, allows custom proxy, certificate etc.
        compress?: boolean; // =true support gzip/deflate content encoding. false to disable
        follow?: number; // =20 maximum redirect count. 0 to not follow redirect
        size?: number; // =0 maximum response body size in bytes. 0 to disable
        timeout?: number; // =0 req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)

        // node-fetch does not support mode, cache or credentials options
    }

    export class Response extends Body {
        constructor(body?: BodyInit, init?: ResponseInit);
        static error(): Response;
        static redirect(url: string, status: number): Response;
        clone(): Response;
        headers: Headers;
        ok: boolean;
        redirected: boolean;
        status: number;
        statusText: string;
        type: ResponseType;
        url: string;
    }

    export function fetch(
        url: RequestInfo,
        init?: RequestInit
    ): Promise<Response>;

    export namespace fetch {
        function isRedirect(code: number): boolean;
    }

    export default fetch;
}