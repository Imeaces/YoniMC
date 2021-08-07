#yoni/guxi/op/main

#var guxi.operation guxi.operation.last guxi.operation.state guxi.operation.timer world.var
scoreboard objectives add guxi-op dummy
scoreboard objectives add guxi-opo dummy
scoreboard objectives add guxi-opt dummy
scoreboard objectives add var dummy

#init guxi
scoreboard players add @s guxi-op 0
scoreboard players add @s guxi-opt 0

#operation.main
##query.state.change
scoreboard players operation @s guxi-opo -= @s guxi-op
execute @s[scores={guxi-opo=!0}] ~ ~ ~ function yoni/guxi/operation/switch
execute @s[scores={guxi-opo=!0}] ~ ~ ~ scoreboard players operation @s guxi-opo = @s guxi-op
##form
function yoni/guxi/op/form

#operation.base(0)
execute @s[scores={guxi-op=0,guxi-opt=..70,guxi-v-rx=-3}] ~ ~ ~ scoreboard players add @s guxi-opt 1
execute @s[scores={guxi-op=0,guxi-opt=41..70,guxi-v-rx=!-3}] ~ ~ ~ function yoni/guxi/op/var/base_ry
execute @s[scores={guxi-op=0,guxi-opt=41..70,guxi-v-rx=!-3}] ~ ~ ~ scoreboard players set @s guxi-op 1
##display
execute @s[scores={guxi-op=0}] ~ ~ ~ function yoni/guxi/op/d/0
##reset
execute @s[scores={guxi-op=0,guxi-opt=!0,guxi-v-rx=!-3}] ~ ~ ~ scoreboard players set @s guxi-opt 0

#operation.base(1).s()
execute @s[scores={guxi-op=!0}] ~ ~ ~ function yoni/guxi/op/s/1
