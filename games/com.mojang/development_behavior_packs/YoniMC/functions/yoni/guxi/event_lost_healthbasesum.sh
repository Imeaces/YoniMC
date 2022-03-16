#!/bin/bash

# sum damage.mcfunction
file="event_lost_health.mcfunction"
content='#dropenergyfunc
#损失的能量: dropEnergy = 42 * lostHealth ^ 5 * k
#k = (lastDisHealth+1)/maxHealth
'

con=100000000
health=60
objective_energy="guxi:energy"
objective_energies="guxi:energies"
objective1="guxi:lostHealth"
objective2="guxi:lstDisHea"
for((damage=1;damage<=health;damage++)); do
  for((lastDisHealth=0;damage+lastDisHealth<=health;lastDisHealth++)); do
    drop_energy=$((damage ** 5 * 42 * (lastDisHealth+1) / health))
    if ((drop_energy>con)); then
      drop_energies=$((drop_energy / con))
      drop_energy=$((drop_energy % con))
      content+="execute @s[scores={${objective1}=${damage},${objective2}=${lastDisHealth}}] ~ ~ ~ scoreboard players remove @s ${objective_energies} ${drop_energies}"$'\n'
    fi
    content+="execute @s[scores={${objective1}=${damage},${objective2}=${lastDisHealth}}] ~ ~ ~ scoreboard players remove @s ${objective_energy} ${drop_energy}"$'\n'
  done
done
echo "$content" >"$file"
