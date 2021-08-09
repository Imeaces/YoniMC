#yoni/guxi/paralysis
function yoni/guxi/random/paralysis

effect @s slowness 1 2 true
effect @s hunger 1 255 true

# drop by health
scoreboard players operation @s yoni:var = @s health
scoreboard players operation @s yoni:var *= @s yoni:var
scoreboard players set @s yoni:var2 512
scoreboard players operation @s yoni:var2 /= @s yoni:var
scoreboard players operation @s energy -= @s yoni:var2
