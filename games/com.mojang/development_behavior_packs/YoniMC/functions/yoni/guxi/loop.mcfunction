#yoni/guxi/loop
# 开始，增加记分项
scoreboard objectives add guxi dummy GUXI
# 加零
scoreboard players add @s guxi 0

# 未初始化{guxi为0}且活着，执行spawn{活了}
execute @s[scores={guxi=0,alive=1}] ~ ~ ~ function yoni/guxi/spawn
# 初始化了{guxi为1}且活着，执行alive{活着}
execute @s[scores={guxi=1,alive=1}] ~ ~ ~ function yoni/guxi/alive
# 能量状态为5（死）
execute @s[scores={guxi=1,guxi:status=5}] ~ ~ ~ damage @s 60 none
# 初始化了但是死了，执行dead{死了}
execute @s[scores={guxi=1,alive=-1}] ~ ~ ~ function yoni/guxi/dead

# 执行思考
function yoni/guxi/thought/play