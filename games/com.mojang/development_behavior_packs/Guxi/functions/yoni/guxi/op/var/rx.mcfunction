#yoni/guxi/op/var/rx

#init
##var guxi.variable.rotate_x
scoreboard objectives add guxi-v-rx dummy
##var guxi.variable.rotate_x.last
scoreboard objectives add guxi-v-orx dummy
##var guxi.variable.rotate_x.next
scoreboard objectives add guxi-v-crx dummy

#case entity.rotate_x
scoreboard players set @s guxi-v-rx -3

execute @s[rxm=-84] ~ ~ ~ scoreboard players set @s guxi-v-rx -2
execute @s[scores={guxi-v-rx=-2},rx=-79] ~ ~ ~ scoreboard players set @s guxi-v-crx -3
execute @s[scores={guxi-v-rx=-2},rxm=-74] ~ ~ ~ scoreboard players set @s guxi-v-crx 0

execute @s[rxm=-69] ~ ~ ~ scoreboard players set @s guxi-v-rx 0
execute @s[scores={guxi-v-rx=0},rx=-64] ~ ~ ~ scoreboard players set @s guxi-v-crx -2
execute @s[scores={guxi-v-rx=0},rx=-36] ~ ~ ~ scoreboard players set @s guxi-v-crx 1

execute @s[rxm=-31] ~ ~ ~ scoreboard players set @s guxi-v-rx 1
execute @s[scores={guxi-v-rx=1},rx=-26] ~ ~ ~ scoreboard players set @s guxi-v-crx 0
execute @s[scores={guxi-v-rx=1},rxm=2] ~ ~ ~ scoreboard players set @s guxi-v-crx 2

execute @s[rxm=7] ~ ~ ~ scoreboard players set @s guxi-v-rx 2
execute @s[scores={guxi-v-rx=2},rx=12] ~ ~ ~ scoreboard players set @s guxi-v-crx 1
execute @s[scores={guxi-v-rx=-2},rxm=40] ~ ~ ~ scoreboard players set @s guxi-v-crx 3

execute @s[rxm=45] ~ ~ ~ scoreboard players set @s guxi-v-rx 3
execute @s[scores={guxi-v-rx=3},rx=50] ~ ~ ~ scoreboard players set @s guxi-v-crx 2
execute @s[scores={guxi-v-rx=-2},rxm=78] ~ ~ ~ scoreboard players set @s guxi-v-crx -1

execute @s[rxm=83] ~ ~ ~ scoreboard players set @s guxi-v-rx -1

#esac

##var guxi.variable.rotate_x.last = guxi.variable.rotate_x
scoreboard players operation @s guxi-v-orx -= @s guxi-v-rx
# 2 操作
###############
## 播放声音
execute @s[scores={guxi-op-sound=0,guxi-v-orx=!0}] ~ ~ ~ playsound note.bell @s ~ ~3 ~ 0.5

# 3 保存
###############
scoreboard players operation @s guxi-v-orx = @s guxi-v-rx
