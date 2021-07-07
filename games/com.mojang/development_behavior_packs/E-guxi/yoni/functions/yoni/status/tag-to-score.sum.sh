cat <<EOM >>tag_to_scores.mcfunction
scoreboard objectives add $2 dummy
execute @s[tag=!$1] ~ ~ ~ scoreboard players set @s $2 0
execute @s[tag=$1] ~ ~ ~ scoreboard players set @s $2 1

EOM