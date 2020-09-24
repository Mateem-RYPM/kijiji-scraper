declare module 'fetch-with-proxy' {
    export function fetch(
        url: RequestInfo,
        init?: RequestInit
    ): Promise<Response>;

    export namespace fetch {
        function isRedirect(code: number): boolean;
    }

    export default fetch;
}