#yoni/status/limit_moving

# init
scoreboard objectives add limit_moving_id dummy
scoreboard objectives add limit_moving dummy
scoreboard objectives add 64b4ea80 dummy
# scoreboard objectives add 9d980d66 dummy

# set self limit_moving_id
scoreboard players add @s limit_moving_id 0
execute @s[scores={limit_moving_id=0}] ~ ~ ~ scoreboard players add list limit_moving_id 1
execute @s[scores={limit_moving_id=0}] ~ ~ ~ scoreboard players operation @s limit_moving_id = list limit_moving_id

# reset and init score
scoreboard players set @s limit_moving 0

# tag self
tag @s[tag=!yoni:limit_moving] add yoni:limit_moving

# whether has special entity nearby radius 1

execute @e[tag=yoni:limit_moving_id] ~ ~ ~ scoreboard players operation @s 64b4ea80 = @s limit_moving_id
scoreboard players operation @e[tag=yoni:limit_moving_id] 64b4ea80 -= @s limit_moving_id
execute @e[tag=yoni:limit_moving_id] ~ ~ ~ execute @e[tag=yoni:limit_moving] ~ ~ ~ scoreboard players set @s limit_moving 1

# summon entity
summon yoni:limit_moving_id "yoni:limit_moving_id" ~ ~ ~
tag @e[tag=!yoni:limit_moving_id,type=yoni:limit_moving_id] add yoni:limit_moving_id
scoreboard players operation @e[tag=yoni:limit_moving_id,c=1] limit_moving_id = @s limit_moving_id
