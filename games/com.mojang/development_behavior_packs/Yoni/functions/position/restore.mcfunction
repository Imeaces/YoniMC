tag @e[tag=function:position_restore] add function:position_restore
tag @s add function:position_restore

kill @e[tag=function:position_point]
summon minecraft:armor_stand "坐标"
tag @e[tag=!function:position_restore,c=1] add function:position_point






tp @e[tag=function:position_point] -1048575.5 ~ ~
scoreboard players set @s var 1048576
scoreboard players operation @s var += @s pos.x

execute @s[scores={var=1048576..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~1048576 ~ ~
scoreboard players remove @s[scores={var=1048576..}] var 1048576
execute @s[scores={var=524288..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~524288 ~ ~
scoreboard players remove @s[scores={var=524288..}] var 524288
execute @s[scores={var=262144..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~262144 ~ ~
scoreboard players remove @s[scores={var=262144..}] var 262144
execute @s[scores={var=131072..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~131072 ~ ~
scoreboard players remove @s[scores={var=131072..}] var 131072
execute @s[scores={var=65536..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~65536 ~ ~
scoreboard players remove @s[scores={var=65536..}] var 65536
execute @s[scores={var=32768..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~32768 ~ ~
scoreboard players remove @s[scores={var=32768..}] var 32768
execute @s[scores={var=16384..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~16384 ~ ~
scoreboard players remove @s[scores={var=16384..}] var 16384
execute @s[scores={var=8192..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~8192 ~ ~
scoreboard players remove @s[scores={var=8192..}] var 8192
execute @s[scores={var=4096..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~4096 ~ ~
scoreboard players remove @s[scores={var=4096..}] var 4096
execute @s[scores={var=2048..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~2048 ~ ~
scoreboard players remove @s[scores={var=2048..}] var 2048
execute @s[scores={var=1024..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~1024 ~ ~
scoreboard players remove @s[scores={var=1024..}] var 1024
execute @s[scores={var=512..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~512 ~ ~
scoreboard players remove @s[scores={var=512..}] var 512
execute @s[scores={var=256..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~256 ~ ~
scoreboard players remove @s[scores={var=256..}] var 256
execute @s[scores={var=128..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~128 ~ ~
scoreboard players remove @s[scores={var=128..}] var 128
execute @s[scores={var=64..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~64 ~ ~
scoreboard players remove @s[scores={var=64..}] var 64
execute @s[scores={var=32..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~32 ~ ~
scoreboard players remove @s[scores={var=32..}] var 32
execute @s[scores={var=16..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~16 ~ ~
scoreboard players remove @s[scores={var=16..}] var 16
execute @s[scores={var=8..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~8 ~ ~
scoreboard players remove @s[scores={var=8..}] var 8
execute @s[scores={var=4..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~4 ~ ~
scoreboard players remove @s[scores={var=4..}] var 4
execute @s[scores={var=2..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~2 ~ ~
scoreboard players remove @s[scores={var=2..}] var 2
execute @s[scores={var=1..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~1 ~ ~
scoreboard players remove @s[scores={var=1..}] var 1









execute @e[tag=function:position_point] ~ ~ ~ tp @s ~ ~ -1048575.5
scoreboard players set @s var 1048576
scoreboard players operation @s var += @s pos.z

execute @s[scores={var=1048576..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~1048576
scoreboard players remove @s[scores={var=1048576..}] var 1048576
execute @s[scores={var=524288..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~524288
scoreboard players remove @s[scores={var=524288..}] var 524288
execute @s[scores={var=262144..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~262144
scoreboard players remove @s[scores={var=262144..}] var 262144
execute @s[scores={var=131072..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~131072
scoreboard players remove @s[scores={var=131072..}] var 131072
execute @s[scores={var=65536..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~65536
scoreboard players remove @s[scores={var=65536..}] var 65536
execute @s[scores={var=32768..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~32768
scoreboard players remove @s[scores={var=32768..}] var 32768
execute @s[scores={var=16384..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~16384
scoreboard players remove @s[scores={var=16384..}] var 16384
execute @s[scores={var=8192..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~8192
scoreboard players remove @s[scores={var=8192..}] var 8192
execute @s[scores={var=4096..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~4096
scoreboard players remove @s[scores={var=4096..}] var 4096
execute @s[scores={var=2048..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~2048
scoreboard players remove @s[scores={var=2048..}] var 2048
execute @s[scores={var=1024..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~1024
scoreboard players remove @s[scores={var=1024..}] var 1024
execute @s[scores={var=512..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~512
scoreboard players remove @s[scores={var=512..}] var 512
execute @s[scores={var=256..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~256
scoreboard players remove @s[scores={var=256..}] var 256
execute @s[scores={var=128..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~128
scoreboard players remove @s[scores={var=128..}] var 128
execute @s[scores={var=64..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~64
scoreboard players remove @s[scores={var=64..}] var 64
execute @s[scores={var=32..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~32
scoreboard players remove @s[scores={var=32..}] var 32
execute @s[scores={var=16..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~16
scoreboard players remove @s[scores={var=16..}] var 16
execute @s[scores={var=8..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~8
scoreboard players remove @s[scores={var=8..}] var 8
execute @s[scores={var=4..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~4
scoreboard players remove @s[scores={var=4..}] var 4
execute @s[scores={var=2..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~2
scoreboard players remove @s[scores={var=2..}] var 2
execute @s[scores={var=1..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~ ~1
scoreboard players remove @s[scores={var=1..}] var 1









execute @e[tag=function:position_point] ~ ~ ~ tp @s ~ -512.0 ~
scoreboard players set @s var 512
scoreboard players operation @s var += @s pos.y

execute @s[scores={var=512..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~512 ~
scoreboard players remove @s[scores={var=256..}] var 512
execute @s[scores={var=256..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~256 ~
scoreboard players remove @s[scores={var=256..}] var 256
execute @s[scores={var=128..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~128 ~
scoreboard players remove @s[scores={var=128..}] var 128
execute @s[scores={var=64..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~64 ~
scoreboard players remove @s[scores={var=64..}] var 64
execute @s[scores={var=32..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~32 ~
scoreboard players remove @s[scores={var=32..}] var 32
execute @s[scores={var=16..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~16 ~
scoreboard players remove @s[scores={var=16..}] var 16
execute @s[scores={var=8..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~8 ~
scoreboard players remove @s[scores={var=8..}] var 8
execute @s[scores={var=4..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~4 ~
scoreboard players remove @s[scores={var=4..}] var 4
execute @s[scores={var=2..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~2 ~
scoreboard players remove @s[scores={var=2..}] var 2
execute @s[scores={var=1..}] ~ ~ ~ execute @e[tag=function:position_point] ~ ~ ~ tp ~ ~1 ~
scoreboard players remove @s[scores={var=1..}] var 1









tp @s @e[tag=function:position_point]
tp @e[tag=function:position_point] ~ -10000 ~
kill @e[tag=function:position_point]
