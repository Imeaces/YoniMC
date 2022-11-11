tp @s ~ ~ ~ -180 ~
scoreboard players add @s pos:rotate_y 180

execute as @s[scores={pos:rotate_y=256..}] at @s run tp @s ~ ~ ~ ~256 ~
scoreboard players remove @s[scores={pos:rotate_y=256..}] pos:rotate_y 256

execute as @s[scores={pos:rotate_y=128..}] at @s run tp @s ~ ~ ~ ~128 ~
scoreboard players remove @s[scores={pos:rotate_y=128..}] pos:rotate_y 128

execute as @s[scores={pos:rotate_y=64..}] at @s run tp @s ~ ~ ~ ~64 ~
scoreboard players remove @s[scores={pos:rotate_y=64..}] pos:rotate_y 64

execute as @s[scores={pos:rotate_y=32..}] at @s run tp @s ~ ~ ~ ~32 ~
scoreboard players remove @s[scores={pos:rotate_y=32..}] pos:rotate_y 32

execute as @s[scores={pos:rotate_y=16..}] at @s run tp @s ~ ~ ~ ~16 ~
scoreboard players remove @s[scores={pos:rotate_y=16..}] pos:rotate_y 16

execute as @s[scores={pos:rotate_y=8..}] at @s run tp @s ~ ~ ~ ~8 ~
scoreboard players remove @s[scores={pos:rotate_y=8..}] pos:rotate_y 8

execute as @s[scores={pos:rotate_y=4..}] at @s run tp @s ~ ~ ~ ~4 ~
scoreboard players remove @s[scores={pos:rotate_y=4..}] pos:rotate_y 4

execute as @s[scores={pos:rotate_y=2..}] at @s run tp @s ~ ~ ~ ~2 ~
scoreboard players remove @s[scores={pos:rotate_y=2..}] pos:rotate_y 2

execute as @s[scores={pos:rotate_y=1..}] at @s run tp @s ~ ~ ~ ~1 ~
scoreboard players remove @s[scores={pos:rotate_y=1..}] pos:rotate_y 1
