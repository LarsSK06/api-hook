import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";

type AccessToken = string | null;

type GlobalOptions = {
    baseURL: string;
    getError?: (error: any) => string;
};

type APIHookContextState = {
    accessToken: AccessToken;
    setAccessToken: (value: AccessToken) => void;
    globalOptions: GlobalOptions;
    setGlobalOptions: (value: GlobalOptions) => void;
};

const APIHookContext = createContext<APIHookContextState | undefined>(undefined);

export const APIHookContextProvider = ({ children }: { children?: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<AccessToken>(null);
    const [globalOptions, setGlobalOptions] = useState<GlobalOptions>({ baseURL: "/" });

    const state = useMemo<APIHookContextState>(() => ({
        accessToken,
        setAccessToken,
        globalOptions,
        setGlobalOptions
    }), [accessToken, globalOptions]);

    return (
        <APIHookContext.Provider value={state}>
            {children}
        </APIHookContext.Provider>
    );
};

export const useAPIHookContext = () => {
    const context = useContext(APIHookContext);

    if (!context) throw new Error("Wrap project in `APIHookContextProvider`!");

    return context;
};