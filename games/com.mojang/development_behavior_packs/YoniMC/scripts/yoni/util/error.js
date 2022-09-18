export class Console {
    errorLog(e){
        if (e !== undefined && e.stack !== undefined && e.name !== undefined){
            console.error(`${e.name}: ${e.message}\n${e.stack}`);
        } else {
            console.error(`Error: ${JSON.stringify(e)}`);
        }
    }
}