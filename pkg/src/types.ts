import { AxiosRequestConfig } from "axios";

/** The endpoint, which will be joined with the base URL to form the whole target address for the request. */
export type Endpoint =
    string |
    number |
    symbol;

/** A configuration scheme, which can be used between hooks.
 * @param schemeName The name of the scheme.
 * @param baseURL The root of the whole address when the request is sent. (e.x. https://example.com)
 * @param headers The headers which all the requests sent under this scheme will contain.
 * @param searchParams The search parameters which all the requests under this scheme's full addresses will contain.
 * @param processResponseBody A function which will process the response body before it is returned in the hook.
 * @param processRequestBody A function which will process the request body before it is sent to the target address.
 * @param getErrorFromResponseBody A function to dig out the designated error from the response body, when the request is unsuccessful.
*/
export type ConfigScheme = {
    schemeName: string;
    baseURL: string;
    headers?: AxiosRequestConfig["headers"];
    searchParams?: AxiosRequestConfig["params"];
    processResponseBody?: (body: any) => any;
    processRequestBody?: (body: any) => any;
    getErrorFromResponseBody?: (body: any) => string;
};

/** The configuration for the hook environment.
 * @param defaultConfigScheme The name of the configuration scheme which the hook will fall back to if no scheme is explicitly defined when initializing the hook.
 * @param configSchemes An array of configuration schemes. This must at least have one defined.
 */
export type Config = {
    defaultConfigScheme: string;
    configSchemes: [ConfigScheme, ...ConfigScheme[]];
};

/** The options for the hook, and how it should behave.
 * @param scheme The name of the configuration scheme the hook instance should use.
 * @param endpoint The endpoint of which the request shall be sent to.
 * @param searchParams The search parameters to be appended on the full address in addition to the ones defined in the target scheme (if any).
 * @param method The method of the request.
 * @param headers The headers of the request in addition to the ones defined in the target scheme (if any).
 * @param body The body of the request.
 * @param onResolve A function which executes when the request is successful.
 * @param onReject A function which executed when the request is unsuccessful.
 */
export type HookOptions<ResponseBody, RequestBody> = {
    scheme?: string;
    endpoint: Endpoint | (Endpoint | undefined | null)[];
    searchParams?: AxiosRequestConfig["params"];
    method?: Method;
    headers?: AxiosRequestConfig["headers"];
    body?: RequestBody;
    onResolve?: (body: ResponseBody) => any;
    onReject?: (error: string) => any;
};

/** Either an object matching the hook options, or a factory function returning the hook options. */
export type HookOptionsFactory<Params, ResponseBody, RequestBody> =
    ((params?: Params) => HookOptions<ResponseBody, RequestBody>) |
    HookOptions<ResponseBody, RequestBody>;

/** The method of the API/HTTP request. */
export type Method =
    "GET" |
    "PUT" |
    "POST" |
    "DELETE";