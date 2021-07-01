#yoni/guxi/op/main
#init guxi.operation
scoreboard objectives add guxi-op dummy
scoreboard objectives add guxi-opo dummy
scoreboard objectives add guxi-opc dummy
scoreboard objectives add guxi-opt dummy
scoreboard players add @s guxi-op 0
scoreboard players add @s guxi-opt 0

#operation.main
scoreboard players operation @s guxi-opo -= @s guxi-op
execute @s[scores={guxi-opo=!0}] ~ ~ ~ function yoni/guxi/operation/switch
execute @s[scores={guxi-opo=!0}] ~ ~ ~ scoreboard players operation @s guxi-opo = @s guxi-op
function yoni/guxi/op/o/rx

#operation.base(0)
execute @s[scores={guxi-op=0,guxi-opt=..70},rx=-85] ~ ~ ~ scoreboard players add @s guxi-opt 1
execute @s[scores={guxi-op=0,guxi-opt=!0},rxm=-84] ~ ~ ~ scoreboard players set @s guxi-opt 0
execute @s[scores={guxi-op=0,guxi-opt=71},rxm=-84] ~ ~ ~ scoreboard players set @s guxi-opt 0
execute @s[scores={guxi-op=0,guxi-opt=41..70},rxm=-84] ~ ~ ~ scoreboard players set @s guxi-op 1
##display
execute @s[scores={guxi-op=0}] ~ ~ ~ function yoni/guxi/op/d/0

#operation.base(1).s()
execute @s[scores={guxi-op=1}] ~ ~ ~ function yoni/guxi/op/s/1
##display
execute @s[scores={guxi-op=1}] ~ ~ ~ function yoni/guxi/op/d/1
 