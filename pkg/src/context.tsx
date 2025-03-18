import { GlobalOptions } from "./types";

import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";

type APIHookContextState = {
    accessToken: string | null;
    setAccessToken: (value: string | null) => void;
    globalOptions: GlobalOptions;
    setGlobalOptions: (value: GlobalOptions) => void;
};

const APIHookContext = createContext<APIHookContextState | undefined>(undefined);

export const APIHookContextProvider = ({ children }: { children?: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [globalOptions, setGlobalOptions] = useState<GlobalOptions>({});

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