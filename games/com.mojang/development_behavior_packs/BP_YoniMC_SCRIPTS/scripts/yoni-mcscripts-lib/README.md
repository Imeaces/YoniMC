# yoni-mcscripts-lib

基本上是对原有API的一些 wrapper，除此之外还提供了一些便捷的小工具。

当前支持的游戏版本为 正式版**1.19.80**。

## 使用

为了能在您的脚本中从 'yoni-mcscripts-lib' 中导入内容，你需要将编译后的文件手动复制到你的脚本目录中。

暂时未能支持 Webpack 打包，因为其中有一些东西并不是直接使用 import 语句导入的，所以并不能正确的被识别到。

## 进度

已经完成对方块和实体对象的包装。

尝试由 JSDoc 生成文档中（尚未开始）。

正在转到 Typescript，目前将近一半的代码已经使用 Typescript 编写。

尝试支持 Webpack 打包（尚未开始）。

个人水平不足，基本上这只是给我自己用的。但是在有补全的情况下，你或许可以根据命名来猜测用法。我会尽快添加更多文档的。

## 示例

一段简单的示例代码

```js
// 实际上类似于这样，并且还要求文件的位置位于 scripts/ 目录下。
//import { Scoreboard, Utils, YoniScheduler } from "yoni/index.js";
import { Scoreboard, Utils, YoniScheduler } from "yoni-mcscripts-lib";

// 部分函数为异步函数，故需要在异步函数内用 await 调用
// 简单示范了 Scoreboard 的用法，这个类是对原版的记分板
// 访问 API 的重新封装，并添加了一些没有的方法。
YoniScheduler.runTask(async function (){

  const objective0 = Scoreboard.getObjective("objective_0")
    ?? Scoreboard.addObjective("objective_0");

  // 或者可以这样，传入第二个参数 true，表示在记分项不存在的时候
  // 使用 dummy 准则创建同名记分项。
  const objective1 = Scoreboard.getObjective("objective_1", true);

  const onePlayer = World.getPlayers()[0];

  if (onePlayer == null){
    Utils.say("怎么就一个玩家都没有的？");
    return;
  }

  await objective0.postSetScore(onePlayer, -3987);

  Utils.say(`玩家 ${onePlayer.name} 在 ${objective0.displayName} 上的分数为 ${objective0.getScore(onePlayer)}`); //分数为 -3987

  Utils.say("现在重置他的分数");

  await objective0.postResetScore(onePlayer);

  Utils.say(`玩家 ${onePlayer.name} 在 ${objective0.displayName} 上的分数为 ${objective0.getScore(onePlayer)}`); //分数为 undefined

}, true);

```

## 引用

目前尚无除了 @minecraft 之外的引用。

## Page Views

我也不知道加这个是干嘛

[![Page Views Count](https://badges.toozhao.com/badges/01H306S1JD8VWVQ03QW1EYPR0E/orange.svg)](https://badges.toozhao.com/stats/01H306S1JD8VWVQ03QW1EYPR0E "Get your own page views count badge on badges.toozhao.com")
