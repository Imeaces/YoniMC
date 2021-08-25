#yoni/guxi/energy/raise
function yoni/guxi/energy/init

scoreboard players operation @s guxi:energy -= num360000 const
scoreboard players add @s guxi:energies 1
scoreboard players operation @s yoni:var = @s guxi:energy
scoreboard players operation @s guxi:energy %= num360000 const
scoreboard players operation @s yoni:var /= num360000 const
scoreboard players operation @s guxi:energies += @s yoni:var
