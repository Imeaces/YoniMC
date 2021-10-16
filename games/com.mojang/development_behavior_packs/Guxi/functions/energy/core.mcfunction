execute @s[scores={guxi:energy=..0}] ~ ~ ~ function energy/drop
execute @s[scores={guxi:energy=100000001..}] ~ ~ ~ function energy/raise

execute @s[scores={guxi:energies=361..}] ~ ~ ~ function energy/full
execute @s[scores={guxi:energies=..-1}] ~ ~ ~ function energy/empty
