"use client";

import { useState } from "react";
import { ConfigScheme, HookOptionsFactory } from "./types";
import { useApiHookConfig } from "./context";

import axios from "axios";

export const useApi = <
    Params = undefined,
    ResponseBody = undefined,
    RequestBody = undefined
>(optionsFactory: HookOptionsFactory<Params, RequestBody>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ResponseBody | null>(null);

    const config = useApiHookConfig();

    const call = (params?: Params) => new Promise(async (
        resolve: (value: ResponseBody) => void,
        reject: (error: string) => void
    ) => {
        setLoading(true);

        const {
            scheme: targetScheme = config.defaultConfigScheme,
            endpoint,
            method = "GET",
            body
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

        try {
            const response = await axios({
                url: address.replace(/\/$/, ""),
                method,
                headers: scheme.headers,
                data: body
            });

            setData(response.data);
            resolve(response as ResponseBody);
        }
        catch (error: any) {
            console.log(error);
            reject(`${error}`);
        }
        finally {
            setLoading(false);
        }
    });

    return { loading, data, call };
};