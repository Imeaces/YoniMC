#yoni/guxi/operation/2

# 进入时应该是抬头状态
# 在检测到低头时才开始计时
execute @s[rxm=-84,scores={guxi-opt=0}] ~ ~ ~ scoreboard players set @s guxi-opt 1

# 0.5秒计时
execute @s[scores={guxi-opt=11..}] ~ ~ ~ scoreboard players set @s guxi-opt 0
execute @s[scores={guxi-opt=1..}] ~ ~ ~ scoreboard players add @s guxi-opt 1

# 计算与原始角度的差距
function yoni/status/rotate_y
scoreboard players operation @s guxi-ryo = @s rotate_y
scoreboard players operation @s guxi-ryo -= @s guxi-ryx
execute @s[scores={guxi-ryo=180..}] ~ ~ ~ scoreboard players add @s guxi-ryo -360
execute @s[scores={guxi-ryo=..-180}] ~ ~ ~ scoreboard players add @s guxi-ryo 360

# 根据角度显示面板

## 能量显示状态
execute @s[scores={guxi-ryo=-180..180,guxi-display=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate": "能量显示：%%s","with":{"rawtext":[{"translate": "开"}]}}]}
execute @s[scores={guxi-ryo=-180..180,guxi-display=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate": "能量显示：%%s","with":{"rawtext":[{"translate": "关"}]}}]}
### 进入3号
execute @s[scores={guxi-ryo=-180..180,guxi-opt=1..},rx=-85] ~ ~ ~ scoreboard players set @s guxi-op 3

## 护盾状态
execute @s[scores={guxi-ryo=-180..180,guxi-display=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate": "能量显示：%%s","with":{"rawtext":[{"translate": "开"}]}}]}
execute @s[scores={guxi-ryo=-180..180,guxi-display=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate": "能量显示：%%s","with":{"rawtext":[{"translate": "关"}]}}]}


# 退出面板的方法
execute @s[scores={guxi-opt=1..},rx=-85] ~ ~ ~ scoreboard players set @s guxi-op 4

execute @s[scores={guxi-ryo=-180..-1,guxi-display=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate": "§r================________________\n§r| 能量显示: %%s ||     护盾     |\n§r================~~~~~~~~~~~~~~~~","with": "开"}]}
execute @s[scores={guxi-ryo=-180..-1,guxi-display=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate": "§r================________________\n§r| 能量显示: %%s ||     护盾     |\n§r================~~~~~~~~~~~~~~~~","with": "关"}]}





================________________
| 能量显示: 开 ||     护盾     |
================~~~~~~~~~~~~~~~~

================________________
| 能量显示: 关 ||     护盾     |
================~~~~~~~~~~~~~~~~

================________________
|   能量显示   ||     护盾     |
================~~~~~~~~~~~~~~~~
{   关   [开]  }

================________________
|   能量显示   |      护盾     |
================~~~~~~~~~~~~~~~~
{  [关]   开   }

________________================
|   能量显示   ||   护盾: 关   |
~~~~~~~~~~~~~~~~================

________________================
|   能量显示   ||   护盾: 小   |
~~~~~~~~~~~~~~~~================

________________================
|   能量显示   ||   护盾: 中   |
~~~~~~~~~~~~~~~~================

________________================
|   能量显示   ||   护盾: 大   |
~~~~~~~~~~~~~~~~================

________________================
|   能量显示   ||     护盾     |
~~~~~~~~~~~~~~~~================
                [··············]
                {     [关]     }

________________================
|   能量显示   ||     护盾     |
~~~~~~~~~~~~~~~~================
                [####··········]
                {     [小]     }

________________================
|   能量显示   ||     护盾     |
~~~~~~~~~~~~~~~~================
                [##########····]
                {     [中]     }

________________================
|   能量显示   ||     护盾     |
~~~~~~~~~~~~~~~~================
                [##############]
                {     [大]     }
