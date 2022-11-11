#yoni/mind/goto/guxi_1
scoreboard players set @s mind:v100 100400

function yonimc/species/guxi/mind_old/operation/rotate_y_offset_init


scoreboard objectives add mind:v101 dummy
scoreboard players set @s mind:v101 0
scoreboard objectives add mind:v102 dummy
scoreboard players set @s mind:v102 0

scoreboard objectives add mind:op100 dummy
scoreboard players reset @s mind:op100

scoreboard objectives add mind:op101 dummy
scoreboard players reset @s mind:op101

scoreboard objectives add mind:op141 dummy
scoreboard objectives add mind:op142 dummy
scoreboard objectives add mind:op143 dummy
scoreboard objectives add mind:op144 dummy
scoreboard players reset @s mind:op141
scoreboard players reset @s mind:op142
scoreboard players reset @s mind:op143
scoreboard players reset @s mind:op144
