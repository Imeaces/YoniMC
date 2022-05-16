# unuse
#execute @s[tag=event:itemUse] ~ ~ ~ scoreboard players remove @s guxi:energy 3000000

scoreboard objectives add mind:v200 dummy
scoreboard players add @s mind:v200 0
scoreboard objectives add mind:v201 dummy
scoreboard players reset @s mind:v201

#>
execute @s[tag=event:itemUse,scores={mind:v200=0,mind:lock=0}] ~ ~ ~ scoreboard players set @s mind:v201 1

execute @s[scores={mind:v201=1}] ~ ~ ~ scoreboard players set @s mind:lock 1
execute @s[scores={mind:v201=1}] ~ ~ ~ scoreboard players set @s mind:v200 1

scoreboard players set @s mind:lock 0
