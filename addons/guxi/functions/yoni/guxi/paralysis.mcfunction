#yoni/guxi/paralysis
function yoni/guxi/random/paralysis

effect @s slowness 1 2 true
effect @s hunger 1 255 true

# drop by health
scoreboard players operation @s energyp -= @s health
scoreboard players operation @s energyp *= @s energyp
scoreboard players set @s energys 512
scoreboard players operation @s energys /= @s energyp
scoreboard players operation @s energies -= @s energys
