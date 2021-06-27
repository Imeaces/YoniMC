#yoni/guxi/operation/ryx

scoreboard objectives add guxi-ryo dummy
scoreboard objectives add guxi-ryx dummy
function yoni/status/rotate_y
scoreboard players operation @s guxi-ryx = @s rotate_y
