scoreboard objectives add pos_x dummy
scoreboard objectives add pos_y dummy
scoreboard objectives add pos_z dummy
scoreboard objectives add tmp_041316191644 dummy
scoreboard objectives add tmp_041191676495 dummy
scoreboard players reset * tmp_041191676495
summon minecraft:armor_stand ~ ~ ~
scoreboard players set @e[type=minecraft:armor_stand,c=1] tmp_041191676495 1
scoreboard players set @s tmp_041191676495 2

# get x pos
scoreboard players set @e[scores={tmp_041191676495=1}] tmp_041316191644 -1048576
tp @e[scores={tmp_041191676495=1}] -1048576.0 ~ ~ 0
execute @e[scores={tmp_041191676495=1},rm=1048576] ~ ~ ~ tp @s ~1048576 ~ ~ 12
execute @e[scores={tmp_041191676495=1},rym=12] ~ ~ ~ scoreboard players add @s tmp_041316191644 1048576
execute @e[scores={tmp_041191676495=1},rm=524288] ~ ~ ~ tp @s ~524288 ~ ~ 13
execute @e[scores={tmp_041191676495=1},rym=13] ~ ~ ~ scoreboard players add @s tmp_041316191644 524288
execute @e[scores={tmp_041191676495=1},rm=262144] ~ ~ ~ tp @s ~262144 ~ ~ 14
execute @e[scores={tmp_041191676495=1},rym=14] ~ ~ ~ scoreboard players add @s tmp_041316191644 262144
execute @e[scores={tmp_041191676495=1},rm=131072] ~ ~ ~ tp @s ~131072 ~ ~ 15
execute @e[scores={tmp_041191676495=1},rym=15] ~ ~ ~ scoreboard players add @s tmp_041316191644 131072
execute @e[scores={tmp_041191676495=1},rm=65536] ~ ~ ~ tp @s ~65536 ~ ~ 16
execute @e[scores={tmp_041191676495=1},rym=16] ~ ~ ~ scoreboard players add @s tmp_041316191644 65536
execute @e[scores={tmp_041191676495=1},rm=32768] ~ ~ ~ tp @s ~32768 ~ ~ 17
execute @e[scores={tmp_041191676495=1},rym=17] ~ ~ ~ scoreboard players add @s tmp_041316191644 32768
execute @e[scores={tmp_041191676495=1},rm=16384] ~ ~ ~ tp @s ~16384 ~ ~ 18
execute @e[scores={tmp_041191676495=1},rym=18] ~ ~ ~ scoreboard players add @s tmp_041316191644 16384
execute @e[scores={tmp_041191676495=1},rm=8192] ~ ~ ~ tp @s ~8192 ~ ~ 19
execute @e[scores={tmp_041191676495=1},rym=19] ~ ~ ~ scoreboard players add @s tmp_041316191644 8192
execute @e[scores={tmp_041191676495=1},rm=4096] ~ ~ ~ tp @s ~4096 ~ ~ 20
execute @e[scores={tmp_041191676495=1},rym=20] ~ ~ ~ scoreboard players add @s tmp_041316191644 4096
execute @e[scores={tmp_041191676495=1},rm=2048] ~ ~ ~ tp @s ~2048 ~ ~ 21
execute @e[scores={tmp_041191676495=1},rym=21] ~ ~ ~ scoreboard players add @s tmp_041316191644 2048
execute @e[scores={tmp_041191676495=1},rm=1024] ~ ~ ~ tp @s ~1024 ~ ~ 22
execute @e[scores={tmp_041191676495=1},rym=22] ~ ~ ~ scoreboard players add @s tmp_041316191644 1024
execute @e[scores={tmp_041191676495=1},rm=512] ~ ~ ~ tp @s ~512 ~ ~ 23
execute @e[scores={tmp_041191676495=1},rym=23] ~ ~ ~ scoreboard players add @s tmp_041316191644 512
execute @e[scores={tmp_041191676495=1},rm=256] ~ ~ ~ tp @s ~256 ~ ~ 24
execute @e[scores={tmp_041191676495=1},rym=24] ~ ~ ~ scoreboard players add @s tmp_041316191644 256
execute @e[scores={tmp_041191676495=1},rm=128] ~ ~ ~ tp @s ~128 ~ ~ 25
execute @e[scores={tmp_041191676495=1},rym=25] ~ ~ ~ scoreboard players add @s tmp_041316191644 128
execute @e[scores={tmp_041191676495=1},rm=64] ~ ~ ~ tp @s ~64 ~ ~ 26
execute @e[scores={tmp_041191676495=1},rym=26] ~ ~ ~ scoreboard players add @s tmp_041316191644 64
execute @e[scores={tmp_041191676495=1},rm=32] ~ ~ ~ tp @s ~32 ~ ~ 27
execute @e[scores={tmp_041191676495=1},rym=27] ~ ~ ~ scoreboard players add @s tmp_041316191644 32
execute @e[scores={tmp_041191676495=1},rm=16] ~ ~ ~ tp @s ~16 ~ ~ 28
execute @e[scores={tmp_041191676495=1},rym=28] ~ ~ ~ scoreboard players add @s tmp_041316191644 16
execute @e[scores={tmp_041191676495=1},rm=8] ~ ~ ~ tp @s ~8 ~ ~ 29
execute @e[scores={tmp_041191676495=1},rym=29] ~ ~ ~ scoreboard players add @s tmp_041316191644 8
execute @e[scores={tmp_041191676495=1},rm=4] ~ ~ ~ tp @s ~4 ~ ~ 30
execute @e[scores={tmp_041191676495=1},rym=30] ~ ~ ~ scoreboard players add @s tmp_041316191644 4
execute @e[scores={tmp_041191676495=1},rm=2] ~ ~ ~ tp @s ~2 ~ ~ 31
execute @e[scores={tmp_041191676495=1},rym=31] ~ ~ ~ scoreboard players add @s tmp_041316191644 2
execute @e[scores={tmp_041191676495=1},rm=1] ~ ~ ~ tp @s ~1 ~ ~ 32
execute @e[scores={tmp_041191676495=1},rym=32] ~ ~ ~ scoreboard players add @s tmp_041316191644 1
scoreboard players operation @s pos_x = @e[scores={tmp_041191676495=1}] tmp_041316191644

# get y pos
scoreboard players set @e[scores={tmp_041191676495=1}] tmp_041316191644 -1048576
tp @e[scores={tmp_041191676495=1}] ~ -1048576.0 ~ 0
execute @e[scores={tmp_041191676495=1},rm=1048576] ~ ~ ~ tp @s ~ ~1048576 ~ 12
execute @e[scores={tmp_041191676495=1},rym=12] ~ ~ ~ scoreboard players add @s tmp_041316191644 1048576
execute @e[scores={tmp_041191676495=1},rm=524288] ~ ~ ~ tp @s ~ ~524288 ~ 13
execute @e[scores={tmp_041191676495=1},rym=13] ~ ~ ~ scoreboard players add @s tmp_041316191644 524288
execute @e[scores={tmp_041191676495=1},rm=262144] ~ ~ ~ tp @s ~ ~262144 ~ 14
execute @e[scores={tmp_041191676495=1},rym=14] ~ ~ ~ scoreboard players add @s tmp_041316191644 262144
execute @e[scores={tmp_041191676495=1},rm=131072] ~ ~ ~ tp @s ~ ~131072 ~ 15
execute @e[scores={tmp_041191676495=1},rym=15] ~ ~ ~ scoreboard players add @s tmp_041316191644 131072
execute @e[scores={tmp_041191676495=1},rm=65536] ~ ~ ~ tp @s ~ ~65536 ~ 16
execute @e[scores={tmp_041191676495=1},rym=16] ~ ~ ~ scoreboard players add @s tmp_041316191644 65536
execute @e[scores={tmp_041191676495=1},rm=32768] ~ ~ ~ tp @s ~ ~32768 ~ 17
execute @e[scores={tmp_041191676495=1},rym=17] ~ ~ ~ scoreboard players add @s tmp_041316191644 32768
execute @e[scores={tmp_041191676495=1},rm=16384] ~ ~ ~ tp @s ~ ~16384 ~ 18
execute @e[scores={tmp_041191676495=1},rym=18] ~ ~ ~ scoreboard players add @s tmp_041316191644 16384
execute @e[scores={tmp_041191676495=1},rm=8192] ~ ~ ~ tp @s ~ ~8192 ~ 19
execute @e[scores={tmp_041191676495=1},rym=19] ~ ~ ~ scoreboard players add @s tmp_041316191644 8192
execute @e[scores={tmp_041191676495=1},rm=4096] ~ ~ ~ tp @s ~ ~4096 ~ 20
execute @e[scores={tmp_041191676495=1},rym=20] ~ ~ ~ scoreboard players add @s tmp_041316191644 4096
execute @e[scores={tmp_041191676495=1},rm=2048] ~ ~ ~ tp @s ~ ~2048 ~ 21
execute @e[scores={tmp_041191676495=1},rym=21] ~ ~ ~ scoreboard players add @s tmp_041316191644 2048
execute @e[scores={tmp_041191676495=1},rm=1024] ~ ~ ~ tp @s ~ ~1024 ~ 22
execute @e[scores={tmp_041191676495=1},rym=22] ~ ~ ~ scoreboard players add @s tmp_041316191644 1024
execute @e[scores={tmp_041191676495=1},rm=512] ~ ~ ~ tp @s ~ ~512 ~ 23
execute @e[scores={tmp_041191676495=1},rym=23] ~ ~ ~ scoreboard players add @s tmp_041316191644 512
execute @e[scores={tmp_041191676495=1},rm=256] ~ ~ ~ tp @s ~ ~256 ~ 24
execute @e[scores={tmp_041191676495=1},rym=24] ~ ~ ~ scoreboard players add @s tmp_041316191644 256
execute @e[scores={tmp_041191676495=1},rm=128] ~ ~ ~ tp @s ~ ~128 ~ 25
execute @e[scores={tmp_041191676495=1},rym=25] ~ ~ ~ scoreboard players add @s tmp_041316191644 128
execute @e[scores={tmp_041191676495=1},rm=64] ~ ~ ~ tp @s ~ ~64 ~ 26
execute @e[scores={tmp_041191676495=1},rym=26] ~ ~ ~ scoreboard players add @s tmp_041316191644 64
execute @e[scores={tmp_041191676495=1},rm=32] ~ ~ ~ tp @s ~ ~32 ~ 27
execute @e[scores={tmp_041191676495=1},rym=27] ~ ~ ~ scoreboard players add @s tmp_041316191644 32
execute @e[scores={tmp_041191676495=1},rm=16] ~ ~ ~ tp @s ~ ~16 ~ 28
execute @e[scores={tmp_041191676495=1},rym=28] ~ ~ ~ scoreboard players add @s tmp_041316191644 16
execute @e[scores={tmp_041191676495=1},rm=8] ~ ~ ~ tp @s ~ ~8 ~ 29
execute @e[scores={tmp_041191676495=1},rym=29] ~ ~ ~ scoreboard players add @s tmp_041316191644 8
execute @e[scores={tmp_041191676495=1},rm=4] ~ ~ ~ tp @s ~ ~4 ~ 30
execute @e[scores={tmp_041191676495=1},rym=30] ~ ~ ~ scoreboard players add @s tmp_041316191644 4
execute @e[scores={tmp_041191676495=1},rm=2] ~ ~ ~ tp @s ~ ~2 ~ 31
execute @e[scores={tmp_041191676495=1},rym=31] ~ ~ ~ scoreboard players add @s tmp_041316191644 2
execute @e[scores={tmp_041191676495=1},rm=1] ~ ~ ~ tp @s ~ ~1 ~ 32
execute @e[scores={tmp_041191676495=1},rym=32] ~ ~ ~ scoreboard players add @s tmp_041316191644 1
scoreboard players operation @s pos_y = @e[scores={tmp_041191676495=1}] tmp_041316191644

# get z pos
scoreboard players set @e[scores={tmp_041191676495=1}] tmp_041316191644 -1048576
tp @e[scores={tmp_041191676495=1}] ~ ~ -1048576.0 0
execute @e[scores={tmp_041191676495=1},rm=1048576] ~ ~ ~ tp @s ~ ~ ~1048576 12
execute @e[scores={tmp_041191676495=1},rym=12] ~ ~ ~ scoreboard players add @s tmp_041316191644 1048576
execute @e[scores={tmp_041191676495=1},rm=524288] ~ ~ ~ tp @s ~ ~ ~524288 13
execute @e[scores={tmp_041191676495=1},rym=13] ~ ~ ~ scoreboard players add @s tmp_041316191644 524288
execute @e[scores={tmp_041191676495=1},rm=262144] ~ ~ ~ tp @s ~ ~ ~262144 14
execute @e[scores={tmp_041191676495=1},rym=14] ~ ~ ~ scoreboard players add @s tmp_041316191644 262144
execute @e[scores={tmp_041191676495=1},rm=131072] ~ ~ ~ tp @s ~ ~ ~131072 15
execute @e[scores={tmp_041191676495=1},rym=15] ~ ~ ~ scoreboard players add @s tmp_041316191644 131072
execute @e[scores={tmp_041191676495=1},rm=65536] ~ ~ ~ tp @s ~ ~ ~65536 16
execute @e[scores={tmp_041191676495=1},rym=16] ~ ~ ~ scoreboard players add @s tmp_041316191644 65536
execute @e[scores={tmp_041191676495=1},rm=32768] ~ ~ ~ tp @s ~ ~ ~32768 17
execute @e[scores={tmp_041191676495=1},rym=17] ~ ~ ~ scoreboard players add @s tmp_041316191644 32768
execute @e[scores={tmp_041191676495=1},rm=16384] ~ ~ ~ tp @s ~ ~ ~16384 18
execute @e[scores={tmp_041191676495=1},rym=18] ~ ~ ~ scoreboard players add @s tmp_041316191644 16384
execute @e[scores={tmp_041191676495=1},rm=8192] ~ ~ ~ tp @s ~ ~ ~8192 19
execute @e[scores={tmp_041191676495=1},rym=19] ~ ~ ~ scoreboard players add @s tmp_041316191644 8192
execute @e[scores={tmp_041191676495=1},rm=4096] ~ ~ ~ tp @s ~ ~ ~4096 20
execute @e[scores={tmp_041191676495=1},rym=20] ~ ~ ~ scoreboard players add @s tmp_041316191644 4096
execute @e[scores={tmp_041191676495=1},rm=2048] ~ ~ ~ tp @s ~ ~ ~2048 21
execute @e[scores={tmp_041191676495=1},rym=21] ~ ~ ~ scoreboard players add @s tmp_041316191644 2048
execute @e[scores={tmp_041191676495=1},rm=1024] ~ ~ ~ tp @s ~ ~ ~1024 22
execute @e[scores={tmp_041191676495=1},rym=22] ~ ~ ~ scoreboard players add @s tmp_041316191644 1024
execute @e[scores={tmp_041191676495=1},rm=512] ~ ~ ~ tp @s ~ ~ ~512 23
execute @e[scores={tmp_041191676495=1},rym=23] ~ ~ ~ scoreboard players add @s tmp_041316191644 512
execute @e[scores={tmp_041191676495=1},rm=256] ~ ~ ~ tp @s ~ ~ ~256 24
execute @e[scores={tmp_041191676495=1},rym=24] ~ ~ ~ scoreboard players add @s tmp_041316191644 256
execute @e[scores={tmp_041191676495=1},rm=128] ~ ~ ~ tp @s ~ ~ ~128 25
execute @e[scores={tmp_041191676495=1},rym=25] ~ ~ ~ scoreboard players add @s tmp_041316191644 128
execute @e[scores={tmp_041191676495=1},rm=64] ~ ~ ~ tp @s ~ ~ ~64 26
execute @e[scores={tmp_041191676495=1},rym=26] ~ ~ ~ scoreboard players add @s tmp_041316191644 64
execute @e[scores={tmp_041191676495=1},rm=32] ~ ~ ~ tp @s ~ ~ ~32 27
execute @e[scores={tmp_041191676495=1},rym=27] ~ ~ ~ scoreboard players add @s tmp_041316191644 32
execute @e[scores={tmp_041191676495=1},rm=16] ~ ~ ~ tp @s ~ ~ ~16 28
execute @e[scores={tmp_041191676495=1},rym=28] ~ ~ ~ scoreboard players add @s tmp_041316191644 16
execute @e[scores={tmp_041191676495=1},rm=8] ~ ~ ~ tp @s ~ ~ ~8 29
execute @e[scores={tmp_041191676495=1},rym=29] ~ ~ ~ scoreboard players add @s tmp_041316191644 8
execute @e[scores={tmp_041191676495=1},rm=4] ~ ~ ~ tp @s ~ ~ ~4 30
execute @e[scores={tmp_041191676495=1},rym=30] ~ ~ ~ scoreboard players add @s tmp_041316191644 4
execute @e[scores={tmp_041191676495=1},rm=2] ~ ~ ~ tp @s ~ ~ ~2 31
execute @e[scores={tmp_041191676495=1},rym=31] ~ ~ ~ scoreboard players add @s tmp_041316191644 2
execute @e[scores={tmp_041191676495=1},rm=1] ~ ~ ~ tp @s ~ ~ ~1 32
execute @e[scores={tmp_041191676495=1},rym=32] ~ ~ ~ scoreboard players add @s tmp_041316191644 1
scoreboard players operation @s pos_z = @e[scores={tmp_041191676495=1}] tmp_041316191644

kill @e[scores={tmp_041191676495=1}]
#scoreboard objectives remove tmp_041316191644
#scoreboard objectives remove tmp_041191676495
