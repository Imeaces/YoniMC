#yoni/mind/guxi_1

#计算与进入视角的偏移值
function operation/rotate_y_offset

# 设定槽位 op100
# 先重置为1，即左上角的位置
# 然后判断在哪一行
# 最后判断在哪一列
scoreboard players set @s mind:op100 1
## 第二行
execute @s[rxm=-30] ~ ~ ~ scoreboard players add @s mind:op100 3
## 第三行
execute @s[rxm=31] ~ ~ ~ scoreboard players add @s mind:op100 3
## 第二列
execute @s[scores={op:ory1=-30..}] ~ ~ ~ scoreboard players add @s mind:op100 1
## 第三列
execute @s[scores={op:ory1=31..}] ~ ~ ~ scoreboard players add @s mind:op100 1

# 保存初始位置到mind:v101，初始位置始终显示退出按钮
execute @s[scores={mind:v101=0}] ~ ~ ~ scoreboard players operation @s mind:v101 = @s mind:op100

# 如果当前位置在退出按钮则退出
# 如果仍在初始位置，则不会展示退出按钮，直到离开初始位置 v102用作标记是否离开过初始位置 v101记录了初始位置
scoreboard players operation @s mind:op101 = @s mind:op100
scoreboard players operation @s mind:op101 -= @s mind:v101
##enter => back
execute @s[scores={mind:enter=1}] ~ ~ ~ function yoni/guxi/mind/goto/goto_1
execute @s[scores={mind:op101=0,mind:v102=1}] ~ ~ ~ function yoni/guxi/mind/goto/goto_1
execute @s[scores={mind:op101=!0,mind:v102=0}] ~ ~ ~ scoreboard players set @s mind:v102 1

# 如果在其他的特定位置则跳转到对应的功能
# (3,3) 快速调节
execute @s[scores={mind:op100=9}] ~ ~ ~ function yoni/guxi/mind/goto/goto_100400

# 此命令已压缩，请查看同一目录下的同名json文件
title @s times 0 20 0
title @s title §r
titleraw @s subtitle {"rawtext":[{"translate":"%%s\n\n%%s","with":{"rawtext":[{"rawtext":[{"translate":"%%s§f%%s%%s%%s","with":{"rawtext":[{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:energies=..10}]"},{"text":"§l"}]}},{"score":{"objective":"guxi:energies","name":"@s"}},{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v105=1}]"},{"translate":"§o§7|§r%%s%%s","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:energies=..10}]"},{"text":"§f"},{"text":"§7"}]}},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}}]}}]},{"translate":"%%s  %%s  %%s\n%%s  %%s  %%s\n%%s  %%s  %%s","with":{"rawtext":[{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=1}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v101=1,mind:v102=1}]"},{"text":"§r§o§f关闭§r"},{"text":"显示"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=1}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=2}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v101=2,mind:v102=1}]"},{"text":"§r§o§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=2}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=3}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v101=3,mind:v102=1}]"},{"text":"§r§o§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=3}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=4}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v101=4,mind:v102=1}]"},{"text":"§r§o§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=4}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=5}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v101=5,mind:v102=1}]"},{"text":"§r§o§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=5}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=6}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v101=6,mind:v102=1}]"},{"text":"§r§o§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=6}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=7}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v101=7,mind:v102=1}]"},{"text":"§r§o§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=7}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=8}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v101=8,mind:v102=1}]"},{"text":"§r§o§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=8}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"§f%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=9}]"},{"text":"#[§l"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v101=9,mind:v102=1}]"},{"text":"§r§o§f关闭§r"},{"text":"调节"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:op100=9}]"},{"text":"§r§f]"}]}}]}}]}}]}}]}
