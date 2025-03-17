import * as context from "./context";
import * as hook from "./hook";
import * as types from "./types";

export const config = (options: types.GlobalOptions) => {
    const { setGlobalOptions } = context.useAPIHookContext();

    setGlobalOptions(options);
};

export default {
    ...context,
    ...hook,
    ...types
};