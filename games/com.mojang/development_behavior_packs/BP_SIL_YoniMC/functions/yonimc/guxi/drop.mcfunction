xp -21471l @s
say drop
execute if entity @s[hasitem={item=guxi:enter_attack,quantity=1..}] run clear @s guxi:enter_attack 0 1
execute if entity @s[hasitem={location=slot.inventory,item=yonimc:energy,slot=2,quantity=1}] run replaceitem entity @s slot.inventory 2 air
execute if entity @s[hasitem={location=slot.inventory,item=yonimc:energy,slot=4,quantity=1}] run replaceitem entity @s slot.inventory 4 air
execute if entity @s[hasitem={location=slot.inventory,item=yonimc:energy,slot=6,quantity=1}] run replaceitem entity @s slot.inventory 6 air
execute if entity @s[hasitem={location=slot.inventory,item=yonimc:energy,slot=8,quantity=1}] run replaceitem entity @s slot.inventory 8 air
execute if entity @s[hasitem={location=slot.inventory,item=yonimc:energy,slot=10,quantity=1}] run replaceitem entity @s slot.inventory 10 air
execute if entity @s[hasitem={location=slot.inventory,item=yonimc:energy,slot=12,quantity=1}] run replaceitem entity @s slot.inventory 12 air
execute if entity @s[hasitem={location=slot.inventory,item=yonimc:energy,slot=14,quantity=1}] run replaceitem entity @s slot.inventory 14 air
execute if entity @s[hasitem={location=slot.inventory,item=yonimc:energy,slot=16,quantity=1}] run replaceitem entity @s slot.inventory 16 air
