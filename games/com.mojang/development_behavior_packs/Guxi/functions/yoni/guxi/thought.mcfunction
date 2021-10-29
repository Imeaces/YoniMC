#yoni/guxi/thought
scoreboard objectives add thought dummy
scoreboard players add @s thought 0

execute @s [scores={thought=0}] ~ ~ ~ scoreboard players set @s thought 2695

execute @s [scores={thought=2695}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§o§7%%2§r§l§f%%1","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}}]}

execute @s[rxm=85] ~ ~ ~ scoreboard players set @s thought 26950001