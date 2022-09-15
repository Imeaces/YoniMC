export class ScoreRangeError extends Error {
    name = "ScoreRangeError";
    constructor(){
        super();
        this.message = "Score can only range -2147483648 to 2147483647";
    }
}
export class ObjectiveUnregisteredError extends Error {
    name = "ObjectiveUnregisteredError";
    constructor(name){
        super();
        this.message = `Objective ${name} has been unregistered.`
    }
}

export class NameConflictError extends Error {
    name = "NameConflictError";
    constructor(name){
        super();
        this.message = `Could not set score because there are name conflict! More than one ${name}`;
    }
}
