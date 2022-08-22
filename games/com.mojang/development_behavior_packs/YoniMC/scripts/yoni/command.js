import { dim } from "scripts/yoni/basis.js";
import { MinecraftMeta } from "scripts/yoni/minecraft.js";

//need more ideas

export class TargetSelector {
    #selector;
    #arguments = [];
    constructor(selector){
        switch(selector){
            case "@c":
            case "@v":
                if (!MinecraftMeta.isEducationEdition()){
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

export default class Command {
    #command;
    constructor(command){
        if (Command.runCommand("help "+command).statusCode != 0)
            throw new SyntaxError("Unknown command: "+command);
        this.#command = command;
    }
    
    static run(cmd){
        return Command.execute(dim(0), command);
    }
    static execute(runner, command){
        try {
            return runner.runCommand(command);
        } catch(errorJSON){
            return JSON.parse(errorJSON);
        }
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
