scoreboard players set @s mind 105

function yonimc/mind/operation/enter_timer_076_init

scoreboard objectives add md:105_v0 dummy
scoreboard players set @s md:105_v0 0
execute unless score @s guxi:keep_res matches 0 run scoreboard players set @s md:105_v0 1
