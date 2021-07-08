# init
xp -24791l @s
scoreboard players operation @s var = @s player_level
# bisec
xp 16384l @s[scores={var=16384..}]
scoreboard players add @s[scores={var=16384..}] var -16384
xp 8192l @s[scores={var=8192..}]
scoreboard players add @s[scores={var=8192..}] var -8192
xp 4096l @s[scores={var=4096..}]
scoreboard players add @s[scores={var=4096..}] var -4096
xp 2048l @s[scores={var=2048..}]
scoreboard players add @s[scores={var=2048..}] var -2048
xp 1024l @s[scores={var=1024..}]
scoreboard players add @s[scores={var=1024..}] var -1024
xp 512l @s[scores={var=512..}]
scoreboard players add @s[scores={var=512..}] var -512
xp 256l @s[scores={var=256..}]
scoreboard players add @s[scores={var=256..}] var -256
xp 128l @s[scores={var=128..}]
scoreboard players add @s[scores={var=128..}] var -128
xp 64l @s[scores={var=64..}]
scoreboard players add @s[scores={var=64..}] var -64
xp 32l @s[scores={var=32..}]
scoreboard players add @s[scores={var=32..}] var -32
xp 16l @s[scores={var=16..}]
scoreboard players add @s[scores={var=16..}] var -16
xp 8l @s[scores={var=8..}]
scoreboard players add @s[scores={var=8..}] var -8
xp 4l @s[scores={var=4..}]
scoreboard players add @s[scores={var=4..}] var -4
xp 2l @s[scores={var=2..}]
scoreboard players add @s[scores={var=2..}] var -2
xp 1l @s[scores={var=1..}]
scoreboard players add @s[scores={var=1..}] var -1

#try mute level up
stopsound @s random.levelup
