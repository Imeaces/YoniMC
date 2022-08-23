#yoni/guxi/thought/play

# 用于玩家的物种技能面板
# 正在测试中，需要实体添加yoni:test才可使用
#execute @s[type=minecraft:player,tag=yoni:test] ~ ~ ~ function yoni/mind/guxi

# 用于咕西实体的物种技能
execute @s[type=yoni:guxi] ~ ~ ~ function yoni/guxi/thought/mind

# 基本意识
function yoni/species/guxi/thought/conscious
