export const Logger = {
    error: (message, ...optionalParams: any[]) => {
        console.error(message, ...optionalParams);
    },
    log: (message, ...optionalParams: any[]) => {
        console.log(message, ...optionalParams);
    },
    warn: (message, ...optionalParams: any[]) => {
        console.warn(message, ...optionalParams);
    },

    // For the debug logs, please do not send them to the server.
    debug: (message, ...optionalParams: any[]) => {
        console.log(`[debug] ${message}`, ...optionalParams);
    },
};
