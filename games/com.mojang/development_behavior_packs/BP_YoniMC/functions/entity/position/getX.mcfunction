scoreboard objectives add pos:x dummy

# get x pos
scoreboard players set @e[tag=entity:point] pos:x -1048576
tp @e[tag=entity:point] -1048576.0 ~ ~ 0
execute as @e[tag=entity:point,rm=1048576] at @s run tp @s ~1048576.0 ~ ~ 1
execute as @e[tag=entity:point,rym=1] at @s run scoreboard players add @s pos:x 1048576
execute as @e[tag=entity:point,rm=524288] at @s run tp @s ~524288.0 ~ ~ 2
execute as @e[tag=entity:point,rym=2] at @s run scoreboard players add @s pos:x 524288
execute as @e[tag=entity:point,rm=262144] at @s run tp @s ~262144.0 ~ ~ 3
execute as @e[tag=entity:point,rym=3] at @s run scoreboard players add @s pos:x 262144
execute as @e[tag=entity:point,rm=131072] at @s run tp @s ~131072.0 ~ ~ 4
execute as @e[tag=entity:point,rym=4] at @s run scoreboard players add @s pos:x 131072
execute as @e[tag=entity:point,rm=65536] at @s run tp @s ~65536.0 ~ ~ 5
execute as @e[tag=entity:point,rym=5] at @s run scoreboard players add @s pos:x 65536
execute as @e[tag=entity:point,rm=32768] at @s run tp @s ~32768.0 ~ ~ 6
execute as @e[tag=entity:point,rym=6] at @s run scoreboard players add @s pos:x 32768
execute as @e[tag=entity:point,rm=16384] at @s run tp @s ~16384.0 ~ ~ 7
execute as @e[tag=entity:point,rym=7] at @s run scoreboard players add @s pos:x 16384
execute as @e[tag=entity:point,rm=8192] at @s run tp @s ~8192.0 ~ ~ 8
execute as @e[tag=entity:point,rym=8] at @s run scoreboard players add @s pos:x 8192
execute as @e[tag=entity:point,rm=4096] at @s run tp @s ~4096.0 ~ ~ 9
execute as @e[tag=entity:point,rym=9] at @s run scoreboard players add @s pos:x 4096
execute as @e[tag=entity:point,rm=2048] at @s run tp @s ~2048.0 ~ ~ 10
execute as @e[tag=entity:point,rym=10] at @s run scoreboard players add @s pos:x 2048
execute as @e[tag=entity:point,rm=1024] at @s run tp @s ~1024.0 ~ ~ 11
execute as @e[tag=entity:point,rym=11] at @s run scoreboard players add @s pos:x 1024
execute as @e[tag=entity:point,rm=512] at @s run tp @s ~512.0 ~ ~ 12
execute as @e[tag=entity:point,rym=12] at @s run scoreboard players add @s pos:x 512
execute as @e[tag=entity:point,rm=256] at @s run tp @s ~256.0 ~ ~ 13
execute as @e[tag=entity:point,rym=13] at @s run scoreboard players add @s pos:x 256
execute as @e[tag=entity:point,rm=128] at @s run tp @s ~128.0 ~ ~ 14
execute as @e[tag=entity:point,rym=14] at @s run scoreboard players add @s pos:x 128
execute as @e[tag=entity:point,rm=64] at @s run tp @s ~64.0 ~ ~ 15
execute as @e[tag=entity:point,rym=15] at @s run scoreboard players add @s pos:x 64
execute as @e[tag=entity:point,rm=32] at @s run tp @s ~32.0 ~ ~ 16
execute as @e[tag=entity:point,rym=16] at @s run scoreboard players add @s pos:x 32
execute as @e[tag=entity:point,rm=16] at @s run tp @s ~16.0 ~ ~ 17
execute as @e[tag=entity:point,rym=17] at @s run scoreboard players add @s pos:x 16
execute as @e[tag=entity:point,rm=8] at @s run tp @s ~8.0 ~ ~ 18
execute as @e[tag=entity:point,rym=18] at @s run scoreboard players add @s pos:x 8
execute as @e[tag=entity:point,rm=4] at @s run tp @s ~4.0 ~ ~ 19
execute as @e[tag=entity:point,rym=19] at @s run scoreboard players add @s pos:x 4
execute as @e[tag=entity:point,rm=2] at @s run tp @s ~2.0 ~ ~ 20
execute as @e[tag=entity:point,rym=20] at @s run scoreboard players add @s pos:x 2
execute as @e[tag=entity:point,rm=1] at @s run tp @s ~1.0 ~ ~ 21
execute as @e[tag=entity:point,rym=21] at @s run scoreboard players add @s pos:x 1

scoreboard players operation @s pos:x = @e[tag=entity:point] pos:x
