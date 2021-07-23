#yoni/guxi/op/var/offset_ry

scoreboard objectives add guxi-v-ory dummy

function yoni/var/rotate_y

scoreboard players operation @s guxi-v-ory = @s rotate_y
scoreboard players operation @s guxi-v-ory -= @s guxi-v-bry
execute @s[scores={guxi-v-ory=180..}] ~ ~ ~ scoreboard players add @s guxi-v-ory -360
execute @s[scores={guxi-v-ory=..-180}] ~ ~ ~ scoreboard players add @s guxi-v-ory 360

scoreboard players set num60 var 60
scoreboard players operation @s guxi-v-ory /= num60 var

execute @s[scores={guxi-v-ory=..-3}] ~ ~ ~ scoreboard players add @s guxi-v-bxy -20
execute @s[scores={guxi-v-ory=3..}] ~ ~ ~ scoreboard players add @s guxi-v-bxy 20

execute @s[scores={guxi-v-bry=180..}] ~ ~ ~ scoreboard players add @s guxi-v-bry -360
execute @s[scores={guxi-v-bry=..-180}] ~ ~ ~ scoreboard players add @s guxi-v-bry 360
