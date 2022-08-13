#yoni/guxi/species/push
# 咕西物种 push

# 触发实体事件，添加组件
event entity @s species:being_guxi

function yoni/guxi/event_spawn

scoreboard objectives add yoni:guxi dummy
scoreboard players set @s yoni:guxi 1
