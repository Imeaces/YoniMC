#yoni/guxi/loop
# 逻辑如下
# init yoni:guxi = 1
# loop {
#   if (query.is_alive == false){
#     if (yoni:guxi == 2){
#       say 死于意外
#       sum 爆炸
#       yoni:guxi == 101
#     }
#     elif (yoni:guxi == 10){
#       say 思维随能量消散
#       yoni:guxi = 102
#     }
#   }
#   elif (query.is_alive == true) {
#     if (yoni:guxi == 1){
#       spawn @self as #guxi
#       yoni:guxi = 2
#     }
#     elif (yoni:guxi <= {101,102}){
#       say 重生了
#       yoni:guxi == 1
#     }
#     elif (yoni:guxi == 2){
#       #guxi.alive()
#       if (#guxi.status == 5){
#         yoni:guxi = 10
#       }
#     }
#     elif (yoni:guxi == 10){
#       damage @self #guxi.health.max
#     }
#   }
# }

# 当实体初始化物种并设置为咕西时，会设置标签1，
# 此时需要进行下一步初始化工作
execute @s[scores={alive=1,yoni:guxi=1}] ~ ~ ~ function yoni/guxi/event_spawn

# 初始化完毕后，持续获取能量状态并保存
execute @s[scores={alive=1,yoni:guxi=2}] ~ ~ ~ function yoni/guxi/check_energy_status
## 当能量已不足以维持秩序，标记为3
execute @s[scores={alive=1,yoni:guxi=2,guxi:sEnergy=5}] ~ ~ ~ scoreboard players set @s yoni:guxi 3

# 根据已有数据判断死亡方式
execute @s[scores={alive=-1,yoni:guxi=2..3}] ~ ~ ~ function yoni/guxi/event_dead
# 当标记为因意外死亡[2]，则会爆炸 to101
# 如果因为能量不足以维持秩序[3]而导致实体死亡，则不会爆炸 to102

# 适配玩家的复活，当状态为存活且标记为101或102时，则认为是玩家复活
execute @s[scores={alive=1,yoni:guxi=101..102}] ~ ~ ~ function yoni/guxi/event_respawn

# 当标记为3，造成大量伤害，使实体死亡
execute @s[scores={alive=1,yoni:guxi=3}] ~ ~ ~ damage @s 1000 none

# 当初始化完毕，并且实体存活也应当存活时（即能量维持着秩序）
# 对实体应用活着时候的行为
execute @s[scores={alive=1,yoni:guxi=2}] ~ ~ ~ function yoni/guxi/behaviour_alive
