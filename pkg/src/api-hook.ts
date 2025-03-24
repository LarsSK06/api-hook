import { useState } from "react";
import { GlobalOptions, HookOptionsFactory, HookReturn, HttpMethod, RequestRoot, ResponseRoot } from "./types";
import axios from "axios";

class ApiHook {

    _options: GlobalOptions | null = null;

    useApi<
        Params = undefined,
        Response extends ResponseRoot = undefined,
        Request extends RequestRoot = undefined
    >(optionsFactory: HookOptionsFactory<Params, Response, Request>) {
        if (!this._options) throw new Error("Unconfigurated!");

        const [loading, setLoading] = useState<boolean>(false);
        const [data, setData] = useState<Response | null>(null);

        const call = async (params?: Params) => {
            return new Promise<Response | null>(async (resolve, reject) => {
                setLoading(true);

                const {
                    endpoint = "/",
                    method = HttpMethod.GET,
                    body,
                    onSuccess,
                    onError
                } = typeof optionsFactory === "function" ? await optionsFactory(params) : optionsFactory;
    
                const address =
                    endpoint instanceof Array
                        ? [this._options!.baseUrl, ...endpoint].join("/")
                        : [this._options!.baseUrl, endpoint].join("/");

                try {
                    const response = await axios({
                        url: address,
                        method,
                        data: body
                    });

                    const responseData =
                        this._options!.handleResponse?.(response.data) ??
                        response.data ??
                        null;

                    setData(responseData);
                    onSuccess?.(responseData);
                    resolve(responseData);
                }
                catch (error: any) {
                    const responseError =
                        this._options!.handleError?.(error) ??
                        error.message ??
                        "Unknown error";

                    onError?.(responseError);
                    reject(responseError);
                }
                finally {
                    setLoading(false);
                }
            });
        };

        return { loading, data, call } satisfies HookReturn<Params, Response> as HookReturn<Params, Response>;
    }

    config(options: GlobalOptions) {
        this._options = options;
    }

    static createInstance() {
        return new ApiHook();
    }

}

const instance = new ApiHook();

export default instance;