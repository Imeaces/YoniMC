# 扩展成让你可以在空气中滑行的程度

# 需要下列变量 （没有）
#region.current.hasGravity
#region.current.hasAir
# entity.hasGravity
# entity.guxi.isEnergyEnough

scoreboard objectives add guxi:val_4002 dummy
scoreboard objectives add var_0 dummy

# if guxi:val_4002 == null
# then guxi:val_4002 = 0
scoreboard players add @s guxi:val_4002 0

# var_0 = 0
scoreboard players set @s var_0 0

#if { inv slot slot.armor.chest } == air &&
## guxi:val_4002 == 0
#then var_0 = 1
execute if entity @s[scores={guxi:val_4002=0},hasitem=[{location=slot.armor.chest,item=air}]] run scoreboard players set @s var_0 1

# if var_0 == 1 && arg_0 == 1
# then var_0 = 2
execute if entity @s[scores={var_0=1, arg_0=1}] run scoreboard players set @s var_0 2

# if var_0 == 2
# then arg_0 = 0
## guxi:val_4002 = 1
## { inv slot slot.armor.chest } = elytra{"lock_in_slot"}
execute if entity @s[scores={var_0=2}] run scoreboard players set @s arg_0 0
execute if entity @s[scores={var_0=2}] run scoreboard players set @s guxi:val_4002 1
execute if entity @s[scores={var_0=2}] run replaceitem entity @s slot.armor.chest 0 elytra 1 0 {"item_lock":{"mode":"keep_in_slot"}}


# if { inv slot slot.armor.chest data }  >= 30 &&
## guxi:val_4002 == 1
# then var_0 = 10
execute if entity @s[scores={guxi:val_4002=1},hasitem=[{location=slot.armor.chest,item=elytra,data=20}]] run scoreboard players set @s var_0 10

# if var_0 == 10
# then { inv slot slot.armor.chest item data } = 0
execute if entity @s[scores={var_0=10}] run replaceitem entity @s slot.armor.chest 0 elytra 1 0 {"item_lock":{"mode":"keep_in_slot"}}


# if arg_0 == 3
# then var_0 = 3
## arg_0 = 0
execute if entity @s[scores={arg_0=3}] run scoreboard players set @s var_0 3
execute if entity @s[scores={arg_0=3}] run scoreboard players set @s arg_0 0

##work3: 执行判断

# if guxi:val_4002 == 1 && var_0 == 3
# then var_0 = 4
execute if entity @s[scores={guxi:val_4002=1,var_0=3}] run scoreboard players set @s var_0 4

# if var_0 == 4
# then set { inv slot slot.armor.chest } { air }
## guxi:val_4002 = 0
execute if entity @s[scores={var_0=4}] run replaceitem entity @s slot.armor.chest 0 air
execute if entity @s[scores={var_0=4}] run scoreboard players set @s guxi:val_4002 0
