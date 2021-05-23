# 一些奇怪的东西

## 关于molang

### 检测物品被使用

[`query.item_in_use_duration`](https://bedrock.dev/docs/stable/MoLang#query.item_in_use_duration)
: 物品使用多久了

[`query.item_max_use_duration`](https://bedrock.dev/docs/stable/MoLang#query.item_max_use_duration)
: 物品最长使用时间

### is_moving

只有当移动速度较快才会触发

## 实体组件

```jsonc
"minecraft:damage_sensor":{
  "triggers":[
    {
      "cause": "fire_tick" //这个有点问题
    }
  ]
}
```

## 物品分类

物品的`description`下的`category`

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

## 关于添加新物品

目前的版本需要开启实验玩法  

## 关于语法

不要相信mc的log，有一些东西它连提示都没有一下的

## 关于物品的材质

format小于1.16.100时，需要在资源包定义
新版本可以在行为包定义

## 实体属性

版本
: beta 1.16.230.52

```json
{
  "minecraft:entity": {
    "description": {
      "identifier": "entity:properties_example",
      "properties": {
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
