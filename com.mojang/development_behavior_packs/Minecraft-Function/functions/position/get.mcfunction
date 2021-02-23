# tag executor & create entity as point 
tag @e[tag=tag.position_get] remove tag.position_get
tag @s add tag.position_get
kill @e[tag=point.position_get]
execute @e[tag=tag.position_get] ~ ~ ~ summon minecraft:armor_stand tag.position_get
execute @e[tag=tag.position_get] ~ ~ ~ tag @e[tag=!tag.position_get,c=1] add point.position_get

#init that get position x
scoreboard players set @s pos.x -1048576
tp @e[tag=point.position_get] -1048576.0 ~ ~ 179

execute @e[tag=point.position_get,rm=1048576] ~ ~ ~ tp ~1048576 ~ ~ 21
execute @e[tag=point.position_get,ry=21] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 1048576
execute @e[tag=point.position_get,rm=524288] ~ ~ ~ tp ~524288 ~ ~ 20
execute @e[tag=point.position_get,ry=20] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 524288
execute @e[tag=point.position_get,rm=262144] ~ ~ ~ tp ~262144 ~ ~ 19
execute @e[tag=point.position_get,ry=19] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 262144
execute @e[tag=point.position_get,rm=131072] ~ ~ ~ tp ~131072 ~ ~ 18
execute @e[tag=point.position_get,ry=18] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 131072
execute @e[tag=point.position_get,rm=65536] ~ ~ ~ tp ~65536 ~ ~ 17
execute @e[tag=point.position_get,ry=17] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 65536
execute @e[tag=point.position_get,rm=32768] ~ ~ ~ tp ~32768 ~ ~ 16
execute @e[tag=point.position_get,ry=16] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 32768
execute @e[tag=point.position_get,rm=16384] ~ ~ ~ tp ~16384 ~ ~ 15
execute @e[tag=point.position_get,ry=15] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 16384
execute @e[tag=point.position_get,rm=8192] ~ ~ ~ tp ~8192 ~ ~ 14
execute @e[tag=point.position_get,ry=14] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 8192
execute @e[tag=point.position_get,rm=4096] ~ ~ ~ tp ~4096 ~ ~ 13
execute @e[tag=point.position_get,ry=13] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 4096
execute @e[tag=point.position_get,rm=2048] ~ ~ ~ tp ~2048 ~ ~ 12
execute @e[tag=point.position_get,ry=12] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 2048
execute @e[tag=point.position_get,rm=1024] ~ ~ ~ tp ~1024 ~ ~ 11
execute @e[tag=point.position_get,ry=11] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 1024
execute @e[tag=point.position_get,rm=512] ~ ~ ~ tp ~512 ~ ~ 10
execute @e[tag=point.position_get,ry=10] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 512
execute @e[tag=point.position_get,rm=256] ~ ~ ~ tp ~256 ~ ~ 9
execute @e[tag=point.position_get,ry=9] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 256
execute @e[tag=point.position_get,rm=128] ~ ~ ~ tp ~128 ~ ~ 8
execute @e[tag=point.position_get,ry=8] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 128
execute @e[tag=point.position_get,rm=64] ~ ~ ~ tp ~64 ~ ~ 7
execute @e[tag=point.position_get,ry=7] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 64
execute @e[tag=point.position_get,rm=32] ~ ~ ~ tp ~32 ~ ~ 6
execute @e[tag=point.position_get,ry=6] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 32
execute @e[tag=point.position_get,rm=16] ~ ~ ~ tp ~16 ~ ~ 5
execute @e[tag=point.position_get,ry=5] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 16
execute @e[tag=point.position_get,rm=8] ~ ~ ~ tp ~8 ~ ~ 4
execute @e[tag=point.position_get,ry=4] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 8
execute @e[tag=point.position_get,rm=4] ~ ~ ~ tp ~4 ~ ~ 3
execute @e[tag=point.position_get,ry=3] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 4
execute @e[tag=point.position_get,rm=2] ~ ~ ~ tp ~2 ~ ~ 2
execute @e[tag=point.position_get,ry=2] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 2
execute @e[tag=point.position_get,rm=1] ~ ~ ~ tp ~1 ~ ~ 1
execute @e[tag=point.position_get,ry=1] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.x 1

#init that get position z
scoreboard players set @s pos.z -1048576
execute @e[tag=point.position_get] ~ ~ ~ tp ~ ~ -1048576.0 179

execute @e[tag=point.position_get,rm=1048576] ~ ~ ~ tp ~ ~ ~1048576 21
execute @e[tag=point.position_get,ry=21] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 1048576
execute @e[tag=point.position_get,rm=524288] ~ ~ ~ tp ~ ~ ~524288 20
execute @e[tag=point.position_get,ry=20] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 524288
execute @e[tag=point.position_get,rm=262144] ~ ~ ~ tp ~ ~ ~262144 19
execute @e[tag=point.position_get,ry=19] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 262144
execute @e[tag=point.position_get,rm=131072] ~ ~ ~ tp ~ ~ ~131072 18
execute @e[tag=point.position_get,ry=18] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 131072
execute @e[tag=point.position_get,rm=65536] ~ ~ ~ tp ~ ~ ~65536 17
execute @e[tag=point.position_get,ry=17] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 65536
execute @e[tag=point.position_get,rm=32768] ~ ~ ~ tp ~ ~ ~32768 16
execute @e[tag=point.position_get,ry=16] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 32768
execute @e[tag=point.position_get,rm=16384] ~ ~ ~ tp ~ ~ ~16384 15
execute @e[tag=point.position_get,ry=15] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 16384
execute @e[tag=point.position_get,rm=8192] ~ ~ ~ tp ~ ~ ~8192 14
execute @e[tag=point.position_get,ry=14] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 8192
execute @e[tag=point.position_get,rm=4096] ~ ~ ~ tp ~ ~ ~4096 13
execute @e[tag=point.position_get,ry=13] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 4096
execute @e[tag=point.position_get,rm=2048] ~ ~ ~ tp ~ ~ ~2048 12
execute @e[tag=point.position_get,ry=12] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 2048
execute @e[tag=point.position_get,rm=1024] ~ ~ ~ tp ~ ~ ~1024 11
execute @e[tag=point.position_get,ry=11] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 1024
execute @e[tag=point.position_get,rm=512] ~ ~ ~ tp ~ ~ ~512 10
execute @e[tag=point.position_get,ry=10] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 512
execute @e[tag=point.position_get,rm=256] ~ ~ ~ tp ~ ~ ~256 9
execute @e[tag=point.position_get,ry=9] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 256
execute @e[tag=point.position_get,rm=128] ~ ~ ~ tp ~ ~ ~128 8
execute @e[tag=point.position_get,ry=8] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 128
execute @e[tag=point.position_get,rm=64] ~ ~ ~ tp ~ ~ ~64 7
execute @e[tag=point.position_get,ry=7] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 64
execute @e[tag=point.position_get,rm=32] ~ ~ ~ tp ~ ~ ~32 6
execute @e[tag=point.position_get,ry=6] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 32
execute @e[tag=point.position_get,rm=16] ~ ~ ~ tp ~ ~ ~16 5
execute @e[tag=point.position_get,ry=5] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 16
execute @e[tag=point.position_get,rm=8] ~ ~ ~ tp ~ ~ ~8 4
execute @e[tag=point.position_get,ry=4] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 8
execute @e[tag=point.position_get,rm=4] ~ ~ ~ tp ~ ~ ~4 3
execute @e[tag=point.position_get,ry=3] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 4
execute @e[tag=point.position_get,rm=2] ~ ~ ~ tp ~ ~ ~2 2
execute @e[tag=point.position_get,ry=2] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 2
execute @e[tag=point.position_get,rm=1] ~ ~ ~ tp ~ ~ ~1 1
execute @e[tag=point.position_get,ry=1] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.z 1


#init that get position y
scoreboard players set @s pos.y -1024
execute @e[tag=point.position_get] ~ ~ ~ tp ~ -1024 ~ 179

execute @e[tag=point.position_get,rm=1024] ~ ~ ~ tp ~ ~1024 ~ 11
execute @e[tag=point.position_get,ry=11] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 1024
execute @e[tag=point.position_get,rm=512] ~ ~ ~ tp ~ ~512 ~ 10
execute @e[tag=point.position_get,ry=10] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 512
execute @e[tag=point.position_get,rm=256] ~ ~ ~ tp ~ ~256 ~ 9
execute @e[tag=point.position_get,ry=9] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 256
execute @e[tag=point.position_get,rm=128] ~ ~ ~ tp ~ ~128 ~ 8
execute @e[tag=point.position_get,ry=8] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 128
execute @e[tag=point.position_get,rm=64] ~ ~ ~ tp ~ ~64 ~ 7
execute @e[tag=point.position_get,ry=7] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 64
execute @e[tag=point.position_get,rm=32] ~ ~ ~ tp ~ ~32 ~ 6
execute @e[tag=point.position_get,ry=6] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 32
execute @e[tag=point.position_get,rm=16] ~ ~ ~ tp ~ ~16 ~ 5
execute @e[tag=point.position_get,ry=5] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 16
execute @e[tag=point.position_get,rm=8] ~ ~ ~ tp ~ ~8 ~ 4
execute @e[tag=point.position_get,ry=4] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 8
execute @e[tag=point.position_get,rm=4] ~ ~ ~ tp ~ ~4 ~ 3
execute @e[tag=point.position_get,ry=3] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 4
execute @e[tag=point.position_get,rm=2] ~ ~ ~ tp ~ ~2 ~ 2
execute @e[tag=point.position_get,ry=2] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 2
execute @e[tag=point.position_get,rm=1] ~ ~ ~ tp ~ ~1 ~ 1
execute @e[tag=point.position_get,ry=1] ~ ~ ~ scoreboard players add @e[tag=tag.position_get] pos.y 1

#unset tag & remove point entity
tag @s remove tag.position_get
tp @e[tag=point.position_get] ~ ~-20 ~
kill @e[tag=point.position_get]
