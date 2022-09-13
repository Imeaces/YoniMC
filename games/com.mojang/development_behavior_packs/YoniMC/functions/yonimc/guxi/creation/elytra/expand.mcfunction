scoreboard objectives add guxi:cre_ely dummy

scoreboard players add @s guxi:cre_ely 0
scoreboard players set @s var_0 0

execute if entity @s[scores={guxi:cre_ely=0},hasitem=[{location=slot.armor.chest,item=air, quantity=0}]] run scoreboard players set @s var_0 1
execute if score @s var_0 matches 1 run replaceitem entity @s slot.armor.chest 0 elytra 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
execute if score @s var_0 matches 1 run scoreboard players set @s guxi:cre_ely 2
