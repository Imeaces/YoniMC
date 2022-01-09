
execute @s[rxm=85,scores={th:flag0=0}] ~ ~ ~ scoreboard players set @s th:flag0 1

execute @s[scores={th:flag0=1,th:timer0=0}] ~ ~ ~ scoreboard players operation @s th:timer0 = @s ths:enter
execute @s[scores={th:flag0=1,th:timer0=1..}] ~ ~ ~ scoreboard players add @s th:timer0 -1
execute @s[scores={th:flag0=1,th:timer0=..0}] ~ ~ ~ scoreboard players set @s th:flag0 -1

execute @s[rx=84,scores={th:timer0=1..}] ~ ~ ~ scoreboard players set @s th:timer0 0
execute @s[rx=84,scores={th:flag0=1}] ~ ~ ~ function yoni/guxi/mind/th0_s0
execute @s[rx=84,scores={th:flag0=!0}] ~ ~ ~ scoreboard players set @s th:flag0 0

execute @s[scores={mind:gxds=2,guxi:energies=11..,th:timer0=1..}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s\n>>%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}},{"score":{"objective":"th:timer0","name":"@s"}}]}}]}
execute @s[scores={mind:gxds=1,guxi:energies=11..,th:timer0=1..}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§r§o§7|§r§7%%s\n>>%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}},{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"th:timer0","name":"@s"}}]}}]}
execute @s[scores={guxi:energies=..10,th:timer0=1..}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§l§f%%s§r§o§7|§r§f%%s\n>>%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}},{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"th:timer0","name":"@s"}}]}}]}
execute @s[scores={mind:gxds=2,guxi:energies=11..,th:timer0=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}}]}}]}
execute @s[scores={mind:gxds=1,guxi:energies=11..,th:timer0=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§r§o§7|§r§7%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}
execute @s[scores={guxi:energies=..10,th:timer0=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§l§f%%s§r§o§7|§r§f%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"@s"}},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}
