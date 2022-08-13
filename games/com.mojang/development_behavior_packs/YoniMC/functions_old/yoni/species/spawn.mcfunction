#yoni/species/spawn

# create "species table"
function yoni/species/table

# objective "species" set @s 0
# @s execFunction spawn_fixed
## if @s "species" 0
# @s exec spawn_random

scoreboard players set @s species 0
function yoni/species/spawn_fixed
execute if score @s species matches 0 run function yoni/species/spawn_random

