#yoni/mind/goto/guxi_1
scoreboard players set @s mind:v100 26951

function operation/rotate_y_offset_init

scoreboard objectives add th:flag0 dummy
scoreboard players reset @s th:flag0
scoreboard objectives add th:flag1 dummy
scoreboard players reset @s th:flag1

scoreboard objectives add th:flag2 dummy
scoreboard players set @s th:flag2 0

scoreboard objectives add th:flag3 dummy
scoreboard players set @s th:flag3 0
