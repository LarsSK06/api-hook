import { useState } from "react";
import { Config, ConfigScheme, HookOptionsFactory } from "./types";

import useApiHookConfig from "./context";
import axios from "axios";

const useApi = <
    Params extends any,
    ResponseBody extends any,
    RequestBody extends any
>(optionsFactory: HookOptionsFactory<Params, RequestBody>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ResponseBody | null>(null);

    const config = useApiHookConfig();

    const call = (params?: Params) => new Promise((
        resolve: (value: ResponseBody) => void,
        reject: () => void
    ) => {
        setLoading(true);

        const {
            scheme: targetScheme,
            endpoint,
            method = "GET",
            body
        } =
            typeof optionsFactory === "function"
                ? optionsFactory(params)
                : optionsFactory;

        const targetSchemeName = targetScheme ?? config.defaultConfigScheme;

        const scheme = config.configSchemes.find((cs: ConfigScheme) => cs.schemeName === targetSchemeName);

        if (!scheme) throw new Error(`Configuration scheme "${targetSchemeName}" does not exist!`);

        const address =
            endpoint instanceof Array
                ? [scheme.baseURL, ...endpoint].join("/")
                : [scheme.baseURL, endpoint].join("/");

        const response = await axios({
            url: address,
            method,
            data: body
        });
    });


    const scheme = config.configSchemes.find((cs: ConfigScheme) => cs.schemeName === ())
};

export default useApi;