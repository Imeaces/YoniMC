effect @s night_vision 14 0 true
effect @s darkness 0
effect @s poison 0
#effect @s instant_health 1 0 false
execute unless score @s health = @s max_health run effect @s regeneration 2 1 true
