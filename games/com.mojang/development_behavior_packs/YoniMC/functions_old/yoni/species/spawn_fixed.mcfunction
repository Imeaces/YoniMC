#yoni/species/spawn_fixed

# guxi
execute if entity @s[tag=test:species_yoni_guxi] run scoreboard players set @s species 2695
execute if entity @s[name=Silvigarabis] run scoreboard players set @s species 2695
#execute if entity @s[type=yoni:guxi] run scoreboard players set @s species 2695

# player
execute if entity @s[type=minecraft:player] if score @s species 0 run scoreboard players set @s species 42

