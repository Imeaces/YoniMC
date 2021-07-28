/**
 * 导入Minecraft模块下的Commands类与World类
 * Minecraft模块就是个接口对象，其中包含了很多接口子对象
 * 这里使用解构赋值获取到了其中的两个子对象：Commands与World
 */
import {Commands, World} from 'Minecraft';

// 用于在聊天栏输出信息
const log = function(msg) {
  /**
   * Commands.run函数可运行输入的指令
   * 由于官方暂未提供不依赖GameTest模块就可在游戏内输出信息的方法
   * 故这里使用say指令向聊天栏输出信息
   */
  Commands.run(`say ${msg}`);
};

// 自定义的回调函数
const onTick = function() {
  //输出Hello World信息
  log('Hello World');
};
/**
 * 订阅tick事件
 * 将onTick函数加入tick事件的回调队列中
 * 这里World.events是一个事件对象集合，其中囊括了目前已添加的所有可订阅事件
 * tick事件是其中一个，该事件会在游戏运行时以每秒20次的频率被调用
 * 想了解更多事件请查阅相关文档
 */
World.events.tick.subscribe(onTick);
