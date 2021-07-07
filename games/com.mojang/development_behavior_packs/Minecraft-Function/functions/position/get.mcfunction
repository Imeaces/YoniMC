scoreboard objectives add position.x dummy
scoreboard objectives add position.y dummy
scoreboard objectives add position.z dummy

tag @e[tag=function:position] remove function:position
tag @s add function:position

kill @e[tag=function:position_point]
summon minecraft:armor_stand
tag @e[tag=!function:position,c=1] add function:position_point





scoreboard players set @s position.x -1048576
tp @e[tag=function:position_point] -1048576.0 ~ ~ 179

execute @e[tag=function:position_point,rm=1048576] ~ ~ ~ tp ~1048576 ~ ~ 21
execute @e[tag=function:position_point,ry=21] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 1048576
execute @e[tag=function:position_point,rm=524288] ~ ~ ~ tp ~524288 ~ ~ 20
execute @e[tag=function:position_point,ry=20] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 524288
execute @e[tag=function:position_point,rm=262144] ~ ~ ~ tp ~262144 ~ ~ 19
execute @e[tag=function:position_point,ry=19] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 262144
execute @e[tag=function:position_point,rm=131072] ~ ~ ~ tp ~131072 ~ ~ 18
execute @e[tag=function:position_point,ry=18] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 131072
execute @e[tag=function:position_point,rm=65536] ~ ~ ~ tp ~65536 ~ ~ 17
execute @e[tag=function:position_point,ry=17] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 65536
execute @e[tag=function:position_point,rm=32768] ~ ~ ~ tp ~32768 ~ ~ 16
execute @e[tag=function:position_point,ry=16] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 32768
execute @e[tag=function:position_point,rm=16384] ~ ~ ~ tp ~16384 ~ ~ 15
execute @e[tag=function:position_point,ry=15] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 16384
execute @e[tag=function:position_point,rm=8192] ~ ~ ~ tp ~8192 ~ ~ 14
execute @e[tag=function:position_point,ry=14] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 8192
execute @e[tag=function:position_point,rm=4096] ~ ~ ~ tp ~4096 ~ ~ 13
execute @e[tag=function:position_point,ry=13] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 4096
execute @e[tag=function:position_point,rm=2048] ~ ~ ~ tp ~2048 ~ ~ 12
execute @e[tag=function:position_point,ry=12] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 2048
execute @e[tag=function:position_point,rm=1024] ~ ~ ~ tp ~1024 ~ ~ 11
execute @e[tag=function:position_point,ry=11] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 1024
execute @e[tag=function:position_point,rm=512] ~ ~ ~ tp ~512 ~ ~ 10
execute @e[tag=function:position_point,ry=10] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 512
execute @e[tag=function:position_point,rm=256] ~ ~ ~ tp ~256 ~ ~ 9
execute @e[tag=function:position_point,ry=9] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 256
execute @e[tag=function:position_point,rm=128] ~ ~ ~ tp ~128 ~ ~ 8
execute @e[tag=function:position_point,ry=8] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 128
execute @e[tag=function:position_point,rm=64] ~ ~ ~ tp ~64 ~ ~ 7
execute @e[tag=function:position_point,ry=7] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 64
execute @e[tag=function:position_point,rm=32] ~ ~ ~ tp ~32 ~ ~ 6
execute @e[tag=function:position_point,ry=6] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 32
execute @e[tag=function:position_point,rm=16] ~ ~ ~ tp ~16 ~ ~ 5
execute @e[tag=function:position_point,ry=5] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 16
execute @e[tag=function:position_point,rm=8] ~ ~ ~ tp ~8 ~ ~ 4
execute @e[tag=function:position_point,ry=4] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 8
execute @e[tag=function:position_point,rm=4] ~ ~ ~ tp ~4 ~ ~ 3
execute @e[tag=function:position_point,ry=3] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 4
execute @e[tag=function:position_point,rm=2] ~ ~ ~ tp ~2 ~ ~ 2
execute @e[tag=function:position_point,ry=2] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 2
execute @e[tag=function:position_point,rm=1] ~ ~ ~ tp ~1 ~ ~ 1
execute @e[tag=function:position_point,ry=1] ~ ~ ~ scoreboard players add @e[tag=function:position] position.x 1











scoreboard players set @s position.z -1048576
execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ -1048576.0 179

execute @e[tag=function:position_point,rm=1048576] ~ ~ ~ tp ~ ~ ~1048576 21
execute @e[tag=function:position_point,ry=21] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 1048576
execute @e[tag=function:position_point,rm=524288] ~ ~ ~ tp ~ ~ ~524288 20
execute @e[tag=function:position_point,ry=20] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 524288
execute @e[tag=function:position_point,rm=262144] ~ ~ ~ tp ~ ~ ~262144 19
execute @e[tag=function:position_point,ry=19] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 262144
execute @e[tag=function:position_point,rm=131072] ~ ~ ~ tp ~ ~ ~131072 18
execute @e[tag=function:position_point,ry=18] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 131072
execute @e[tag=function:position_point,rm=65536] ~ ~ ~ tp ~ ~ ~65536 17
execute @e[tag=function:position_point,ry=17] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 65536
execute @e[tag=function:position_point,rm=32768] ~ ~ ~ tp ~ ~ ~32768 16
execute @e[tag=function:position_point,ry=16] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 32768
execute @e[tag=function:position_point,rm=16384] ~ ~ ~ tp ~ ~ ~16384 15
execute @e[tag=function:position_point,ry=15] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 16384
execute @e[tag=function:position_point,rm=8192] ~ ~ ~ tp ~ ~ ~8192 14
execute @e[tag=function:position_point,ry=14] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 8192
execute @e[tag=function:position_point,rm=4096] ~ ~ ~ tp ~ ~ ~4096 13
execute @e[tag=function:position_point,ry=13] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 4096
execute @e[tag=function:position_point,rm=2048] ~ ~ ~ tp ~ ~ ~2048 12
execute @e[tag=function:position_point,ry=12] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 2048
execute @e[tag=function:position_point,rm=1024] ~ ~ ~ tp ~ ~ ~1024 11
execute @e[tag=function:position_point,ry=11] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 1024
execute @e[tag=function:position_point,rm=512] ~ ~ ~ tp ~ ~ ~512 10
execute @e[tag=function:position_point,ry=10] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 512
execute @e[tag=function:position_point,rm=256] ~ ~ ~ tp ~ ~ ~256 9
execute @e[tag=function:position_point,ry=9] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 256
execute @e[tag=function:position_point,rm=128] ~ ~ ~ tp ~ ~ ~128 8
execute @e[tag=function:position_point,ry=8] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 128
execute @e[tag=function:position_point,rm=64] ~ ~ ~ tp ~ ~ ~64 7
execute @e[tag=function:position_point,ry=7] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 64
execute @e[tag=function:position_point,rm=32] ~ ~ ~ tp ~ ~ ~32 6
execute @e[tag=function:position_point,ry=6] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 32
execute @e[tag=function:position_point,rm=16] ~ ~ ~ tp ~ ~ ~16 5
execute @e[tag=function:position_point,ry=5] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 16
execute @e[tag=function:position_point,rm=8] ~ ~ ~ tp ~ ~ ~8 4
execute @e[tag=function:position_point,ry=4] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 8
execute @e[tag=function:position_point,rm=4] ~ ~ ~ tp ~ ~ ~4 3
execute @e[tag=function:position_point,ry=3] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 4
execute @e[tag=function:position_point,rm=2] ~ ~ ~ tp ~ ~ ~2 2
execute @e[tag=function:position_point,ry=2] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 2
execute @e[tag=function:position_point,rm=1] ~ ~ ~ tp ~ ~ ~1 1
execute @e[tag=function:position_point,ry=1] ~ ~ ~ scoreboard players add @e[tag=function:position] position.z 1












scoreboard players set @s position.y -1024
execute @e[tag=function:position_point] ~ ~ ~ tp ~ -1024 ~ 179

execute @e[tag=function:position_point,rm=1024] ~ ~ ~ tp ~ ~1024 ~ 11
execute @e[tag=function:position_point,ry=11] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 1024
execute @e[tag=function:position_point,rm=512] ~ ~ ~ tp ~ ~512 ~ 10
execute @e[tag=function:position_point,ry=10] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 512
execute @e[tag=function:position_point,rm=256] ~ ~ ~ tp ~ ~256 ~ 9
execute @e[tag=function:position_point,ry=9] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 256
execute @e[tag=function:position_point,rm=128] ~ ~ ~ tp ~ ~128 ~ 8
execute @e[tag=function:position_point,ry=8] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 128
execute @e[tag=function:position_point,rm=64] ~ ~ ~ tp ~ ~64 ~ 7
execute @e[tag=function:position_point,ry=7] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 64
execute @e[tag=function:position_point,rm=32] ~ ~ ~ tp ~ ~32 ~ 6
execute @e[tag=function:position_point,ry=6] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 32
execute @e[tag=function:position_point,rm=16] ~ ~ ~ tp ~ ~16 ~ 5
execute @e[tag=function:position_point,ry=5] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 16
execute @e[tag=function:position_point,rm=8] ~ ~ ~ tp ~ ~8 ~ 4
execute @e[tag=function:position_point,ry=4] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 8
execute @e[tag=function:position_point,rm=4] ~ ~ ~ tp ~ ~4 ~ 3
execute @e[tag=function:position_point,ry=3] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 4
execute @e[tag=function:position_point,rm=2] ~ ~ ~ tp ~ ~2 ~ 2
execute @e[tag=function:position_point,ry=2] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 2
execute @e[tag=function:position_point,rm=1] ~ ~ ~ tp ~ ~1 ~ 1
execute @e[tag=function:position_point,ry=1] ~ ~ ~ scoreboard players add @e[tag=function:position] position.y 1







tag @s remove function:position
tp @e[tag=function:position_point] ~ -1000 ~
kill @e[tag=function:position_point]
