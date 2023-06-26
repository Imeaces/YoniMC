#: species:as_minecraft_player 0-99 1
#: species:as_yoni_guxi 100 2

#def v0 v1
scoreboard objectives add var_0 dummy
scoreboard objectives add var_1 dummy

# ########
# random 
# ########

#set v0 0
scoreboard players set @s var_1 0

#set v0 randomIn 0 100
scoreboard players random @s var_0 0 100

#: if v0 = 0..99
execute if score @s var_0 matches 0..99 run scoreboard players set @s var_1 1

#: if v0 = 100
execute if score @s var_0 matches 100 run scoreboard players set @s var_1 2

# ######
# specific
# ######
execute if entity @s[name=Silvigarabis] run scoreboard players set @s var_1 3

#
# set species
#

execute if score @s var_1 matches 1 run event entity @s species:as_minecraft_player
execute if score @s var_1 matches 2 run event entity @s species:as_yonimc_guxi
execute if score @s var_1 matches 3 run event entity @s species:as_sil
