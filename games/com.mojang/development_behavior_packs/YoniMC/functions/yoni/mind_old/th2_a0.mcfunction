#yoni/mind_old/th2_a0
execute @s[scores={th:timer0=1..}] ~ ~ ~ scoreboard players add @s th:timer0 -1

execute @s[scores={th:timer0=0}] ~ ~ ~ tag @s add th:enter
