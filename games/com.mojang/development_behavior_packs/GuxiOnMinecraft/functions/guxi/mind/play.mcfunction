#初始化
# 记录当前想法
scoreboard objectives add mind dummy
scoreboard players add @s mind 0
execute @s[scores={mind=..-1},tag=yoni:debug] ~ ~ ~ tellraw @s {"rawtext":[{"text":"出现错误，已重置mind为0"}]}
execute @s[scores={mind=4..},tag=yoni:debug] ~ ~ ~ tellraw @s {"rawtext":[{"text":"出现错误，已重置mind为0"}]}
execute @s[scores={mind=..-1}] ~ ~ ~ scoreboard players set @s mind 0
execute @s[scores={mind=4..}] ~ ~ ~ scoreboard players set @s mind 0

# 记录已经决定想法
scoreboard objectives add mind:enter dummy
scoreboard players set @s mind:enter 0
# 记录当前slot物品
#scoreboard objectives add mind:v100 dummy
# 记录当前是否持握slot物品
#scoreboard objectives add mind:v101 dummy

#scoreboard objectives add mind:op100 dummy

scoreboard objectives add mind:lock dummy
scoreboard players add @s mind:lock 0

scoreboard objectives add mind:sence dummy

# 设置slot
# 默认模式0
# 攻击模式1
# 防御模式2
# 滑翔模式3
execute @s[scores={mind=0}] ~ ~ ~ replaceitem entity @s slot.hotbar 8 destroy guxi:enter 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}} 
execute @s[scores={mind=1}] ~ ~ ~ replaceitem entity @s slot.hotbar 8 destroy guxi:enter_attack 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}} 
execute @s[scores={mind=2}] ~ ~ ~ replaceitem entity @s slot.hotbar 8 destroy guxi:enter_shield 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
execute @s[scores={mind=3}] ~ ~ ~ replaceitem entity @s slot.hotbar 8 destroy firework_rocket 2 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}

# 检测使用状态
scoreboard players set @s[scores={mind:lock=0}] mind:sence -2

execute @s[scores={mind:lock=0},hasitem=[{location=slot.hotbar,slot=8,item=guxi:enter},{location=slot.weapon.mainhand,slot=0,item=guxi:enter}]] ~ ~ ~ scoreboard players set @s mind:sence 0
execute @s[scores={mind:lock=0},hasitem=[{location=slot.hotbar,slot=8,item=guxi:enter_attack},{location=slot.weapon.mainhand,slot=0,item=guxi:enter_attack}]] ~ ~ ~ scoreboard players set @s mind:sence 1
execute @s[scores={mind:lock=0},hasitem=[{location=slot.hotbar,slot=8,item=guxi:enter_shield},{location=slot.weapon.mainhand,slot=0,item=guxi:enter_shield}]] ~ ~ ~ scoreboard players set @s mind:sence 2
execute @s[scores={mind:lock=0},hasitem=[{location=slot.hotbar,slot=8,item=firework_rocket},{location=slot.weapon.mainhand,slot=0,item=firework_rocket}]] ~ ~ ~ scoreboard players set @s mind:sence 3
## 轮盘菜单
execute @s[scores={mind:sence=0..,mind:lock=0},rx=-89,tag=yoni:debug] ~ ~ ~ say sey mind:sence -1
execute @s[scores={mind:sence=0..,mind:lock=0},rx=-89] ~ ~ ~ scoreboard players set @s mind:sence -1

# 检测是否已经决定
execute @s[tag=guxi:enter] ~ ~ ~ scoreboard players set @s mind:enter 1
## 完成对标签的处理
tag @s[tag=guxi:enter] remove guxi:enter
##
execute @s[scores={mind=3},hasitem=[{location=slot.hotbar,slot=8,item=firework_rocket,quantity=1},{location=slot.weapon.mainhand,slot=0,item=firework_rocket,quantity=1}]] ~ ~ ~ scoreboard players set @s mind:enter 1

#执行想法
execute @s[scores={mind:sence=-1}] ~ ~ ~ function guxi/mind/play_sence

execute @s[scores={mind:sence=0}] ~ ~ ~ function guxi/mind/mind_default
execute @s[scores={mind:sence=1}] ~ ~ ~ function guxi/mind/mind_shield
