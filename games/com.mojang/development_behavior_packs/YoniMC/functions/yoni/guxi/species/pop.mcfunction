scoreboard objectives add yoni:guxi dummy
scoreboard players add @s yoni:guxi 0
execute @s[scores={yoni:guxi=!0}] ~ ~ ~ scoreboard players set @s yoni:guxi 0

event entity @s yoni:perish_guxi
