scoreboard players set @s mind 106

function yonimc/mind/operation/enter_timer_076_init

scoreboard objectives add md:106_v0 dummy
scoreboard players set @s md:106_v0 0
execute unless score @s guxi:keep_ef matches 0 run scoreboard players set @s md:106_v0 1
