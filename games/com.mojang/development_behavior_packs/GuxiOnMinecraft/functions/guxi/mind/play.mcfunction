#初始化
scoreboard objectives add mind dummy
scoreboard players add @s mind 0



# 默认模式
execute @s[scores={mind=0}] ~ ~ ~ replaceitem entity @s slot.hotbar 8 destroy guxi:enter 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}} 

# 攻击模式
execute @s[scores={mind=1}] ~ ~ ~ replaceitem entity @s slot.hotbar 8 destroy guxi:enter_attack 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}} 

#判断当前物品
scoreboard objectives add mind:slot dummy
scoreboard players set @s[hasitem={location=slot.hotbar,slot=8,item=guxi:enter}] mind:slot 1
# attack
scoreboard players set @s[hasitem={location=slot.hotbar,slot=8,item=guxi:enter_attack}] mind:slot 2

# 抬头状态使用，转换模式
execute @s[scores={mind:slot=2},tag=guxi:enter_attack,rx=-89] ~ ~ ~ scoreboard players set @s mind 0
execute @s[scores={mind:slot=1},tag=guxi:enter,rx=-89] ~ ~ ~ scoreboard players set @s mind 1


# 完成对标签的处理
tag @s[tag=guxi:enter] remove guxi:enter
tag @s[tag=guxi:enter_attack] remove guxi:enter_attack
