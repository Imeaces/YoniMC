#yoni/species/spawn
# will specify a kind of species randomly

# initial scoreboard
scoreboard objectives add yoni:species dummy

# random number
scoreboard objectives add yoni:var00001 dummy
scoreboard players random @s yoni:var00001 1 10

# case in
execute @s[scores={yoni:var00001=1..10}] ~ ~ ~ function yoni/species/guxi/spawn
