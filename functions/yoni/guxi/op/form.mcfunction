#yoni/guxi/op/form

scoreboard objectives add guxi-opf dummy

#yoni/guxi/op/var/offset_ry

scoreboard objectives add guxi-v-ory dummy

function yoni/var/rotate_y

scoreboard players operation @s guxi-v-ory = @s rotate_y
scoreboard players operation @s guxi-v-ory -= @s guxi-v-bry
execute @s[scores={guxi-v-ory=180..}] ~ ~ ~ scoreboard players add @s guxi-v-ory -360
execute @s[scores={guxi-v-ory=..-180}] ~ ~ ~ scoreboard players add @s guxi-v-ory 360

scoreboard players set num60 var 60
scoreboard players operation @s guxi-v-ory /= num60 var

execute @s[scores={guxi-v-ory=..-2}] ~ ~ ~ scoreboard players add @s guxi-v-bxy -20
execute @s[scores={guxi-v-ory=2..}] ~ ~ ~ scoreboard players add @s guxi-v-bxy 20

execute @s[scores={guxi-v-bry=180..}] ~ ~ ~ scoreboard players add @s guxi-v-bry -360
execute @s[scores={guxi-v-bry=..-180}] ~ ~ ~ scoreboard players add @s guxi-v-bry 360

execute @s[rx=-80] ~ ~ ~ scoreboard players set @s guxi-op-form -1
execute @s[rxm=-81,rx=-30,scores={guxi-v-ory=-1}] ~ ~ ~ scoreboard players set @s guxi-op-form 1
execute @s[rxm=-81,rx=-30,scores={guxi-v-ory=0}] ~ ~ ~ scoreboard players set @s guxi-op-form 2
execute @s[rxm=-81,rx=-30,scores={guxi-v-ory=1}] ~ ~ ~ scoreboard players set @s guxi-op-form 3
execute @s[rxm=-31,rx=30,scores={guxi-v-ory=-1}] ~ ~ ~ scoreboard players set @s guxi-op-form 4
execute @s[rxm=-31,rx=30,scores={guxi-v-ory=0}] ~ ~ ~ scoreboard players set @s guxi-op-form 5
execute @s[rxm=-31,rx=30,scores={guxi-v-ory=1}] ~ ~ ~ scoreboard players set @s guxi-op-form 6
execute @s[rxm=31,scores={guxi-v-ory=-1}] ~ ~ ~ scoreboard players set @s guxi-op-form 7
execute @s[rxm=31,scores={guxi-v-ory=0}] ~ ~ ~ scoreboard players set @s guxi-op-form 8
execute @s[rxm=31,scores={guxi-v-ory=1}] ~ ~ ~ scoreboard players set @s guxi-op-form 9
