
# :#= {#}
effect @s night_vision 14 0 true


# ~` effective[0,4]
execute @s[scores={guxi:effective=0}] ~ ~ ~ effect @s hunger 4 255 true
execute @s[scores={guxi:effective=0}] ~ ~ ~ effect @s slowness 4 5 true
execute @s[scores={guxi:effective=1..}] ~ ~ ~ effect @s saturation 4 255 true


# strength ~` strength[0,4]
# ? effective !~ "l +& -++ [2,4]
execute @s[scores={guxi:strength=0}] ~ ~ ~ effect @s weakness 4 255 true
#execute @s[scores={guxi:strength=1}] ~ ~ ~ (+0)
execute @s[scores={guxi:strength=2}] ~ ~ ~ effect @s strength 4 2 true
execute @s[scores={guxi:strength=3}] ~ ~ ~ effect @s strength 4 3 true
execute @s[scores={guxi:strength=4}] ~ ~ ~ effect @s strength 4 4 true


# mining ~` mining[0,4]
# ? effective !~ "l
execute @s[scores={guxi:mining=0}] ~ ~ ~ effect @s mining_fatigue 4 4 true
execute @s[scores={guxi:mining=1}] ~ ~ ~ effect @s mining_fatigue 4 2 true
execute @s[scores={guxi:mining=2}] ~ ~ ~ effect @s haste 4 0 true


# resistance ~` resistance[0,4] -++ [2,4]
execute @s[scores={guxi:resistance=1}] ~ ~ ~ effect @s resistance 4 0 true
execute @s[scores={guxi:resistance=2}] ~ ~ ~ effect @s resistance 4 1 true
execute @s[scores={guxi:resistance=3}] ~ ~ ~ effect @s resistance 4 2 true
execute @s[scores={guxi:resistance=4}] ~ ~ ~ effect @s resistance 4 3 true


# undefined
# absorption


# use energy
function yoni/guxi/effect/energy
