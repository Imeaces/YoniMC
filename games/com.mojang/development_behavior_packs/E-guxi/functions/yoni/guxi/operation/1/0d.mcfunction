#yoni/guxi/operation/2/0d

# 计算与原始角度的差距
function yoni/guxi/operation/ryo

# 根据角度显示面板

execute @s[scores={guxi-ryo=-50..-31}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§~~~~~~~~"}]}

execute @s[scores={guxi-ryo=-30..-11}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§        ~~~~~~~~"}]}

execute @s[scores={guxi-ryo=-10..10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§                ~~~~~~~~"}]}

execute @s[scores={guxi-ryo=11..30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§                        ~~~~~~~~"}]}

execute @s[scores={guxi-ryo=31..50}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§§                [ guxi ]\n§§[skill ][attack][      ][action][status]\n§§                                ~~~~~~~~"}]}
