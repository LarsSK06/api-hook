export type Endpoint =
    string |
    number |
    symbol;

export type ConfigScheme = {
    schemeName: string;
    baseURL: string;
    headers: HeadersInit;
};

export type Config = {
    defaultConfigScheme: string;
    configSchemes: [ConfigScheme, ...ConfigScheme[]];
};

export type HookOptions<RequestBody> = {
    scheme?: string;
    endpoint: Endpoint | (Endpoint | undefined | null)[];
    method?: Method;
    body?: RequestBody;
};

export type HookOptionsFactory<Params, RequestBody> =
    ((params?: Params) => HookOptions<RequestBody>) |
    HookOptions<RequestBody>;

export type Method =
    "GET" |
    "PUT" |
    "POST" |
    "DELETE";