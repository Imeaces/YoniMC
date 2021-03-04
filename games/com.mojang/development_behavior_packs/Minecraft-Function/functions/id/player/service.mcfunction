scoreboard players add @a player_id 0
execute @a[scores={player_id=0},c=1] ~ ~ ~ scoreboard players add array.player_id var 1
scoreboard players operation @a[scores={player_id=0},c=1] player_id = array.player_id var
