scoreboard objectives add yoni:guxi dummy
scoreboard players add @s yoni:guxi 0
execute @s[scores={yoni:guxi=!0}] ~ ~ ~ function yoni/guxi/loop
