"use client";

import { useState } from "react";
import { ConfigScheme, HookOptionsFactory } from "./types";
import { useApiHookConfig } from "./context";

import axios from "axios";

/** The actual API hook.
 * @param optionsFactory Either an object matching the hook options, or a factory function returning the hook options.
 */
export const useApi = <
    Params = undefined,
    ResponseBody = undefined,
    RequestBody = undefined
>(optionsFactory: HookOptionsFactory<Params, ResponseBody, RequestBody>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ResponseBody | null>(null);

    const config = useApiHookConfig();

    /** The function for sending the request to the designated destination.
     * @param params The optional parameters which can be used in the hook options to form fluid options.
    */
    const call = (params?: Params) => new Promise(async (
        resolve: (value: ResponseBody) => void,
        reject: (error: string) => void
    ) => {
        setLoading(true);

        const {
            scheme: targetScheme = config.defaultConfigScheme,
            endpoint,
            searchParams,
            method = "GET",
            headers,
            body,
            onResolve,
            onReject
        } =
            typeof optionsFactory === "function"
                ? optionsFactory(params)
                : optionsFactory;

        const scheme = config.configSchemes.find((cs: ConfigScheme) => cs.schemeName === targetScheme);

        if (!scheme) throw new Error(`Configuration scheme "${targetScheme}" does not exist!`);

        const address =
            endpoint instanceof Array
                ? [scheme.baseURL, ...endpoint].join("/")
                : [scheme.baseURL, endpoint].join("/");

        if (address.includes("?")) console.warn("Search parameters should not be in endpoint, but rather in `searchParams` field in `HookOptions`!");

        try {
            const response = await axios({
                url: address.replace(/\/$/, ""),
                method,
                params: { ...scheme.searchParams, ...searchParams },
                headers: { ...scheme.headers, ...headers },
                data: scheme.processRequestBody?.(body) ?? body
            });

            const processedResponseBody =
                scheme.processResponseBody?.(response.data) ??
                response.data;

            setData(processedResponseBody);
            onResolve?.(processedResponseBody);
            resolve(processedResponseBody as ResponseBody);
        }
        catch (error: any) {
            const processedError =
                scheme.getErrorFromResponseBody?.(error) ??
                "api-hook: Request responded with error!";

            onReject?.(processedError);
            reject(processedError);
        }
        finally {
            setLoading(false);
        }
    });

    return {
        loading,
        setLoading,
        data,
        setData,
        call
    };
};