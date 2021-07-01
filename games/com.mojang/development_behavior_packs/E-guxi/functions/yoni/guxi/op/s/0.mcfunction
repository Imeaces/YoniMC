#yoni/guxi/op/s/0

# actionbar.display
## status
## 状态栏
execute @s[scores={guxi-opr=!0,guxi-opt=0}] ~ ~ ~ function yoni/guxi/operation/0/actiobar

# if(player.rotate(x)<=-85){state(1)}
# 在玩家抬头时进入到1态
execute @s[rx=-85] ~ ~ ~ scoreboard players set @s guxi-op 1
