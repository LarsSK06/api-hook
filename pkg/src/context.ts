import { createContext, createElement, ReactNode, useContext } from "react";
import { Config } from "./types";

const Context = createContext<Config | undefined>(undefined);

export const Provider = ({ config, children }: { config: Config; children?: ReactNode; }) =>
    createElement(Context.Provider, { value: config }, children);

const useApiHookConfig = () => {
    const context = useContext(Context);

    if (!context) throw new Error(`"useApiHookConfig"/"useApi" must be used within a <ApiHookProvider />!`);

    return context;
};

export default useApiHookConfig;