"use client";

import { createContext, createElement, useContext } from "react";
import { Config, ParentProps } from "./types";

const Context = createContext<Config | undefined>(undefined);

export const Provider = ({ config, children }: { config: Config; } & ParentProps) =>
    createElement(Context.Provider, { value: config }, children);

export const useApiHookConfig = () => {
    const context = useContext(Context);

    if (!context) throw new Error(`"useApiHookConfig"/"useApi" must be used within a <ApiHookProvider />!`);

    return context;
};