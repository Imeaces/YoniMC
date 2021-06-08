#yoni/guxi/operation/2

scoreboard players set @s guxi-op 0
tellraw @s {"rawtext":[{"text":"面板未开发"}]}
tellraw @s {"rawtext":[{"translate":"剩余能量%%s","with":{"rawtext":[{"score":{"objective":"guxi-energy","name":"*"}},{"text":", "},{"score":{"objective":"guxi-energyl","name":"*"}}]}}]}
