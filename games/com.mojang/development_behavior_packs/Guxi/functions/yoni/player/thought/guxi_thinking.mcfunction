#yoni/player/thought/guxi_thinking
function yoni/entity/rotate_y

execute @s[scores={thought=10}] ~ ~ ~ scoreboard players set @s thinkingt 0
execute @s[scores={thought=10}] ~ ~ ~ scoreboard objectives add thought-0 dummy
execute @s[scores={thought=10}] ~ ~ ~ function yoni/entity/rotate_y
execute @s[scores={thought=10}] ~ ~ ~ scoreboard players operation @s thought-0 = @s rotate_y
execute @s[scores={thought=10}] ~ ~ ~ scoreboard players set @s thought 11

scoreboard players operation @s thought-1 = @s rotate_y
scoreboard players operation @s thought-1 -= @s thought-0
execute @s[scores={thought-1=180..}] ~ ~ ~ scoreboard players add @s thought-1 -360
execute @s[scores={thought-1=..-180}] ~ ~ ~ scoreboard players add @s thought-1 360
execute @s[scores={thought-1=..-90}] ~ ~ ~ scoreboard players add @s thought-0 -30
execute @s[scores={thought-1=90..}] ~ ~ ~ scoreboard players add @s thought-0 30
execute @s[scores={thought-0=180..}] ~ ~ ~ scoreboard players add @s thought-0 -360
execute @s[scores={thought-0=..-180}] ~ ~ ~ scoreboard players add @s thought-0 360

# form x,y
# [1,3][    ..-61 ..-31 ] [2,3][    ..-61 -30..30 ] [3,3][    ..-61 31.. ]
# [1,2][ -60..60  ..-31 ] [2,2][ -60..60  -30..30 ] [3,2][ -60..60  31.. ]
# [1,1][  61..    ..-31 ] [2,1][  61..    -30..30 ] [3,1][  61..    31.. ]

# 100 200 300
# 400 500 600
# 700 800 900

# [800][2,1]: exit
execute @s[rxm=61,scores={thought-1=-30..30,thought=!800..899}] ~ ~ ~ scoreboard players set @s thought 800
execute @s[scores={thought=800}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§r§l---------------------------------\n§r§l|        ||           ||        |\n§r§l|-------------------------------|\n§r§l|        ||           ||        |\n§r§l|===============================|\n§r§l|        ||   退 出   ||        |\n§r§l================================="}]}
execute @s[rxm=61,scores={thought-1=-30..30,thought=800}] ~ ~ ~ scoreboard players add @s thinkingt 1
execute @s[scores={thinkingt=60,thought=800}] ~ ~ ~ scoreboard players set @s thought 801
execute @s[scores={thought=801}] ~ ~ ~ say 退出
execute @s[scores={thought=801}] ~ ~ ~ scoreboard players set @s thinkingt 0
execute @s[scores={thought=801}] ~ ~ ~ scoreboard players set @s thought 0
