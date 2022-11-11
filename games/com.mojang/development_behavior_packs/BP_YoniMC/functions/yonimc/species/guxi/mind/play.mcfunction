scoreboard objectives add mind dummy
scoreboard objectives add md:timer_076 dummy
scoreboard players set @s var_0 0
scoreboard players add @s mind 0

execute if score @s mind matches 1 if entity @s[rx=88] run scoreboard players set @s var_0 -200

execute if score @s mind matches 0 if entity @s[rxm=88] run scoreboard players set @s var_0 -201

execute if score @s var_0 matches -201 run scoreboard players set @s mind 1
execute if score @s var_0 matches -201 run scoreboard players set @s md:timer_076 2
##execute if score @s var_0 matches -200 run scoreboard players set @s mind 0
##execute if score @s var_0 matches -200 run scoreboard players set @s md:timer_076 0

execute if score @s mind matches 1 if score @s md:timer_076 matches 0.. run scoreboard players remove @s md:timer_076 1
#:if then true
execute if score @s var_0 matches -200 if score @s md:timer_076 matches 0.. run scoreboard players set @s var_0 -301
#:else back
execute if score @s var_0 matches -200 unless score @s md:timer_076 matches 1.. run scoreboard players set @s mind 0

execute if score @s mind matches 1 run titleraw @s actionbar {"rawtext":[{"translate":"%%s§f%%s%%s%%s","with":{"rawtext":[{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:pp_energy=..30}]"},{"text":"§l"}]}},{"score":{"objective":"guxi:energy_pool","name":"@s"}},{"translate":"§o§7|§r%%s%%s","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:pp_energy=..30}]"},{"text":"§f"},{"text":"§7"}]}},{"score":{"objective":"guxi:energy","name":"@s"}}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>抬头进入","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}]}}]}
execute if score @s mind matches 0 run titleraw @s actionbar {"rawtext":[{"translate":"§7%%s§f|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}]}


execute if score @s var_0 matches -301 run function yonimc/species/guxi/mind/goto/10_base_menu
