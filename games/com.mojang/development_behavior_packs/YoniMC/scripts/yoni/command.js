import { dim } from "yoni/basis.js";

export default class Command {
    
    static async asyncRun(cmd){
        return await asyncExecute(dim(0), cmd);
    }
    
    static async asyncExecute(runner, command){
        return await runner.runCommandAsync(command);
    }
    
    static run(cmd){
        return Command.execute(dim(0), cmd);
    }
    static execute(runner, command){
        let result;
        try {
            result = runner.runCommand(command);
        } catch(errorJSON){
            result = JSON.parse(errorJSON);
        }
        Object.defineProperty(result, "next", {
            value: (nextCmd)=>{
                return Command.execute(runner, nextCmd);
            }
        });
        return result;
    }
}

export { Command };

/*

function isEducationEdition(){
    return false;
}

//need more ideas

export class TargetSelector {
    #selector;
    #arguments = [];
    constructor(selector){
        switch(selector){
            case "@c":
            case "@v":
                if (!isEducationEdition()){
                    throw new Error(); 
                }
            case "@s":
            case "@p":
            case "@r":
            case "@a":
                this.#selector = selector;
                break;
            default:
                throw new SyntaxError("Unknown TargetSelector: "+selector);
        }
    }
    addArgument(cond, arg){
        switch(condition){
            case "name":
                this.#arguments.push({
                    condition: cond,
                    argument: arg
                });
                break;
            default:
                this.arguments.push({
                    condition: cond,
                    argument: arg
                });
        }
        return this;
    }
}


export { Command }

function resolveTargetSelectors(...selectors){
    let selectedEntities = [];
    selectors.forEach((selector) => {
        resolveTargetSelector(selector).forEach((entity) => {
            if (selectedEntities.indexOf(entity) == -1)
                selectedEntities.push(entity);
        });
    });
}

function resolveTargetSelector(selector){
    let selectedEntities = [];

    try {
        let tag = String(Math.random());
        Command.run(`tag ${selector} add "${tag}"`);
        getLoadedEntities().forEach((entity) => {
            if (entity.hasTag(tag))
                selectedEntities.push(entity);
        });
        Command.run(`tag ${selector} remove "${tag}"`);

    } catch {
        selectedEntities = [];
    }

    return selectedEntities;
}
*/