#yoni/mind_old/goto/t2
scoreboard players set @s mind 2

function operation/rotate_y_offset_init

scoreboard objectives add ths:enter dummy
scoreboard players add @s ths:enter 0
scoreboard objectives add ths:focus dummy
scoreboard players add @s ths:focus 0

scoreboard objectives add th:timer0 dummy
scoreboard players set @s th:timer0 0

scoreboard objectives add th:flag0 dummy
scoreboard players set @s th:flag0 0
scoreboard objectives add th:flag1 dummy
scoreboard players set @s th:flag1 0
