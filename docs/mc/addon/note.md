# 一些奇怪的东西

在这里，我引用了一些来自bedrock.dev的链接  
一般来说，所有内容均可在正式版使用

## 关于molang

### [`query.can_fly`](https://bedrock.dev/docs/stable/MoLang#query.can_fly])

只能检测实体是否拥有`minecraft:can_fly`组件

### [`query.scoreboard`](https://bedrock.dev/docs/stable/MoLang#query.scoreboard)

#### 用法

`query.scoreboard('记分板名称')`

#### 返回

返回指定实体的记分板分数

#### 未知的问题

1.如果当前实体的特定记分板未初始化会返回什么？  
可能是返回0

2.如果当前实体的特定记分板分数为0呢？  
可能也是0

#### 示例

暂无

### 检测物品被使用

- [`query.item_in_use_duration`](https://bedrock.dev/docs/stable/MoLang#query.item_in_use_duration)
: 物品使用多久了

- [`query.item_max_use_duration`](https://bedrock.dev/docs/stable/MoLang#query.item_max_use_duration)
: 物品最长使用时间

### 检测移动

- [`is_moving`](https://bedrock.dev/docs/stable/MoLang#is_moving)
: 只有当移动速度较快才会触发

- [`query.modified_move_speed`](https://bedrock.dev/docs/stable/MoLang#query.modified_move_speed)

  这个函数不能用于查询移动速度  
  它返回的是一个基础速度的增量
  
  比如  
  一般的实体，受到伤害之后，会有一个速度加快的效果  
  这个函数会返回这个速度加快了多少
  
  其它的尚未测试

## 关于物品

### 物品分类

#### 物品的`description`下的`category`

```prop
craftingScreen.tab.search=全部	#
craftingScreen.tab.search.filter=可合成	#
craftingScreen.tab.construction=建筑	#
craftingScreen.tab.nature=自然	#
craftingScreen.tab.equipment=装备	#
craftingScreen.tab.items=物品	#
craftingScreen.tab.survival=物品栏	#
craftingScreen.tab.armor=盔甲	#
```

### 添加新的*1.16.100*物品

目前的版本需要开启实验玩法  

### 材质

format小于1.16.100时，需要在资源包定义  
新版本则只能在行为包定义

## 关于json

### 语法

目前，物品文件有语法错误也不会报错  
在测试物品文件时必须人工检查语法  
同时，物品组件也不会报错  
但是物品的描述属性（1.16.100）却会报错

## 实体

### 组件

```jsonc
"minecraft:damage_sensor": {
  "triggers": [
    {
      "cause": "fire_tick" //这个有点问题
    }
  ]
}
```

### [实体属性](https://wiki.bedrock.dev/concepts/entity-properties)

新增版本
: beta 1.16.230.52

```jsonc
{
  "minecraft:entity": {
    "description": {
      "identifier": "entity:properties_example",
      "properties": { //new
        "property:number_range_example": {
          "values": {
            "min": 0,
            "max": 100
          }
        },
        "property:number_enum_example": {
          "values": [1, 2]
        },
        "property:string_enum_example": {
          "values": ["first", "second", "third"]
        },
        "property:boolean_enum_example": {
          "values": [true, false]
        }
      }
    }
  }
}
```
