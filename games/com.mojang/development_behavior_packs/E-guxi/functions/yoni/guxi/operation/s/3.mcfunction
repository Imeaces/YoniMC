#yoni/guxi/operation/s/3

# time.reset
scoreboard players set @s guxi-opt 0

# state(10)
scoreboard players set @s guxi-op 10

# ryx()
function yoni/guxi/operation/ryx




# 暂未使用，可忽略
# objective.add(guxi-opr); objective.init(guxi-opr)
scoreboard objectives add guxi-opr dummy
scoreboard players add @s guxi-opr 0
