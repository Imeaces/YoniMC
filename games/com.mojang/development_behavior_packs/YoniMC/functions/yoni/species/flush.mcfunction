
# 建一个记分项来记录旧的种族ID
scoreboard objectives add spec:old_spec dummy
scoreboard players add @s spec:old_spec 0

# 然后建一个记分项来对比新旧种组ID
scoreboard objectives add tmp_019394818495 dummy

# 那就开始对比了哦～
scoreboard players operation @s tmp_019394818495 = @s species
scoreboard players operation @s tmp_019394818495 -= @s spec:old_spec
## 两数相减不为零，嗯，不一样
### 移除旧的种族
execute @s[scores={tmp_019394818495=!0}] ~ ~ ~ scoreboard players operation @s spec:arg1 = @s spec:old_spec
execute @s[scores={tmp_019394818495=!0}] ~ ~ ~ function yoni/species/pop
### 增加新的种族
execute @s[scores={tmp_019394818495=!0}] ~ ~ ~ scoreboard players operation @s spec:arg1 = @s species
execute @s[scores={tmp_019394818495=!0}] ~ ~ ~ function yoni/species/push
## 最后同步一下
execute @s[scores={tmp_019394818495=!0}] ~ ~ ~ scoreboard players operation @s spec:old_spec = @s species
