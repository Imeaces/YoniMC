# get level
# init scoreboard
scoreboard players set @s player_level 0
# bisec
scoreboard players add @s[lm=16384] player_level 16384
xp -16384l @s[lm=16384]
scoreboard players add @s[lm=8192] player_level 8192
xp -8192l @s[lm=8192]
scoreboard players add @s[lm=4096] player_level 4096
xp -4096l @s[lm=4096]
scoreboard players add @s[lm=2048] player_level 2048
xp -2048l @s[lm=2048]
scoreboard players add @s[lm=1024] player_level 1024
xp -1024l @s[lm=1024]
scoreboard players add @s[lm=512] player_level 512
xp -512l @s[lm=512]
scoreboard players add @s[lm=256] player_level 256
xp -256l @s[lm=256]
scoreboard players add @s[lm=128] player_level 128
xp -128l @s[lm=128]
scoreboard players add @s[lm=64] player_level 64
xp -64l @s[lm=64]
scoreboard players add @s[lm=32] player_level 32
xp -32l @s[lm=32]
scoreboard players add @s[lm=16] player_level 16
xp -16l @s[lm=16]
scoreboard players add @s[lm=8] player_level 8
xp -8l @s[lm=8]
scoreboard players add @s[lm=4] player_level 4
xp -4l @s[lm=4]
scoreboard players add @s[lm=2] player_level 2
xp -2l @s[lm=2]
scoreboard players add @s[lm=1] player_level 1
xp -1l @s[lm=1]

# restore level
function level/restore
