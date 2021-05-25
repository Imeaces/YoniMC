#  能量池:
#    3.6×10^(10) J
# 36000000000
# 
# 2^31-1=2147483647

#初始化能量池
#init pool
scoreboard objectives add energy_pool dummy
scoreboard objectives add energy dummy
scoreboard objectives add 7bba2c3b7f46 dummy

#填充能量
scoreboard players add @s 7bba2c3b7f46 0
execute @s[scores={7bba2c3b7f46=0}] ~ ~ ~ function yoni/guxi/energy/fill

