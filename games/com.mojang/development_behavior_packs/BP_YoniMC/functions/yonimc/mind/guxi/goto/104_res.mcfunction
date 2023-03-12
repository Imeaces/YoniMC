scoreboard players set @s mind 104

scoreboard objectives add md:res_v0 dummy
scoreboard players operation @s md:res_v0 = @s guxi:ef_res
execute unless score @s md:res_v0 matches 0..11 run scoreboard players set @s md:res_v0 0

function yonimc/mind/operation/rotate_y_offset_init
function yonimc/mind/operation/enter_timer_076_init
