scoreboard objectives add pos_x dummy
scoreboard objectives add pos_y dummy
scoreboard objectives add pos_z dummy
scoreboard objectives add tmp_041316191644 dummy
scoreboard objectives add tmp_041191676495 dummy
scoreboard players reset * tmp_041191676495
summon minecraft:armor_stand ~ ~ ~
scoreboard players set @e[type=minecraft:armor_stand,c=1] tmp_041191676495 1
scoreboard players set @s tmp_041191676495 2
scoreboard players set @a[scores={tmp_041191676495=2}] tmp_041191676495 3

# @e[scores={tmp_041191676495=1}] pos_stand
# @e[scores={tmp_041191676495=2}] pos_who
# @a[scores={tmp_041191676495=3}] pos_player_who

# get x pos
scoreboard players set @e[scores={tmp_041191676495=1}] tmp_041316191644 -1073741824
tp @e[scores={tmp_041191676495=1}] -10737418.24 ~ ~ 0
execute @e[scores={tmp_041191676495=1},rm=10737418.24] ~ ~ ~ tp @s ~10737418.24 ~ ~ 2
execute @e[scores={tmp_041191676495=1},rym=2] ~ ~ ~ scoreboard players add @s tmp_041316191644 1073741824
execute @e[scores={tmp_041191676495=1},rm=5368709.12] ~ ~ ~ tp @s ~5368709.12 ~ ~ 3
execute @e[scores={tmp_041191676495=1},rym=3] ~ ~ ~ scoreboard players add @s tmp_041316191644 536870912
execute @e[scores={tmp_041191676495=1},rm=2684354.56] ~ ~ ~ tp @s ~2684354.56 ~ ~ 4
execute @e[scores={tmp_041191676495=1},rym=4] ~ ~ ~ scoreboard players add @s tmp_041316191644 268435456
execute @e[scores={tmp_041191676495=1},rm=1342177.28] ~ ~ ~ tp @s ~1342177.28 ~ ~ 5
execute @e[scores={tmp_041191676495=1},rym=5] ~ ~ ~ scoreboard players add @s tmp_041316191644 134217728
execute @e[scores={tmp_041191676495=1},rm=671088.64] ~ ~ ~ tp @s ~671088.64 ~ ~ 6
execute @e[scores={tmp_041191676495=1},rym=6] ~ ~ ~ scoreboard players add @s tmp_041316191644 67108864
execute @e[scores={tmp_041191676495=1},rm=335544.32] ~ ~ ~ tp @s ~335544.32 ~ ~ 7
execute @e[scores={tmp_041191676495=1},rym=7] ~ ~ ~ scoreboard players add @s tmp_041316191644 33554432
execute @e[scores={tmp_041191676495=1},rm=167772.16] ~ ~ ~ tp @s ~167772.16 ~ ~ 8
execute @e[scores={tmp_041191676495=1},rym=8] ~ ~ ~ scoreboard players add @s tmp_041316191644 16777216
execute @e[scores={tmp_041191676495=1},rm=83886.08] ~ ~ ~ tp @s ~83886.08 ~ ~ 9
execute @e[scores={tmp_041191676495=1},rym=9] ~ ~ ~ scoreboard players add @s tmp_041316191644 8388608
execute @e[scores={tmp_041191676495=1},rm=41943.04] ~ ~ ~ tp @s ~41943.04 ~ ~ 10
execute @e[scores={tmp_041191676495=1},rym=10] ~ ~ ~ scoreboard players add @s tmp_041316191644 4194304
execute @e[scores={tmp_041191676495=1},rm=20971.52] ~ ~ ~ tp @s ~20971.52 ~ ~ 11
execute @e[scores={tmp_041191676495=1},rym=11] ~ ~ ~ scoreboard players add @s tmp_041316191644 2097152
execute @e[scores={tmp_041191676495=1},rm=10485.76] ~ ~ ~ tp @s ~10485.76 ~ ~ 12
execute @e[scores={tmp_041191676495=1},rym=12] ~ ~ ~ scoreboard players add @s tmp_041316191644 1048576
execute @e[scores={tmp_041191676495=1},rm=5242.88] ~ ~ ~ tp @s ~5242.88 ~ ~ 13
execute @e[scores={tmp_041191676495=1},rym=13] ~ ~ ~ scoreboard players add @s tmp_041316191644 524288
execute @e[scores={tmp_041191676495=1},rm=2621.44] ~ ~ ~ tp @s ~2621.44 ~ ~ 14
execute @e[scores={tmp_041191676495=1},rym=14] ~ ~ ~ scoreboard players add @s tmp_041316191644 262144
execute @e[scores={tmp_041191676495=1},rm=1310.72] ~ ~ ~ tp @s ~1310.72 ~ ~ 15
execute @e[scores={tmp_041191676495=1},rym=15] ~ ~ ~ scoreboard players add @s tmp_041316191644 131072
execute @e[scores={tmp_041191676495=1},rm=655.36] ~ ~ ~ tp @s ~655.36 ~ ~ 16
execute @e[scores={tmp_041191676495=1},rym=16] ~ ~ ~ scoreboard players add @s tmp_041316191644 65536
execute @e[scores={tmp_041191676495=1},rm=327.68] ~ ~ ~ tp @s ~327.68 ~ ~ 17
execute @e[scores={tmp_041191676495=1},rym=17] ~ ~ ~ scoreboard players add @s tmp_041316191644 32768
execute @e[scores={tmp_041191676495=1},rm=163.84] ~ ~ ~ tp @s ~163.84 ~ ~ 18
execute @e[scores={tmp_041191676495=1},rym=18] ~ ~ ~ scoreboard players add @s tmp_041316191644 16384
execute @e[scores={tmp_041191676495=1},rm=81.92] ~ ~ ~ tp @s ~81.92 ~ ~ 19
execute @e[scores={tmp_041191676495=1},rym=19] ~ ~ ~ scoreboard players add @s tmp_041316191644 8192
execute @e[scores={tmp_041191676495=1},rm=40.96] ~ ~ ~ tp @s ~40.96 ~ ~ 20
execute @e[scores={tmp_041191676495=1},rym=20] ~ ~ ~ scoreboard players add @s tmp_041316191644 4096
execute @e[scores={tmp_041191676495=1},rm=20.48] ~ ~ ~ tp @s ~20.48 ~ ~ 21
execute @e[scores={tmp_041191676495=1},rym=21] ~ ~ ~ scoreboard players add @s tmp_041316191644 2048
execute @e[scores={tmp_041191676495=1},rm=10.24] ~ ~ ~ tp @s ~10.24 ~ ~ 22
execute @e[scores={tmp_041191676495=1},rym=22] ~ ~ ~ scoreboard players add @s tmp_041316191644 1024
execute @e[scores={tmp_041191676495=1},rm=5.12] ~ ~ ~ tp @s ~5.12 ~ ~ 23
execute @e[scores={tmp_041191676495=1},rym=23] ~ ~ ~ scoreboard players add @s tmp_041316191644 512
execute @e[scores={tmp_041191676495=1},rm=2.56] ~ ~ ~ tp @s ~2.56 ~ ~ 24
execute @e[scores={tmp_041191676495=1},rym=24] ~ ~ ~ scoreboard players add @s tmp_041316191644 256
execute @e[scores={tmp_041191676495=1},rm=1.28] ~ ~ ~ tp @s ~1.28 ~ ~ 25
execute @e[scores={tmp_041191676495=1},rym=25] ~ ~ ~ scoreboard players add @s tmp_041316191644 128
execute @e[scores={tmp_041191676495=1},rm=0.64] ~ ~ ~ tp @s ~0.64 ~ ~ 26
execute @e[scores={tmp_041191676495=1},rym=26] ~ ~ ~ scoreboard players add @s tmp_041316191644 64
execute @e[scores={tmp_041191676495=1},rm=0.32] ~ ~ ~ tp @s ~0.32 ~ ~ 27
execute @e[scores={tmp_041191676495=1},rym=27] ~ ~ ~ scoreboard players add @s tmp_041316191644 32
execute @e[scores={tmp_041191676495=1},rm=0.16] ~ ~ ~ tp @s ~0.16 ~ ~ 28
execute @e[scores={tmp_041191676495=1},rym=28] ~ ~ ~ scoreboard players add @s tmp_041316191644 16
execute @e[scores={tmp_041191676495=1},rm=0.08] ~ ~ ~ tp @s ~0.08 ~ ~ 29
execute @e[scores={tmp_041191676495=1},rym=29] ~ ~ ~ scoreboard players add @s tmp_041316191644 8
execute @e[scores={tmp_041191676495=1},rm=0.04] ~ ~ ~ tp @s ~0.04 ~ ~ 30
execute @e[scores={tmp_041191676495=1},rym=30] ~ ~ ~ scoreboard players add @s tmp_041316191644 4
execute @e[scores={tmp_041191676495=1},rm=0.02] ~ ~ ~ tp @s ~0.02 ~ ~ 31
execute @e[scores={tmp_041191676495=1},rym=31] ~ ~ ~ scoreboard players add @s tmp_041316191644 2
execute @e[scores={tmp_041191676495=1},rm=0.01] ~ ~ ~ tp @s ~0.01 ~ ~ 32
execute @e[scores={tmp_041191676495=1},rym=32] ~ ~ ~ scoreboard players add @s tmp_041316191644 1
scoreboard players operation @s pos_x = @e[scores={tmp_041191676495=1}] tmp_041316191644

# get y pos
scoreboard players set @e[scores={tmp_041191676495=1}] tmp_041316191644 -1073741824
tp @e[scores={tmp_041191676495=1}] ~ -10737418.24 ~ 0
execute @e[scores={tmp_041191676495=1},rm=10737418.24] ~ ~ ~ tp @s ~ ~10737418.24 ~ 2
execute @e[scores={tmp_041191676495=1},rym=2] ~ ~ ~ scoreboard players add @s tmp_041316191644 1073741824
execute @e[scores={tmp_041191676495=1},rm=5368709.12] ~ ~ ~ tp @s ~ ~5368709.12 ~ 3
execute @e[scores={tmp_041191676495=1},rym=3] ~ ~ ~ scoreboard players add @s tmp_041316191644 536870912
execute @e[scores={tmp_041191676495=1},rm=2684354.56] ~ ~ ~ tp @s ~ ~2684354.56 ~ 4
execute @e[scores={tmp_041191676495=1},rym=4] ~ ~ ~ scoreboard players add @s tmp_041316191644 268435456
execute @e[scores={tmp_041191676495=1},rm=1342177.28] ~ ~ ~ tp @s ~ ~1342177.28 ~ 5
execute @e[scores={tmp_041191676495=1},rym=5] ~ ~ ~ scoreboard players add @s tmp_041316191644 134217728
execute @e[scores={tmp_041191676495=1},rm=671088.64] ~ ~ ~ tp @s ~ ~671088.64 ~ 6
execute @e[scores={tmp_041191676495=1},rym=6] ~ ~ ~ scoreboard players add @s tmp_041316191644 67108864
execute @e[scores={tmp_041191676495=1},rm=335544.32] ~ ~ ~ tp @s ~ ~335544.32 ~ 7
execute @e[scores={tmp_041191676495=1},rym=7] ~ ~ ~ scoreboard players add @s tmp_041316191644 33554432
execute @e[scores={tmp_041191676495=1},rm=167772.16] ~ ~ ~ tp @s ~ ~167772.16 ~ 8
execute @e[scores={tmp_041191676495=1},rym=8] ~ ~ ~ scoreboard players add @s tmp_041316191644 16777216
execute @e[scores={tmp_041191676495=1},rm=83886.08] ~ ~ ~ tp @s ~ ~83886.08 ~ 9
execute @e[scores={tmp_041191676495=1},rym=9] ~ ~ ~ scoreboard players add @s tmp_041316191644 8388608
execute @e[scores={tmp_041191676495=1},rm=41943.04] ~ ~ ~ tp @s ~ ~41943.04 ~ 10
execute @e[scores={tmp_041191676495=1},rym=10] ~ ~ ~ scoreboard players add @s tmp_041316191644 4194304
execute @e[scores={tmp_041191676495=1},rm=20971.52] ~ ~ ~ tp @s ~ ~20971.52 ~ 11
execute @e[scores={tmp_041191676495=1},rym=11] ~ ~ ~ scoreboard players add @s tmp_041316191644 2097152
execute @e[scores={tmp_041191676495=1},rm=10485.76] ~ ~ ~ tp @s ~ ~10485.76 ~ 12
execute @e[scores={tmp_041191676495=1},rym=12] ~ ~ ~ scoreboard players add @s tmp_041316191644 1048576
execute @e[scores={tmp_041191676495=1},rm=5242.88] ~ ~ ~ tp @s ~ ~5242.88 ~ 13
execute @e[scores={tmp_041191676495=1},rym=13] ~ ~ ~ scoreboard players add @s tmp_041316191644 524288
execute @e[scores={tmp_041191676495=1},rm=2621.44] ~ ~ ~ tp @s ~ ~2621.44 ~ 14
execute @e[scores={tmp_041191676495=1},rym=14] ~ ~ ~ scoreboard players add @s tmp_041316191644 262144
execute @e[scores={tmp_041191676495=1},rm=1310.72] ~ ~ ~ tp @s ~ ~1310.72 ~ 15
execute @e[scores={tmp_041191676495=1},rym=15] ~ ~ ~ scoreboard players add @s tmp_041316191644 131072
execute @e[scores={tmp_041191676495=1},rm=655.36] ~ ~ ~ tp @s ~ ~655.36 ~ 16
execute @e[scores={tmp_041191676495=1},rym=16] ~ ~ ~ scoreboard players add @s tmp_041316191644 65536
execute @e[scores={tmp_041191676495=1},rm=327.68] ~ ~ ~ tp @s ~ ~327.68 ~ 17
execute @e[scores={tmp_041191676495=1},rym=17] ~ ~ ~ scoreboard players add @s tmp_041316191644 32768
execute @e[scores={tmp_041191676495=1},rm=163.84] ~ ~ ~ tp @s ~ ~163.84 ~ 18
execute @e[scores={tmp_041191676495=1},rym=18] ~ ~ ~ scoreboard players add @s tmp_041316191644 16384
execute @e[scores={tmp_041191676495=1},rm=81.92] ~ ~ ~ tp @s ~ ~81.92 ~ 19
execute @e[scores={tmp_041191676495=1},rym=19] ~ ~ ~ scoreboard players add @s tmp_041316191644 8192
execute @e[scores={tmp_041191676495=1},rm=40.96] ~ ~ ~ tp @s ~ ~40.96 ~ 20
execute @e[scores={tmp_041191676495=1},rym=20] ~ ~ ~ scoreboard players add @s tmp_041316191644 4096
execute @e[scores={tmp_041191676495=1},rm=20.48] ~ ~ ~ tp @s ~ ~20.48 ~ 21
execute @e[scores={tmp_041191676495=1},rym=21] ~ ~ ~ scoreboard players add @s tmp_041316191644 2048
execute @e[scores={tmp_041191676495=1},rm=10.24] ~ ~ ~ tp @s ~ ~10.24 ~ 22
execute @e[scores={tmp_041191676495=1},rym=22] ~ ~ ~ scoreboard players add @s tmp_041316191644 1024
execute @e[scores={tmp_041191676495=1},rm=5.12] ~ ~ ~ tp @s ~ ~5.12 ~ 23
execute @e[scores={tmp_041191676495=1},rym=23] ~ ~ ~ scoreboard players add @s tmp_041316191644 512
execute @e[scores={tmp_041191676495=1},rm=2.56] ~ ~ ~ tp @s ~ ~2.56 ~ 24
execute @e[scores={tmp_041191676495=1},rym=24] ~ ~ ~ scoreboard players add @s tmp_041316191644 256
execute @e[scores={tmp_041191676495=1},rm=1.28] ~ ~ ~ tp @s ~ ~1.28 ~ 25
execute @e[scores={tmp_041191676495=1},rym=25] ~ ~ ~ scoreboard players add @s tmp_041316191644 128
execute @e[scores={tmp_041191676495=1},rm=0.64] ~ ~ ~ tp @s ~ ~0.64 ~ 26
execute @e[scores={tmp_041191676495=1},rym=26] ~ ~ ~ scoreboard players add @s tmp_041316191644 64
execute @e[scores={tmp_041191676495=1},rm=0.32] ~ ~ ~ tp @s ~ ~0.32 ~ 27
execute @e[scores={tmp_041191676495=1},rym=27] ~ ~ ~ scoreboard players add @s tmp_041316191644 32
execute @e[scores={tmp_041191676495=1},rm=0.16] ~ ~ ~ tp @s ~ ~0.16 ~ 28
execute @e[scores={tmp_041191676495=1},rym=28] ~ ~ ~ scoreboard players add @s tmp_041316191644 16
execute @e[scores={tmp_041191676495=1},rm=0.08] ~ ~ ~ tp @s ~ ~0.08 ~ 29
execute @e[scores={tmp_041191676495=1},rym=29] ~ ~ ~ scoreboard players add @s tmp_041316191644 8
execute @e[scores={tmp_041191676495=1},rm=0.04] ~ ~ ~ tp @s ~ ~0.04 ~ 30
execute @e[scores={tmp_041191676495=1},rym=30] ~ ~ ~ scoreboard players add @s tmp_041316191644 4
execute @e[scores={tmp_041191676495=1},rm=0.02] ~ ~ ~ tp @s ~ ~0.02 ~ 31
execute @e[scores={tmp_041191676495=1},rym=31] ~ ~ ~ scoreboard players add @s tmp_041316191644 2
execute @e[scores={tmp_041191676495=1},rm=0.01] ~ ~ ~ tp @s ~ ~0.01 ~ 32
execute @e[scores={tmp_041191676495=1},rym=32] ~ ~ ~ scoreboard players add @s tmp_041316191644 1
scoreboard players operation @s pos_y = @e[scores={tmp_041191676495=1}] tmp_041316191644

# get z pos
scoreboard players set @e[scores={tmp_041191676495=1}] tmp_041316191644 -1073741824
tp @e[scores={tmp_041191676495=1}] ~ ~ -10737418.24 0
execute @e[scores={tmp_041191676495=1},rm=10737418.24] ~ ~ ~ tp @s ~ ~ ~10737418.24 2
execute @e[scores={tmp_041191676495=1},rym=2] ~ ~ ~ scoreboard players add @s tmp_041316191644 1073741824
execute @e[scores={tmp_041191676495=1},rm=5368709.12] ~ ~ ~ tp @s ~ ~ ~5368709.12 3
execute @e[scores={tmp_041191676495=1},rym=3] ~ ~ ~ scoreboard players add @s tmp_041316191644 536870912
execute @e[scores={tmp_041191676495=1},rm=2684354.56] ~ ~ ~ tp @s ~ ~ ~2684354.56 4
execute @e[scores={tmp_041191676495=1},rym=4] ~ ~ ~ scoreboard players add @s tmp_041316191644 268435456
execute @e[scores={tmp_041191676495=1},rm=1342177.28] ~ ~ ~ tp @s ~ ~ ~1342177.28 5
execute @e[scores={tmp_041191676495=1},rym=5] ~ ~ ~ scoreboard players add @s tmp_041316191644 134217728
execute @e[scores={tmp_041191676495=1},rm=671088.64] ~ ~ ~ tp @s ~ ~ ~671088.64 6
execute @e[scores={tmp_041191676495=1},rym=6] ~ ~ ~ scoreboard players add @s tmp_041316191644 67108864
execute @e[scores={tmp_041191676495=1},rm=335544.32] ~ ~ ~ tp @s ~ ~ ~335544.32 7
execute @e[scores={tmp_041191676495=1},rym=7] ~ ~ ~ scoreboard players add @s tmp_041316191644 33554432
execute @e[scores={tmp_041191676495=1},rm=167772.16] ~ ~ ~ tp @s ~ ~ ~167772.16 8
execute @e[scores={tmp_041191676495=1},rym=8] ~ ~ ~ scoreboard players add @s tmp_041316191644 16777216
execute @e[scores={tmp_041191676495=1},rm=83886.08] ~ ~ ~ tp @s ~ ~ ~83886.08 9
execute @e[scores={tmp_041191676495=1},rym=9] ~ ~ ~ scoreboard players add @s tmp_041316191644 8388608
execute @e[scores={tmp_041191676495=1},rm=41943.04] ~ ~ ~ tp @s ~ ~ ~41943.04 10
execute @e[scores={tmp_041191676495=1},rym=10] ~ ~ ~ scoreboard players add @s tmp_041316191644 4194304
execute @e[scores={tmp_041191676495=1},rm=20971.52] ~ ~ ~ tp @s ~ ~ ~20971.52 11
execute @e[scores={tmp_041191676495=1},rym=11] ~ ~ ~ scoreboard players add @s tmp_041316191644 2097152
execute @e[scores={tmp_041191676495=1},rm=10485.76] ~ ~ ~ tp @s ~ ~ ~10485.76 12
execute @e[scores={tmp_041191676495=1},rym=12] ~ ~ ~ scoreboard players add @s tmp_041316191644 1048576
execute @e[scores={tmp_041191676495=1},rm=5242.88] ~ ~ ~ tp @s ~ ~ ~5242.88 13
execute @e[scores={tmp_041191676495=1},rym=13] ~ ~ ~ scoreboard players add @s tmp_041316191644 524288
execute @e[scores={tmp_041191676495=1},rm=2621.44] ~ ~ ~ tp @s ~ ~ ~2621.44 14
execute @e[scores={tmp_041191676495=1},rym=14] ~ ~ ~ scoreboard players add @s tmp_041316191644 262144
execute @e[scores={tmp_041191676495=1},rm=1310.72] ~ ~ ~ tp @s ~ ~ ~1310.72 15
execute @e[scores={tmp_041191676495=1},rym=15] ~ ~ ~ scoreboard players add @s tmp_041316191644 131072
execute @e[scores={tmp_041191676495=1},rm=655.36] ~ ~ ~ tp @s ~ ~ ~655.36 16
execute @e[scores={tmp_041191676495=1},rym=16] ~ ~ ~ scoreboard players add @s tmp_041316191644 65536
execute @e[scores={tmp_041191676495=1},rm=327.68] ~ ~ ~ tp @s ~ ~ ~327.68 17
execute @e[scores={tmp_041191676495=1},rym=17] ~ ~ ~ scoreboard players add @s tmp_041316191644 32768
execute @e[scores={tmp_041191676495=1},rm=163.84] ~ ~ ~ tp @s ~ ~ ~163.84 18
execute @e[scores={tmp_041191676495=1},rym=18] ~ ~ ~ scoreboard players add @s tmp_041316191644 16384
execute @e[scores={tmp_041191676495=1},rm=81.92] ~ ~ ~ tp @s ~ ~ ~81.92 19
execute @e[scores={tmp_041191676495=1},rym=19] ~ ~ ~ scoreboard players add @s tmp_041316191644 8192
execute @e[scores={tmp_041191676495=1},rm=40.96] ~ ~ ~ tp @s ~ ~ ~40.96 20
execute @e[scores={tmp_041191676495=1},rym=20] ~ ~ ~ scoreboard players add @s tmp_041316191644 4096
execute @e[scores={tmp_041191676495=1},rm=20.48] ~ ~ ~ tp @s ~ ~ ~20.48 21
execute @e[scores={tmp_041191676495=1},rym=21] ~ ~ ~ scoreboard players add @s tmp_041316191644 2048
execute @e[scores={tmp_041191676495=1},rm=10.24] ~ ~ ~ tp @s ~ ~ ~10.24 22
execute @e[scores={tmp_041191676495=1},rym=22] ~ ~ ~ scoreboard players add @s tmp_041316191644 1024
execute @e[scores={tmp_041191676495=1},rm=5.12] ~ ~ ~ tp @s ~ ~ ~5.12 23
execute @e[scores={tmp_041191676495=1},rym=23] ~ ~ ~ scoreboard players add @s tmp_041316191644 512
execute @e[scores={tmp_041191676495=1},rm=2.56] ~ ~ ~ tp @s ~ ~ ~2.56 24
execute @e[scores={tmp_041191676495=1},rym=24] ~ ~ ~ scoreboard players add @s tmp_041316191644 256
execute @e[scores={tmp_041191676495=1},rm=1.28] ~ ~ ~ tp @s ~ ~ ~1.28 25
execute @e[scores={tmp_041191676495=1},rym=25] ~ ~ ~ scoreboard players add @s tmp_041316191644 128
execute @e[scores={tmp_041191676495=1},rm=0.64] ~ ~ ~ tp @s ~ ~ ~0.64 26
execute @e[scores={tmp_041191676495=1},rym=26] ~ ~ ~ scoreboard players add @s tmp_041316191644 64
execute @e[scores={tmp_041191676495=1},rm=0.32] ~ ~ ~ tp @s ~ ~ ~0.32 27
execute @e[scores={tmp_041191676495=1},rym=27] ~ ~ ~ scoreboard players add @s tmp_041316191644 32
execute @e[scores={tmp_041191676495=1},rm=0.16] ~ ~ ~ tp @s ~ ~ ~0.16 28
execute @e[scores={tmp_041191676495=1},rym=28] ~ ~ ~ scoreboard players add @s tmp_041316191644 16
execute @e[scores={tmp_041191676495=1},rm=0.08] ~ ~ ~ tp @s ~ ~ ~0.08 29
execute @e[scores={tmp_041191676495=1},rym=29] ~ ~ ~ scoreboard players add @s tmp_041316191644 8
execute @e[scores={tmp_041191676495=1},rm=0.04] ~ ~ ~ tp @s ~ ~ ~0.04 30
execute @e[scores={tmp_041191676495=1},rym=30] ~ ~ ~ scoreboard players add @s tmp_041316191644 4
execute @e[scores={tmp_041191676495=1},rm=0.02] ~ ~ ~ tp @s ~ ~ ~0.02 31
execute @e[scores={tmp_041191676495=1},rym=31] ~ ~ ~ scoreboard players add @s tmp_041316191644 2
execute @e[scores={tmp_041191676495=1},rm=0.01] ~ ~ ~ tp @s ~ ~ ~0.01 32
execute @e[scores={tmp_041191676495=1},rym=32] ~ ~ ~ scoreboard players add @s tmp_041316191644 1
scoreboard players operation @s pos_z = @e[scores={tmp_041191676495=1}] tmp_041316191644

kill @e[scores={tmp_041191676495=1}]
#scoreboard objectives remove tmp_041316191644
#scoreboard objectives remove tmp_041191676495
