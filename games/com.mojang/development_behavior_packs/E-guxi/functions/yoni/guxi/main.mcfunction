#yoni/guxi/main
#start guxi.loop
#var guxi; init guxi;
scoreboard objectives add guxi dummy
scoreboard players add @s guxi -1
execute @s[scores={guxi=..-1}] ~ ~ ~ scoreboard players set @s guxi 1

#guxi.operation()
function yoni/guxi/op/main

#var guxi.energy.status; 
scoreboard objectives add guxi-energys dummy
# 0: >90%
# 1: 60%~90%
# 2: 20%~60%
# 3: 3%~20%
# 4: <3%
# 5: 0%
# -1: init

#var guxi.energy; var guxi.energy.pool;
scoreboard objectives add guxi-energy dummy
scoreboard objectives add guxi-energyl dummy

#init guxi.energy
scoreboard players add @s guxi-energyl -1
execute @s[scores={guxi-energyl=..-1}] ~ ~ ~ scoreboard players set @s guxi-energys -1
##set default
execute @s[scores={guxi-energys=-1}] ~ ~ ~ scoreboard players set @s guxi-energyl 100000
execute @s[scores={guxi-energys=-1}] ~ ~ ~ scoreboard players set @s guxi-energy 360000

#guxi.alive
##energy
scoreboard players add @s guxi-energy -2

#init guxi.energy.operation
scoreboard objectives add guxi-energyp dummy
#init var
scoreboard objectives add var dummy

#guxi.energy.pool
execute @s[scores={guxi-energy=..0}] ~ ~ ~ scoreboard players set @s guxi-energys 1
execute @s[scores={guxi-energy=360001..}] ~ ~ ~ scoreboard players set @s guxi-energys 2
scoreboard players set num360000 var 360000
##remove
execute @s[scores={guxi-energys=1}] ~ ~ ~ scoreboard operation @s guxi-energyp = @s guxi-energy
execute @s[scores={guxi-energys=1}] ~ ~ ~ scoreboard players operation @s guxi-energy %= num360000 var
execute @s[scores={guxi-energys=1}] ~ ~ ~ scoreboard players operation @s guxi-energyp /= num360000 var
execute @s[scores={guxi-energys=1}] ~ ~ ~ scoreboard players operation @s guxi-energyl += @s guxi-energyp
execute @s[scores={guxi-energys=1}] ~ ~ ~ scoreboard players add @s guxi-energy 360000
execute @s[scores={guxi-energys=1}] ~ ~ ~ scoreboard players add @s guxi-energyl -1
##add
execute @s[scores={guxi-energys=2}] ~ ~ ~ scoreboard players add @s guxi-energy -360000
execute @s[scores={guxi-energys=2}] ~ ~ ~ scoreboard players add @s guxi-energyl 1
execute @s[scores={guxi-energys=2}] ~ ~ ~ scoreboard operation @s guxi-energyp = @s guxi-energy
execute @s[scores={guxi-energys=2}] ~ ~ ~ scoreboard players operation @s guxi-energy %= num360000 var
execute @s[scores={guxi-energys=2}] ~ ~ ~ scoreboard players operation @s guxi-energyp /= num360000 var
execute @s[scores={guxi-energys=2}] ~ ~ ~ scoreboard players operation @s guxi-energyl += @s guxi-energyp

#end guxi.loop
execute @s[scores={guxi=0}] ~ ~ ~ scoreboard players set @s guxi 1
