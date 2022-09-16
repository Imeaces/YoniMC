#scoreboard

注意，当增删记分板分数时，超出原版分数限制的数字与原版的结果有所不同，目前暂时无法解决，由于gametest中数字被限制在-2^31~2^31-1之间

`<scoreboard.js>`中包含了独立的scoreboard模块，只需要按照这样的方法使用
```js
import Scoreboard from "scripts/yoni/scoreboard/scoreboard.js";

let gameObjective = Scoreboard.getObjective("gameScore", true);
gameObjective.setScore("target", 233);
```

其他的则需要依赖其他模块运行

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

//尝试获取记分项obj，如果不存在这个记分项，自动创建dummy准则的记分项
let obj1 = Scoreboard.getObjective("obj", true);

//正在编写中
```