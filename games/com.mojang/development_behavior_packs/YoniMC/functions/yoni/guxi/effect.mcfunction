#yoni/guxi/effect
# 检测附加状态
function yoni/guxi/effect_status

# 固有天赋
effect @s slowness 4 1 true
effect @s mining_fatigue 4 3 true
# 维持秩序的消耗
scoreboard players remove @s guxi:energy 14

# 当没有足够的能量时
execute @s[scores={guxi:order=0}] ~ ~ ~ effect @s hunger 4 255 true
execute @s[scores={guxi:order=0}] ~ ~ ~ effect @s slowness 4 4 true
execute @s[scores={guxi:order=0}] ~ ~ ~ effect @s night_vision 9 0 true
execute @s[scores={guxi:order=0}] ~ ~ ~ effect @s weakness 4 255 true

execute @s[scores={guxi:order=1..}] ~ ~ ~ effect @s night_vision 14 0 true

#execute @s[scores={guxi:mining=1..}] ~ ~ ~ effect @s haste 1 4 true

execute @s[scores={guxi:mining=1,attack_time=5..}] ~ ~ ~ effect @s haste 1 30 true
execute @s[scores={guxi:mining=1,attack_time=5..}] ~ ~ ~ scoreboard players remove @s guxi:energy 8265
# debug
execute @s[tag=yoni:test,scores={guxi:mining=1,attack_time=5..}] ~ ~ ~ say 触发了挖矿

# 待机能量
scoreboard objectives add guxi:orderEnergy dummy
scoreboard players operation @s guxi:orderEnergy = order_energy guxi:value
scoreboard players operation @s guxi:orderEnergy *= @s guxi:order
scoreboard players operation @s guxi:energy -= @s guxi:orderEnergy
