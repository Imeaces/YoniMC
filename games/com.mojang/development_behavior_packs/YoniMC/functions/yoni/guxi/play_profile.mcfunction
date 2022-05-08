scoreboard objectives add guxi:v20 dummy profile
scoreboard objectives add guxi:v21 dummy "used profile"
scoreboard players add @s guxi:v20 0
scoreboard players add @s guxi:v21 0

execute @s[scores={guxi:v20=1,guxi:v21=0},hasitem={location=slot.armor.chest,item=air,quantity=0..}] ~ ~ ~ scoreboard players set @s guxi:v21 1
execute @s[scores={guxi:v20=1,guxi:v21=1}] ~ ~ ~ replaceitem entity @s slot.armor.chest 0 keep elytra 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
execute @s[scores={guxi:v20=0,guxi:v21=1}] ~ ~ ~ replaceitem entity @s slot.armor.chest 0 destroy air
execute @s[scores={guxi:v20=0,guxi:v21=1}] ~ ~ ~ scoreboard players set @s guxi:v21 0
