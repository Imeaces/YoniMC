#yoni/mind_old/th2

#计算与进入视角的偏移值
function operation/rotate_y_offset

# 设定槽位
# 先重置为1，即左上角的位置
# 然后判断在哪一行
# 最后判断在哪一列
scoreboard players set @s th:flag0 1
execute @s[rxm=-30] ~ ~ ~ scoreboard players add @s th:flag0 3
execute @s[rxm=31] ~ ~ ~ scoreboard players add @s th:flag0 3
execute @s[scores={op:ory1=-30..}] ~ ~ ~ scoreboard players add @s th:flag0 1
execute @s[scores={op:ory1=31..}] ~ ~ ~ scoreboard players add @s th:flag0 1

execute @s[scores={th:flag2=0}] ~ ~ ~ scoreboard players operation @s th:flag2 = @s th:flag0
scoreboard players operation @s th:flag1 = @s th:flag2
scoreboard players operation @s th:flag1 -= @s th:flag0
execute @s[scores={th:flag1=0,th:flag3=1}] ~ ~ ~ function yoni/mind/goto/guxi_0
execute @s[scores={th:flag1=!0,th:flag3=0}] ~ ~ ~ scoreboard players set @s th:flag3 1

execute @s[scores={th:flag0=9}] ~ ~ ~ function yoni/mind/goto/guxi_11

# 此命令已压缩，请查看同一目录下的同名json文件
titleraw @s actionbar {"rawtext":[{"translate":"%%s\n\n%%s","with":{"rawtext":[{"rawtext":[{"translate":"%%s§f%%s%%s%%s","with":{"rawtext":[{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:energies=..10}]"},{"text":"§l"}]}},{"score":{"objective":"guxi:energies","name":"@s"}},{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={ths:set26950=1}]"},{"translate":"§o§7|§r%%s%%s","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:energies=..10}]"},{"text":"§f"},{"text":"§7"}]}},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}}]}}]},{"translate":"%%s%%s%%s\n%%s%%s%%s\n%%s%%s%%s","with":{"rawtext":[{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={th:flag0=1}]"},{"text":"§7#(§l空§r§7)"}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=2}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag2=2}]"},{"text":"§r§l§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=2}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={th:flag0=3}]"},{"text":"§7#(§l空§r§7)"}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=4}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag2=4}]"},{"text":"§r§l§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=4}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=5}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag2=5}]"},{"text":"§r§l§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=5}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=6}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag2=6}]"},{"text":"§r§l§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=6}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={th:flag0=7}]"},{"text":"§7#(§l空§r§7)"}]}},{"translate":"§r%%s%%s%%s§r","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=8}]"},{"text":"§r§f#[§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag2=8}]"},{"text":"§r§l§f关闭§r"},{"text":"§r§o§7空§r"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=8}]"},{"text":"§r§f]§r"}]}}]}},{"translate":"§r%%s调节%%s§r","with":{"rawtext":[{"translate":"§f%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=9}]"},{"text":"#[§l"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={th:flag0=9}]"},{"text":"§r§f]"}]}}]}}]}}]}}]}
