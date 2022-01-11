# 当低头时，将标志切换到1
execute @s[rxm=85,scores={th:flag0=0}] ~ ~ ~ scoreboard players set @s th:flag0 1

# 当标志为1时
## 复制计时器的分数
execute @s[scores={th:flag0=1,th:timer0=0}] ~ ~ ~ scoreboard players operation @s th:timer0 = @s ths:enter
## 倒计时
execute @s[scores={th:flag0=1,th:timer0=1..}] ~ ~ ~ scoreboard players add @s th:timer0 -1
## 计时结束后，设置标志为-1
execute @s[scores={th:flag0=1,th:timer0=..0}] ~ ~ ~ scoreboard players set @s th:flag0 -1

# 当抬头时
## 如果正在计时，重置计时器
execute @s[rx=84,scores={th:timer0=1..}] ~ ~ ~ scoreboard players set @s th:timer0 0
## 如果标志为1，th goto 1
execute @s[rx=84,scores={th:flag0=1}] ~ ~ ~ function yoni/guxi/mind/goto/t2
## 重置标志
execute @s[rx=84] ~ ~ ~ scoreboard players set @s th:flag0 0

execute @s[scores={ths:gxds=2,guxi:energies=11..,th:timer0=1..}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s\n>>%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}},{"score":{"objective":"th:timer0","name":"@s"}}]}}]}
execute @s[scores={ths:gxds=1,guxi:energies=11..,th:timer0=1..}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§r§o§7|§r§7%%s\n>>%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}},{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"th:timer0","name":"@s"}}]}}]}
execute @s[scores={guxi:energies=..10,th:timer0=1..}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§l§f%%s§r§o§7|§r§f%%s\n>>%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}},{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"th:timer0","name":"@s"}}]}}]}
execute @s[scores={ths:gxds=2,guxi:energies=11..,th:timer0=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}}]}}]}
execute @s[scores={ths:gxds=1,guxi:energies=11..,th:timer0=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§r§o§7|§r§7%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}
execute @s[scores={guxi:energies=..10,th:timer0=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§l§f%%s§r§o§7|§r§f%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}
