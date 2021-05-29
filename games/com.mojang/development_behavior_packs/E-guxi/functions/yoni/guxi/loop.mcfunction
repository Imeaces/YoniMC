#yoni/guxi/loop

# 添加函数执行标签
tag @a remove self
tag @e remove self
tag @s add self

# 创建记分板
## 操作面板
scoreboard objectives add e92ac130 dummy "GUXI:OP"
## 操作面板计时器
scoreboard objectives add 292361b0 dummy "GUXI:OP:TIMER"
## 是否为死亡
scoreboard objectives add 9c20af42 dummy "GUXI:DEAD"
## 是否为咕西
scoreboard objectives add 9c208759 dummy "GUXI"
## 能量池
scoreboard objectives add d6290a01 dummy "GUXI:ENERGY_POOL"
scoreboard objectives add 65ac9002 dummy "GUXI:ENERGY"
### 状态
scoreboard objectives add 7bba2f46 dummy

# 检测是否为咕西
scoreboard players reset @a[family=!guxi] 9c208759
scoreboard players set @s[family=guxi] 9c208759 1

# 检测存活状态
## 设置活着的为1
scoreboard players set @s[scores={9c20af42=0}] 9c20af42 1
## 设置活着的为0
scoreboard players set @e[scores={9c20af42=1}] 9c20af42 0

# 执行
## 能量管理
function yoni/guxi/energy/main
## 操作行为管理
function yoni/guxi/operation/main
