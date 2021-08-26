#yoni/guxi/energy/drop
function yoni/guxi/energy/init

scoreboard players operation @s yoni:var7551 = @s guxi:energy
scoreboard players operation @s guxi:energy %= num360000 const
scoreboard players operation @s yoni:var7551 /= num360000 const
scoreboard players operation @s guxi:energies += @s yoni:var7551
scoreboard players operation @s guxi:energy += num360000 const
scoreboard players add @s guxi:energies -1
