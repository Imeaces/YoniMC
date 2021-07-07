#yoni/guxi/main
#start guxi.loop
#var guxi; init guxi;
scoreboard objectives add guxi dummy
scoreboard players add @s guxi 0

#player.guxi.operation()
execute @s[type=player,scores={guxi=1}] ~ ~ ~ function yoni/guxi/op/main
#yoni.guxi.operation()
execute @s[scores={guxi=1}] ~ ~ ~ function yoni/guxi/op/guxi

#var guxi.energy.status; 
scoreboard objectives add guxi-energys dummy

#var guxi.energy; var guxi.energy.pool;
scoreboard objectives add guxi-energy dummy
scoreboard objectives add guxi-energyl dummy

#init guxi.energy
##fill energy_pool
execute @s[scores={guxi=0}] ~ ~ ~ scoreboard players set @s guxi-energyl 100000
execute @s[scores={guxi=0}] ~ ~ ~ scoreboard players set @s guxi-energy 360000

#guxi.alive
##energy.drop(random(0,16))
scoreboard players random @s guxi-energys 0 16
scoreboard players operation @s guxi-energy -= @s guxi-energys

#var guxi.energy.operation
scoreboard objectives add guxi-energyp dummy
#var var
scoreboard objectives add var dummy

#guxi.energy.pool
execute @s[scores={guxi-energy=..0}] ~ ~ ~ function yoni/guxi/energy/drop
execute @s[scores={guxi-energy=360001..}] ~ ~ ~ function yoni/guxi/energy/raise

#query guxi.energy
execute @s[scores={guxi-energyl=..0}] ~ ~ ~ scoreboard players set @s guxi -2
execute @s[scores={guxi-energyl=1..3000}] ~ ~ ~ scoreboard players set @s guxi 4
execute @s[scores={guxi-energyl=3001..20000}] ~ ~ ~ scoreboard players set @s guxi 3
execute @s[scores={guxi-energyl=20001..60000}] ~ ~ ~ scoreboard players set @s guxi 2
execute @s[scores={guxi-energyl=60001..90000}] ~ ~ ~ scoreboard players set @s guxi 1
execute @s[scores={guxi-energyl=90001..}] ~ ~ ~ scoreboard players set @s guxi 0
execute @s[scores={guxi-energyl=100000..,guxi-energy=360000}] ~ ~ ~ scoreboard players set @s guxi -1

# -1: full
# 0: >90%
# 1: 60%~90%
# 2: 20%~60%
# 3: 3%~20%
# 4: <3%
# -2: 0%

#end guxi.loop
scoreboard players set @s guxi 1
