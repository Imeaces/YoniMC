tp @s ~ ~ ~ ~ -90
scoreboard players add @s pos:RotateX 90

execute @s[scores={pos:rotateX=64..}] ~ ~ ~ tp @s ~ ~ ~ ~ ~64
scoreboard players remove @s[scores={pos:rotateX=64..}] pos:rotateX 64

execute @s[scores={pos:rotateX=32..}] ~ ~ ~ tp @s ~ ~ ~ ~ ~32
scoreboard players remove @s[scores={pos:rotateX=32..}] pos:rotateX 32

execute @s[scores={pos:rotateX=16..}] ~ ~ ~ tp @s ~ ~ ~ ~ ~16
scoreboard players remove @s[scores={pos:rotateX=16..}] pos:rotateX 16

execute @s[scores={pos:rotateX=8..}] ~ ~ ~ tp @s ~ ~ ~ ~ ~8
scoreboard players remove @s[scores={pos:rotateX=8..}] pos:rotateX 8

execute @s[scores={pos:rotateX=4..}] ~ ~ ~ tp @s ~ ~ ~ ~ ~4
scoreboard players remove @s[scores={pos:rotateX=4..}] pos:rotateX 4

execute @s[scores={pos:rotateX=2..}] ~ ~ ~ tp @s ~ ~ ~ ~ ~2
scoreboard players remove @s[scores={pos:rotateX=2..}] pos:rotateX 2

execute @s[scores={pos:rotateX=1..}] ~ ~ ~ tp @s ~ ~ ~ ~ ~1
scoreboard players remove @s[scores={pos:rotateX=1..}] pos:rotateX 1
