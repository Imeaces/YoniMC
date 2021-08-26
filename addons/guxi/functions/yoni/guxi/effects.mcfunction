#yoni/guxi/effects

# something by effective (-2..4)
execute @s[scores={guxi:effective=..-1}] ~ ~ ~ effect @s hunger 2 255 true
execute @s[scores={guxi:effective=0..}] ~ ~ ~ effect @s saturation 2 255 true
execute @s[scores={guxi:effective=..1}] ~ ~ ~ effect @s slowness 2 2 true
execute @s[scores={guxi:effective=..-2}] ~ ~ ~ effect @s slowness 2 2 true
execute @s[scores={guxi:effective=4..}] ~ ~ ~ effect @s speed 2 0 true

# visitable by vision (-1..1)
execute @s[scores={guxi:vision=..-1}] ~ ~ ~ effect @s blindness 2 0 true
execute @s[scores={guxi:vision=1..}] ~ ~ ~ effect @s night_vision 12 0 true

# strength by strength(-2..4) and effective(-2..4)
execute @s[scores={guxi:strength=..-2,guxi:effective=..3}] ~ ~ ~ effect @s weakness 2 127 true
execute @s[scores={guxi:strength=-1,guxi:effective=..1}] ~ ~ ~ effect @s weakness 2 127 true
execute @s[scores={guxi:strength=-2,guxi:effective=4}] ~ ~ ~ effect @s weakness 2 2 true
execute @s[scores={guxi:strength=-1,guxi:effective=2..3}] ~ ~ ~ effect @s weakness 2 2 true
execute @s[scores={guxi:strength=0,guxi:effective=-2..-1}] ~ ~ ~ effect @s weakness 2 2 true
execute @s[scores={guxi:strength=-1,guxi:effective=4}] ~ ~ ~ effect @s weakness 2 0 true
execute @s[scores={guxi:strength=0,guxi:effective=0..3}] ~ ~ ~ effect @s weakness 2 0 true
execute @s[scores={guxi:strength=1,guxi:effective=2..3}] ~ ~ ~ effect @s strength 2 0 true
execute @s[scores={guxi:strength=2,guxi:effective=0..2}] ~ ~ ~ effect @s strength 2 0 true
execute @s[scores={guxi:strength=3,guxi:effective=-2..0}] ~ ~ ~ effect @s strength 2 0 true
execute @s[scores={guxi:strength=4,guxi:effective=-2}] ~ ~ ~ effect @s strength 2 0 true
execute @s[scores={guxi:strength=1,guxi:effective=4}] ~ ~ ~ effect @s strength 2 2 true
execute @s[scores={guxi:strength=2,guxi:effective=3..4}] ~ ~ ~ effect @s strength 2 2 true
execute @s[scores={guxi:strength=3,guxi:effective=1}] ~ ~ ~ effect @s strength 2 2 true
execute @s[scores={guxi:strength=4,guxi:effective=-1..0}] ~ ~ ~ effect @s strength 2 2 true
execute @s[scores={guxi:strength=3,guxi:effective=2..3}] ~ ~ ~ effect @s strength 2 5 true
execute @s[scores={guxi:strength=4,guxi:effective=1..2}] ~ ~ ~ effect @s strength 2 5 true
execute @s[scores={guxi:strength=3,guxi:effective=4}] ~ ~ ~ effect @s strength 2 8 true
execute @s[scores={guxi:strength=4,guxi:effective=3..4}] ~ ~ ~ effect @s strength 2 8 true

# mining by mining(0..2) and effective(-2..4)
execute @s[scores={guxi:mining=2..,guxi:effective=4..}] ~ ~ ~ effect @s haste 2 3 true
execute @s[scores={guxi:mining=2..,guxi:effective=3..}] ~ ~ ~ effect @s haste 2 1 true
execute @s[scores={guxi:mining=1,guxi:effective=..0}] ~ ~ ~ effect @s mining_fatigue 2 1 true
execute @s[scores={guxi:mining=..0,guxi:effective=..0}] ~ ~ ~ effect @s mining_fatigue 2 3 true

# resistance by resistance(0..4)
execute @s[scores={guxi:resistance=1}] ~ ~ ~ effect @s resistance 2 0 true
execute @s[scores={guxi:resistance=2}] ~ ~ ~ effect @s resistance 2 1 true
execute @s[scores={guxi:resistance=3}] ~ ~ ~ effect @s resistance 2 2 true
execute @s[scores={guxi:resistance=4..}] ~ ~ ~ effect @s resistance 2 3 true

# undefined
# absorption
