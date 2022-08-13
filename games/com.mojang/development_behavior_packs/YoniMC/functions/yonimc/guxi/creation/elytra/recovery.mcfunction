scoreboard objectives add guxi:val_2001 dummy

scoreboard players add @s guxi:val_2001 0

execute if entity @s[scores={guxi:val_2001=2},hasitem=[{location=slot.armor.chest,item=elytra}]] run scoreboard players set @s guxi:val_2001 -7
execute if score @s guxi:val_2001 matches -7 run replaceitem entity @s slot.armor.chest 0 air
execute if score @s guxi:val_2001 matches -7 run scoreboard players set @s guxi:val_2001 0
