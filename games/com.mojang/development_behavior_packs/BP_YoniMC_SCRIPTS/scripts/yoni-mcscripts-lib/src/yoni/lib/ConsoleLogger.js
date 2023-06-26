
export default class ConsoleLogger {
    static print = globalThis.print;
    static log = globalThis.console.log?.bind(globalThis.console);
    static trace = globalThis.console.trace?.bind(globalThis.console);
    static debug = globalThis.console.debug?.bind(globalThis.console);
    static info = globalThis.console.info?.bind(globalThis.console);
    static warn = globalThis.console.warn?.bind(globalThis.console);
    static error = globalThis.console.error?.bind(globalThis.console);
    static fatal = globalThis.console.fatal?.bind(globalThis.console);
}
