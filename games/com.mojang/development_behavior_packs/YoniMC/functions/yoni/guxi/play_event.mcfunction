execute @s[tag=guxi:event_falled] ~ ~ ~ scoreboard players remove @s guxi:energies 19
execute @s[tag=guxi:event_falled] ~ ~ ~ effect @s slowness 3 7 true

execute @s[tag=guxi:event_disorder] ~ ~ ~ scoreboard players remove @s guxi:energies 3
execute @s[tag=guxi:event_disorder] ~ ~ ~ effect @s nausea 14 0 true
execute @s[tag=guxi:event_disorder] ~ ~ ~ effect @s weakness 1 6 true

execute @s[tag=guxi:event_fetch_energy] ~ ~ ~ scoreboard players add @s guxi:energy 3000000

execute @s[tag=guxi:event_adding_energy] ~ ~ ~ scoreboard players add @s guxi:energy 1900

execute @s[tag=guxi:event_drop_faster] ~ ~ ~ function yoni/guxi/play_effect

