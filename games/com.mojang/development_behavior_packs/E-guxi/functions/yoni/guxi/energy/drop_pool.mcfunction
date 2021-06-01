#yoni/guxi/energy/drop_pool

# 新的能量放出请求
execute @s[scores={guxi-energyd=1..}] ~ ~ ~ scoreboard players add @s energy 3600000
scoreboard players add @s guxi-energyd 1

