scoreboard players set @s mind 101

function yonimc/mind/operation/enter_timer_076_init

scoreboard objectives add md:101_v0 dummy
scoreboard players set @s md:101_v0 0
execute if score @s guxi:cre_ely matches 2 run scoreboard players set @s md:101_v0 1
