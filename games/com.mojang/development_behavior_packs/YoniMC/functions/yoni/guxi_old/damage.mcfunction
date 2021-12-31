#yoni/guxi_old/damage

# x = 受到的伤害 guxi:health
# y = 受到伤害前的血量 guxi:health + health
# 减少的能量 = 39x^5+39*[(60-y)/3]^5
# warning, it may cause overflow
# 可能会溢出
# 74^5=2219006624 > 2^31-1
scoreboard players operation @s yoni:var = @s guxi:health
scoreboard players operation @s yoni:var *= @s guxi:health
scoreboard players operation @s yoni:var *= @s guxi:health
scoreboard players operation @s yoni:var *= @s guxi:health
scoreboard players operation @s yoni:var *= @s guxi:health

# execute energy pool drop transfer function, then drop energy * 39
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var

function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var

function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var

function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var

# cause by damage in destroy
scoreboard players operation @s yoni:var2 = @s health
scoreboard players operation @s yoni:var2 += @s guxi:health
scoreboard players operation @s yoni:var = num60 const
scoreboard players operation @s yoni:var -= @s yoni:var2
scoreboard players operation @s yoni:var /= num3 const
scoreboard players operation @s yoni:var2 = @s yoni:var
scoreboard players operation @s yoni:var *= @s yoni:var2
scoreboard players operation @s yoni:var *= @s yoni:var2
scoreboard players operation @s yoni:var *= @s yoni:var2
scoreboard players operation @s yoni:var *= @s yoni:var2

function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var

function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var

function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var

function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
function yoni/guxi/energy/core
scoreboard players operation @s energy -= @s yoni:var
