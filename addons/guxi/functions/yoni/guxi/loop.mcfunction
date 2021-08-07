#yoni/guxi/loop

# the status of energy
scoreboard objectives add energys dummy

# energy's pool
scoreboard objectives add energy dummy

# energy value
scoreboard objectives add energies dummy

# set default value for energy pool
# 0 means that correct entity is dying
# also the entity born just now
scoreboard players add @s energys 0

# if this energy is just born (or respawn), fill up energy pool 
execute @s[scores={energys=0,alive=1}] ~ ~ ~ scoreboard players set @s energies 360000
execute @s[scores={energys=0,alive=1}] ~ ~ ~ scoreboard players set @s energy 100000

# alive
execute @s[scores={alive=1}] ~ ~ ~ function yoni/guxi/alive

# energy pool store
execute @s[scores={energies=..0}] ~ ~ ~ function yoni/guxi/energy/drop
execute @s[scores={energies=360001..}] ~ ~ ~ function yoni/guxi/energy/raise

# query energy
execute @s[scores={energy=..0}] ~ ~ ~ scoreboard players set @s energys -1
execute @s[scores={energy=1..3000}] ~ ~ ~ scoreboard players set @s energys 1
execute @s[scores={energy=3001..20000}] ~ ~ ~ scoreboard players set @s energys 2
execute @s[scores={energy=20001..60000}] ~ ~ ~ scoreboard players set @s energys 3
execute @s[scores={energy=60001..90000}] ~ ~ ~ scoreboard players set @s energys 4
execute @s[scores={energy=90001..}] ~ ~ ~ scoreboard players set @s energys 5
execute @s[scores={energy=100000..,energies=360000}] ~ ~ ~ scoreboard players set @s energys 6

# dying
execute @s[scores={energys=-1,alive=1}] ~ ~ ~ function yoni/guxi/dying

# respawn
execute @s[scores={alive=-1}] ~ ~ ~ scoreboard players set @s energys 0
