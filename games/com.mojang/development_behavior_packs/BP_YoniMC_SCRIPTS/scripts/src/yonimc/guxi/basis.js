import { Scoreboard, FastScoreboard as Object } from "yoni-mcscripts-lib";
import { Minecraft } from "yoni-mcscripts-lib";
import { EntityBase } from "yoni-mcscripts-lib";
import { Events, EventListener, EventSignal } from "yoni-mcscripts-lib";

Object("species");
export const energyO = Object("guxi:energy");
export const energylO = Object("guxi:energy_pool");
export const valuesO = Object("guxi:values");

export const includeGuxiScoreOpt = (()=>{
    let rt = new Minecraft.EntityQueryScoreOptions();
    rt.objective = "species";
    rt.minScore = 2695;
    rt.maxScore = 2695;
    rt.exclude = false;
    return rt;
})();

export const excludeGuxiScoreOpt = (()=>{
    let rt = new Minecraft.EntityQueryScoreOptions();
    rt.objective = "species";
    rt.minScore = 2695;
    rt.maxScore = 2695;
    rt.exclude = true;
    return rt;
})();

export const includeGuxiEntityQueryOption = {
    scoreOptions: [ includeGuxiScoreOpt ],
    families: [ "yoni_guxi" ]
};

export class Fscb {
    static get(object, part){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).getScore(part);
    }
    static add(object, part, score){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).addScore(part, score);
    }
    static set(object, part, score){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).setScore(part, score);
    }
    static remove(object, part, score){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).removeScore(part, score);
    }
    static reset(object, part){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).resetScore(part);
    }
    static random(object, part, min, max){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).randomScore(part, min, max);
    }
}

export const valueList = {
    "guxi:energy": "能量堆",
    "guxi:energy_pool": "能量池",
    "guxi:energy_st": "堆上限",
    "guxi:energy_stpo": "池上限",
    "guxi:health_stat": "生命状态",
    
    "guxi:ef_speed": "速度",
    "guxi:ef_mining": "挖掘",
    "guxi:ef_damage": "伤害",
    "guxi:ef_res": "防御",
    "guxi:ef_fireimmu": "火抗",
    "guxi:auto_energy": "自动获得能量",
    "guxi:keep_res": "保持防御",
    "guxi:keep_ef": "保持状态",
    "guxi:like_player": "伪装玩家",
    "guxi:auto_player": "自行伪装玩家",
    "guxi:hotbar_ctrl": "热键控制",
    
    "guxi:cre_ely": "伪鞘翅"
    
};

export const setList = {
    "guxi:ef_speed": "速度",
    "guxi:ef_mining": "挖掘",
    "guxi:ef_damage": "伤害",
    "guxi:ef_res": "防御",
    "guxi:ef_fireimmu": "火抗",
    "guxi:auto_energy": "自动获得能量",
    "guxi:keep_res": "保持防御",
    "guxi:keep_ef": "保持状态",
    "guxi:like_player": "伪装玩家",
    "guxi:auto_player": "自行伪装玩家"
};

export const getGuxis = ()=>{
    
}
