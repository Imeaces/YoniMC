#yoni/guxi/op/s/1

##ry
function yoni/guxi/op/var/offset_ry

#into
execute @s[scores={guxi-op=1,guxi-v-ry=!0,guxi-v-rx=1}] ~ ~ ~ function yoni/guxi/op/var/base_ry
execute @s[scores={guxi-op=1,guxi-v-ry=-2,guxi-v-rx=1}] ~ ~ ~ scoreboard players set @s guxi-op 10100
execute @s[scores={guxi-op=1,guxi-v-ry=-1,guxi-v-rx=1}] ~ ~ ~ scoreboard players set @s guxi-op 10200
execute @s[scores={guxi-op=1,guxi-v-ry=1,guxi-v-rx=1}] ~ ~ ~ scoreboard players set @s guxi-op 10300
execute @s[scores={guxi-op=1,guxi-v-ry=2,guxi-v-rx=1}] ~ ~ ~ scoreboard players set @s guxi-op 10400

#exit
execute @s[scores={guxi-v-rx=-3}] ~ ~ ~ scoreboard players set @s guxi-op 0
execute @s[scores={guxi-v-rx=-3}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"已退出面板"}]}

#exec
execute @s[scores={guxi-op=10100..10199}] ~ ~ ~ function yoni/guxi/op/s/1/1
execute @s[scores={guxi-op=10200..10299}] ~ ~ ~ function yoni/guxi/op/s/1/1
execute @s[scores={guxi-op=10300..10399}] ~ ~ ~ function yoni/guxi/op/s/1/1
execute @s[scores={guxi-op=10400..10499}] ~ ~ ~ function yoni/guxi/op/s/1/1
