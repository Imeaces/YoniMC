#yoni/guxi/loop

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

# 根据已有数据判断死亡方式
execute @s[scores={alive=-1,yoni:guxi=2..10,yoni:guxi=!3..9}] ~ ~ ~ function yoni/guxi/dead

# 咕西的诞生
execute @s[scores={alive=1,yoni:guxi=1}] ~ ~ ~ function yoni/guxi/spawn
execute @s[scores={alive=1,yoni:guxi=1}] ~ ~ ~ scoreboard players set @s yoni:guxi 2

# 复活时候执行一些操作（仅对于可以复活的人：玩家）
execute @s[scores={alive=1,yoni:guxi=101.102}] ~ ~ ~ function yoni/guxi/respawn
execute @s[scores={alive=1,yoni:guxi=101.102}] ~ ~ ~ scoreboard players set @s yoni:guxi 1

# 活着
execute @s[scores={alive=1,yoni:guxi=2}] ~ ~ ~ function yoni/guxi/alive

# 能量不足以维持秩序
execute @s[scores={alive=1,yoni:guxi=2,guxi:status=5}] ~ ~ ~ function scoreboard players set @s yoni:guxi 10
execute @s[scores={alive=1,yoni:guxi=10}] ~ ~ ~ damage @s 60 none
