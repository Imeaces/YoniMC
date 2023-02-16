import { say } from "./util/utils.js";
import { printError } from "./util/console.js";
import { VanillaWorld, dim } from "./basis.js";
//import { Entry, EntryType, Scoreboard } from "./scoreboard.js";
import { Entry, EntryType, Scoreboard } from "./scoreboard_only.js";

async function print(msg){
    await say(msg);
    console.warn(msg);
}

(async function () {
    /*
    它会尽量保证Objective 与Entry的唯一性
    但是不会保证ScoreInfo的唯一性（我认为这没有必要，增加了内存占用而且还没啥用）
    */
    await print("编写版本beta 1.19.40.23，用于展示Scoreboard的效果，同时也是为了找bug（在写测试脚本的时候就发现了不少问题，都修好了）");
    await print("在版本beta 1.19.50.23的时候进行了修改，用于展示Scoreboard的效果，也还是为了找bug");
    await print("这次我把设置显示位置的函数弄好了");
    await print("建议在游戏中使用/reload查看效果，因为刚进游戏的时候没法读取玩家的属性，所以会导致无法修改玩家的分数");

    let onePlayer = [...VanillaWorld.getPlayers()][0];
     
    let obj = Scoreboard.getObjective("test", true);

    await print("从objective中getScore或者在getScoreInfo后读取score属性都可以获取分数");

    let oneScoreInfo = obj.getScoreInfo(onePlayer);

    await obj.setScore(onePlayer, 2344);
    await print("set 2334: " + obj.getScore(onePlayer));
    obj.getScoreInfos()
    oneScoreInfo.score = 2001;
    await print(obj.getScore(onePlayer));
    await print("scoreInfo.score = 2001: " + oneScoreInfo.score);

    await obj.randomScore(onePlayer, -2147483648, 2147483647, true);
    await print("random * *: " + oneScoreInfo.score);

    await obj.addScore(onePlayer, 2333);
    await print("add 2333: " + oneScoreInfo.score);

    await obj.removeScore(onePlayer, -8651);
    await print("remove -8651: " + oneScoreInfo.score);

    await print("如果记分项被移除的时候会报错\n所以现在我们移除记分项test\n然后再试着给玩家减少分数");

    Scoreboard.removeObjective("test");

    try {
        await obj.removeScore(onePlayer, -8651);
        await print("remove -8651: " + oneScoreInfo.score);
    } catch (e) {
        await printError("remove -8651 失败", e);
        await print("remove -8651 失败");
        await print("重新获取test记分项");
        obj = Scoreboard.addObjective("test");
    }

    await print("再次移除记分项test");
    //另一种移除的方法
    Scoreboard.removeObjective(obj);

    await print("再次添加test");
    obj = Scoreboard.addObjective("test");

    await print("设置虚拟玩家“awa”的分数");
    obj.setScore("awa", 6666);
    await print("设置虚拟玩家“866test”的分数，这个有点特别，但是还是可以正常设置");
    obj.setScore("866test", 688);

    await print("展示给你看看");
    Scoreboard.setDisplayAtSlot("sidebar", {objective: obj});

    await print("最后列出3个人的分数给你看看，具体是哪三个我也不清楚，可能也没有三个");
    let count = 1;
    let objects = Scoreboard.getObjectives();
    for (let e of Scoreboard.getEntries()) {
        if (count ++ > 3) break;
        await print(e.displayName + "的分数");
        for (let obj of objects){
            await print(`${obj.displayName}(${obj.id}): ${obj.getScore(e)}`);
        }
        await print("");
    }


    await print("我觉得，最后给所有可以设置分数的家伙设置一个分数会更有趣");
    await print("在这里也可以探究一些特性");
    await print("比如，如果某个实体没有真正设置分数，它的显示名称会为undefined，也就是没有");
    await print("但是由于我好像改了，所以上边的那句话可能是错的");
    await print("建议自己看代码怎么实现的");

    await print("还有一个特性");
    try {
        await obj.setScore(onePlayer.name, 42);
    } catch (e) {
        await printError("设置虚拟玩家分数的时候，如果世界内有同名玩家，会失败", e);
        await print("设置虚拟玩家分数的时候，如果世界内有同名玩家，会失败");
    }
    await print("或许查看日志会得到更多信息！");
    await print("也请帮我找找还有啥问题！");

    await print("测试结束！");

})()
.catch(async (e)=>{
    await print("运行代码时出现未知的问题，如果您是通过/reload进行的测试，那么这可能是一个bug，您可以将详细信息告知我，我会尽可能的修复。否则可能是由于玩家尚未进入游戏导致无法进行测试，在加载完毕后使用/reload来查看测试即可。如果您是在1.19.60.25中进行的测试，此版本无法正常使用/reload，故无法进行测试。");
    printError(e);
});
