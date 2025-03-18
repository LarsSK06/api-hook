import { useAPIHookContext } from "./context";
import { GlobalOptions } from "./types";

export const config = (options: GlobalOptions) => {
    const { setGlobalOptions } = useAPIHookContext();

    setGlobalOptions(options);
};

export * from "./context";
export * from "./types";
export * from "./hook";