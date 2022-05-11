#yoni/mind/goto/guxi_1
scoreboard players set @s mind:v100 100

function operation/rotate_y_offset_init


scoreboard objectives add mind:v101 dummy
scoreboard players set @s mind:v101 0

scoreboard objectives add mind:op100 dummy
scoreboard players reset @s mind:op100
scoreboard objectives add mind:op101 dummy
scoreboard players reset @s mind:op101
