gamerule sendcommandfeedback false

tag @s[tag=gamemode:survival] remove gamemode:survival
tag @s[tag=gamemode:creative] remove gamemode:creative
tag @s[tag=gamemode:adventure] remove gamemode:adventure

tag @s[m=survival] add gamemode:survival
tag @s[m=creative] add gamemode:creative
tag @s[m=adventure] add gamemode:adventure

gamemode adventure @s[m=!adventure]
gamemode survival @s[m=adventure]

gamemode adventure @s[tag=gamemode:adventure]
gamemode creative @s[tag=gamemode:creative]
gamemode survival @s[tag=gamemode:survival]

gamerule sendcommandfeedback true
