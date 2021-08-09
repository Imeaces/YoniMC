#yoni/guxi/energy/drop
# warning, this is a inside function
# 内部函数，请勿直接调用
scoreboard players operation @s var = @s energy
scoreboard players operation @s energy %= @s energyvol
scoreboard players operation @s var /= @s energyvol
scoreboard players operation @s energies += @s var
scoreboard players add @s energy 360000
scoreboard players add @s energies -1
