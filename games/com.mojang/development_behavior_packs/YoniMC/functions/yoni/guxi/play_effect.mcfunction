#yoni/guxi/play_effect
# 此函数用作基于能量的状态效果
# 部分效果为间隔固定时间添加

# 检测附加状态
function yoni/guxi/check_effect_status

# 循环计时器guxi:ti1 每隔40tick触发
# 用guxi:ti1=0选中
scoreboard objectives add guxi:ti1 dummy
scoreboard players add @s guxi:ti1 1
execute @s[scores={guxi:ti1=40..}] ~ ~ ~ scoreboard players set @s guxi:ti1 0

#begin 添加状态效果

## 固有状态 缓慢2 挖掘疲劳4
execute @s[scores={guxi:ti1=0}] ~ ~ ~ effect @s slowness 4 1 true
execute @s[scores={guxi:ti1=0}] ~ ~ ~ effect @s mining_fatigue 4 3 true
## 固有免疫 黑暗 失明
execute @s[scores={guxi:ti1=0}] ~ ~ ~ effect @s darkness 0
execute @s[scores={guxi:ti1=0}] ~ ~ ~ effect @s blindness 0

## 当没有足够的能量时（order=0）
# 饥饿 禁止疾跑
execute @s[scores={guxi:ti1=0}] ~ ~ ~ execute @s[scores={guxi:order=-1}] ~ ~ ~ effect @s hunger 4 255 true
# 缓慢 5 降低速度
execute @s[scores={guxi:ti1=0}] ~ ~ ~ execute @s[scores={guxi:order=-1}] ~ ~ ~ effect @s slowness 4 4 true
# 9秒夜视 造成闪烁效果
execute @s[scores={guxi:ti1=0}] ~ ~ ~ execute @s[scores={guxi:order=-1}] ~ ~ ~ effect @s night_vision 9 0 true
# 虚弱 无法近战攻击
execute @s[scores={guxi:ti1=0}] ~ ~ ~ execute @s[scores={guxi:order=-1}] ~ ~ ~ effect @s weakness 4 255 true

## 当能量足够时( order >= 0 )
# 饱和 使速度加快
execute @s[scores={guxi:ti1=0}] ~ ~ ~ execute @s[scores={guxi:order=!-1}] ~ ~ ~ effect @s saturation 4 255 true
# 夜视 饱满
execute @s[scores={guxi:ti1=0}] ~ ~ ~ execute @s[scores={guxi:order=!-1}] ~ ~ ~ effect @s night_vision 14 0 true

#end 添加状态效果 

#begin 检测是否循环attack_time
execute @s[scores={attack_time=4..},tag=!event:guxi_attacking,tag=!event:guxi_attacked] ~ ~ ~ tag @s add event:guxi_attacking
execute @s[tag=event:guxi_attacked] ~ ~ ~ tag @s remove event:guxi_attacking
execute @s[scores={attack_time=..3},tag=event:guxi_attacked] ~ ~ ~ tag @s remove event:guxi_attacked
execute @s[tag=event:guxi_attacking] ~ ~ ~ tag @s add event:guxi_attacked
#end 检测

# mining效果
execute @s[scores={guxi:mining=1},tag=event:guxi_attacking] ~ ~ ~ effect @s haste 1 32 true
execute @s[scores={guxi:mining=1},tag=event:guxi_attacking] ~ ~ ~ scoreboard players remove @s guxi:energy 10976

# 能量需求时，传输能量的损耗
scoreboard objectives add guxi:op300 dummy
execute @s[scores={guxi:order=1..}] ~ ~ ~ scoreboard players operation @s guxi:op300 = order_energy guxi:value
execute @s[scores={guxi:order=1..}] ~ ~ ~ scoreboard players operation @s guxi:op300 *= @s guxi:order
execute @s[scores={guxi:order=1..}] ~ ~ ~ scoreboard players operation @s guxi:energy -= @s guxi:op300

# 用能量构建的盾
## 标志检测
scoreboard objectives add guxi:resicheck dummy
scoreboard players add @s guxi:resicheck 0
scoreboard players operation @s guxi:resicheck -= @s guxi:resistance
## 切换
execute @s[scores={guxi:resicheck=!0}] ~ ~ ~ function yoni/guxi/resistance/being
## 同步
scoreboard players operation @s guxi:resicheck = @s guxi:resistance

## 能量消耗
execute @s[scores={guxi:resistance=1}] ~ ~ ~ scoreboard players remove @s guxi:energy 49000
execute @s[scores={guxi:resistance=2}] ~ ~ ~ scoreboard players remove @s guxi:energy 290000
execute @s[scores={guxi:resistance=3}] ~ ~ ~ scoreboard players remove @s guxi:energy 918000
execute @s[scores={guxi:resistance=4}] ~ ~ ~ scoreboard players remove @s guxi:energy 2819000
