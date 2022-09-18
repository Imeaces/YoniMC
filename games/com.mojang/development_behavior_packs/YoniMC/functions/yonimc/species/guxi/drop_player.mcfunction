function yonimc/guxi/creation/elytra/recovery
event entity @s remove:all
clear @s yonimc:energy 0 9
say species drop guxi
tag @s remove test:health
