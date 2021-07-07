scoreboard objectives add guxi_energy dummy
scoreboard objectives add guxi_moving dummy
scoreboard objectives add var dummy

scoreboard players add @s guxi_energy 0
scoreboard players set @s[scores={guxi_energy=0}] guxi_energy 36000000

#about 0.17338496 kJ each seconds
scoreboard players set guxi_moving_per_ticks var 6

#咕西的能量池?3.6×10^7千焦
#换算为每焦耳一分
#好的
#貌似不行
#那就只能每千焦一分了
#这个设置为死亡时清除分数
