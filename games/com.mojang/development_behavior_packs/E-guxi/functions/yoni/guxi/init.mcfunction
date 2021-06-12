#yoni/guxi/init

# 创建记分板
## 操作面板
scoreboard objectives add guxi-op dummy "GUXI:OP"
## 操作面板计时器
scoreboard objectives add guxi-opt dummy "GUXI:OP:TIMER"
## 能量池
scoreboard objectives add guxi-energyl dummy "GUXI:ENERGY_POOL"
scoreboard objectives add guxi-energy dummy "GUXI:ENERGY"
### 状态
scoreboard objectives add guxi-energys dummy "GUXI:ENERGY:STATE"

## 存活状态初始化
function yoni/init/status_alive

## 已经初始化
scoreboard players set @s guxi 1
