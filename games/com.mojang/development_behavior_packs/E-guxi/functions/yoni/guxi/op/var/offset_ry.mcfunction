#yoni/guxi/op/var/offset_ry

scoreboard objectives add guxi-v-ory dummy

function yoni/guxi/op/var/rx

scoreboard players operation @s guxi-v-ory = @s rotate_y
scoreboard players operation @s guxi-v-ory -= @s guxi-v-bry
execute @s[scores={guxi-v-ory=180..}] ~ ~ ~ scoreboard players add @s guxi-v-ory -360
execute @s[scores={guxi-v-ory=..-180}] ~ ~ ~ scoreboard players add @s guxi-v-ory 360

scoreboard players set num36 var 36
scoreboard players operation @s guxi-v-ory /= num36 var

execute @s[scores={guxi-v-ory=..-5}] ~ ~ ~ function yoni/guxi/op/e/out_of_range
execute @s[scores={guxi-v-ory=..-5}] ~ ~ ~ scoreboard players add @s guxi-v-bxy -10
execute @s[scores={guxi-v-ory=5..}] ~ ~ ~ scoreboard players add @s guxi-v-bxy 10

execute @s[scores={guxi-v-bry=180..}] ~ ~ ~ scoreboard players add @s guxi-v-bry -360
execute @s[scores={guxi-v-bry=..-180}] ~ ~ ~ scoreboard players add @s guxi-v-bry 360
