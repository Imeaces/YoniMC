
#获取能量状态
function yoni/guxi/check_energy_status

#能量不足以维持秩序 2
execute @s[scores={alive=1,guxi:status=5}] ~ ~ ~ scoreboard players set @s yoni:guxi 2

# 当初始化完毕，并且实体存活也应当存活时（即能量维持着秩序）
# 对实体应用活着时候的行为
execute @s[scores={alive=1,yoni:guxi=1}] ~ ~ ~ function yoni/guxi/play_alive

# 能量循环
execute @s[scores={alive=1,yoni:guxi=1}] ~ ~ ~ function yoni/guxi/play_energy

#事件 实体死亡 根据已有数据判断死亡方式
execute @s[scores={alive=-1}] ~ ~ ~ function yoni/guxi/event_dead
# 如果因为能量不足以维持秩序[3]而导致实体死亡，则不会爆炸 to102

# 当标记为2，造成大量伤害，使实体死亡
execute @s[scores={alive=1,yoni:guxi=2}] ~ ~ ~ function yoni/guxi/event_orderless

# -2 能量不足以维持秩序，导致灵魂离开
# 重新初始化物种
execute @s[scores={alive=1,yoni:guxi=-2}] ~ ~ ~ scoreboard players reset @s species

function yoni/guxi/play_mind

titleraw @s[tag=yoni:debug] actionbar {"rawtext":[{"translate":"%%s %%s\n%%s\n%%s","with":{"rawtext":[{"translate":"%%s: %%s","with":{"rawtext":[{"text":"sence"},{"score":{"objective":"mind:sence","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"mind:v0"},{"score":{"objective":"mind:v0","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"energies"},{"score":{"objective":"guxi:energies","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"energy"},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}}]}
