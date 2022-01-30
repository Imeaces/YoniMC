#yoni/guxi/energy/raise
scoreboard objectives add tmp_929394951948 dummy

scoreboard players operation @s guxi:energy -= full_energy guxi:value
scoreboard players add @s guxi:energies 1
scoreboard players operation @s tmp_929394951948 = @s guxi:energy
scoreboard players operation @s guxi:energy %= full_energy guxi:value
scoreboard players operation @s tmp_929394951948 /= full_energy guxi:value
scoreboard players operation @s guxi:energies += @s tmp_929394951948

# this.guxi_energy -= guxi.value.full_energy
# this.guxi_energies += 1
# tmp1 = this.guxi_energy
# this.guxi_energy %= guxi.value.full_energy
# tmp1 /= guxi.value.full_energy
# this.guxi_energies += tmp1
