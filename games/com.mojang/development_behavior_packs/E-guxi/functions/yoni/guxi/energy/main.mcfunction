#yoni/guxi/energy/main

# 初始能量
function yoni/guxi/energy/initial

# 能量释放
## 释放
#function yoni/guxi/energy/free

# 散逸能量
scoreboard players add @s guxi-energy -2

## 能量池
function yoni/guxi/energy/pool

## 能量状态检查
execute @s[scores={alive=1}] ~ ~ ~ function yoni/guxi/energy/status
