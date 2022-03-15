#yoni/guxi/alive

# 计算损失血量，以及与满血状态的血量差距
scoreboard objectives add guxi:lastHealth dummy
scoreboard objectives add guxi:lostHealth dummy
scoreboard objectives add guxi:disHealth dummy
scoreboard players operation @s guxi:lostHealth = @s guxi:lastHealth
scoreboard players operation @s guxi:lostHealth -= @s health

execute @s[scores={guxi:lostHealth=1..}] ~ ~ ~ function yoni/guxi/event_lost_health

scoreboard players operation @s guxi:disHealth = base_health guxi:value
scoreboard players operation @s guxi:disHealth -= @s health

execute @s[scores={guxi:disHealth=1..,guxi:status=..3}] ~ ~ ~ function yoni/guxi/action_cure_health
execute @s[scores={guxi:disHealth=..0,guxi:cureTimer=-2147483648..}] ~ ~ ~ scoreboard players reset @s guxi:cureTimer

scoreboard players operation @s guxi:lastHealth = @s health

# 能量循环
function yoni/guxi/energy/cycle
# 生命状态
function yoni/guxi/alive_status
# 能量附加
function yoni/guxi/effect
