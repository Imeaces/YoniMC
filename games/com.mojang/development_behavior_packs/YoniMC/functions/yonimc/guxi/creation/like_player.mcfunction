scoreboard players set @s var_0 0
scoreboard objectives add guxi:is_player dummy
scoreboard players add @s guxi:is_player 0

execute unless score @s guxi:auto_player matches 0 if score @s guxi:like_player matches 0 if score @s guxi:pp_energy matches ..7699 run scoreboard players set @s guxi:like_player 1
execute unless score @s guxi:auto_player matches 0 unless score @s guxi:like_player matches 0 if score @s guxi:pp_energy matches 7700.. run scoreboard players set @s guxi:like_player 0

#pp<7700 能量少了点，骗一点生物过来
#var guxi:auto_player 2
execute if score @s guxi:is_player matches 0 unless score @s guxi:like_player matches 0 run scoreboard players set @s var_0 -6437
execute unless score @s guxi:is_player matches 0 if score @s guxi:like_player matches 0 run scoreboard players set @s var_0 -755

#0不是玩家
execute if score @s var_0 matches -6437 run event entity @s guxi:like_player
execute if score @s var_0 matches -6437 run tell @s like player
execute if score @s var_0 matches -6437 run scoreboard players set @s guxi:is_player 1

#1是玩家
execute if score @s var_0 matches -755 run event entity @s guxi:not_like_player
execute if score @s var_0 matches -755 run tell @s not player
execute if score @s var_0 matches -755 run scoreboard players set @s guxi:is_player 0

#pp<7700 总结
#auto_energy 1 3从经验里拿能量
#auto_energy 2 变成玩家吸收经验
