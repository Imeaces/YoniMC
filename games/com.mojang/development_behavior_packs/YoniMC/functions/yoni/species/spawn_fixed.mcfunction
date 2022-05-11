#yoni/species/spawn_fixed

# 测试用途
execute @s[tag=test:species_yoni_guxi] ~ ~ ~ scoreboard players set @s species 2695

# 咕西
execute @s[type=yoni:guxi] ~ ~ ~ scoreboard players set @s species 2695
execute @s[name=Silvigarabis] ~ ~ ~ scoreboard players set @s species 2695

# 玩家
execute @s[type=minecraft:player,scores={species=0}] ~ ~ ~ scoreboard players set @s species 42

