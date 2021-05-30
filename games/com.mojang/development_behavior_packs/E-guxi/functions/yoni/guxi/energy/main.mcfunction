#yoni/guxi/energy/main

# 初始能量
function yoni/guxi/energy/initial

# 能量释放
## 释放
function yoni/guxi/energy/freed
## 散逸能量
scoreboard players add @s guxi-energy -2
## 能量池
function yoni/guxi/energy/pool
## 如果能量池已空
### 设置能量状态为-1
scoreboard players set @s guxi-energys -1
