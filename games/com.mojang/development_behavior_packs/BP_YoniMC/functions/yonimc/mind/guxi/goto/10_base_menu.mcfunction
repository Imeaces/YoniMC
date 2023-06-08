scoreboard players set @s mind 10

scoreboard objectives add md:base_menu_v0 dummy
scoreboard players add @s md:base_menu_v0 0
execute unless score @s md:base_menu_v0 matches 0..7 run scoreboard players set @s md:base_menu_v0 0

function yonimc/mind/operation/rotate_y_offset_init
function yonimc/mind/operation/enter_timer_076_init
