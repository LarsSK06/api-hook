import { useState } from "react";
import { useAPIHookContext } from "./context";
import { HTTPMethod, Options, RequestRoot, ResponseRoot } from "./types";

import axios from "axios";

export const useAPI = <
    Params,
    Response extends ResponseRoot,
    Request extends RequestRoot
>(optionsFactory: Options<Response, Request> | ((params?: Params) => Options<Response, Request>)) => {
    const { accessToken, globalOptions: { baseURL, getError, processor } } = useAPIHookContext();

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
                ? [baseURL ?? ".", ...endpoint].join("/")
                : [baseURL ?? ".", endpoint].join("/");

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

            const payload =
                processor?.(response.data) ??
                response.data;

            onSuccess?.(payload);
            setData(payload);
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