scoreboard objectives add guxi:val_2001 dummy

scoreboard players add @s guxi:val_2001 0

execute if entity @s[scores={guxi:val_2001=2}] run scoreboard players set @s guxi:val_2001 -67
execute if score @s guxi:val_2001 matches -67 run replaceitem entity @s slot.armor.chest 0 elytra 1 0 {"item_lock":{"mode":"lock_in_slot"}}
execute if score @s guxi:val_2001 matches -67 run scoreboard players set @s guxi:val_2001 2
