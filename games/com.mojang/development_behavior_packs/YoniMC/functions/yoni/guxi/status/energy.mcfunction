#yoni/guxi/status/energy
# 能量 高于 90%
# 无任何攻击欲望
execute @s[scores={guxi:energies=325..,guxi:status=!0}] ~ ~ ~ function yoni/guxi/status/being_sluggish

# 能量 在 60%~90% 之间
# 不会主动攻击可动物体。
execute @s[scores={guxi:energies=217..324,guxi:status=!1}] ~ ~ ~ function yoni/guxi/status/being_freed

# 能量 在 20%~60% 之间
# 会主动攻击靠近的物体，吸取能量
# 随能量降低，恶魔的攻击欲望逐增
execute @s[scores={guxi:energies=73..216,guxi:status=!2}] ~ ~ ~ function yoni/guxi/status/being_mind

# 能量 在 3%~20% 之间
# 会主动寻找可吸收的能量，捕猎可吸收能量的物体
execute @s[scores={guxi:energies=11..72,guxi:status=!3}] ~ ~ ~ function yoni/guxi/status/being_mad

# 能量 低于 3%
# 失去全部能力
# 状态: 半瘫痪
execute @s[scores={guxi:energies=1..10,guxi:status=!4}] ~ ~ ~ function yoni/guxi/status/being_paralysis

# 能量 耗尽
# 死亡
execute @s[scores={guxi:energies=0,guxi:status=!5}] ~ ~ ~ function yoni/guxi/status/being_dead
