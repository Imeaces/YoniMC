#yoni/guxi/being

scoreboard objectives add guxi dummy GUXI
scoreboard players add @s guxi 0

execute @s[type=player,m=!creative] ~ ~ ~ function yoni/guxi/loop
execute @s[type=player,m=!creative] ~ ~ ~ function yoni/thought/guxi_player

#execute @s[type=yoni:guxi] ~ ~ ~ function yoni/guxi/loop
