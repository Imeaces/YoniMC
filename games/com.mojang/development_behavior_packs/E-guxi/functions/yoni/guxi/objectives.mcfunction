#yoni/guxi/objectives

# 创建记分板
## 操作面板
scoreboard objectives add guxi-op dummy "GUXI:OP"
## 操作面板计时器
scoreboard objectives add guxi-opt dummy "GUXI:OP:TIMER"
## 是否为死亡
scoreboard objectives add guxi-alive dummy "GUXI:AILVE"
## 是否为咕西
scoreboard objectives add guxi dummy "GUXI"
## 能量池
scoreboard objectives add guxi-energyl dummy "GUXI:ENERGY_POOL"
scoreboard objectives add guxi-energy dummy "GUXI:ENERGY"
### 状态
scoreboard objectives add guxi-energys dummy "GUXI:ENERGY:STATE"
### 释放
scoreboard objectives add guxi-energyf dummy "GUXI:ENERGY:FREED"
### 放出  
scoreboard objectives add guxi-energyd dummy "GUXI:ENERGY:DROP"
### 计算
scoreboard objectives add guxi-energyp dummy "GUXI:ENERGY:OP"
