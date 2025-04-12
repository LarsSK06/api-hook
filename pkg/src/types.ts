import { AxiosRequestConfig } from "axios";
import { ReactNode } from "react";

export type Endpoint =
    string |
    number |
    symbol;

export type ConfigScheme = {
    schemeName: string;
    baseURL: string;
    headers?: AxiosRequestConfig["headers"];
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

export type ParentProps = { children?: ReactNode; };