#:in entity
#:out md:lst_ry = pos:rotate_y
# md:lst_ry 记录初始值
# md:ry_ost 用于计算偏移

#var md:lst_ry last rotate y
scoreboard objectives add md:lst_ry dummy

#var md:ry_ost rotate y -> md:lst_ry
scoreboard objectives add md:ry_ost dummy
scoreboard players set @s md:ry_ost 0

function entity/position/getRotationY

scoreboard players operation @s md:lst_ry = @s pos:rotate_y

#say init rotate y offset 