#yoni/species/flush

# 用于记录旧的种族ID
scoreboard objectives add spec:old_spec dummy
scoreboard players add @s spec:old_spec 0

# 用于对比新旧种组ID
scoreboard objectives add spec:diff dummy

# 进行对比操作
# 将种族ID赋值给对比用记分项，然后减去旧的种族ID
scoreboard players operation @s spec:diff = @s species
scoreboard players operation @s spec:diff -= @s spec:old_spec

## 两数相减不为零，说明种族已更新
### 则先移除旧的种族
execute @s[scores={spec:diff=!0}] ~ ~ ~ scoreboard players operation @s spec:arg1 = @s spec:old_spec
execute @s[scores={spec:diff=!0}] ~ ~ ~ function yoni/species/pop
### 增加新的种族
execute @s[scores={spec:diff=!0}] ~ ~ ~ scoreboard players operation @s spec:arg1 = @s species
execute @s[scores={spec:diff=!0}] ~ ~ ~ function yoni/species/push
## 最后将新的种族标识复制到存储用记分项
execute @s[scores={spec:diff=!0}] ~ ~ ~ scoreboard players operation @s spec:old_spec = @s species
