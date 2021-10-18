/**    QuickUI     --       RGB39
 * 
 *       license: GPL-2.0
 * 
 *      通过title actionbar 实现的简易UI构建器
 */
/**
 * 传入Minecraft.Commands模组进行初始化
 * @param {*} Commands 
 * @returns 
 */
export default function(Commands) {

const FORMATTINGS = {
    Red: "§c",
    DarkRed: "§4",
    Yellow: "§e",
    Gold: "§6",
    Orange: "§6",
    MineCoinGold: "§g",
    Green: "§a",
    DarkGreen: "§2",
    Blue: "§9",
    DarkBlue: "§1",
    Aqua: "§b",
    DarkAqua: "§3",
    Cyan: "§3",
    LightPurple: "§d",
    Pink: "§d",
    DarkPurple: "§5",
    Purple: "§5",
    White: "§f",
    Gray: "§7",
    DarkGray: "§8",
    Grey: "§8",
    Black: "§0",
    Reset: "§r",
    Obfuscated: "§k",
    RandomText: "§k",
    Garbled: "§k",
    Bold: "§l",
    Italic: "§o",
};

var _state = {};

function createState(state) {
    for (const key in state) {
        _state[key] = state[key];
    }
}

function setState(state) {
    for (const key in state) {
        if (_state[key] == state[key]) continue;
        _state[key] = state[key];
    }
    buildUI();
}

function buildUI() {
    if (_component) return show(compile());
}

var selector = '@a[tag=debug]';

function show(msg) {
    Commands.run(`titleraw ${selector} actionbar {"rawtext": [{"text": "${msg}"}]}`);
    //console.log(msg);
}

function setSelector(string) {
    selector = string;
}

var _component = null;

function showUI(component) {
 _component = component;
    buildUI();
}

function blankStr(count) {
    return new Array(count).fill(' ').join('');
}

const compilers = {
    text(component) {
        let {args, content} = component;
        if (args) {
            args = args.reduce((pre, cur) => {
                return [...pre, FORMATTINGS[cur] || FORMATTINGS.White];
            }, '');
            content.unshift(args);
            content.push(FORMATTINGS.Reset);
        }
        content = content.join('');
        const regExp = /(\[\[(.+?)\]\])/;
        while (regExp.test(content)) {
            const [raw, $1, $2] = regExp.exec(content);
            content = content.replace($1, _state[$2]);
        }
        const reg2 = /(\{\{(.+?)\}\})/;
        while (reg2.test(content)) {
            const [raw, $1, $2] = reg2.exec(content);
            const [info, fill, remain] = $2.split(',');
            const [past, all] = info.split('/');
            content = content.replace($1, `${new Array(+past).fill(fill).join('')}${new Array(all - past).fill(remain).join('')}`);
        }
        return content;
    },

    center(component) {
        let {args, content} = component;
        let width = args? args[0]: 0;
        content = content.reduce((pre,cur) => {
            let _class = cur.class;
            if (!compilers[_class]) return;
            let res = compilers[_class](cur);
            width = res.length > width? res.length: width;
            return [...pre, res];
        }, []);
        content.forEach((str, i, arr) => {
            const blankSize = Math.floor((width - str.length)/2);
            arr[i] = blankStr(blankSize) + str + blankStr(blankSize);
        });
        return content.join('');
    }
}

function compile() {
    let component = _component();
    let _class = component.class;
    if (!compilers[_class]) return;
    return compilers[_class](component);
}

const Components = (function() {
    function Components() {}
    Components.prototype = {}

    Components.Text = function Text(text, ...args) {
        return {
            type: 'text',
            args: [...args],
            content: [text]
        }
    }

    return Components;
})();


return {
    createState, setSelector, setState, showUI, Components,
}


}