#yoni/guxi/operation/2

# 进入时应该是抬头状态
# 在检测到低头时才开始计时
execute @s[rxm=-84,scores={guxi-opt=0}] ~ ~ ~ scoreboard players set @s guxi-opt 1

# 0.5秒计时
execute @s[scores={guxi-opt=11..}] ~ ~ ~ scoreboard players set @s guxi-opt 0
execute @s[scores={guxi-opt=1..}] ~ ~ ~ scoreboard players add @s guxi-opt 1

# 计算与原始角度的差距
function yoni/guxi/operation/ryo

# 退出面板
execute @s[scores={guxi-opt=1..},rx=-85] ~ ~ ~ scoreboard players set @s guxi-op 4

# 根据角度显示面板

execute @s[scores={guxi-ryo=-50..-31}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n$$~~~~~~~~"}]}

execute @s[scores={guxi-ryo=-30..-11}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§        ~~~~~~~~"}]}

execute @s[scores={guxi-ryo=-10..10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§                ~~~~~~~~"}]}

execute @s[scores={guxi-ryo=11..30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§                        ~~~~~~~~"}]}

execute @s[scores={guxi-ryo=31..50}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§                                ~~~~~~~~"}]}

# 根据角度转到下一面板

execute @s[rxm=-60] ~ ~ ~ scoreboard players set @s guxi-op 20
execute @s[scores={guxi-ryo=-50..-31,guxi-op=20}] ~ ~ ~  scoreboard players set @s guxi-op 21
execute @s[scores={guxi-ryo=-30..-11,guxi-op=20}] ~ ~ ~  scoreboard players set @s guxi-op 22
execute @s[scores={guxi-ryo=11..30,guxi-op=20}] ~ ~ ~  scoreboard players set @s guxi-op 23
execute @s[scores={guxi-ryo=31..50,guxi-op=20}] ~ ~ ~  scoreboard players set @s guxi-op 24
