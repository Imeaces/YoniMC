scoreboard players set @s mind 107

function yonimc/mind/operation/enter_timer_076_init

scoreboard objectives add md:107_v0 dummy
scoreboard players set @s md:107_v0 0
execute unless score @s guxi:auto_energy matches 0 run scoreboard players set @s md:107_v0 1
