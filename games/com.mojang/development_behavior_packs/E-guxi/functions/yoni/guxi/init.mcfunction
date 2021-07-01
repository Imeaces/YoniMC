#yoni/guxi/init

# 创建记分项

scoreboard objectives add guxi-energyl dummy "GUXI:ENERGY_POOL"
scoreboard objectives add guxi-energy dummy "GUXI:ENERGY"
scoreboard objectives add guxi-energys dummy "GUXI:ENERGY:STATE"

# 存活状态初始化
function yoni/init/status_alive
