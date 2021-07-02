#yoni/status/tag_to_scores

scoreboard objectives add f.is_on_fire dummy
execute @s[tag=!filters:is_on_fire] ~ ~ ~ scoreboard players set @s f.is_on_fire 0
execute @s[tag=filters:is_on_fire] ~ ~ ~ scoreboard players set @s f.is_on_fire 1

scoreboard objectives add f.in_lava dummy
execute @s[tag=!filters:in_lava] ~ ~ ~ scoreboard players set @s f.in_lava 0
execute @s[tag=filters:in_lava] ~ ~ ~ scoreboard players set @s f.in_lava 1

scoreboard objectives add s.alive dummy
execute @s[tag=!status:alive] ~ ~ ~ scoreboard players set @s s.alive 0
execute @s[tag=status:alive] ~ ~ ~ scoreboard players set @s s.alive 1

