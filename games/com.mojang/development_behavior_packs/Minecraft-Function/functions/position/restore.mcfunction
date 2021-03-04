#create flag
kill @e[tag=flag.position_restore]
summon minecraft:armor_stand
tag @e[type=minecraft:armor_stand,c=1] add flag.position_restore

#restore position x
tp @e[tag=flag.position_restore] -1048575.5 ~ ~
scoreboard players set @s var 1048576
scoreboard players operation @s var += @s pos.x

execute @s[scores={var=1048576..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~1048576 ~ ~
scoreboard players remove @s[scores={var=1048576..}] var 1048576
execute @s[scores={var=524288..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~524288 ~ ~
scoreboard players remove @s[scores={var=524288..}] var 524288
execute @s[scores={var=262144..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~262144 ~ ~
scoreboard players remove @s[scores={var=262144..}] var 262144
execute @s[scores={var=131072..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~131072 ~ ~
scoreboard players remove @s[scores={var=131072..}] var 131072
execute @s[scores={var=65536..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~65536 ~ ~
scoreboard players remove @s[scores={var=65536..}] var 65536
execute @s[scores={var=32768..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~32768 ~ ~
scoreboard players remove @s[scores={var=32768..}] var 32768
execute @s[scores={var=16384..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~16384 ~ ~
scoreboard players remove @s[scores={var=16384..}] var 16384
execute @s[scores={var=8192..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~8192 ~ ~
scoreboard players remove @s[scores={var=8192..}] var 8192
execute @s[scores={var=4096..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~4096 ~ ~
scoreboard players remove @s[scores={var=4096..}] var 4096
execute @s[scores={var=2048..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~2048 ~ ~
scoreboard players remove @s[scores={var=2048..}] var 2048
execute @s[scores={var=1024..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~1024 ~ ~
scoreboard players remove @s[scores={var=1024..}] var 1024
execute @s[scores={var=512..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~512 ~ ~
scoreboard players remove @s[scores={var=512..}] var 512
execute @s[scores={var=256..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~256 ~ ~
scoreboard players remove @s[scores={var=256..}] var 256
execute @s[scores={var=128..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~128 ~ ~
scoreboard players remove @s[scores={var=128..}] var 128
execute @s[scores={var=64..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~64 ~ ~
scoreboard players remove @s[scores={var=64..}] var 64
execute @s[scores={var=32..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~32 ~ ~
scoreboard players remove @s[scores={var=32..}] var 32
execute @s[scores={var=16..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~16 ~ ~
scoreboard players remove @s[scores={var=16..}] var 16
execute @s[scores={var=8..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~8 ~ ~
scoreboard players remove @s[scores={var=8..}] var 8
execute @s[scores={var=4..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~4 ~ ~
scoreboard players remove @s[scores={var=4..}] var 4
execute @s[scores={var=2..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~2 ~ ~
scoreboard players remove @s[scores={var=2..}] var 2
execute @s[scores={var=1..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~1 ~ ~
scoreboard players remove @s[scores={var=1..}] var 1


#restore position z
execute @e[tag=flag.position_restore] ~ ~ ~ tp @s ~ ~ -1048575.5
scoreboard players set @s var 1048576
scoreboard players operation @s var += @s pos.z

execute @s[scores={var=1048576..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~1048576
scoreboard players remove @s[scores={var=1048576..}] var 1048576
execute @s[scores={var=524288..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~524288
scoreboard players remove @s[scores={var=524288..}] var 524288
execute @s[scores={var=262144..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~262144
scoreboard players remove @s[scores={var=262144..}] var 262144
execute @s[scores={var=131072..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~131072
scoreboard players remove @s[scores={var=131072..}] var 131072
execute @s[scores={var=65536..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~65536
scoreboard players remove @s[scores={var=65536..}] var 65536
execute @s[scores={var=32768..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~32768
scoreboard players remove @s[scores={var=32768..}] var 32768
execute @s[scores={var=16384..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~16384
scoreboard players remove @s[scores={var=16384..}] var 16384
execute @s[scores={var=8192..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~8192
scoreboard players remove @s[scores={var=8192..}] var 8192
execute @s[scores={var=4096..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~4096
scoreboard players remove @s[scores={var=4096..}] var 4096
execute @s[scores={var=2048..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~2048
scoreboard players remove @s[scores={var=2048..}] var 2048
execute @s[scores={var=1024..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~1024
scoreboard players remove @s[scores={var=1024..}] var 1024
execute @s[scores={var=512..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~512
scoreboard players remove @s[scores={var=512..}] var 512
execute @s[scores={var=256..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~256
scoreboard players remove @s[scores={var=256..}] var 256
execute @s[scores={var=128..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~128
scoreboard players remove @s[scores={var=128..}] var 128
execute @s[scores={var=64..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~64
scoreboard players remove @s[scores={var=64..}] var 64
execute @s[scores={var=32..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~32
scoreboard players remove @s[scores={var=32..}] var 32
execute @s[scores={var=16..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~16
scoreboard players remove @s[scores={var=16..}] var 16
execute @s[scores={var=8..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~8
scoreboard players remove @s[scores={var=8..}] var 8
execute @s[scores={var=4..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~4
scoreboard players remove @s[scores={var=4..}] var 4
execute @s[scores={var=2..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~2
scoreboard players remove @s[scores={var=2..}] var 2
execute @s[scores={var=1..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~ ~1
scoreboard players remove @s[scores={var=1..}] var 1


#restore position y
execute @e[tag=flag.position_restore] ~ ~ ~ tp @s ~ -512.0 ~
scoreboard players set @s var 512
scoreboard players operation @s var += @s pos.y

execute @s[scores={var=512..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~512 ~
scoreboard players remove @s[scores={var=256..}] var 512
execute @s[scores={var=256..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~256 ~
scoreboard players remove @s[scores={var=256..}] var 256
execute @s[scores={var=128..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~128 ~
scoreboard players remove @s[scores={var=128..}] var 128
execute @s[scores={var=64..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~64 ~
scoreboard players remove @s[scores={var=64..}] var 64
execute @s[scores={var=32..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~32 ~
scoreboard players remove @s[scores={var=32..}] var 32
execute @s[scores={var=16..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~16 ~
scoreboard players remove @s[scores={var=16..}] var 16
execute @s[scores={var=8..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~8 ~
scoreboard players remove @s[scores={var=8..}] var 8
execute @s[scores={var=4..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~4 ~
scoreboard players remove @s[scores={var=4..}] var 4
execute @s[scores={var=2..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~2 ~
scoreboard players remove @s[scores={var=2..}] var 2
execute @s[scores={var=1..}] ~ ~ ~ execute @e[tag=flag.position_restore] ~ ~ ~ tp ~ ~1 ~
scoreboard players remove @s[scores={var=1..}] var 1

#teleport & clean
tp @s @e[tag=flag.position_restore]
tp @e[tag=flag.position_restore] ~ ~20 ~
kill @e[tag=flag.position_restore]
