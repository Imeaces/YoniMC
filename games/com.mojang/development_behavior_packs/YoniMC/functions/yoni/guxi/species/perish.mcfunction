#yoni/guxi/species/pop
# 咕西物种 pop

# 清空各种状态效果
scoreboard players reset @s guxi:effective
scoreboard players reset @s guxi:mining
scoreboard players reset @s guxi:resistance
scoreboard players reset @s guxi:order

scoreboard players reset @s guxi:resi2

effect @s clear

# 清空实体化效果
scoreboard players set @s guxi:v20 0
function yoni/guxi/play_profile
scoreboard players reset @s guxi:v20 
scoreboard players reset @s guxi:v21 

# 清空能量状态
scoreboard players reset @s guxi:status

# 清空能量
scoreboard players reset @s guxi:energies
scoreboard players reset @s guxi:energy

# 移除组件
event entity @s species:perish_guxi

# 移除判据
scoreboard players reset @s yoni:guxi
