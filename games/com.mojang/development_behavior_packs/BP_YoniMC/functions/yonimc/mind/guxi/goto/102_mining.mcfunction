scoreboard players set @s mind 102

scoreboard objectives add md:mining_v0 dummy
scoreboard players operation @s md:mining_v0 = @s guxi:ef_mining
execute unless score @s md:mining_v0 matches 0..20 run scoreboard players set @s md:mining_v0 0

function yonimc/mind/operation/rotate_y_offset_init
function yonimc/mind/operation/enter_timer_076_init
