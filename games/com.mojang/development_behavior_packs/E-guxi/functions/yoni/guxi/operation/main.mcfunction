#yoni/guxi/operation/main

# 创建记分板
## 这个是操作面板
scoreboard objectives add e92ac130 dummy "GUXI:OP"
## 这个是操作面板计时器
scoreboard objectives add 292361b0 dummy "GUXI:OP:TIMER"
## 这是检测咕西是否为死亡的
scoreboard objectives add 9c20af42 dummy "GUXI:DEAD"
## 检测是否为咕西
scoreboard objectives add 9c208759 dummy "GUXI:TAG"

# 执行操作命令
execute @a[family=guxi] ~ ~ ~ function yoni/guxi/operation/run
