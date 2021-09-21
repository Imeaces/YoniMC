#yoni/species/guxi/energy/core

execute @s[scores={guxi:energy=..0}] ~ ~ ~ function yoni/species/guxi/energy/drop
execute @s[scores={guxi:energy=100000001..}] ~ ~ ~ function yoni/species/guxi/energy/raise

execute @s[scores={guxi:energies=361..}] ~ ~ ~ function yoni/species/guxi/energy/full
execute @s[scores={guxi:energies=..-1}] ~ ~ ~ function yoni/species/guxi/energy/empty
