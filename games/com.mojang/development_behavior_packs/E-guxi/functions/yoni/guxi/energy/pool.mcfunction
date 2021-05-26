#yoni/guxi/energy/pool

#  能量池:
#    3.6×10^(10) J
# 36000000000
# 
# 2^31-1=2147483647

#初始化能量池
#init pool
function yoni/init/a12d982b
#scoreboard players set @s energy 3600000

#填充能量
#fill pool
scoreboard players add @s 7bba2c3b7f46 0
execute @s[scores={7bba2c3b7f46=0}] ~ ~ ~ function yoni/guxi/energy/full

#当死亡时清空能量池充满计数器
#clean up count when is dead
execute @s[scores={alive=2}] ~ ~ ~ scoreboard players set @s 7bba2c3b7f46 0

#能量池释放
execute @s [scores={energy=..0,energy_pool=1..}] ~ ~ ~ function yoni/guxi/energy/freed
