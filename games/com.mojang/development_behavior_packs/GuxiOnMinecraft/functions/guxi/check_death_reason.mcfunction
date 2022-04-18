#yoni/guxi/event_dead

## 如果此时能量状态未转变为10，则认为是意外死亡
execute @s[scores={yoni:guxi=1}] ~ ~ ~ scoreboard players set @s yoni:guxi 101
## 如果因为能量不足以维持秩序，而导致实体死亡，则认为是思维随能量消散
execute @s[scores={yoni:guxi=2}] ~ ~ ~ scoreboard players set @s yoni:guxi 102

