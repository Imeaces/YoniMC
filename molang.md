# Molang

新建世界前，请开启作弊模式，不然可能会导致molang不执行

## 查询函数

### query.is_sleeping

可用于检测实体是否在睡觉，玩家也可以被检测

### variable.attack_time

这是一个特殊的变量，在一般的实体上，可以用于检测实体是否在进行攻击  
而在玩家上可以检测是否在用手

### query.position

查询当前实体的坐标

### query.can_fly

只能检测实体是否拥有`minecraft:can_fly`组件

### query.scoreboard

需要开启实验玩法

#### 用法

`query.scoreboard('*记分项*')`

#### 返回

返回当前实体指定记分项分数

#### 注意事项

如果在资源包上使用时，需要将要检测的记分项设置为显示在列表、名字下方或侧边栏，否则无法检测

#### 仍未知晓的问题

如果当前实体的特定记分板未初始化会返回什么？

## 检测物品被使用

没有测试过

- [`query.item_in_use_duration`](https://bedrock.dev/docs/stable/MoLang#query.item_in_use_duration)
: 物品使用多久了

- [`query.item_max_use_duration`](https://bedrock.dev/docs/stable/MoLang#query.item_max_use_duration)
: 物品最长使用时间

## 检测移动

- [`is_moving`](https://bedrock.dev/docs/stable/MoLang#is_moving)
: 只有当移动速度较快才会触发

- [`query.modified_move_speed`](https://bedrock.dev/docs/stable/MoLang#query.modified_move_speed)

  这个函数不能用于查询移动速度  
  它返回的是一个基础速度的增量
  
  比如  
  一般的实体，受到伤害之后，会有一个速度加快的效果  
  这个函数会返回这个速度加快了多少
  
- `query.movement_direction('*坐标轴*')`
: 查询执行方向的移动
  
  |参数|轴名|
  |---|---|
  |0|x|
  |1|y|
  |2|z|
  
  对于y轴的查询不可正常使用
  
其它的尚未测试
