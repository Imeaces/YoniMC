#yoni/being

scoreboard objectives add yoni dummy YONI
scoreboard players add @s yoni 0

function yoni/species/loop

execute @s[type=player] ~ ~ ~ function yoni/being_player
execute @s[type=yoni:guxi] ~ ~ ~ function yoni/being_guxi
