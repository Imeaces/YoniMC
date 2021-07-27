---
# DO NOT TOUCH — This file was automatically generated. See https://github.com/Mojang/MinecraftScriptingApiDocsGenerator to modify descriptions, examples, etc.
author: jakeshirley
ms.author: jashir
ms.prod: gaming
title: Minecraft.Container Class
description: Contents of the Minecraft.Container class.
---
# 容器 类
::: warning 注意
这些接口是Plugin系统的一部分，目前属于实验性内容。与其他的实验性内容相同，在Minecraft的版本更新过程中，这些内容可能会发生一些功能性的变化。请自行关注Minecraft的更新日志以获取最新的接口更新。
:::
代表一个有物品集合的容器. 与玩家, 箱子, 矿车 , Llamas和更多实体一起使用

## 属性
### **size** - `number`
代表这个容器的大小. 例如, 一个标准单方块箱子的有27大小, 物品栏里的27格


### **emptySlotsCount** - `number`
物品栏内存在空格子的数量



## 方法
- [setItem](#setitem)
- [getItem](#getitem)
- [addItem](#additem)
- [transferItem](#transferitem)
- [swapItems](#swapitems)
  
### **setItem**
`
setItem(slot: number, itemStack: ItemStack): void
`

设置特别格子内的物品
#### 实参
| 参数 | 类型 | 描述 |
| :--- | :--- | :---: |
| **slot** | *number* | 从0开始计数的设置物品的索引 |
| **itemStack** | [*ItemStack*](ItemStack.md) | 在指定格子内放置的物品 |


::: warning 注意
此函数可抛出错误
:::

### **getItem**
`
getItem(slot: number): ItemStack
`

在物品集合的指定格子获取对应的物品. 如果格子是空的, 返回 undefined. 这个方法不会改变或清除指定格子内的内容
#### 实参
| 参数 | 类型 | 描述 |
| :--- | :--- | :---: |
| **slot** | *number* | 从零开始计数的检索物品的索引|

返回 [*ItemStack*](ItemStack.md)

::: warning 注意
此函数可抛出错误
:::

#### 示例
##### ***getItem.js***
```javascript
const itemStack = rightChestContainer.getItem(0);
test.assert(itemStack.id === "apple", "Expected apple");
test.assert(itemStack.amount === 10, "Expected 10 apples");

```
### **addItem**
`
addItem(itemStack: ItemStack): void
`

添加一个物品到指定的容器 物品会被放置在首个可用的空格子
(使用 .setItem 如果你想设置物品到一个特别的格子)
#### 实参
| 参数 | 类型 | 描述 |
| :--- | :--- | :---: |
| **itemStack** | [*ItemStack*](ItemStack.md) | 要添加的物品 |


::: warning 注意
此函数可抛出错误
:::

### **transferItem**
`
transferItem(fromSlot: number, toSlot: number, toContainer: Container): boolean
`

把物品从一个格子移动到另一个格子 可能跨容器
#### 实参
| 参数 | 类型 | 描述 |
| :--- | :--- | :---: |
| **fromSlot** | *number* | - |
| **toSlot** | *number* | 从零开始的移动物品的索引|
| **toContainer** | [*Container*](Container.md) | 移动物品的目标容器. Note 这可以和这个容器相同|

返回 *boolean*

::: warning 注意
此函数可抛出错误
:::

#### 示例
##### ***transferItem.js***
```javascript
rightChestContainer.transferItem(0, 4, chestCartContainer); // 从 right chest 移动苹果到 chest cart

```
### **swapItems**
`
swapItems(slot: number, otherSlot: number, otherContainer: Container): boolean
`

交换容器内两个不同的格子内的物品
#### 实参
| 参数 | 类型 | 描述 |
| :--- | :--- | :---: |
| **slot** | *number* | 要交换的物品的索引 |
| **otherSlot** | *number* | 要交换的物品的索引 |
| **otherContainer** | [*Container*](Container.md) |交换物品的目标容器. Note 这可以和这个容器相同|

返回 *boolean*

::: warning 注意
此函数可抛出错误
:::

#### 示例
##### ***swapItems.js***
```javascript
rightChestContainer.swapItems(1, 0, leftChestContainer); // 交换蛋糕和绿宝石

```
