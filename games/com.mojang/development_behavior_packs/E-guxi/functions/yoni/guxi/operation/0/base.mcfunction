#yoni/guxi/operation/0/base

# status bar
execute @s[scores={guxi-opdp=1,guxi-opt=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"能量：%%s, %%s","with":{"rawtext":[{"score":{"objective":"guxi-energy","name":"*"}},{"score":{"objective":"guxi-energyl","name":"*"}}]}}]}

# if(player.rotate(x)<=-85){guxi.operation=1}
execute @s[rx=-85] ~ ~ ~ scoreboard players set @s guxi-op 1
