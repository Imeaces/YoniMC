#yoni/player/thought/guxi
function yoni/thought/init
scoreboard objectives add thought-0 dummy "THOUGHT"
scoreboard objectives add thinkingt dummy "THINKING TIME"

execute @s[scores={thought=0,energies=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"with":{"rawtext":[{"score":{"objective":"energy","name":"*"}},{"score":{"objective":"energies","name":"*"}}]},"translate":"§l§c%%s, %%s"}]}
execute @s[scores={thought=0,energies=2..}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"with":{"rawtext":[{"score":{"objective":"energy","name":"*"}},{"score":{"objective":"energies","name":"*"}}]},"translate":"§2%%s, %%s"}]}



execute @s[rxm=85,scores={thought=0}] ~ ~ ~ scoreboard players set @s thought 1

execute @s[scores={thought=1}] ~ ~ ~ scoreboard players add @s thinkingt 1
execute @s[scores={thought=1,thinkingt=60}] ~ ~ ~ scoreboard players set @s thought 10

execute @s[rx=84,scores={thought=1}] ~ ~ ~ scoreboard players set @s thinkingt 0
execute @s[rx=84,scores={thought=1}] ~ ~ ~ scoreboard players set @s thought 0

execute @s[scores={thought=10..1000}] ~ ~ ~ function yoni/player/thought/guxi_thinking
