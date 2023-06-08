function yonimc/guxi/default_values
xp -21471l @s
xp 24l @s
event entity @s health:max_15

execute unless entity @s[hasitem={item=guxi:enter_attack}] run replaceitem entity @s slot.inventory 0 keep guxi:enter_attack 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_inventory"}}
replaceitem entity @s slot.inventory 2 keep yonimc:energy 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
replaceitem entity @s slot.inventory 4 keep yonimc:energy 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
replaceitem entity @s slot.inventory 6 keep yonimc:energy 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
replaceitem entity @s slot.inventory 8 keep yonimc:energy 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
replaceitem entity @s slot.inventory 10 keep yonimc:energy 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
replaceitem entity @s slot.inventory 12 keep yonimc:energy 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
replaceitem entity @s slot.inventory 14 keep yonimc:energy 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
replaceitem entity @s slot.inventory 16 keep yonimc:energy 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
