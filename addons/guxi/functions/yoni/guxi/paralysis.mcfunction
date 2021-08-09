#yoni/guxi/paralysis
function yoni/guxi/random/paralysis

effect @s slowness 1 2 true
effect @s hunger 1 255 true

# drop by health
scoreboard players operation @s var = @s health
scoreboard players operation @s var *= @s var
scoreboard players set tmpek32kk var 512
scoreboard players operation tmpek32kk var /= @s var
scoreboard players operation @s energies -= tmpek32kk var
