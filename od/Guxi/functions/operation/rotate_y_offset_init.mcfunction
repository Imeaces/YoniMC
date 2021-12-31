scoreboard objectives add op:ry_origin dummy
scoreboard objectives add op:ry_offset dummy

function yoni/entity/status/rotate_y

scoreboard players operation @s op:ry_origin = @s rotate_y
