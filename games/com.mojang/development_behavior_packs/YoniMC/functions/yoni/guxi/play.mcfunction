scoreboard objectives add yoni:guxi dummy
scoreboard players add @s yoni:guxi 0

execute @s[scores={yoni:guxi=1..}] ~ ~ ~ function yoni/guxi/play_behaviour

execute @s[scores={yoni:guxi=0,alive=1}] ~ ~ ~ event entity @s yoni:being_guxi
execute @s[scores={yoni:guxi=0,alive=1}] ~ ~ ~ function yoni/guxi/event_spawn
execute @s[scores={yoni:guxi=0,alive=1}] ~ ~ ~ scoreboard players set @s yoni:guxi 1

function yoni/guxi/play_mind

titleraw @s[tag=yoni:debug] actionbar {"rawtext":[{"translate":"%%s %%s\n%%s\n%%s","with":{"rawtext":[{"translate":"%%s: %%s","with":{"rawtext":[{"text":"sence"},{"score":{"objective":"mind:sence","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"mind:v0"},{"score":{"objective":"mind:v0","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"energies"},{"score":{"objective":"guxi:energies","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"energy"},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}}]}
