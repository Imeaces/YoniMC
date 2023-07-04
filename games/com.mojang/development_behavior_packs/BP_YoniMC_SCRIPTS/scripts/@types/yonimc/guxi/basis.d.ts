export const energyO: any;
export const energylO: any;
export const valuesO: any;
export const includeGuxiScoreOpt: any;
export const excludeGuxiScoreOpt: any;
export namespace includeGuxiEntityQueryOption {
    const scoreOptions: any[];
    const families: string[];
}
export class Fscb {
    static get(object: any, part: any): number | undefined;
    static add(object: any, part: any, score: any): void;
    static set(object: any, part: any, score: any): void;
    static remove(object: any, part: any, score: any): void;
    static reset(object: any, part: any): Promise<void>;
    static random(object: any, part: any, min: any, max: any): Promise<number | void>;
}
export const valueList: {
    "guxi:energy": string;
    "guxi:energy_pool": string;
    "guxi:energy_st": string;
    "guxi:energy_stpo": string;
    "guxi:health_stat": string;
    "guxi:ef_speed": string;
    "guxi:ef_mining": string;
    "guxi:ef_damage": string;
    "guxi:ef_res": string;
    "guxi:ef_fireimmu": string;
    "guxi:auto_energy": string;
    "guxi:keep_res": string;
    "guxi:keep_ef": string;
    "guxi:like_player": string;
    "guxi:auto_player": string;
    "guxi:hotbar_ctrl": string;
    "guxi:cre_ely": string;
};
export const setList: {
    "guxi:ef_speed": string;
    "guxi:ef_mining": string;
    "guxi:ef_damage": string;
    "guxi:ef_res": string;
    "guxi:ef_fireimmu": string;
    "guxi:auto_energy": string;
    "guxi:keep_res": string;
    "guxi:keep_ef": string;
    "guxi:like_player": string;
    "guxi:auto_player": string;
};
export function getGuxis(): void;
