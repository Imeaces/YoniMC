#yoni/guxi/operation/5

tellraw @s {"rawtext":[{"translate":"已退出面板"}]}
scoreboard players add @s guxi-opt 1
execute @s[scores={guxi-opt=10..}] ~ ~ ~ scoreboard players set @s guxi-op 6
