#yoni/guxi/action_cure_health

execute @s[scores={guxi:cureTimer=..0}] ~ ~ ~ function guxi/event_cure_health
execute @s[scores={guxi:cureTimer=..0}] ~ ~ ~ scoreboard players operation @s guxi:cureTimer = @s guxi:disHealth
scoreboard players add @s guxi:cureTimer -1