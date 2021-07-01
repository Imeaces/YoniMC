#yoni/guxi/op/s/1

#into
execute @s[rxm=-60] ~ ~ ~ scoreboard players set @s guxi-opc 1
execute @s[scores={guxi-opy=-2,guxi-opc=1}] ~ ~ ~ scoreboard players set @s guxi-op 21
execute @s[scores={guxi-opy=-1,guxi-opc=1}] ~ ~ ~ scoreboard players set @s guxi-op 22
execute @s[scores={guxi-opy=1,guxi-opc=1}] ~ ~ ~ scoreboard players set @s guxi-op 23
execute @s[scores={guxi-opy=2,guxi-opc=1}] ~ ~ ~ scoreboard players set @s guxi-op 24

#exit
execute @s[rx=-85] ~ ~ ~ scoreboard players set @s guxi-opc -2
execute @s[scores={guxi-opc=-2}] ~ ~ ~ scoreboard players set @s guxi-op 0
execute @s[scores={guxi-opc=-2}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"已退出面板"}]}

#yoni/guxi/operation/1/j

# 跳转

# 重置计时器
scoreboard players set @s guxi-opt 0

