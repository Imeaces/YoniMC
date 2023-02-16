/**
 * 错误：值不能作为分数。
 */
export class ScoreRangeError extends RangeError {
    name = "ScoreRangeError";
    message = "Score must be an integer and must in range of [-2147483648, 2147483647].";
}

/**
 * 错误：记分项已从记分板上移除。
 */
export class ObjectiveUnregisteredError extends Error {
    name = "ObjectiveUnregisteredError";
    constructor(name: string){
        super(`Objective ${name} has been unregistered.`);
    }
}

/**
 * 错误：虚拟玩家名称与游戏中正在游玩的玩家拥有相同的名字，无法为虚拟玩家设置分数。
 */
export class NameConflictError extends Error {
    name = "NameConflictError";
    constructor(name: string){
        super(`Could not set score because there are name conflict! More than one ${name}`);
    }
}

/**
 * 错误：无法从可能的记分持有者的值得到记分持有者对象。
 */
export class UnknownEntryError extends ReferenceError {
    name = "UnknownEntryError";
    message = "Unknown scoreboard entry.";
}
