tp @s ~ ~ ~ ~ -90
scoreboard players add @s pos:rotate_x 90

execute as @s[scores={pos:rotate_x=64..}] at @s run tp @s ~ ~ ~ ~ ~64
scoreboard players remove @s[scores={pos:rotate_x=64..}] pos:rotate_x 64

execute as @s[scores={pos:rotate_x=32..}] at @s run tp @s ~ ~ ~ ~ ~32
scoreboard players remove @s[scores={pos:rotate_x=32..}] pos:rotate_x 32

execute as @s[scores={pos:rotate_x=16..}] at @s run tp @s ~ ~ ~ ~ ~16
scoreboard players remove @s[scores={pos:rotate_x=16..}] pos:rotate_x 16

execute as @s[scores={pos:rotate_x=8..}] at @s run tp @s ~ ~ ~ ~ ~8
scoreboard players remove @s[scores={pos:rotate_x=8..}] pos:rotate_x 8

execute as @s[scores={pos:rotate_x=4..}] at @s run tp @s ~ ~ ~ ~ ~4
scoreboard players remove @s[scores={pos:rotate_x=4..}] pos:rotate_x 4

execute as @s[scores={pos:rotate_x=2..}] at @s run tp @s ~ ~ ~ ~ ~2
scoreboard players remove @s[scores={pos:rotate_x=2..}] pos:rotate_x 2

execute as @s[scores={pos:rotate_x=1..}] at @s run tp @s ~ ~ ~ ~ ~1
scoreboard players remove @s[scores={pos:rotate_x=1..}] pos:rotate_x 1
