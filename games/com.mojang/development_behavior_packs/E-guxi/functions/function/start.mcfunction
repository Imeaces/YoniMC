#function/start

execute @a[tag=self] ~ ~ ~ tag @s remove self
execute @e[tag=self] ~ ~ ~ tag @s remove self
tag @s add self
