#yoni/mind_old/goto/t2
scoreboard players set @s mind 26951

function operation/rotate_y_offset_init

function yoni/mind/settings/enter_delay/default

scoreboard objectives add th:timer0 dummy
scoreboard players reset @s th:timer0

scoreboard objectives add th:flag0 dummy
scoreboard players reset @s th:flag0
scoreboard objectives add th:flag1 dummy
scoreboard players reset @s th:flag1

scoreboard objectives add th:flag2 dummy
scoreboard players set @s th:flag2 0

scoreboard objectives add th:flag3 dummy
scoreboard players set @s th:flag3 0
