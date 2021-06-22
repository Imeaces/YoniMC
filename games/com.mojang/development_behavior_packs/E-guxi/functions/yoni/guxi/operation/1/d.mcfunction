#yoni/guxi/operation/1/d

# 计算与原始角度的差距
function yoni/guxi/operation/ryo

# 根据角度显示面板

execute @s[scores={guxi-ryo=-180..-31}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§~~~~~~~~"}]}

execute @s[scores={guxi-ryo=-30..-11}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§        ~~~~~~~~"}]}

execute @s[scores={guxi-ryo=-10..10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§                ~~~~~~~~"}]}

execute @s[scores={guxi-ryo=11..30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§                        ~~~~~~~~"}]}

execute @s[scores={guxi-ryo=31..180}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§                                ~~~~~~~~"}]}
