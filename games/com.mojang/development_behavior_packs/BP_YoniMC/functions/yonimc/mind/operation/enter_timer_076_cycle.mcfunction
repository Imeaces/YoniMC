#conf "wait timeout"
scoreboard players set @s var_1 5
execute if score @s arg_1 matches 1.. run scoreboard players operation @s var_1 = @s arg_1

# init values
scoreboard players set @s ret_0 0
scoreboard players set @s var_0 0

# 低头 => 等待操作 => var_0 = -201
execute if score @s md:timer_076v0 matches 0 if entity @s[rxm=88] run scoreboard players set @s var_0 -201
# 抬头 => 确定/取消 => var_0 = -200
execute if score @s md:timer_076v0 matches 1 if entity @s[rx=88] run scoreboard players set @s var_0 -200

# 等待操作 => 添加计时器
execute if score @s var_0 matches -201 run scoreboard players set @s md:timer_076v0 1
execute if score @s var_0 matches -201 run scoreboard players operation @s md:timer_076 = @s var_1

# drop time
execute if score @s md:timer_076v0 matches 1 if score @s md:timer_076 matches 0.. run scoreboard players remove @s md:timer_076 1
#:if 抬头 并且在计时 then true
# 确定
execute if score @s var_0 matches -200 if score @s md:timer_076 matches 0.. run scoreboard players set @s var_0 -301
#:else back
# 抬头但是计时结束了 取消
execute if score @s var_0 matches -200 unless score @s md:timer_076 matches 1.. run scoreboard players set @s var_0 -300

execute if score @s var_0 matches -301..-300 run scoreboard players set @s md:timer_076v0 0




execute if score @s var_0 matches -301 run scoreboard players set @s ret_0 1
execute if score @s var_0 matches -300 run scoreboard players set @s ret_0 2
execute if score @s md:timer_076v0 matches 1 run scoreboard players set @s ret_0 3
execute if score @s md:timer_076v0 matches 1 if score @s md:timer_076 matches ..0 run scoreboard players set @s ret_0 4

#返回值枚举

#: ret_0 = 0
# 等待用户开始操作

#: ret_0 = 1
# 操作已确认

#: ret_0 = 2
# 操作已取消

#: ret_0 = 3
# 等待操作结束

#: ret_0 = 4
# 操作超时

#: md:timer_076 剩余的时间
#title @s subtitle bbb