#yoni/guxi/energy/main

# 初始能量
function yoni/guxi/energy/initial

# 能量释放
## 释放
function yoni/guxi/energy/free

## 散逸能量
scoreboard players add @s guxi-energy -2

## 能量池
function yoni/guxi/energy/pool

## 能量状态检查
execute @s[scores={guxi-energyl=9000..10000}] ~ ~ ~ scoreboard players set @s guxi-energys 1
execute @s[scores={guxi-energyl=6000..8999}] ~ ~ ~ scoreboard players set @s guxi-energys 2
execute @s[scores={guxi-energyl=2000..5999}] ~ ~ ~ scoreboard players set @s guxi-energys 3
execute @s[scores={guxi-energyl=300..1999}] ~ ~ ~ scoreboard players set @s guxi-energys 4
execute @s[scores={guxi-energyl=1..299}] ~ ~ ~ scoreboard players set @s guxi-energys 5
execute @s[scores={guxi-energyl=0}] ~ ~ ~ scoreboard players set @s guxi-energys 6
