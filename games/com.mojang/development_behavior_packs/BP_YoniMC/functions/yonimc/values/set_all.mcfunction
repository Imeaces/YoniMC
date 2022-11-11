scoreboard objectives add yonimc:values dummy
scoreboard players add is_set_all yonimc:values 0

execute if score is_set_all yonimc:values matches 0 run function yonimc/values/add_scb_obj
