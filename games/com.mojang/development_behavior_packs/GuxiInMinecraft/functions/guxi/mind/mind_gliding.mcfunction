#function entity/position/init
#function entity/position/getRotateX

execute @s[scores={mind:slot=3,mind:enter=1,mind:lock=0}] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"开始滑翔飞行"}]}
execute @s[scores={mind:slot=3,mind:enter=1,mind:lock=0}] ~ ~ ~ scoreboard players set @s guxi:v20 1
execute @s[scores={mind:slot=3,mind:enter=1,mind:lock=0}] ~ ~ ~ scoreboard players set @s mind:lock 1

execute @s[scores={mind:slot=!3}] ~ ~ ~ scoreboard players set @s mind:lock 0
execute @s[scores={mind:slot=!3}] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"结束滑翔飞行"}]}
execute @s[scores={mind:slot=!3,guxi:v20=1}] ~ ~ ~ scoreboard players set @s guxi:v20 0
