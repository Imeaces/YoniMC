scoreboard objectives add yoni:guxi dummy
scoreboard players add @s yoni:guxi 0

execute @s[scores={yoni:guxi=1..}] ~ ~ ~ function guxi/play_behaviour

execute @s[scores={yoni:guxi=0,alive=1}] ~ ~ ~ event entity @s yoni:being_guxi
execute @s[scores={yoni:guxi=0,alive=1}] ~ ~ ~ function guxi/event_spawn
execute @s[scores={yoni:guxi=0,alive=1}] ~ ~ ~ scoreboard players set @s yoni:guxi 1

function guxi/play_mind

#titleraw @s[tag=yoni:debug] actionbar {"rawtext":[{"translate":"%%s\n%%s  %%s\n%%s  %%s\n\n%%s\n%%s\n%%s","with":{"rawtext":[{"translate":"%%s: %%s","with":{"rawtext":[{"text":"ti0"},{"score":{"objective":"guxi:ti0","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"lastDisHealth"},{"score":{"objective":"guxi:v100","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"lostHealth"},{"score":{"objective":"guxi:v101","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"disHealth"},{"score":{"objective":"guxi:v102","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"lastHealth"},{"score":{"objective":"guxi:v103","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"health"},{"score":{"objective":"HEALTH","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"energies"},{"score":{"objective":"guxi:energies","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"energy"},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}}]}
titleraw @s actionbar {"rawtext":[{"translate":"%%s %%s\n%%s\n%%s","with":{"rawtext":[{"translate":"%%s: %%s","with":{"rawtext":[{"text":"sence"},{"score":{"objective":"mind:sence","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"mind:v0"},{"score":{"objective":"mind:v0","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"energies"},{"score":{"objective":"guxi:energies","name":"@s"}}]}},{"translate":"%%s: %%s","with":{"rawtext":[{"text":"energy"},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}}]}