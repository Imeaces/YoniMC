#yoni/guxi/operation/run

# 父进程
# 
# # 创建记分板
# ## 这个是操作面板
# scoreboard objectives add e92ac130 dummy "GUXI:OP"
# ## 这个是操作面板计时器
# scoreboard objectives add 292361b0 dummy "GUXI:OP:TIMER"
# ## 这是检测咕西是否为死亡的
# scoreboard objectives add 9c20af42 dummy "GUXI:DEAD"
# ## 检测是否为咕西
# scoreboard objectives add 9c208759 dummy "GUXI:TAG"
# 
# # 执行操作命令
# execute @a[family=guxi] ~ ~ ~ function yoni/guxi/operation/run
# 

# 检测是否死亡
scoreboard players set @s 9c20af42 1
scoreboard players set @e[family=guxi,scores={9c20af42=1}] 9c20af42 0

# 初始化
scoreboard players add @s e92ac130 0

# 主面板
## 抬头计时
execute @s[scores={e92ac130=0},rx=-89] ~ ~ ~ scoreboard players add @s 292361b0 1
## 文字提示
execute @s[scores={e92ac130=0,292361b0=10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["1.5"]}]}
execute @s[scores={e92ac130=0,292361b0=20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["1.0"]}]}
execute @s[scores={e92ac130=0,292361b0=30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["0.5"]}]}
## 取消抬头时重置计时
execute @s[scores={e92ac130=0,292361b0=1..},rxm=-88] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"中止"}]}
execute @s[scores={e92ac130=0,292361b0=1..},rxm=-88] ~ ~ ~ scoreboard players set @s 292361b0 0
## 两秒后打开
scoreboard players set @s[scores={e92ac130=0,292361b0=40}] e92ac130 1
scoreboard players set @s[scores={e92ac130=0,292361b0=40}] 292361b0 0
## 执行1号面板