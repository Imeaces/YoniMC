#yoni/guxi/operation/21/base
#op=21

scoreboard players set @s guxi-opt 0
scoreboard players set @s guxi-opt 210

scoreboard objectives add guxi-ryo dummy
scoreboard objectives add guxi-ryx dummy
function yoni/status/rotate_y
scoreboard players operation @s guxi:ryx = @s rotate_y
