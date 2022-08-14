#function entity/position/init
#function entity/position/getRotateX

scoreboard objectives add mind:op130 dummy

#if
scoreboard players set @s mind:op130 0
execute @s[scores={mind:slot=3,mind:enter=1,mind:lock=0}] ~ ~ ~ scoreboard players set @s mind:op130 1
#then
execute @s[scores={mind:op130=1}] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"开始滑翔飞行"}]}
execute @s[scores={mind:op130=1}] ~ ~ ~ scoreboard players set @s guxi:v20 1
execute @s[scores={mind:op130=1,guxi:resistance=..0}] ~ ~ ~ scoreboard players set @s guxi:resistance 1
execute @s[scores={mind:op130=1}] ~ ~ ~ scoreboard players set @s mind:lock 1
#fi

#if 
scoreboard players set @s mind:op130 0
execute @s[scores={mind:slot=!3,mind:lock=1}] ~ ~ ~ scoreboard players set @s mind:op130 1
execute @s[scores={mind:slot=3,mind:lock=1,guxi:resistance=..0}] ~ ~ ~ scoreboard players set @s mind:op130 1
#then
execute @s[scores={mind:op130=1}] ~ ~ ~ scoreboard players set @s mind:lock 0
execute @s[scores={mind:op130=1}] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"结束滑翔飞行"}]}
execute @s[scores={mind:op130=1,guxi:v20=1}] ~ ~ ~ scoreboard players set @s guxi:v20 0
#fi

scoreboard players reset @s mind:op130
