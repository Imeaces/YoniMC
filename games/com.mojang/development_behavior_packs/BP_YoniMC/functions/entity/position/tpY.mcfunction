scoreboard players operation @e[tag=entity:point] pos:y = @s pos:y
scoreboard players add @e[tag=entity:point] pos:y 32768
execute as @e[tag=entity:point] at @s run tp @s ~ -32768.0 ~ 0
execute as @e[tag=entity:point,scores={pos:y=32768..}] at @s run tp @s ~ ~32768.0 ~ 1
execute as @e[tag=entity:point,rym=1] at @s run scoreboard players remove @s pos:y 32768
execute as @e[tag=entity:point,scores={pos:y=16384..}] at @s run tp @s ~ ~16384.0 ~ 2
execute as @e[tag=entity:point,rym=2] at @s run scoreboard players remove @s pos:y 16384
execute as @e[tag=entity:point,scores={pos:y=8192..}] at @s run tp @s ~ ~8192.0 ~ 3
execute as @e[tag=entity:point,rym=3] at @s run scoreboard players remove @s pos:y 8192
execute as @e[tag=entity:point,scores={pos:y=4096..}] at @s run tp @s ~ ~4096.0 ~ 4
execute as @e[tag=entity:point,rym=4] at @s run scoreboard players remove @s pos:y 4096
execute as @e[tag=entity:point,scores={pos:y=2048..}] at @s run tp @s ~ ~2048.0 ~ 5
execute as @e[tag=entity:point,rym=5] at @s run scoreboard players remove @s pos:y 2048
execute as @e[tag=entity:point,scores={pos:y=1024..}] at @s run tp @s ~ ~1024.0 ~ 6
execute as @e[tag=entity:point,rym=6] at @s run scoreboard players remove @s pos:y 1024
execute as @e[tag=entity:point,scores={pos:y=512..}] at @s run tp @s ~ ~512.0 ~ 7
execute as @e[tag=entity:point,rym=7] at @s run scoreboard players remove @s pos:y 512
execute as @e[tag=entity:point,scores={pos:y=256..}] at @s run tp @s ~ ~256.0 ~ 8
execute as @e[tag=entity:point,rym=8] at @s run scoreboard players remove @s pos:y 256
execute as @e[tag=entity:point,scores={pos:y=128..}] at @s run tp @s ~ ~128.0 ~ 9
execute as @e[tag=entity:point,rym=9] at @s run scoreboard players remove @s pos:y 128
execute as @e[tag=entity:point,scores={pos:y=64..}] at @s run tp @s ~ ~64.0 ~ 10
execute as @e[tag=entity:point,rym=10] at @s run scoreboard players remove @s pos:y 64
execute as @e[tag=entity:point,scores={pos:y=32..}] at @s run tp @s ~ ~32.0 ~ 11
execute as @e[tag=entity:point,rym=11] at @s run scoreboard players remove @s pos:y 32
execute as @e[tag=entity:point,scores={pos:y=16..}] at @s run tp @s ~ ~16.0 ~ 12
execute as @e[tag=entity:point,rym=12] at @s run scoreboard players remove @s pos:y 16
execute as @e[tag=entity:point,scores={pos:y=8..}] at @s run tp @s ~ ~8.0 ~ 13
execute as @e[tag=entity:point,rym=13] at @s run scoreboard players remove @s pos:y 8
execute as @e[tag=entity:point,scores={pos:y=4..}] at @s run tp @s ~ ~4.0 ~ 14
execute as @e[tag=entity:point,rym=14] at @s run scoreboard players remove @s pos:y 4
execute as @e[tag=entity:point,scores={pos:y=2..}] at @s run tp @s ~ ~2.0 ~ 15
execute as @e[tag=entity:point,rym=15] at @s run scoreboard players remove @s pos:y 2
execute as @e[tag=entity:point,scores={pos:y=1..}] at @s run tp @s ~ ~1.0 ~ 16
execute as @e[tag=entity:point,rym=16] at @s run scoreboard players remove @s pos:y 1

