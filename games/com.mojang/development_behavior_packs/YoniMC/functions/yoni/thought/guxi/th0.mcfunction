#yoni/thought/guxi/th0

scoreboard objectives add th:timer0 dummy
scoreboard players add @s th:timer0 0

execute @s[rxm=85,scores={th:timer0=0}] ~ ~ ~ scoreboard players operation @s th:timer0 = @s th:enter
execute @s[rxm=85] ~ ~ ~ scoreboard players remove @s th:timer0 1
execute @s[rxm=85,scores={th:timer0=0}] ~ ~ ~ scoreboard players set @s th:timer0 -1

execute @s[rx=84,scores={th:timer0=0..}] ~ ~ ~ tag @s add th:enter
execute @s[rx=84,scores={th:timer0=!0}] ~ ~ ~ scoreboard players set @s th:timer0 0

execute @s[tag=th:enter] ~ ~ ~ function yoni/thought/guxi/th0t1

execute @s[scores={th:timer0=1..}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§o§7%%s|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n§r[%%s]","with":{"rawtext":[{"score":{"objective":"tmp_928482019494","name":"@s"}}]}}]}
execute @s[scores={th:timer0=..0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§o§7%%s|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}}]}
