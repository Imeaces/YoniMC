scoreboard objectives add guxi:cre_ely dummy

scoreboard players add @s guxi:cre_ely 0
scoreboard players set @s var_0 0

execute if entity @s[scores={guxi:cre_ely=2},hasitem=[{location=slot.armor.chest,item=elytra}]] run scoreboard players set @s var_0 1
execute if score @s var_0 matches 1 run replaceitem entity @s slot.armor.chest 0 air
execute if entity @s[hasitem={location=slot.hotbar,slot=8,item=firework_rocket}] if score @s var_0 matches 1 run replaceitem entity @s slot.hotbar 8 air
execute if score @s var_0 matches 1 run scoreboard players set @s guxi:cre_ely 0
