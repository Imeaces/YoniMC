#yoni/guxi/loop

# if this energy is just born (or respawn), fill up energy pool 
execute @s[scores={energys=0,alive=1}] ~ ~ ~ scoreboard players set @s energies 360000
execute @s[scores={energys=0,alive=1}] ~ ~ ~ scoreboard players set @s energy 100000

# alive
execute @s[scores={energys=1..}] ~ ~ ~ function yoni/guxi/alive

# energy core
function yoni/energy/core

# energy status
execute @s[scores={energies=..0}] ~ ~ ~ scoreboard players set @s energys 0
execute @s[scores={energies=1..3000}] ~ ~ ~ scoreboard players set @s energys 1
execute @s[scores={energies=3001..20000}] ~ ~ ~ scoreboard players set @s energys 2
execute @s[scores={energies=20001..60000}] ~ ~ ~ scoreboard players set @s energys 3
execute @s[scores={energies=60001..90000}] ~ ~ ~ scoreboard players set @s energys 4
execute @s[scores={energies=90001..}] ~ ~ ~ scoreboard players set @s energys 5
execute @s[scores={energies=100000..,energies=360000}] ~ ~ ~ scoreboard players set @s energys 6

# dying
execute @s[scores={energys=-1,alive=1}] ~ ~ ~ function yoni/guxi/dying

# respawn
execute @s[scores={alive=-1}] ~ ~ ~ scoreboard players set @s energys 0
