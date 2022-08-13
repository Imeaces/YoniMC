#schedule 每秒一次


# 扩展elytra消耗能量
#var guxi:val_2001 记录是否打开了鞘翅
scoreboard objectives add var_0 dummy
execute if score @s guxi:val_2001 matches 2 run scoreboard players random @s var_0 120 2400
execute if score @s guxi:val_2001 matches 2 run scoreboard players operation @s guxi:energy -= @s var_0

# 能量池处理
function yonimc/guxi/energy/pool

# 能量运转
function yonimc/guxi/effect/play

function yonimc/guxi/play_energy
function yonimc/guxi/play_health
