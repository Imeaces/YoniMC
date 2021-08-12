while ((a<1000))
do
let a++
text+="\"yoni:skin_id_$((a+999))\":{\"minecraft:skin_id\":{\"value\":$((a+999))}},"
done
echo "$text">>s.json
