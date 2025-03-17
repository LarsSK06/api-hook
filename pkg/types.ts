import { AxiosHeaders } from "axios";

export type GlobalOptions = {
    baseURL?: string;
    getError?: (error: any) => string;
    processor?: (value: any) => any;
};

export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

export type EndpointString =
    undefined |
    string |
    number |
    symbol |
    null;

export type Options<Response, Request> = {
    endpoint?: EndpointString | EndpointString[];
    searchParams?: { [key: string]: EndpointString };
    method?: HTTPMethod;
    headers?: AxiosHeaders;
    body?: Request;
    onSuccess?: (value: Response) => void;
    onError?: (error: string) => void;
};

export type ResponseRoot =
    undefined |
    string |
    number |
    Blob |
    null |
    {} |
    [];

export type RequestRoot =
    undefined |
    FormData |
    string |
    number |
    null |
    {} |
    [];