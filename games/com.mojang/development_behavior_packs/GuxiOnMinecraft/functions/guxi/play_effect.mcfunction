#yoni/guxi/play_effect
# 检测附加状态
function guxi/check_effect_status

# 循环计时器
scoreboard objectives add guxi:effectTimer dummy
scoreboard players add @s guxi:effectTimer 1
execute @s[scores={guxi:effectTimer=40..}] ~ ~ ~ scoreboard players set @s guxi:effectTimer 0

# 固有状态
execute @s[scores={guxi:effectTimer=0}] ~ ~ ~ effect @s slowness 4 1 true
execute @s[scores={guxi:effectTimer=0}] ~ ~ ~ effect @s mining_fatigue 4 3 true
# 维持能量秩序的消耗
scoreboard players remove @s guxi:energy 14

# 当没有足够的能量时（order0）
execute @s[scores={guxi:effectTimer=0}] ~ ~ ~ execute @s[scores={guxi:order=-1}] ~ ~ ~ effect @s hunger 4 255 true
execute @s[scores={guxi:effectTimer=0}] ~ ~ ~ execute @s[scores={guxi:order=-1}] ~ ~ ~ effect @s slowness 4 4 true
execute @s[scores={guxi:effectTimer=0}] ~ ~ ~ execute @s[scores={guxi:order=-1}] ~ ~ ~ effect @s night_vision 9 0 true
execute @s[scores={guxi:effectTimer=0}] ~ ~ ~ execute @s[scores={guxi:order=-1}] ~ ~ ~ effect @s weakness 4 255 true

# 当能量足够时( order >= 0 )
execute @s[scores={guxi:effectTimer=0}] ~ ~ ~ execute @s[scores={guxi:order=!-1}] ~ ~ ~ effect @s saturation 4 255 true
execute @s[scores={guxi:effectTimer=0}] ~ ~ ~ execute @s[scores={guxi:order=!-1}] ~ ~ ~ effect @s night_vision 14 0 true

execute @s[scores={attack_time=4..},tag=!guxi:att,tag=!guxi:atta] ~ ~ ~ tag @s add guxi:att
execute @s[tag=guxi:atta] ~ ~ ~ tag @s remove guxi:att
execute @s[scores={attack_time=..3},tag=guxi:atta] ~ ~ ~ tag @s remove guxi:atta
execute @s[tag=guxi:att] ~ ~ ~ tag @s add guxi:atta

# mining
execute @s[scores={guxi:mining=1},tag=guxi:att] ~ ~ ~ effect @s haste 1 32 true
execute @s[scores={guxi:mining=1},tag=guxi:att] ~ ~ ~ scoreboard players remove @s guxi:energy 10976

# debug
execute @s[tag=yoni:debug,tag=guxi:att] ~ ~ ~ say 触发了手

# 待机能量
execute @s[scores={guxi:order=1..}] ~ ~ ~ scoreboard players operation @s guxi:orderEnergy = order_energy guxi:value
execute @s[scores={guxi:order=1..}] ~ ~ ~ scoreboard players operation @s guxi:orderEnergy *= @s guxi:order
execute @s[scores={guxi:order=1..}] ~ ~ ~ scoreboard players operation @s guxi:energy -= @s guxi:orderEnergy

# 旧代码，暂时恢复护盾运作
###+ 标志检测
scoreboard objectives add guxi:resi2 dummy
scoreboard players add @s guxi:resi2 0
scoreboard players operation @s guxi:resi2 -= @s guxi:resistance
###+ 切换
execute @s[scores={guxi:resi2=!0}] ~ ~ ~ function guxi/resistance/being
###+ 同步
scoreboard players operation @s guxi:resi2 = @s guxi:resistance
### 能量消耗
#execute @s[scores={guxi:resistance=0}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:resistance=1}] ~ ~ ~ scoreboard players add @s guxi:energy -49
execute @s[scores={guxi:resistance=2}] ~ ~ ~ scoreboard players add @s guxi:energy -290
execute @s[scores={guxi:resistance=3}] ~ ~ ~ scoreboard players add @s guxi:energy -918
execute @s[scores={guxi:resistance=4}] ~ ~ ~ scoreboard players add @s guxi:energy -2819
