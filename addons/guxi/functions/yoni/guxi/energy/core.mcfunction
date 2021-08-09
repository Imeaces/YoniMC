#yoni/guxi/energy/core
execute @s[scores={energys=1..}] ~ ~ ~ function yoni/guxi/energy/transfer
execute @s[scores={energys=-1}] ~ ~ ~ function yoni/guxi/energy/spawn

execute @s[scores={energies=..0}] ~ ~ ~ scoreboard players set @s energys 0
execute @s[scores={energies=1..3000}] ~ ~ ~ scoreboard players set @s energys 1
execute @s[scores={energies=3001..20000}] ~ ~ ~ scoreboard players set @s energys 2
execute @s[scores={energies=20001..60000}] ~ ~ ~ scoreboard players set @s energys 3
execute @s[scores={energies=60001..90000}] ~ ~ ~ scoreboard players set @s energys 4
execute @s[scores={energies=90001..100000}] ~ ~ ~ scoreboard players set @s energys 5
execute @s[scores={energies=100001..}] ~ ~ ~ scoreboard players set @s energys 6

execute @s[scores={energys=6}] ~ ~ ~ scoreboard players set @s energy 360000
execute @s[scores={energys=6}] ~ ~ ~ scoreboard players set @s energies 100000
