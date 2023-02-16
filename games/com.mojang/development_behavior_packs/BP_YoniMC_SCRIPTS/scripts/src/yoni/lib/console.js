export function consoleFormat(object, depth=0){
    if (depth > 10)
    if (object instanceof Error){
        let { stack, name, message } = Error;
        if ("cause" in object){
            return `${name}: ${message}\n${stack}\ncause by: ${consoleFormat(object.cause, depth+1)}`;
        } else {
            return `${name}: ${message}\n${stack}`;
        }
    }
}
