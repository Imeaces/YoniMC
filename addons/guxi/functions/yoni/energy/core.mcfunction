scoreboard objectives add energies dummy "ENERGIES"
scoreboard objectives add energy dummy "ENERGY"
scoreboard objectives add energyvol dummy "ENERGY VOLUME"
scoreboard objectives add energys dummy "ENERGY STATUS"
scoreboard objectives add var dummy

# energy status
# <= 0 - stop
# > 0 - run

execute @s[scores={energys=1..}] ~ ~ ~ function yoni/guxi/transfer
