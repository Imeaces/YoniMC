#yoni/guxi/operation/0/base
#op=0

# status bar
execute @s[scores={guxi-opr=!0,guxi-opt=0}] ~ ~ ~ function yoni/guxi/operation/0/actiobar

# if(player.rotate(x)<=-85){guxi.operation=1}
execute @s[rx=-85] ~ ~ ~ scoreboard players set @s guxi-op 1
