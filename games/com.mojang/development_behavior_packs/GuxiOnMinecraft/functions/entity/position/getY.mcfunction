# get y pos
scoreboard players set @e[tag=entity:point] pos:y -32768
tp @e[tag=entity:point] ~ -32768.0 ~ 0
execute @e[tag=entity:point,rm=32768] ~ ~ ~ tp @s ~ ~32768.0 ~ 1
execute @e[tag=entity:point,rym=1] ~ ~ ~ scoreboard players add @s pos:y 32768
execute @e[tag=entity:point,rm=16384] ~ ~ ~ tp @s ~ ~16384.0 ~ 2
execute @e[tag=entity:point,rym=2] ~ ~ ~ scoreboard players add @s pos:y 16384
execute @e[tag=entity:point,rm=8192] ~ ~ ~ tp @s ~ ~8192.0 ~ 3
execute @e[tag=entity:point,rym=3] ~ ~ ~ scoreboard players add @s pos:y 8192
execute @e[tag=entity:point,rm=4096] ~ ~ ~ tp @s ~ ~4096.0 ~ 4
execute @e[tag=entity:point,rym=4] ~ ~ ~ scoreboard players add @s pos:y 4096
execute @e[tag=entity:point,rm=2048] ~ ~ ~ tp @s ~ ~2048.0 ~ 5
execute @e[tag=entity:point,rym=5] ~ ~ ~ scoreboard players add @s pos:y 2048
execute @e[tag=entity:point,rm=1024] ~ ~ ~ tp @s ~ ~1024.0 ~ 6
execute @e[tag=entity:point,rym=6] ~ ~ ~ scoreboard players add @s pos:y 1024
execute @e[tag=entity:point,rm=512] ~ ~ ~ tp @s ~ ~512.0 ~ 7
execute @e[tag=entity:point,rym=7] ~ ~ ~ scoreboard players add @s pos:y 512
execute @e[tag=entity:point,rm=256] ~ ~ ~ tp @s ~ ~256.0 ~ 8
execute @e[tag=entity:point,rym=8] ~ ~ ~ scoreboard players add @s pos:y 256
execute @e[tag=entity:point,rm=128] ~ ~ ~ tp @s ~ ~128.0 ~ 9
execute @e[tag=entity:point,rym=9] ~ ~ ~ scoreboard players add @s pos:y 128
execute @e[tag=entity:point,rm=64] ~ ~ ~ tp @s ~ ~64.0 ~ 10
execute @e[tag=entity:point,rym=10] ~ ~ ~ scoreboard players add @s pos:y 64
execute @e[tag=entity:point,rm=32] ~ ~ ~ tp @s ~ ~32.0 ~ 11
execute @e[tag=entity:point,rym=11] ~ ~ ~ scoreboard players add @s pos:y 32
execute @e[tag=entity:point,rm=16] ~ ~ ~ tp @s ~ ~16.0 ~ 12
execute @e[tag=entity:point,rym=12] ~ ~ ~ scoreboard players add @s pos:y 16
execute @e[tag=entity:point,rm=8] ~ ~ ~ tp @s ~ ~8.0 ~ 13
execute @e[tag=entity:point,rym=13] ~ ~ ~ scoreboard players add @s pos:y 8
execute @e[tag=entity:point,rm=4] ~ ~ ~ tp @s ~ ~4.0 ~ 14
execute @e[tag=entity:point,rym=14] ~ ~ ~ scoreboard players add @s pos:y 4
execute @e[tag=entity:point,rm=2] ~ ~ ~ tp @s ~ ~2.0 ~ 15
execute @e[tag=entity:point,rym=15] ~ ~ ~ scoreboard players add @s pos:y 2
execute @e[tag=entity:point,rm=1] ~ ~ ~ tp @s ~ ~1.0 ~ 16
execute @e[tag=entity:point,rym=16] ~ ~ ~ scoreboard players add @s pos:y 1
scoreboard players operation @s pos:y = @e[tag=entity:point] pos:y
