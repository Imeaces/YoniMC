# get z pos
scoreboard players set @e[tag=entity:point] pos:z -1048576
tp @e[tag=entity:point] ~ ~ -1048576.0 0
execute @e[tag=entity:point,rm=1048576] ~ ~ ~ tp @s ~ ~ ~1048576.0 1
execute @e[tag=entity:point,rym=1] ~ ~ ~ scoreboard players add @s pos:z 1048576
execute @e[tag=entity:point,rm=524288] ~ ~ ~ tp @s ~ ~ ~524288.0 2
execute @e[tag=entity:point,rym=2] ~ ~ ~ scoreboard players add @s pos:z 524288
execute @e[tag=entity:point,rm=262144] ~ ~ ~ tp @s ~ ~ ~262144.0 3
execute @e[tag=entity:point,rym=3] ~ ~ ~ scoreboard players add @s pos:z 262144
execute @e[tag=entity:point,rm=131072] ~ ~ ~ tp @s ~ ~ ~131072.0 4
execute @e[tag=entity:point,rym=4] ~ ~ ~ scoreboard players add @s pos:z 131072
execute @e[tag=entity:point,rm=65536] ~ ~ ~ tp @s ~ ~ ~65536.0 5
execute @e[tag=entity:point,rym=5] ~ ~ ~ scoreboard players add @s pos:z 65536
execute @e[tag=entity:point,rm=32768] ~ ~ ~ tp @s ~ ~ ~32768.0 6
execute @e[tag=entity:point,rym=6] ~ ~ ~ scoreboard players add @s pos:z 32768
execute @e[tag=entity:point,rm=16384] ~ ~ ~ tp @s ~ ~ ~16384.0 7
execute @e[tag=entity:point,rym=7] ~ ~ ~ scoreboard players add @s pos:z 16384
execute @e[tag=entity:point,rm=8192] ~ ~ ~ tp @s ~ ~ ~8192.0 8
execute @e[tag=entity:point,rym=8] ~ ~ ~ scoreboard players add @s pos:z 8192
execute @e[tag=entity:point,rm=4096] ~ ~ ~ tp @s ~ ~ ~4096.0 9
execute @e[tag=entity:point,rym=9] ~ ~ ~ scoreboard players add @s pos:z 4096
execute @e[tag=entity:point,rm=2048] ~ ~ ~ tp @s ~ ~ ~2048.0 10
execute @e[tag=entity:point,rym=10] ~ ~ ~ scoreboard players add @s pos:z 2048
execute @e[tag=entity:point,rm=1024] ~ ~ ~ tp @s ~ ~ ~1024.0 11
execute @e[tag=entity:point,rym=11] ~ ~ ~ scoreboard players add @s pos:z 1024
execute @e[tag=entity:point,rm=512] ~ ~ ~ tp @s ~ ~ ~512.0 12
execute @e[tag=entity:point,rym=12] ~ ~ ~ scoreboard players add @s pos:z 512
execute @e[tag=entity:point,rm=256] ~ ~ ~ tp @s ~ ~ ~256.0 13
execute @e[tag=entity:point,rym=13] ~ ~ ~ scoreboard players add @s pos:z 256
execute @e[tag=entity:point,rm=128] ~ ~ ~ tp @s ~ ~ ~128.0 14
execute @e[tag=entity:point,rym=14] ~ ~ ~ scoreboard players add @s pos:z 128
execute @e[tag=entity:point,rm=64] ~ ~ ~ tp @s ~ ~ ~64.0 15
execute @e[tag=entity:point,rym=15] ~ ~ ~ scoreboard players add @s pos:z 64
execute @e[tag=entity:point,rm=32] ~ ~ ~ tp @s ~ ~ ~32.0 16
execute @e[tag=entity:point,rym=16] ~ ~ ~ scoreboard players add @s pos:z 32
execute @e[tag=entity:point,rm=16] ~ ~ ~ tp @s ~ ~ ~16.0 17
execute @e[tag=entity:point,rym=17] ~ ~ ~ scoreboard players add @s pos:z 16
execute @e[tag=entity:point,rm=8] ~ ~ ~ tp @s ~ ~ ~8.0 18
execute @e[tag=entity:point,rym=18] ~ ~ ~ scoreboard players add @s pos:z 8
execute @e[tag=entity:point,rm=4] ~ ~ ~ tp @s ~ ~ ~4.0 19
execute @e[tag=entity:point,rym=19] ~ ~ ~ scoreboard players add @s pos:z 4
execute @e[tag=entity:point,rm=2] ~ ~ ~ tp @s ~ ~ ~2.0 20
execute @e[tag=entity:point,rym=20] ~ ~ ~ scoreboard players add @s pos:z 2
execute @e[tag=entity:point,rm=1] ~ ~ ~ tp @s ~ ~ ~1.0 21
execute @e[tag=entity:point,rym=21] ~ ~ ~ scoreboard players add @s pos:z 1
scoreboard players operation @s pos:z = @e[tag=entity:point] pos:z

