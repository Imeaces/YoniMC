

titleraw @s actionbar {"rawtext":[{"translate":"§o§7%%2§r§l§f%%1","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}}]}

execute @s[scores={tmp_194689138604=..20}] ~ ~ ~ function yoni/guxi/thought/th_0_t1
execute @s[scores={tmp_194689138604=21..}] ~ ~ ~ scoreboard players set @s tmp_194689138604 0
