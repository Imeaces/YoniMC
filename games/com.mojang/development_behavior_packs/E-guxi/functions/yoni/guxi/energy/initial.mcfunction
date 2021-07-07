#yoni/guxi/energy/initial

scoreboard players add @s guxi-energys 0
execute @s[scores={alive=2,guxi-energys=!0}] ~ ~ ~ scoreboard players set @s guxi-energys 0
execute @s[scores={alive=1,guxi-energys=0}] ~ ~ ~ function yoni/guxi/energy/fill
