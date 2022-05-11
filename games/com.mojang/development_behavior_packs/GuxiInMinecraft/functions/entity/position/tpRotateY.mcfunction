tp @s ~ ~ ~ -180 ~
scoreboard players add @s pos:RotateY 180

execute @s[scores={pos:rotateY=256..}] ~ ~ ~ tp @s ~ ~ ~ ~256 ~
scoreboard players remove @s[scores={pos:rotateY=256..}] pos:rotateY 256

execute @s[scores={pos:rotateY=128..}] ~ ~ ~ tp @s ~ ~ ~ ~128 ~
scoreboard players remove @s[scores={pos:rotateY=128..}] pos:rotateY 128

execute @s[scores={pos:rotateY=64..}] ~ ~ ~ tp @s ~ ~ ~ ~64 ~
scoreboard players remove @s[scores={pos:rotateY=64..}] pos:rotateY 64

execute @s[scores={pos:rotateY=32..}] ~ ~ ~ tp @s ~ ~ ~ ~32 ~
scoreboard players remove @s[scores={pos:rotateY=32..}] pos:rotateY 32

execute @s[scores={pos:rotateY=16..}] ~ ~ ~ tp @s ~ ~ ~ ~16 ~
scoreboard players remove @s[scores={pos:rotateY=16..}] pos:rotateY 16

execute @s[scores={pos:rotateY=8..}] ~ ~ ~ tp @s ~ ~ ~ ~8 ~
scoreboard players remove @s[scores={pos:rotateY=8..}] pos:rotateY 8

execute @s[scores={pos:rotateY=4..}] ~ ~ ~ tp @s ~ ~ ~ ~4 ~
scoreboard players remove @s[scores={pos:rotateY=4..}] pos:rotateY 4

execute @s[scores={pos:rotateY=2..}] ~ ~ ~ tp @s ~ ~ ~ ~2 ~
scoreboard players remove @s[scores={pos:rotateY=2..}] pos:rotateY 2

execute @s[scores={pos:rotateY=1..}] ~ ~ ~ tp @s ~ ~ ~ ~1 ~
scoreboard players remove @s[scores={pos:rotateY=1..}] pos:rotateY 1
