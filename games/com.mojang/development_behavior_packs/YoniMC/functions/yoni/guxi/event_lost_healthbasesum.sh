#!/bin/bash

# sum damage.mcfunction
file="event_lost_health.mcfunction"
content='#lostenergyfunc
#损失血量时丢失的能量:lostEnergy=disHealth^5

'

con=100000000
health=60
objective_energy="guxi:energy"
objective_energies="guxi:energies"
objective1="guxi:disHealth"
for((damage=1;damage<=health;damage++)); do
    drop_energy=$((damage ** 5 * 32))
    if ((drop_energy>con)); then
      drop_energies=$((drop_energy / con))
      drop_energy=$((drop_energy % con))
      content+="execute @s[scores={${objective1}=${damage}}] ~ ~ ~ scoreboard players remove @s ${objective_energies} ${drop_energies}"$'\n'
    fi
    content+="execute @s[scores={${objective1}=${damage}}] ~ ~ ~ scoreboard players remove @s ${objective_energy} ${drop_energy}"$'\n'
done
echo "$content" >"$file"
