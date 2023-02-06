scoreboard players set @s var_0 0

execute if score @s guxi:cre_ely matches 2 run scoreboard players set @s var_0 -67
execute if score @s var_0 matches -67 run replaceitem entity @s slot.armor.chest 0 elytra 1 400 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
execute if score @s var_0 matches -67 if entity @s[hasitem={location=slot.hotbar,slot=8,item=firework_rocket, quantity=1..6}] run replaceitem entity @s slot.hotbar 8 firework_rocket 7 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
execute if score @s var_0 matches -67 if entity @s[hasitem={location=slot.hotbar,slot=8,item=firework_rocket, quantity=0}] run replaceitem entity @s slot.hotbar 8 keep firework_rocket 2 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
