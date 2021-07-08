# 实体

## 组件

```jsonc
"minecraft:damage_sensor": {
  "triggers": [
    {
      "cause": "fire_tick" //这个有点问题
    }
  ]
}
```

## 方法

1.使实体无法跳跃
```
{
  "components": {
    "minecraft:horse.jump_strength": {
      "value": 0
    }
  }
}
```
      
## [实体属性](https://wiki.bedrock.dev/concepts/entity-properties)

最低版本：beta 1.16.230.52（开启实验玩法）  
在原版实体上无法正常工作

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
