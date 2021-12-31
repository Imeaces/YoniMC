#yoni/thought/guxi/th_1

execute @s[scores={thought=1,ths:energy=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]},"translate":"§r§o§7%%2|%%1§r\n§r§7实时能量"}]}

execute @s[scores={thought=1,ths:energy=-1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]},"translate":"§r\n§r§o§7实时能量§r"}]}
