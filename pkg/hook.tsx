import { useState } from "react";
import { useAPIHookContext } from "./context";

import axios, { AxiosHeaders } from "axios";

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

export const useAPI = <
    Params,
    Response extends ResponseRoot,
    Request extends RequestRoot
>(optionsFactory: Options<Response, Request> | ((params?: Params) => Options<Response, Request>)) => {
    const { accessToken, globalOptions: { baseURL, getError } } = useAPIHookContext();

    const [data, setData] = useState<Response | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const call = async (params?: Params) => {
        setLoading(true);

        const {
            endpoint,
            searchParams = {},
            method = HTTPMethod.GET,
            headers = {},
            body,
            onSuccess,
            onError
        } = typeof optionsFactory === "function"
            ? optionsFactory(params)
            : optionsFactory;

        const finalEndpoint =
            endpoint instanceof Array
                ? [baseURL, ...endpoint].join("/")
                : [baseURL, endpoint].join("/");

        const finalHeaders =
            accessToken
                ? { ...headers, authorization: `Bearer ${accessToken}` }
                : headers;

        try {
            const response = await axios(finalEndpoint, {
                headers: finalHeaders,
                params: searchParams,
                data: body,
                method
            });

            onSuccess?.(response.data);
            setData(response.data);
        }
        catch (error: any) {
            onError?.(
                getError?.(error) ??
                error.code ??
                "Error"
            );
        }
        finally {
            setLoading(false);
        }
    };

    return { data, loading, call };
};