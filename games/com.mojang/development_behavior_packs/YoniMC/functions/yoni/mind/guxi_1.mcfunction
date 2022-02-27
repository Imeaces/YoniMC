#yoni/mind_old/th2

#计算与进入视角的偏移值
function operation/rotate_y_offset

# 增加一个记分项，用于记录当前槽位
scoreboard objectives add th:flag0 dummy

# 设定槽位
# 先重置为1，即左上角的位置
# 然后判断在哪一行
# 最后判断在哪一列
scoreboard players set @s th:flag0 1
execute @s[rxm=-30] ~ ~ ~ scoreboard players add @s th:flag0 3
execute @s[rxm=31] ~ ~ ~ scoreboard players add @s th:flag0 3
execute @s[scores={op:ory1=-30..}] ~ ~ ~ scoreboard players add @s th:flag0 1
execute @s[scores={op:ory1=31..}] ~ ~ ~ scoreboard players add @s th:flag0 1

# 检测槽位是否发生改变
## 增加检测用记分项
scoreboard objectives add th:flag1 dummy
## 将f1减去f0，如果为0，则槽位未改变，如果不为0，则槽位改变
scoreboard players operation @s th:flag1 -= @s th:flag0
## 如果未改变则计时到ths:enter
scoreboard objectives add th:timer0 dummy
execute @s[scores={th:flag1=0}] ~ ~ ~ scoreboard players remove @s th:timer0 1
execute @s[scores={th:flag1=0,th:timer0=..-1}] ~ ~ ~ scoreboard players operation @s th:timer0 = @s ths:enter
## 如果改变则清空计时
execute @s[scores={th:flag1=!0}] ~ ~ ~ scoreboard players reset @s th:timer0
###如果计时结束，执行槽位对应操作
execute @s[scores={th:timer0=0,th:flag0=8}] ~ ~ ~ function yoni/mind/goto/guxi_0
execute @s[scores={th:timer0=0,th:flag0=5}] ~ ~ ~ function yoni/mind/goto/guxi_15
##同步
scoreboard players operation @s th:flag1 = @s th:flag0

titleraw @s actionbar {"rawtext":[{"translate":"%%s\n\n%%s","with":{"rawtext":[{"text":"面板"},{"translate":"%%s%%s%%s\n%%s%%s%%s\n%%s%%s%%s","with":{"rawtext":[{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={th:flag0=1}]"},{"text":"§7#(§l空§r§7)"}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={th:flag0=2}]"},{"text":"§7#(§l空§r§7)"}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={th:flag0=3}]"},{"text":"§7#(§l空§r§7)"}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={th:flag0=4}]"},{"text":"§7#(§l空§r§7)"}]}},{"translate":"§r%%s调节%%s§r","with":{"rawtext":[{"translate":"§f%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=5}]"},{"text":"#[§l"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=5}]"},{"text":"§r§f]"}]}}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={th:flag0=6}]"},{"text":"§7#(§l空§r§7)"}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={th:flag0=7}]"},{"text":"§7#(§l空§r§7)"}]}},{"translate":"§r%%s关闭%%s§r","with":{"rawtext":[{"translate":"§f%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=8}]"},{"text":"#[§l"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=8}]"},{"text":"§r§f]"}]}}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={th:flag0=9}]"},{"text":"§7#(§l空§r§7)"}]}}]}}]}}]}