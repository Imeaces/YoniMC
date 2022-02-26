#yoni/guxi/mind/th2
function operation/rotate_y_offset

execute @s[rx=-31,scores={op:ry_offset=..-31,th:flag0=!1}] ~ ~ ~ function yoni/guxi/mind/th2_s0
execute @s[rx=-31,scores={op:ry_offset=-30..30,th:flag0=!2}] ~ ~ ~ function yoni/guxi/mind/th2_s1
execute @s[rx=-31,scores={op:ry_offset=31..,th:flag0=!3}] ~ ~ ~ function yoni/guxi/mind/th2_s2

execute @s[rxm=-30,rx=30,scores={op:ry_offset=..-31,th:flag0=!4}] ~ ~ ~ function yoni/guxi/mind/th2_s3
execute @s[rxm=-30,rx=30,scores={op:ry_offset=-30..30,th:flag0=!5}] ~ ~ ~ function yoni/guxi/mind/th2_s4
execute @s[rxm=-30,rx=30,scores={op:ry_offset=31..,th:flag0=!6}] ~ ~ ~ function yoni/guxi/mind/th2_s5

execute @s[rxm=31,scores={op:ry_offset=..-31,th:flag0=!7}] ~ ~ ~ function yoni/guxi/mind/th2_s6
execute @s[rxm=31,scores={op:ry_offset=-30..30,th:flag0=!8}] ~ ~ ~ function yoni/guxi/mind/th2_s7
execute @s[rxm=31,scores={op:ry_offset=31..,th:flag0=!9}] ~ ~ ~ function yoni/guxi/mind/th2_s8

execute @s[scores={ths:focus=1..}] ~ ~ ~ function yoni/guxi/mind/th2_a0

#8
execute @s[scores={th:flag0=8},tag=th:enter] ~ ~ ~ function yoni/guxi/mind/goto/t1

# 显示
execute @s[scores={th:flag0=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§o§7|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s","with":{"rawtext":[{"translate":"#"},{"translate":"§r§7做法§r"},{"translate":""},{"translate":""},{"translate":"§r§7能量附加§r"},{"translate":""},{"translate":""},{"translate":"§r§7放弃§r"},{"translate":""}]}}]}
execute @s[scores={th:flag0=2}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§o§7|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s","with":{"rawtext":[{"translate":""},{"translate":"§r#§l§f做法§r"},{"translate":""},{"translate":""},{"translate":"§r§7能量附加§r"},{"translate":""},{"translate":""},{"translate":"§r§7放弃§r"},{"translate":""}]}}]}
execute @s[scores={th:flag0=3}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§o§7|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s","with":{"rawtext":[{"translate":""},{"translate":"§r§l§f做法§r"},{"translate":"#"},{"translate":""},{"translate":"§r§7能量附加§r"},{"translate":""},{"translate":""},{"translate":"§r§7放弃§r"},{"translate":""}]}}]}
execute @s[scores={th:flag0=4}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§o§7|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s","with":{"rawtext":[{"translate":""},{"translate":"§r§7做法§r"},{"translate":""},{"translate":"#"},{"translate":"§r§l§f能量附加§r"},{"translate":""},{"translate":""},{"translate":"§r§7放弃§r"},{"translate":""}]}}]}
execute @s[scores={th:flag0=5}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§o§7|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s","with":{"rawtext":[{"translate":""},{"translate":"§r§7做法§r"},{"translate":""},{"translate":""},{"translate":"§r#§l§f能量附加§r"},{"translate":""},{"translate":""},{"translate":"§r§7放弃§r"},{"translate":""}]}}]}
execute @s[scores={th:flag0=6}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§o§7|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s","with":{"rawtext":[{"translate":""},{"translate":"§r§7做法§r"},{"translate":""},{"translate":""},{"translate":"§r§l§f能量附加§r"},{"translate":"#"},{"translate":""},{"translate":"§r§7放弃§r"},{"translate":""}]}}]}
execute @s[scores={th:flag0=7}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§o§7|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s","with":{"rawtext":[{"translate":""},{"translate":"§r§7做法§r"},{"translate":""},{"translate":""},{"translate":"§r§7能量附加§r"},{"translate":""},{"translate":"#"},{"translate":"§r§l§f放弃§r"},{"translate":""}]}}]}
execute @s[scores={th:flag0=8}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§o§7|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s","with":{"rawtext":[{"translate":""},{"translate":"§r§7做法§r"},{"translate":""},{"translate":""},{"translate":"§r§7能量附加§r"},{"translate":""},{"translate":""},{"translate":"§r#§l§f放弃§r"},{"translate":""}]}}]}
execute @s[scores={th:flag0=9}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§r§f%%s§o§7|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s\n§r%%s§r§o§7|%%s§r§o§7|%%s","with":{"rawtext":[{"translate":""},{"translate":"§r§7做法§r"},{"translate":""},{"translate":""},{"translate":"§r§7能量附加§r"},{"translate":""},{"translate":""},{"translate":"§r§l§f放弃§r"},{"translate":"#"}]}}]}
