#yoni/guxi/dying
# 死亡{能量消散}
damage @s 60 none

# 兼容玩家创造模式
# 绕过判定，直接触发死亡事件
execute @s[type=player,m=creative] ~ ~ ~ function yoni/guxi/event_dead
