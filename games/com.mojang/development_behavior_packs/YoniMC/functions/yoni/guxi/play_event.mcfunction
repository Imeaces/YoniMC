scoreboard objectives add guxi:op5 dummy
scoreboard players random @s guxi:op5 0 1000

execute @s[tag=guxi:event_falled] ~ ~ ~ scoreboard players remove @s guxi:energies 19
execute @s[tag=guxi:event_falled] ~ ~ ~ effect @s slowness 3 7 true

execute @s[tag=guxi:event_disorder] ~ ~ ~ scoreboard players remove @s guxi:energies 3
execute @s[tag=guxi:event_disorder] ~ ~ ~ effect @s nausea 14 0 true
execute @s[tag=guxi:event_disorder] ~ ~ ~ effect @s weakness 1 6 true

execute @s[tag=guxi:event_fetch_energy] ~ ~ ~ scoreboard players add @s guxi:energy 3000000

execute @s[tag=guxi:event_adding_energy,scores={mind:slot=0}] ~ ~ ~ scoreboard players add @s guxi:energy 1900
execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0..5,mind:slot=0}] ~ ~ ~ fill ~-1 ~ ~-1 ~1 ~ ~1 obsidian 0 replace lava
execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0..7,mind:slot=0}] ~ ~ ~ fill ~-1 ~ ~-1 ~1 ~ ~1 stone 0 replace flowing_lava
execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0..50,mind:slot=0}] ~ ~ ~ fill ~-1 ~ ~-1 ~1 ~ ~1 air 0 replace fire

execute @s[tag=guxi:event_drop_faster] ~ ~ ~ function yoni/guxi/play_effect
#execute @s[tag=guxi:event_drop_faster,scores={guxi:op5=0..5}] ~ ~ ~ function yoni/guxi/play_effect

