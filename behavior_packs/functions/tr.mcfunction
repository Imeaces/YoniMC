scoreboard objectives add tr dummy
scoreboard players add @a tr 0

execute @a[scores={tr=0},c=1] ~ ~ ~ scoreboard players set @a[scores={tr=1}] tr 2
execute @a[scores={tr=1},c=1] ~ ~ ~ scoreboard players set @a tr 0
scoreboard players set @a[scores={tr=0},c=1] tr 1
