#yoni/guxi/op/main
#init guxi.operation
##var guxi.operation
scoreboard objectives add guxi-op dummy
##var guxi.operation.last
scoreboard objectives add guxi-opo dummy
##var guxi.operation.state
scoreboard objectives add guxi-opc dummy
##var guxi.operation.timer
scoreboard objectives add guxi-opt dummy
##var world.var
scoreboard objectives add var dummy
scoreboard players add @s guxi-op 0
scoreboard players add @s guxi-opt 0

#operation.main
##sound
###var guxi.operation.settings.sound
scoreboard objectives add guxi-op-sound dummy
scoreboard players add @s guxi-op-sound 0
##state.change
scoreboard players operation @s guxi-opo -= @s guxi-op
execute @s[scores={guxi-opo=!0}] ~ ~ ~ function yoni/guxi/operation/switch
execute @s[scores={guxi-opo=!0}] ~ ~ ~ scoreboard players operation @s guxi-opo = @s guxi-op
##rx
function yoni/guxi/op/var/rx

#operation.base(0)
execute @s[scores={guxi-op=0,guxi-opt=..70,guxi-v-rx=-3}] ~ ~ ~ scoreboard players add @s guxi-opt 1
execute @s[scores={guxi-op=0,guxi-opt=41..70,guxi-v-rx=!-3}] ~ ~ ~ function yoni/guxi/op/var/base_ry
execute @s[scores={guxi-op=0,guxi-opt=41..70,guxi-v-rx=!-3}] ~ ~ ~ scoreboard players set @s guxi-op 1
##display
execute @s[scores={guxi-op=0}] ~ ~ ~ function yoni/guxi/op/d/0
##reset
execute @s[scores={guxi-op=0,guxi-opt=!0,guxi-v-rx=!-3}] ~ ~ ~ scoreboard players set @s guxi-opt 0

#operation.base(1).s()
execute @s[scores={guxi-op=1}] ~ ~ ~ function yoni/guxi/op/s/1
execute @s[scores={guxi-op=10000..99999}] ~ ~ ~ function yoni/guxi/op/s/1
##display
execute @s[scores={guxi-op=1}] ~ ~ ~ function yoni/guxi/op/d/1
