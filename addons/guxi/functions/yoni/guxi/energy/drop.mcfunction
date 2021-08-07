#yoni/guxi/energy/drop
#drop pool.energy
scoreboard players set num360000 var 360000
scoreboard players operation @s guxi-energyp = @s guxi-energy
scoreboard players operation @s guxi-energy %= num360000 var
scoreboard players operation @s guxi-energyp /= num360000 var
scoreboard players operation @s guxi-energyl += @s guxi-energyp
scoreboard players add @s guxi-energy 360000
scoreboard players add @s guxi-energyl -1
