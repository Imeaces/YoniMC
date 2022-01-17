#yoni/guxi/loop
# 开始，增加记分项
scoreboard objectives add yoni:guxi dummy GUXI
## 加零
scoreboard players add @s yoni:guxi 0
## 校正
execute @s[scores={yoni:guxi=!-2..4}] ~ ~ ~ scoreboard players set @s yoni:guxi 0

# 处理死亡重生
execute @s[scores={yoni:guxi=4,alive=1}] ~ ~ ~ function yoni/guxi/respawn

# 未初始化{guxi为0}且活着，执行spawn{活了}
execute @s[scores={yoni:guxi=0,alive=1}] ~ ~ ~ function yoni/guxi/spawn

# 初始化了{guxi为1}且活着，执行alive{活着}
execute @s[scores={yoni:guxi=1,alive=1}] ~ ~ ~ scoreboard players set @s yoni:guxi 2
execute @s[scores={yoni:guxi=2}] ~ ~ ~ function yoni/guxi/alive

# 能量状态为5（死）
execute @s[scores={yoni:guxi=2,guxi:status=5}] ~ ~ ~ scoreboard players set @s yoni:guxi 3

# 传递死亡方式
## 物理死亡
execute @s[scores={yoni:guxi=2,alive=-1}] ~ ~ ~ scoreboard players set @s yoni:guxi -1
## 能量消散
execute @s[scores={yoni:guxi=3,alive=-1}] ~ ~ ~ scoreboard players set @s yoni:guxi -2

# 能量消散导致死亡
execute @s[scores={yoni:guxi=3}] ~ ~ ~ damage @s 60 none

# 死了，执行dead{死了}
execute @s[scores={alive=-1}] ~ ~ ~ function yoni/guxi/dead

# 执行思考
function yoni/guxi/thought/play
