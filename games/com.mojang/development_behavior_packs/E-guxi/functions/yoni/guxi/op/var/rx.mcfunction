#yoni/guxi/op/var/rx

scoreboard objectives add guxi-v-rx dummy
scoreboard objectives add guxi-v-orx dummy
scoreboard objectives add guxi-op-sound dummy
scoreboard players add @s guxi-op-sound 0
# 1 获取角度；计算偏移
##############

scoreboard players set @s guxi-v-rx -3
# 特殊：打开
execute @s[rxm=-84] ~ ~ ~ scoreboard players set @s guxi-v-rx -2
# 缓冲
execute @s[rxm=-69] ~ ~ ~ scoreboard players set @s guxi-v-rx 0
# 38
execute @s[rxm=-31] ~ ~ ~ scoreboard players set @s guxi-v-rx 1
# 38
execute @s[rxm=7] ~ ~ ~ scoreboard players set @s guxi-v-rx 2
# 38
execute @s[rxm=45] ~ ~ ~ scoreboard players set @s guxi-v-rx 3
# 38
execute @s[rxm=83] ~ ~ ~ scoreboard players set @s guxi-v-rx -1
# 特殊：关闭

scoreboard players operation @s guxi-v-orx -= @s guxi-v-rx
# 2 操作
###############
## 播放声音
execute @s[scores={guxi-op-sound=0,guxi-v-orx=!0}] ~ ~ ~ playsound note.bell @s ~ ~3 ~ 0.5

# 3 保存
###############
scoreboard players operation @s guxi-v-orx = @s guxi-v-rx
