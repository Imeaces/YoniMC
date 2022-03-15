#yoni/guxi/species/pop

# 咕西物种 pop
# 清空特定的记分项
scoreboard players reset @s yoni:guxi

scoreboard players reset @s guxi:energies
scoreboard players reset @s guxi:energy

scoreboard players reset @s guxi:effective
scoreboard players reset @s guxi:strength
scoreboard players reset @s guxi:mining
scoreboard players reset @s guxi:resistance

scoreboard players reset @s guxi:resi2
scoreboard players reset @s guxi:status

# 触发实体事件，移除组件
event entity @s yoni:perish_guxi
