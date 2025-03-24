export type ResponseRoot =
    Blob |
    string |
    boolean |
    number |
    [] |
    {} |
    undefined;

export type RequestRoot =
    FormData |
    {} |
    [] |
    string |
    number |
    undefined;

type Stringish =
    string |
    symbol |
    number |
    undefined |
    null;

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

export type HookOptions<Response extends ResponseRoot, Request extends RequestRoot> = {
    endpoint?: Stringish | Stringish[];
    method?: HttpMethod;
    body?: Request;
    onSuccess?: (value: Response | null) => any;
    onError?: (value: string) => any;
};

export type HookReturn<Params, Response extends ResponseRoot> = {
    loading: boolean;
    data: Response | null;
    call: (params?: Params) => Promise<Response | null>;
};

export type HookOptionsFactory<Params, Response extends ResponseRoot, Request extends RequestRoot> =
    ((params?: Params) => (HookOptions<Response, Request> | Promise<HookOptions<Response, Request>>)) |
    HookOptions<Response, Request>;

export type GlobalOptions = {
    baseUrl: string;
    handleResponse?: <T extends ResponseRoot>(value: T) => any;
    handleError?: (error: any) => string;
};