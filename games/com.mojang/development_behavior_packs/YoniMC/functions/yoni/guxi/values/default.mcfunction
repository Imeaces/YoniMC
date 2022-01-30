#yoni/guxi/values/default
scoreboard objectives add guxi:value dummy

scoreboard players set full_energy guxi:value 100000000
scoreboard players set full_energies guxi:value 360

scoreboard players set base_health guxi:value 60


scoreboard players operation spawn_energy guxi:value = full_energy guxi:value

scoreboard players operation spawn_energies guxi:value = full_energies guxi:value
scoreboard objectives add tmp_914958174959 dummy
scoreboard players set tmp_928491874849 tmp_914958174959 3
scoreboard players operation spawn_energies guxi:value /= tmp_928491874849 tmp_914958174959
