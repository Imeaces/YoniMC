scoreboard objectives add exp dummy
scoreboard players set @s exp 0

execute if entity @s[lm=16384] run scoreboard players add @s exp 16384
execute if entity @s[lm=16384] run xp -16384l @s

execute if entity @s[lm=8192] run scoreboard players add @s exp 8192
execute if entity @s[lm=8192] run xp -8192l @s

execute if entity @s[lm=4096] run scoreboard players add @s exp 4096
execute if entity @s[lm=4096] run xp -4096l @s

execute if entity @s[lm=2048] run scoreboard players add @s exp 2048
execute if entity @s[lm=2048] run xp -2048l @s

execute if entity @s[lm=1024] run scoreboard players add @s exp 1024
execute if entity @s[lm=1024] run xp -1024l @s

execute if entity @s[lm=512] run scoreboard players add @s exp 512
execute if entity @s[lm=512] run xp -512l @s

execute if entity @s[lm=256] run scoreboard players add @s exp 256
execute if entity @s[lm=256] run xp -256l @s

execute if entity @s[lm=128] run scoreboard players add @s exp 128
execute if entity @s[lm=128] run xp -128l @s

execute if entity @s[lm=64] run scoreboard players add @s exp 64
execute if entity @s[lm=64] run xp -64l @s

execute if entity @s[lm=32] run scoreboard players add @s exp 32
execute if entity @s[lm=32] run xp -32l @s

execute if entity @s[lm=16] run scoreboard players add @s exp 16
execute if entity @s[lm=16] run xp -16l @s

execute if entity @s[lm=8] run scoreboard players add @s exp 8
execute if entity @s[lm=8] run xp -8l @s

execute if entity @s[lm=4] run scoreboard players add @s exp 4
execute if entity @s[lm=4] run xp -4l @s

execute if entity @s[lm=2] run scoreboard players add @s exp 2
execute if entity @s[lm=2] run xp -2l @s

execute if entity @s[lm=1] run scoreboard players add @s exp 1
execute if entity @s[lm=1] run xp -1l @s




scoreboard objectives add var_0 dummy
scoreboard players operation @s var_0 = @s exp

execute if score @s var_0 matches 16384.. run xp 16384l @s
execute if score @s var_0 matches 16384.. run scoreboard players remove @s var_0 16384

execute if score @s var_0 matches 8192.. run xp 8192l @s
execute if score @s var_0 matches 8192.. run scoreboard players remove @s var_0 8192

execute if score @s var_0 matches 4096.. run xp 4096l @s
execute if score @s var_0 matches 4096.. run scoreboard players remove @s var_0 4096

execute if score @s var_0 matches 2048.. run xp 2048l @s
execute if score @s var_0 matches 2048.. run scoreboard players remove @s var_0 2048

execute if score @s var_0 matches 1024.. run xp 1024l @s
execute if score @s var_0 matches 1024.. run scoreboard players remove @s var_0 1024

execute if score @s var_0 matches 512.. run xp 512l @s
execute if score @s var_0 matches 512.. run scoreboard players remove @s var_0 512

execute if score @s var_0 matches 256.. run xp 256l @s
execute if score @s var_0 matches 256.. run scoreboard players remove @s var_0 256

execute if score @s var_0 matches 128.. run xp 128l @s
execute if score @s var_0 matches 128.. run scoreboard players remove @s var_0 128

execute if score @s var_0 matches 64.. run xp 64l @s
execute if score @s var_0 matches 64.. run scoreboard players remove @s var_0 64

execute if score @s var_0 matches 32.. run xp 32l @s
execute if score @s var_0 matches 32.. run scoreboard players remove @s var_0 32

execute if score @s var_0 matches 16.. run xp 16l @s
execute if score @s var_0 matches 16.. run scoreboard players remove @s var_0 16

execute if score @s var_0 matches 8.. run xp 8l @s
execute if score @s var_0 matches 8.. run scoreboard players remove @s var_0 8

execute if score @s var_0 matches 4.. run xp 4l @s
execute if score @s var_0 matches 4.. run scoreboard players remove @s var_0 4

execute if score @s var_0 matches 2.. run xp 2l @s
execute if score @s var_0 matches 2.. run scoreboard players remove @s var_0 2

execute if score @s var_0 matches 1.. run xp 1l @s
execute if score @s var_0 matches 1.. run scoreboard players remove @s var_0 1

stopsound @s random.levelup
