#!/bin/bash

# sum damage.mcfunction

content='#damage
effect @s instant_health 1 255 true
'

con=100000000
health=60
objective_energy="guxi:energy"
objective_energies="guxi:energies"
objective_health="health"
for((damage=1;damage<=health;damage++)); do
  drop_energy=$((damage ** 5 * 47))
  if ((drop_energy>con)); then
    drop_energies=$((drop_energy / con))
    drop_energy=$((drop_energy % con))
    content+="execute @s[scores={${objective_health}=$((health-damage))}] ~ ~ ~ scoreboard players remove @s ${objective_energies} ${drop_energies}"$'\n'
  fi
  content+="execute @s[scores={${objective_health}=$((health-damage))}] ~ ~ ~ scoreboard players remove @s ${objective_energy} ${drop_energy}"$'\n'
done
echo "$content" >damage.mcfunction
