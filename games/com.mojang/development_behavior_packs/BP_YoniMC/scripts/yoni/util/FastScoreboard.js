import Scoreboard from "yoni/scoreboard/SimpleScoreboard.js";

/**
 * 方便调用的，不完整的记分板操作类
 * 获取一个记分项（不存在的话会自动创建)
 * let obj = FastScoreboard["记分项ID"]
 * 或者
 * let obk2 = FastScoreboard("记分项ID_2")
 * 然后，除了常规的方法，你还可以通过特殊方法获得虚拟玩家的分数
 *
 * let score = obj.getScore(entity);
 * let dummyPlayerScore = obj["aDummyPlayer"];
 * 
 * 同时，也可以设置分数
 * obj2.setScore("shouldKillWarden", 1);
 * obj2["shouldKillWarden"] = 20;
 * console.error(obj2.getScore("shouldKillWarden") // 20
 *
 * 可以通过+号执行增加分数
 * obj["playerOnline"] = "0";
 * obj["playerOnline"] = "+3";
 * obj["playerOnline"] = "+-2";
 * console.error(obj["playerOnline"]); //1
 */
 
function scbObj(id){
    return Scoreboard.getObjective(id, true);
}
function getObjective(id){
    return new Proxy({}, {
        get: (_, prop)=>{
            let obj = scbObj(id);
            if (prop in obj){
                if (typeof Object.getOwnPropertyDescriptor(obj, prop).value === "function")
                    return (...args)=>{
                        obj[prop].apply(obj, arguments);
                    };
                else
                    return obj[prop];
            }
            return obj.getScore(prop);
        },
        set: (object, prop, score)=>{
            let obj = scbObj(id);
            if (String(score).startsWith("+"))
                obj.addScore(prop, Number(String(score).substring(1)));
            else
                obj.setScore(prop, Number(score));
            return true;
        }
    });
}

export const FastScoreboard = new Proxy((object)=>{
    return getObjective(object);
}, {
    get(_, object){
        return getObjective(object);
    }
});

export default FastScoreboard;
