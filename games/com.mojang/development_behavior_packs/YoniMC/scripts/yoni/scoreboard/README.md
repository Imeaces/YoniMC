# scoreboard

相比文档，我建议你直接装载这个行为包进游戏看看，并查看test.js的内容（其实是我懒得写）

## 未完成的文档
注意：版本为1.19.40

注意，当增删记分板分数时，超出原版分数限制的数字与原版的结果有所不同，目前暂时无法解决（除非我愿意用指令增删），由于gametest中数字被限制在-2^31~2^31-1之间

`<scripts/yoni/scoreboard.js>`中导出了所有的scoreboard模块，只需要按照这样的方法使用
```js
import Scoreboard from "scripts/yoni/scoreboard/scoreboard.js";

//如果指定了第二个参数，且为true，将会在获取的记分项不存在时自动创建一个
let gameObjective = Scoreboard.getObjective("gameScore", true );

//传进去的string会被认为是虚拟玩家
//如果传的是玩家，自然是设置玩家的了
//如果无法按照预先的那样设置分数还会报错
gameObjective.setScore("target", 233);
```

其他的则需要依赖其他模块运行

目前确认没有bug的只有与分数加减有关的操作

设置记分项的显示位置，以及各种getAll操作尚未进行测试

## 更多示例

```js
//在使用之前，先导入所有的东西
import {
    SimpleScoreboard as Scoreboard,
    Objective,
    Entry,
    EntryType,
    ScoreInfo,
    ScoreRangeError,
    NameConflictError,
    ObjectiveUnregisteredError,
    DisplaySlotType } from "scripts/yoni/scoreboard/scoreboard.js";

//尝试获取记分项obj，如果不存在这个记分项，自动创建dummy准则（好像也只有这一个，历史遗留问题）的记分项
let obj1 = Scoreboard.getObjective("obj", true);

//正在编写中
```
