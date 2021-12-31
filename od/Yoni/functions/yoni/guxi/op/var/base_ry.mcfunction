#yoni/guxi/op/var/base_ry

#init
##var guxi.variable.rotate_y.base
scoreboard objectives add guxi-v-bry dummy

#var guxi.variable.rotate_y.base = entity.rotate_y()
function yoni/guxi/op/var/ry
scoreboard players operation @s guxi-v-bry = @s rotate_y
