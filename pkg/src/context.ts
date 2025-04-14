"use client";

import { createContext, createElement, ReactNode, useContext } from "react";
import { Config } from "./types";

const Context = createContext<Config | undefined>(undefined);

/** The provider of the hook configuration context. */
export const Provider = ({ config, children }: { config: Config; children?: ReactNode; }) =>
    createElement(Context.Provider, { value: config }, children);

/** A function fetching the configuration given through the context. */
export const useApiHookConfig = () => {
    const context = useContext(Context);

    if (!context) throw new Error(`"useApiHookConfig"/"useApi" must be used within a <ApiHookProvider />!`);

    return context;
};