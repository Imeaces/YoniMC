import { VanillaWorld, execCmd, dim } from "yoni/basis.js";
import Scoreboard from "yoni/scoreboard.js";
import { printError } from "yoni/util/console.js";
import { Entry, EntryType } from "yoni/scoreboard/Entry.js";

function print(...args){
    let text = "";
    args.forEach((a)=>{
        text += String(a) + " ";
    });
    execCmd(dim(0), "say "+text);
    console.warn(text);
}

/*
它会尽量保证Objective 与Entry的唯一性
但是不会保证ScoreInfo的唯一性（我认为这没有必要，增加了内存占用而且还没啥用）
*/
print("编写版本beta 1.19.40.23，用于展示Scoreboard的效果，同时也是为了找bug（在写测试脚本的时候就发现了不少问题，都修好了）");
print("建议在游戏中使用/reload查看效果，因为刚进游戏的时候没法读取玩家的属性");

let onePlayer = [...VanillaWorld.getPlayers()][0];

let obj = Scoreboard.getObjective("test", true);

print("从objective中getScore或者在getScoreInfo后读取score属性都可以获取分数");

let oneScoreInfo = obj.getScoreInfo(onePlayer);

obj.setScore(onePlayer, 2344);
print("set 2334: "+obj.getScore(onePlayer));

oneScoreInfo.score = 2001;
print(obj.getScore(onePlayer));
print("scoreInfo.score = 2001: "+oneScoreInfo.score);

obj.randomScore(onePlayer);
print("random * *: "+oneScoreInfo.score);

obj.addScore(onePlayer, 2333);
print("add 2333: "+oneScoreInfo.score);

obj.removeScore(onePlayer, -8651);
print("remove -8651: "+oneScoreInfo.score);

print("如果记分项被移除的时候会报错\n移除记分项test");

Scoreboard.removeObjective("test");

try {
    obj.removeScore(onePlayer, -8651);
    print("remove -8651: "+oneScoreInfo.score);
} catch(e) {
    printError("remove -8651 失败", e);
    print("remove -8651 失败");
    print("重新获取test记分项");
    obj = Scoreboard.addObjective("test");
}

print("再次移除记分项test");
//另一种移除的方法
Scoreboard.removeObjective(obj);

print("再次添加test");
obj = Scoreboard.addObjective("test");

print("设置虚拟玩家的分数");
obj.setScore("awa", 6666);

print("展示给你看看");
Scoreboard.setDisplaySlot("sidebar", obj);

print("最后列出所有人的分数给你看看");
let objects = Scoreboard.getObjectives();
Scoreboard.getEntries().forEach((e)=>{
    print(e.displayName+"的分数");
    objects.forEach((obj)=>{
        print(`${obj.displayName}(${obj.id}): ${obj.getScore(e)}`);
    });
    print("");
});


print("我觉得，最后给所有可以设置分数的家伙设置一个分数会更有趣");
print("在这里也可以探究一些特性");
print("比如，如果某个实体没有真正设置分数，它的显示名称会为undefined，也就是没有");

let count = 0;
let cit = dim(0).getEntities()[Symbol.iterator]();
let val = cit.next();
while (val.done === false){
    if (++count > 15){
        print("太多了点，就不继续了");
    }
    print(Entry.guessEntry(val.value).displayName);
    obj.setScore(val.value, 2976);
    print(Entry.guessEntry(val.value).displayName);
    val = cit.next();
}

print("还有一个特性");
try {
    obj.setScore(onePlayer.name, 42);
} catch(e) {
    printError("设置虚拟玩家分数的时候，如果世界内有同名玩家，会失败", e);
    print("设置虚拟玩家分数的时候，如果世界内有同名玩家，会失败");
}
print("或许查看日志会得到更多信息！");
print("也请帮我找找还有啥问题！");
print("嗯……关于显示记分项的部分除外");
print("毕竟我还没写完");

print("测试结束！");
