# [0, 11]

#全防
execute if score @s guxi:ef_res matches 11.. run effect @s resistance 3 3 true
execute if score @s guxi:ef_res matches 10 run effect @s resistance 3 3 true
execute if score @s guxi:ef_res matches 9 run effect @s resistance 3 2 true
execute if score @s guxi:ef_res matches 8 run effect @s resistance 3 2 true
execute if score @s guxi:ef_res matches 7 run effect @s resistance 3 2 true
execute if score @s guxi:ef_res matches 6 run effect @s resistance 3 1 true
execute if score @s guxi:ef_res matches 5 run effect @s resistance 3 0 true

#只防伤害
execute if score @s guxi:ef_res matches 4.. run effect @s absorption 3 3 true
execute if score @s guxi:ef_res matches 3 run effect @s absorption 3 2 true
execute if score @s guxi:ef_res matches 2 run effect @s absorption 3 1 true
execute if score @s guxi:ef_res matches 1 run effect @s absorption 3 0 true
