#first, choose a player that add a flag
tag @a[c=1] add flag.traversal_init
# if has another haven't traverse's player , then remove the flag
execute @a[scores={traversal=0},c=1] ~ ~ ~ tag @a[tag=flag.traversal_init] remove flag.traversal_init
# if flag exist, then init traversal count
execute @a[tag=flag.traversal_init] ~ ~ ~ scoreboard players set @a traversal 0
# reset traversed player
scoreboard players reset @a[scores={traversal=1},c=1] traversal
# add new traversing player
scoreboard players set @a[scores={traversal=0},c=1] traversal 1
