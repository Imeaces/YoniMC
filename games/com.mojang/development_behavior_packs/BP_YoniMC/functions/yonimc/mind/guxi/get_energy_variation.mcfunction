scoreboard objectives add md:0_lst_e dummy
scoreboard objectives add md:0_lst_el dummy

scoreboard objectives add md:0_va_e dummy
scoreboard objectives add md:0_va_el dummy

scoreboard players operation @s md:0_va_e = @s guxi:energy
scoreboard players operation @s md:0_va_e -= @s md:0_lst_e

scoreboard players operation @s md:0_va_el = @s guxi:energy_pool
scoreboard players operation @s md:0_va_el -= @s md:0_lst_el


scoreboard players operation @s md:0_lst_e = @s guxi:energy
scoreboard players operation @s md:0_lst_el = @s guxi:energy_pool
